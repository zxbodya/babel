// @flow

import path from "path";
import gensync, { type Handler } from "gensync";
import Plugin from "./plugin";
import { mergeOptions } from "./util";
import { createItemFromDescriptor } from "./item";
import {
  buildRootChain,
  type ConfigContext,
  type FileHandling,
} from "./config-chain";
import { getEnv } from "./helpers/environment";
import {
  validate,
  type ValidatedOptions,
  type RootMode,
} from "./validation/options";

import {
  findConfigUpwards,
  resolveShowConfigPath,
  ROOT_CONFIG_FILENAMES,
  type ConfigFile,
  type IgnoreFile,
} from "./files";

function* resolveRootMode(
  rootDir: string,
  rootMode: RootMode,
): Handler<string> {
  switch (rootMode) {
    case "root":
      return rootDir;

    case "upward-optional": {
      const upwardRootDir = yield* findConfigUpwards(rootDir);
      return upwardRootDir === null ? rootDir : upwardRootDir;
    }

    case "upward": {
      const upwardRootDir = yield* findConfigUpwards(rootDir);
      if (upwardRootDir !== null) return upwardRootDir;

      throw Object.assign(
        (new Error(
          `Babel was run with rootMode:"upward" but a root could not ` +
            `be found when searching upward from "${rootDir}".\n` +
            `One of the following config files must be in the directory tree: ` +
            `"${ROOT_CONFIG_FILENAMES.join(", ")}".`,
        ): any),
        {
          code: "BABEL_ROOT_NOT_FOUND",
          dirname: rootDir,
        },
      );
    }
    default:
      throw new Error(`Assertion failure - unknown rootMode value.`);
  }
}

type PrivPartialConfig = {
  options: ValidatedOptions,
  context: ConfigContext,
  fileHandling: FileHandling,
  ignore: IgnoreFile | void,
  babelrc: ConfigFile | void,
  config: ConfigFile | void,
  files: Set<string>,
};

export default function* loadPrivatePartialConfig(
  inputOpts: mixed,
): Handler<PrivPartialConfig | null> {
  if (
    inputOpts != null &&
    (typeof inputOpts !== "object" || Array.isArray(inputOpts))
  ) {
    throw new Error("Babel options must be an object, null, or undefined");
  }

  const args = inputOpts ? validate("arguments", inputOpts) : {};

  const {
    envName = getEnv(),
    cwd = ".",
    root: rootDir = ".",
    rootMode = "root",
    caller,
    cloneInputAst = true,
  } = args;
  const absoluteCwd = path.resolve(cwd);
  const absoluteRootDir = yield* resolveRootMode(
    path.resolve(absoluteCwd, rootDir),
    rootMode,
  );

  const filename =
    typeof args.filename === "string"
      ? path.resolve(cwd, args.filename)
      : undefined;

  const showConfigPath = yield* resolveShowConfigPath(absoluteCwd);

  const context: ConfigContext = {
    filename,
    cwd: absoluteCwd,
    root: absoluteRootDir,
    envName,
    caller,
    showConfig: showConfigPath === filename,
  };

  const configChain = yield* buildRootChain(args, context);
  if (!configChain) return null;

  const options = {};
  configChain.options.forEach(opts => {
    mergeOptions(options, opts);
  });

  // Tack the passes onto the object itself so that, if this object is
  // passed back to Babel a second time, it will be in the right structure
  // to not change behavior.
  options.cloneInputAst = cloneInputAst;
  options.babelrc = false;
  options.configFile = false;
  options.passPerPreset = false;
  options.envName = context.envName;
  options.cwd = context.cwd;
  options.root = context.root;
  options.filename =
    typeof context.filename === "string" ? context.filename : undefined;

  options.plugins = configChain.plugins.map(descriptor =>
    createItemFromDescriptor(descriptor),
  );
  options.presets = configChain.presets.map(descriptor =>
    createItemFromDescriptor(descriptor),
  );

  return {
    options,
    context,
    fileHandling: configChain.fileHandling,
    ignore: configChain.ignore,
    babelrc: configChain.babelrc,
    config: configChain.config,
    files: configChain.files,
  };
}

type LoadPartialConfigOpts = {
  showIgnoredFiles?: boolean,
  ...
};

export const loadPartialConfig = gensync<[any], PartialConfig | null>(
  function* (opts?: LoadPartialConfigOpts): Handler<PartialConfig | null> {
    let showIgnoredFiles = false;
    // We only extract showIgnoredFiles if opts is an object, so that
    // loadPrivatePartialConfig can throw the appropriate error if it's not.
    if (typeof opts === "object" && opts !== null && !Array.isArray(opts)) {
      ({ showIgnoredFiles, ...opts } = opts);
    }

    const result: ?PrivPartialConfig = yield* loadPrivatePartialConfig(opts);
    if (!result) return null;

    const { options, babelrc, ignore, config, fileHandling, files } = result;

    if (fileHandling === "ignored" && !showIgnoredFiles) {
      return null;
    }

    (options.plugins || []).forEach(item => {
      if (item.value instanceof Plugin) {
        throw new Error(
          "Passing cached plugin instances is not supported in " +
            "babel.loadPartialConfig()",
        );
      }
    });

    return new PartialConfig(
      options,
      babelrc ? babelrc.filepath : undefined,
      ignore ? ignore.filepath : undefined,
      config ? config.filepath : undefined,
      fileHandling,
      files,
    );
  },
);

export type { PartialConfig };

class PartialConfig {
  /**
   * These properties are public, so any changes to them should be considered
   * a breaking change to Babel's API.
   */
  options: ValidatedOptions;
  babelrc: string | void;
  babelignore: string | void;
  config: string | void;
  fileHandling: FileHandling;
  files: Set<string>;

  constructor(
    options: ValidatedOptions,
    babelrc: string | void,
    ignore: string | void,
    config: string | void,
    fileHandling: FileHandling,
    files: Set<string>,
  ) {
    this.options = options;
    this.babelignore = ignore;
    this.babelrc = babelrc;
    this.config = config;
    this.fileHandling = fileHandling;
    this.files = files;

    // Freeze since this is a public API and it should be extremely obvious that
    // reassigning properties on here does nothing.
    Object.freeze(this);
  }

  /**
   * Returns true if there is a config file in the filesystem for this config.
   */
  hasFilesystemConfig(): boolean {
    return this.babelrc !== undefined || this.config !== undefined;
  }
}
Object.freeze(PartialConfig.prototype);
