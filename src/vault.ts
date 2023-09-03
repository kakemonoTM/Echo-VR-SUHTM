import fs from "node:fs";

// Logs

export function log(event: string) {
  const logFilePath = "../events.log";
  const logMessage = `${new Date().toISOString()} - ${event}\n`;

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(event);
    }
  });
}

//  hex string 

export function toHexString(num: number): string {
    return num.toString(16).padStart(2, "0");
  }
  
  export const arrayBufferToHexString = (buf: ArrayBuffer) => {
    return Array.from(new Uint8Array(buf)).map(toHexString).join(" ");
  };

// Debug 

export const DEBUG = Deno.env.get("DEBUG") === "true";