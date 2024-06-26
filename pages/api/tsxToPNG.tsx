import { promises } from "fs";
import { Resvg } from "@resvg/resvg-wasm";
import satori from "satori";
import fs from "fs";
import { getIconCode, loadEmoji } from "./twemoji";

export async function convertSvgToPngByResvg(targetSvg: Buffer | string) {
  try {
    const renderer = new Resvg(targetSvg, {});
    const image = renderer.render();
    return image.asPng();
  } catch (e) {
    console.error(e);
  }
}

export async function tsxToPNGBuffer(jsx: JSX.Element) {
  const svg = await satori(jsx, {
    width: 1080,
    height: 1080,
    fonts: [
      {
        name: "Instrument Sans",
        data: await promises.readFile("./public/InstrumentSans-Regular.otf"),
        weight: 400,
        style: "normal",
      },
      {
        name: "Instrument Serif",
        data: await promises.readFile("./public/InstrumentSerif-Regular.ttf"),
        weight: 400,
        style: "normal",
      },
      {
        name: "Nerko One",
        data: await promises.readFile("./public/NerkoOne-Regular.ttf"),
        weight: 400,
        style: "normal",
      },
    ],
    loadAdditionalAsset: async (code: string, segment: string) => {
      if (code === "emoji") {
        return (
          `data:image/svg+xml;base64,` +
          btoa(await loadEmoji("twemoji", getIconCode(segment)))
        );
      }
      return code;
    },
  });
  const png: any = await convertSvgToPngByResvg(svg);
  const pngBuffer = Buffer.from(png);
  return pngBuffer;
}

export function saveAsPNG(buffer: Buffer, filePath: string) {
  try {
    fs.writeFileSync(filePath, buffer);
    return true;
  } catch (error) {
    console.log("Error happened while CREATING the file!", error);
    return false;
  }
}

export function deleteFileAfter(filePath: string, seconds: number) {
  setTimeout(() => {
    fs.unlink(filePath, (err) => {
      if (err) console.error("Failed to delete file:", err);
      else console.log("File deleted:", filePath);
    });
  }, seconds * 1000);
}
