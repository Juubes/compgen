import process from "process";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import generate from "./generator.js";

const args = await yargs(hideBin(process.argv))
  .scriptName("compgen")
  .options("help", { alias: "h" })
  .options("type", {
    alias: "t",
    desc: "Type of the component",
    string: true,
    requiresArg: true,
  })
  .options("props", {
    alias: "p",
    desc: "The props of the component. Can be explicit or abstract properties.",
    array: true,
  })
  .example(
    '-t Button -p "green outline" -p innertext',
    "Generates a Button component with green outline and an innertext prop."
  )
  .demandOption(
    "type",
    "This is the type/name of the .tsx component and the file."
  )
  .help()
  .parse();

const type = args.type;

let props = `
- color (primary/secondary)`;

if (args.props)
  props += args.props.reduce((prev, add) => {
    return `${prev}\n- ${add}`;
  }, "");

const libraries = `
- react
- tailwindcss
- clsx`;

const prompt = `Create a TypeScript file with a functional ${type} component with the following properties:${props}

Do all the styling with tailwind classes. Do not import any other local files. Do not use React Native.

You can use the following libraries:${libraries}

// Code
import React from 'react';
`;

// console.log(prompt);
await generate(type, prompt);
