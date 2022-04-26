import { OpenAIApi, Configuration } from "openai";
import fs from "fs/promises";
import dotenv from "dotenv";
import { exit } from "process";
import { number } from "yargs";

dotenv.config();

const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

const generate = async (type: string, prompt: string) => {
  const response = await openai.createCompletion("code-davinci-002", {
    prompt,
    temperature: 0,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["// Usage"],
  });

  const { data, statusText } = response;

  if (!data.choices || !data.choices[0].text) {
    console.error("No choices returned: " + statusText);
    process.exit(1);
  }

  // Make directories
  await fs.mkdir(`./data/${type}`, { recursive: true });

  const date = new Date();
  const timestamp = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}${addZero(
    date.getMinutes()
  )}`;
  const writeDataPromise = fs.writeFile(
    `./data/${type}/${type}-${timestamp}.tsx`,
    data.choices![0].text!
  );

  const writeLogPromise = fs.writeFile(
    `./data/${type}/data-${timestamp}.json`,
    JSON.stringify({ ...data, prompt }, null, 4)
  );

  return Promise.all([writeDataPromise, writeLogPromise]);
};
export default generate;

const addZero = (n: number) => {
  if (n.toString().length == 1) return 0 + "" + n;
  else return n;
};
