import { Pool } from "pg";
import { appConfig } from "./config";

export const pool = new Pool({
  connectionString: appConfig.databaseUrl,
});
