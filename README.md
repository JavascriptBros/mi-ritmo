# mi-ritmo

Simple Music Web App that retrieves data from Spotify Api and Web Playback Api
on user request and allows to create accounts, listen to music, create playlists, etc.

## Motivation
The purpose of this application is just for personal use and to develop app for fun.

## Built with:
- ReactJS
- ExpressJS
- NodeJS
- MongoDB

## Start the App
- clone the repository 
-  `npm install` 
-  `npm start`

## Customized commit messages with branch name
githooks allows commit messages to include name of branch

From the root dir

```cd .git/hooks
nano prepare-commit-msg
paste in this script```

```#!/bin/bash

# Also include ability to define when to skip this customization
if [ -z "$BRANCHES_TO_SKIP" ]; then
  BRANCHES_TO_SKIP=(master dev)
fi

BRANCH_NAME=$(git symbolic-ref --short HEAD)
BRANCH_NAME="${BRANCH_NAME##*/}"

BRANCH_EXCLUDED=$(printf "%s\n" "${BRANCHES_TO_SKIP[@]}" | grep -c "^$BRANCH_NAME$")
BRANCH_IN_COMMIT=$(grep -c "\[$BRANCH_NAME\]" $1)

if [ -n "$BRANCH_NAME" ] && ! [[ $BRANCH_EXCLUDED -eq 1 ]] && ! [[ $BRANCH_IN_COMMIT -ge 1 ]]; then
  sed -i.bak -e "1s/^/[$BRANCH_NAME] /" $1
fi```
exit and save: `^X`, `Y`, `enter` then make file executable

```chmod +x prepare-commit-msg```

you should now have your branch name prepended to any commit messages