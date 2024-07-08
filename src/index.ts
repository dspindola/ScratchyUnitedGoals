import KV from "@replit/database";
import config from "../.replit";

const domain = process.env.REPLIT_DEV_DOMAIN;

// console.log(await Bun.dns.lookup(domain));

const kv = new KV(process.env.REPLIT_DB_URL);

const items = await kv.list();

console.log(config);

