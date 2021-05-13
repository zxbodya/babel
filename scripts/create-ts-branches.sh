#!/usr/bin/env bash
#set -e

packages=(
    babel-helper-create-class-features-plugin
    babel-plugin-transform-block-scoping
    babel-preset-env
)

rootPath=".."
for package in "${packages[@]}"; do
    git checkout main

    tmpBranchName="ts-migration/${package}-tmp"
    targetBranchName="ts-migration/${package}"

    echo "create temporary branch ${tmpBranchName}"

    git branch -D ${tmpBranchName} || true
    git checkout -b ${tmpBranchName}

    echo "cherry pick automated file ranames for ${package}"

    git log --pretty=oneline main..ts \
      | grep "flowts rename" \
      | awk '{print $1;}' \
      | xargs -I '{HASH}' git cherry-pick -n '{HASH}'

    git reset HEAD -- ${rootPath}
    git add ${rootPath}/packages/${package}/*  || true
    git commit --no-verify -m "${package} flowts rename" || true

    git add ${rootPath}/* || true
    git reset HEAD -- ${rootPath}/scripts/create-branches.sh
    git reset --hard HEAD

    echo "cherry pick automated flow to typescript migration for ${package}"

    # pick part of "flowts convert" related to the package
    git log --pretty=oneline main..ts \
      | grep "flowts convert" \
      | awk '{print $1;}' \
      | xargs -I '{HASH}' git cherry-pick -n '{HASH}'

    git reset HEAD -- ${rootPath}
    git add ${rootPath}/packages/${package}/* || true
    git commit --no-verify -m "${package} flowts convert" || true

    git add ${rootPath}/* || true
    git reset HEAD -- ${rootPath}/scripts/create-branches.sh
    git reset --hard HEAD

    echo "create target branch ${targetBranchName}"
    # remove previous version
    git branch -D ${targetBranchName} || true

    echo "cherry pick manual type fixes for ${package}"
    torebase=`git log --pretty=oneline main..ts | grep ${package}`
    if [[ -z "${torebase}" ]]
    then
        echo "no manual fixes"
        #        git checkout ${tmpBranchName}
        git checkout -b ${targetBranchName}
    else
        echo "manual fixes"
        echo "${torebase}"
        git checkout ts
        git checkout -b ${targetBranchName}
        # rebase commits related to the package on top of temporary branch created earlier
        GIT_SEQUENCE_EDITOR="sed -i '' -n '/${package}/p' " git rebase -i ${tmpBranchName}
    fi
    cd ${rootPath}
    make generate-tsconfig
    cd scripts
    git add ${rootPath}/* || true
    git commit -m "make generate-tsconfig" || true
    cd ${rootPath}
    yarn install || true
    cd scripts
    git add ${rootPath}/* || true
    git commit -m "yarn install" || true

    echo "cleanup"
    git branch -d ${tmpBranchName}

    git checkout main
done

rootPath=".."

