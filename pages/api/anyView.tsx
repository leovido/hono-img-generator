import path from "path";
import { encodeImageToBase64 } from "./generate";

// add any images here and add them to public
const anyImage = path.join(process.cwd(), "public", "anyImage.png");
const base64Image = encodeImageToBase64(anyImage);

const anyImage2 = path.join(process.cwd(), "public", "anyImage2.png");
const base64Image2 = encodeImageToBase64(anyImage2);

export const anyView = (/* anyProps: any */) => (
  <div
    style={{
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      textAlign: "center",
      height: "100%",
      width: "100%",
      fontFamily: "Nerko One",
    }}
  >
    <h1>Your fancy view</h1>
    <img src={base64Image} alt="anyImage" />
  </div>
);
