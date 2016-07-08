# example-config-evolution [![Build Status](https://travis-ci.org/maxbeatty/example-config-evolution.svg?branch=master)](https://travis-ci.org/maxbeatty/example-config-evolution)
Example of a web app configuration evolving

## Follow Along

Each git tag represents a stage of this simple web app's evolution.

### [v1](https://github.com/maxbeatty/example-config-evolution/tree/v1)

It all starts with a simple web app that accepts requests and responds. It stands alone with no external dependencies or services. The only thing you might want to change is the port the server listens on.

### [v2](https://github.com/maxbeatty/example-config-evolution/tree/v2)

Now you want a persistent store such as a database so you add [PostgreSQL](https://www.postgresql.org/). You installed and started PostgreSQL locally and everything works fine. No configuration needed!

### [v3](https://github.com/maxbeatty/example-config-evolution/tree/v3)

[You deployed v2](https://zeit.co/now) and [it can't connect to PostgreSQL](https://example-config-evolution-aedeeoawbj.now.sh/) 😢

You realize you'll need separate configurations for local development and when the app is deployed so you create a [JSON-based configuration](https://github.com/hapijs/confidence) with details for both environments.

## Contributing

1. Use the correct Node.js version (`nvm install`)
2. Install dependencies (`npm install`)

### Scripts

#### Build

Build a configuration file so the server can start

```
npm run build
```

#### Start

Start the server

```
npm start
```

#### Test

Run unit tests

```
npm test
```
