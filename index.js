import express from "express";
import axios from "axios";

const port = 3000;
const app = express();

const API_URL = "https://bhagavadgitaapi.in/slok";

app.use(express.static("public"))

function gitaslokid() {
    const slokcount = [47, 72, 43, 42, 29, 47, 30, 28, 34, 42, 55, 20, 35, 27, 20, 24, 28, 78];
    const chapter = Math.floor(Math.random() * 17) + 1;
    const slok = Math.floor(Math.random() * slokcount[chapter - 1]) + 1;
    return `${chapter}/${slok}/`;
}

app.get("/", async (req, res)=>{
    try {
      const result = await axios.get("https://bhagavadgitaapi.in/slok/"+gitaslokid())
      res.render("index.ejs", {
        chapter: result.data.chapter,
        verse: result.data.verse,
        slok: result.data.slok,
        meaning: result.data.siva.et
      });
    //   console.log(result)
    } catch (error) {
        console.log(error);
    }
})
app.listen(port, ()=>{
    console.log("Listening...")
})