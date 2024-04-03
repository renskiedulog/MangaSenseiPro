// pages/api/image.js

import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: any, res: any) {
  const image = req?.url.split("=")[1];
  try {
    const response = await axios.get(image, { responseType: "arraybuffer" });
    const buffer = response.data; // No need to call .buffer()
    const base64Image = Buffer.from(buffer).toString("base64");
    const imageSrc = `data:image/jpeg;base64,${base64Image}`;
    return NextResponse.json({ imageSrc: imageSrc });
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).send("Error fetching image");
  }
}
