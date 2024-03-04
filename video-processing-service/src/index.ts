import express from "express";
import ffmpeg from "fluent-ffmpeg";

const app = express();
app.use(express.json());

app.post("/process-video", (req, res) => {
    const inputVideoPath = req.body.inputVideoPath;
    const outputVideoPath = req.body.outputVideoPath;

    if (!inputVideoPath || !outputVideoPath){
        res.status(400).send('Bad Request: Missing File Path!')
    }

    ffmpeg(inputVideoPath)
    .outputOptions("-vf", "scale=-1:360") //360p
    .on("end", () => {
        res.status(200).send(`Video Processesing Completed`)
    })
    .on("error", (err) => {
        console.log(`An error occured ${err.message}`);
        res.status(500).send(`Internal Server error ${err.message}`);
    })
    .save(outputVideoPath);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(
        `Video processing service listening at http://localhost:${port}`
        );
});