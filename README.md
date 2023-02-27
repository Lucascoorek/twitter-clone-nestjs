## Description

Tweeter Clone API developed using [Nestjs](https://github.com/nestjs/nest) framework using TypeScript starter repository and [Prisma](https://github.com/prisma/prisma) ORM.

## Installation

```bash
$ npm install
```

## Setup
Add `.env` file in the root directory and set variables as stated in the `.env-example` file

## Authorization
Most routes require API_KEY query param setted to user email e.g. `?API_KEY=user@example.com`

## Available routes
- Create new user
- Get user by ID
- Add friend
- Remove friend
- Create new tweet
- Get tweet by ID
- Delete tweet
- Publish tweet
- Get published tweets
- Filter tweets

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
