#!/usr/local/bin/node
import process from "process";
import dotenv from "dotenv";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { generate } from "./generator";

dotenv.config();

yargs(hideBin(process.argv))
  .options("type", { alias: "v", string: true })
  .default("help", true)
  .help();

const type = "Button";

const props = `
- color (primary/secondary)`;

const libraries = `
- react
- tailwindcss
- clsx`;

const prompt = `Create a TypeScript ${type} component with the following properties:${props}.

Do all the styling with tailwind classes. Do not import any other local files. Do not use React Native. You can use the following libraries:${libraries}.

// Code
import React from 'react';
`;

// await generate(type, prompt);
