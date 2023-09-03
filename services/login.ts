import { arrayBufferToHexString, log, DEBUG  } from "../src/vault.ts";

Deno.serve({ port: 6780 }, (req) => {
if (req.headers.get("upgrade") != "websocket") {
return new Response(null, { status: 501 });
}

const { socket: ws, response } = Deno.upgradeWebSocket(req);
  log(`[login] Client connecting...`);

  ws.onopen = () => {
    log("[Login] Client connected!");
  };

  const ws_send = ws.send;
  ws.send = (data: ArrayBuffer) => {
    DEBUG && console.debug(`[Login] Server: ${arrayBufferToHexString(data)}`);
    ws_send.call(ws, data);
  };

  ws.onclose = () => {
    log("[Login] Client disconnected!");
  };

  return response;
});
