import { arrayBufferToHexString, log, DEBUG  } from "../src/vault.ts";

Deno.serve({ port: 6781 }, (req) => {
if (req.headers.get("upgrade") != "websocket") {
return new Response(null, { status: 501 });
}

const { socket: ws, response } = Deno.upgradeWebSocket(req);
  log(`[Matchmaker] Client connecting...`);

  ws.onopen = () => {
    log("[Matchmaker] Client connected!");
  };

  const ws_send = ws.send;
  ws.send = (data: ArrayBuffer) => {
    DEBUG && console.debug(`[Matchmaker] Server: ${arrayBufferToHexString(data)}`);
    ws_send.call(ws, data);
  };

  ws.onclose = () => {
    log("[Matchmaker] Client disconnected!");
  };

  return response;
});