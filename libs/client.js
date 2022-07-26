// libs/client.js
import { createClient } from "microcms-js-sdk";

//microCMSでの個人情報
export const client = createClient({
  serviceDomain: "35l0ok3otk",
  apiKey: process.env.API_KEY,
});
