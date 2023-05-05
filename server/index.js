const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getCompliment } = require('./controller')

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", function(request, response) {
    response.send(fortunes[Math.floor(5 * Math.random())])
})
app.get("/api/steps", function(request, response) {
    response.send(steps)
})
app.post("/api/steps", function(request, response) {
    steps.push(request.body[0])
    response.send(steps)
})
app.put("/api/steps", function(request, response) {
    steps[request.body.index] = request.body.content
    response.send(steps)
})
app.delete("/api/steps/:index", function(request, response) {
    steps.splice(request.params.index, 1)
    response.send(steps)
})
let fortunes = ["Take the high road.", "Welcome change.", "Wish you happiness.", "You are working hard.", "You love challenge."]
let steps = []
app.listen(4000, () => console.log("Server running on 4000"));
