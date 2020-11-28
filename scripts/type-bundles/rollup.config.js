import dts from "rollup-plugin-dts";

const input = process.env.INPUT_DTS;
const output = process.env.OUTPUT_DTS;

const config = [
  {
    input: input,
    output: [{ file: output, format: "es" }],
    plugins: [dts()],
  },
];

export default config;
