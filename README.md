# OpenAI React Component Generator

## How to use?

Install packages with

> npm ci

Run the program with

> npm start -- help

Example command:

> npm start -- -t Heading -p height

## How it works?

1. The program gathers the specs (type and props) from your program params.
2. It appends the specs to the prompt for the OpenAI API
3. It calls the AI trough the API
4. It writes the response to a file on `./data`
