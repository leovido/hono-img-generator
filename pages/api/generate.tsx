import path from "path";
import fs from "fs";

// Function to convert an image file to a Base64-encoded string
export function encodeImageToBase64(filePath: string): string {
  const file = fs.readFileSync(filePath);
  const ext = path.extname(filePath).slice(1); // Get file extension without the dot
  const mimeType = `image/${ext}`;
  return `data:${mimeType};base64,${file.toString("base64")}`;
}
