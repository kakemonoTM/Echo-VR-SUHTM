import { init } from "zstd_wasm";

await init();

import "./services/login.ts";
import "./services/serverdb.ts";
import "./services/matchmaker.ts";
