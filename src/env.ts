import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const LOGIN_URL = process.env.LOGIN_URL;

if (!LOGIN_URL) {
  throw new Error("Missing APP_ID in environment");
}

export const env = {
  LOGIN_URL,
};
