import ffmpegStatic from "ffmpeg-static";
import ffmpeg from "fluent-ffmpeg";

export const createMP3 = () =>
  new Promise((resolve, reject) => {
    // Tell fluent-ffmpeg where it can find FFmpeg
    ffmpeg.setFfmpegPath(ffmpegStatic);

    // Run FFmpeg
    ffmpeg()
      // Input file
      .input("audio.mp4")
      // Audio bit rate
      .outputOptions("-ab", "20k")
      // Output file
      .saveToFile("audio.mp3")
      // Log the percentage of work completed
      .on("progress", (progress) => {
        if (progress.percent) {
          console.log(
            `Processando: ${Math.floor(progress.percent)}% finalizado.`
          );
        }
      })
      // The callback that is run when FFmpeg is finished
      .on("end", () => {
        console.log("Áudio convertido com sucesso.");

        resolve();
      })
      // The callback that is run when FFmpeg encountered an error
      .on("error", (error) => {
        console.error(error);

        reject(error);
      });
  });
