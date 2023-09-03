import { arrayBufferToHexString, log, DEBUG  } from "../src/vault.ts";

Deno.serve({ port: 6784 }, (req) => {
if (req.headers.get("upgrade") != "websocket") {
return new Response(null, { status: 501 });
}

const { socket: ws, response } = Deno.upgradeWebSocket(req);
  log(`[Data] Client connecting...`);

  ws.onopen = () => {
    log("[Data] Client connected!");
  };

  const ws_send = ws.send;
  ws.send = (data: ArrayBuffer) => {
    DEBUG && console.debug(`[Data] Server: ${arrayBufferToHexString(data)}`);
    ws_send.call(ws, data);
  };

  ws.onclose = () => {
    log("[Data Client disconnected!");
  };

  return response;
});