import cors from "cors";
import express from "express";

import { createMP3 } from "./create-mp3.js";
import { downloader } from "./download-video.js";

const app = express();

app.use(cors());

app.get("/audio", async (req, res) => {
  const videoId = req.query.v;

  try {
    await downloader(videoId);
    await createMP3();

    return res.send(videoId);
  } catch (error) {
    console.log(error);

    return res.send(error);
  }
});

app.listen(3333, () => console.log("server up"));
