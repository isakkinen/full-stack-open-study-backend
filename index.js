const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get("/", (request, response) => {
    response.send('<h1>Hello, World!</h1>')
})

app.get("/api/notes", (request, response) => {
    response.json(notes)
})

app.get("/api/notes/:id", (request, response) => {
    const note = notes.find(note => note.id === Number(request.params.id))
    if (!note) return response.status(404).end()
    response.json(note);
})

app.delete("/api/notes/:id", (request, response) => {
    notes = notes.filter(note => note.id !== Number(request.params.id))
    response.status(204).end()
})

app.post("/api/notes", (request, response) => {
    if (!request.body.content) return response.status(400).json({error: "content missing"})
    const note = {
        content: request.body.content,
        important: request.body.important || false,
        id: notes.length == 0 ? 1 : Math.max(...notes.map(note => note.id)) + 1
    }

    notes.push(note);

    console.log(note)
    response.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)

});