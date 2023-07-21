# DHIS2 Visulizer


## Introduction
The DHIS2 visualizer app is an API service that allows you to get visualization images from DHIS2 visualizations.

## Getting started
To set up the server, download the latest release. Then create copy the `.env.example` file to `.env` and change the required environment variables.

### Environment variables

 - `VISUALIZER_API_MOUNT_POINT`: Endpoint at which the server will be accessible
 - `VISUALIZER_PORT`: Port at which the service should be exposed
 - `VISUALIZER_DHIS2_MEDIATOR_URL`: URL to the DHIS2 mediator


## Running the app

### Using node

This requires at least `Node` version `16.x`.

Run

```shell
 yarn install --prod
```

To get required dependencies and run the app using the command:

```shell
yarn start
```

### Using Docker (Recommended)

This requires at least `Docker Engine` version `23.0.5` and `Docker Compose Plugin` version `v2.15.1`.
To run the app using docker there are 2 ways:

#### Docker build

First, build the docker image

```shell
docker build . <image_name>:<app-version>
```

And then run the app container using:

```shell
docker run <image_name>:<app-version> --port 3000:<port>
```
## Development

You can set up the project by cloning into your local machine.

### Get dependencies

Get the required dependencies by running:

```shell
yarn install
```

### Environment

Copy `.env.example` to `.env` file and change the variables as required.

### Run in development mode

To run the server in development mode use:

```shell
yarn dev
```

### Build

To build the app run:

```shell
yarn build
```

This will create a zipped build in the `build` folder

