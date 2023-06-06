# Ylang23

## System Requirements
Before setting up this project, your system should have Node, NVM, and Yarn. If you have all three of these resources already, skip to Project Setup below.

- Install the latest, stable version of Node[https://nodejs.org/en/]
- In Terminal/Bash, run the linked cURL or Wget command to install NVM (Node Version Manager)[https://github.com/nvm-sh/nvm#installing-and-updating]
- In Terminal/Bash, run the following command to install NPM[https://www.npmjs.com/]

`npm install -g npm`

## Project Setup

This project requires a developer theme and app on Shopify. General instructions on how to set these up can be found on Confluence[https://bvaccel.atlassian.net/wiki/spaces/TECH/pages/656310317/GULP+WEBPACK]. Specific, Ylang23 instructions are below:

### Theme setup
  - In admin, go to Online Store, duplicate the live theme, and wait for it to finish copying/duplicating
  - Rename the duplicated theme in line with what you see other dev themes named as, such as `[DEV] Name | The Stable`

### App setup
  - In admin, go to Apps and App & sale channel settings
  - Click Develop apps (top right) then Create an app
  - Name the app as you named your developer theme and set yourself/your email as the app developer
  - Once your app is created, click into it and then click Configure Admin API Scopes
  - Scroll down in configuration to Themes and select `write_themes` and `read_themes`
  - Click Save at the bottom and Install app at the top
  - Once installed, go to API credentials to get one time access token. Do not lose this access token as it can only be revealed once. You will be using it as the password in your `.env` file
    - Token will start with shpat_

### .env file setup
You will also need to set up a `.env` file in the root of the project. Copy and paste the following, and replace with your own credentials and theme ID from Shopify:

```
URL=ylang2-3.myshopify.com
PASSWORD=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
THEME_ID=XXXXXXXXXXX
```

### Dependency installation
Ylang23's codebase uses Yarn for dependency management, webpack for JavaScript compilation, and Gulp for task orchestration.

Before installing project dependencies, ensure you're using an appropriate version of Node by typing the following command in Terminal/Bash

`nvm use`

This will use the Node version listed in the .nvmrc file. If you do not have that version already installed, type

`nvm install`

```
# install dependencies
yarn
```

## Gulp Tasks

A list of these tasks can be found in `package.json`. Watchers will automatically deploy file changes to the theme in `.env`.

### Commands

`yarn start`
⋅⋅⋅Run the build tool, deploy all files to the theme in `.env`, and watch files for changes

`yarn watch`
⋅⋅⋅Run the build tool and watch files for changes

`yarn build`
⋅⋅⋅Run the build tool

`yarn build:prod`
⋅⋅⋅Run the build tool and minify assets

`yarn deploy`
⋅⋅⋅Run the build tool and deploy all files to the theme in `.env`
