import { Hono } from "hono";
import { handle } from "@hono/node-server/vercel";
import { tsxToPNGBuffer } from "./tsxToPNG";
import { anyView } from "./anyView";
import { NextResponse } from "next/server";
import type { PageConfig } from "next";
import { readFileSync } from "fs";
import { initWasm } from "@resvg/resvg-wasm";

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
  // runtime: "edge",
};

const resvgWasm = readFileSync(
  "./node_modules/@resvg/resvg-wasm/index_bg.wasm"
);
initWasm(resvgWasm);

const app = new Hono().basePath("/api");

app.get("/hello", async (c) => {
  try {
    const reqJSON = await c.req.query();
    let buffer = await tsxToPNGBuffer(anyView());

    return c.body(buffer, 200, {
      "Content-Type": "image/png",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
});

export default handle(app);
