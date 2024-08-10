import express from "express";
const app = express();
import bodyParser from "body-parser";
import axios  from "axios";
const port = 3000;



app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/",(req,res)=>{
    res.render("form.ejs");
})
app.post("/",async(req,res)=>{
    let book = req.body.book;
    console.log(book);
    console.log("going to fetch");
    let URL = "https://openlibrary.org/search.json?q=";

    let response = await axios.get(URL + book);
    console.log("fetching...");
    let data = response.data.docs[0];
    let author = response.data.docs[0].author_name;
    console.log(author);
    console.log(data.first_publish_year,data.first_sentence,data.number_of_pages,data.ebook_access,data.title,data.title_sort,data.title_suggest,data.ratings_average);

    res.render("index.ejs",{datas : data});
})




app.listen(port, ()=>{
    console.log(`server started at ${port}`)
});