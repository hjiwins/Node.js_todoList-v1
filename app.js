const express = require("express");

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");

let toDoItems = [];
let workItems = [];

app.get("/", (req, res) => {
    const today = new Date();
    const dateFormat = {
        weekday:"long",
        day: "numeric",
        month: "long"
    }
    const day = today.toLocaleDateString("en-US", dateFormat);

    res.render("list", {
        listTitle: day,
        newItems: toDoItems
    });
});


app.post("/", (req, res) => {
    let item = req.body.newItem;
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work")
    } else {
        toDoItems.push(item);
        res.redirect("/");
    }
})

app.get("/work", (req, res)=>{
    res.render("list", {
        listTitle: "Work List",
        newItems: workItems
    })
})

app.get("/about", (req, res)=> {
    res.render("about");
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
