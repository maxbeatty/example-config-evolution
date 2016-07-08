# example-config-evolution [![Build Status](https://travis-ci.org/maxbeatty/example-config-evolution.svg?branch=master)](https://travis-ci.org/maxbeatty/example-config-evolution)
Example of a web app configuration evolving

## Follow Along

Each git tag represents a stage of this simple web app's evolution.

### [v1](https://github.com/maxbeatty/example-config-evolution/tree/v1)

It all starts with a simple web app that accepts requests and responds. It stands alone with no external dependencies or services. The only thing you might want to change is the port the server listens on.

### [v2](https://github.com/maxbeatty/example-config-evolution/tree/v2)

Now you want a persistent store such as a database so you add [PostgreSQL](https://www.postgresql.org/). You installed and started PostgreSQL locally and everything works fine. No configuration needed!

### [v3](https://github.com/maxbeatty/example-config-evolution/tree/v3)

You deployed v2 and [it can't connect to PostgreSQL](https://example-config-evolution-aedeeoawbj.now.sh/) 😢

You realize you'll need separate configurations for local development and when the app is deployed so you create a [JSON-based configuration](https://github.com/hapijs/confidence) with details for both environments.

#### [v3.0.1](https://github.com/maxbeatty/example-config-evolution/tree/v3.0.1)

To get [v3 deployed](https://example-config-evolution-cjlymgzktd.now.sh/), you needed to:

1. install sub-dependency `eslint` explicitly as your own so npm@3's flattened dependency tree specified the correct version for shared dependencies ([npm issue](https://github.com/npm/npm/issues/9663))
2. add `.npmignore` for more predictability in [what is uploaded](https://www.npmjs.com/package/now#conventions)
3. expose the underlying error message in `./lib/web.js` when the `db.query` failed to learn that the wrong configuration was being used
4. change `npm run build` to test against `NOW_URL` instead of `NOW` since [`NOW` does not appear to be set as an environment variable](https://twitter.com/maxbeatty/status/751511963126018049)

### [v4](https://github.com/maxbeatty/example-config-evolution/tree/v4)

With [v3 deployed](https://example-config-evolution-cjlymgzktd.now.sh/), you realize sensitive information such as database passwords are committed to source control!<sup>[1](#fn-v4-1)</sup> You read about [how storing configuration in the environment is good](http://12factor.net/config) so you reconfigure your configuration to read from the environment for sensitive variables.

<a name="fn-v4-1">1</a>: Those credentials are to a free tier of [ElephantSQL](http://www.elephantsql.com/) so these examples work. Please be nice to them and don't abuse that 20 MB database.

## Deployment

Using [Zeit's now](https://zeit.co/now) to deploy each tag.

```
npm install --global now
```

When ready to deploy changes (no git commit or tag needed), run `now`. To see debugging information like what files are being uploaded, run `now -d`.

## Development

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

### Dependencies

When adding or removing dependencies, make sure to prune `node_modules` and shrinkwrap explicit versions by running:

```
npm prune && npm shrinkwrap --dev
```
