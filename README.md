# Archon UI

Vue 3 + Vite + Tailwind + Material design icons UI stack

# Your local setup

## OS Requirements

Install Node.js, follow the instructions for your OS from the link bellow:

[Node.js LTS](https://nodejs.org).

## Prepare local setup

Clone this repository of course:

```shell
$> git clone git@github.com:prochor666/archon-ui.git
$> cd archon-ui
$> npm install
```

## Branches

### Development

```shell
develop
```

Main branch for merging all feature branches. Good point for start/merge new work here.

#### Production

```shell
main
```

Use pull request to push the work here. This main branch is used for production releases.

### feature/xxx

```shell
feature/xxxx
```

Use feature branches for individual updates.

# How to run

## Run local server

This command starts your local dev server based on configuration in ./vite.config.js.

```shell
$> npm run dev
```

## Build your app

This command builds an app into ./dist directory.

```shell
$> npm run build
```

# Update to the latest packages
This will update your package.json! 
Warning, "things" can break!

```
$> npm i npm-check-updates
$> ncu -u
$> npm install
```

# Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
