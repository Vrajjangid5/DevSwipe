const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("Hello from dashboard");
});

app.get('/about', (req, res) => {
    res.send("About page");
});

app.get("/test", (req, res) => {
    res.send("Test page");
});

app.listen(7000, () => {
    console.log("Server started on port 7000!");
});
