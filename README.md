# Coffee Shop Product Catalog
## Simple API

This simple API document exemplifies a small usage with NestJS capabilities with mongoDB

## Installation

Install last node.js version;

Install docker and pull a basic mongoDB image:

```
$ docker pull mongo
```

Create a folder to store the mongodb volume:

```
$ mkdir $(pwd)/Documentos/Projetos/mongodb
```

Start mongo database (script for docker is in the repository as "mongo.sh"):

```
$ ./mongo.sh
```

Install the dependencies and devDependencies and start the server.

```sh
$ npm i
$ npm run start:dev
```
