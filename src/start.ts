import { Configuration, OpenAIApi } from "openai";
import process from "process";
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const response = await openai.createCompletion("text-davinci-002", {
  prompt: "Are you alive?",
  temperature: 0.7,
  max_tokens: 300,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});

console.log(response.data);
