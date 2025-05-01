# `%gapp`

A simple and modern `%gall` app template for Urbit.

## Setup

Make sure the following dependencies are installed on your development machine:

- [`GNU Make`](https://www.gnu.org/software/make/)
- [`npm`](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [`durploy`](https://github.com/sidnym-ladrut/durploy)
- [`peru`](https://github.com/buildinspace/peru?tab=readme-ov-file#installation)

## Build/Develop

All of the following commands assume that the current working directory is this
repository's base directory. Also, before running any development commands, you
first need a running Urbit ship. Deploy one on your local machine with:

```bash
durploy ship zod
```

### Development Workflows

In order to continuously test back-end code changes as they're made, run:

```bash
durploy desk -w zod gapp ./out/desk/
```

In order to continuously test front-end code changes as they're made, run:

```bash
cd ./ui && npm run dev
```

For front-end changes, be sure to authenticate via both the NPM web portal
(default: `127.0.0.1:3000`) and the development ship's web portal ([fake
`~zod`][fakezod] default: `127.0.0.1:8080`) using the output of the Urbit
`+code` command as the password.

### Deployment Workflows

To generate a new full desk from the existing base desk, run the following
command:

```bash
make desk
```

To deploy a new desk onto your development ship, run:

```bash
make ship-desk IN_SHIP=zod
```

To generate a new front-end glob, run the following command:

```bash
make glob
```

To deploy this glob to your development ship, run:

```bash
make release IN_SHIP=zod
```


[urbit]: https://urbit.org
[durploy]: https://github.com/sidnym-ladrut/durploy

[fakezod]: https://developers.urbit.org/guides/core/environment#development-ships
[react]: https://reactjs.org/
[tailwind css]: https://tailwindcss.com/
[vite]: https://vitejs.dev/
