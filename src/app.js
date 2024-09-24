const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("Hello from dashboard");
});

app.get('/user', (req, res) => {
    res.send({first_name:"vraj jangid", last_name:"jangid"});
});

app.post("/user", (req, res) => {
    res.send("Data Added Successfully");
});
app.delete("/user", (req, res) => {
    res.send("Data Deleted Successfully");
});

app.listen(7000, () => {
    console.log("Server started on port 7000!");
});
