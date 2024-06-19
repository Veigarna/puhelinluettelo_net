const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");

app.use(cors());

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

function isNameTaken(name) {
  return persons.some((person) => person.name === name);
}

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  let text = `Phonebook has info for ${persons.length}`;
  let infoText = "<p>" + text + "</p>" + "<p>" + new Date() + "</p>";

  console.log(infoText);
  console.log(persons);
  console.log(new Date());
  response.send(infoText);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  console.log(person);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  console.log("Delete");
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log(body);
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  let newId = Math.floor(Math.random() * 1000);
  console.log(newId);
  const newPerson = {
    name: body.name,
    number: body.number,
    id: newId,
  };

  const nameExists = isNameTaken(newPerson.name);

  if (nameExists) {
    return response.status(400).json({
      error: "Name aready used",
    });
  }

  persons = persons.concat(newPerson);

  response.json(newPerson);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
