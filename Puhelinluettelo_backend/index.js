require("dotenv").config();
const express = require("express");
const app = express();
const Person = require("./models/personMongo");
app.use(express.json());

const cors = require("cors");
app.use(cors());

//sov render
app.use(express.static("dist"));

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

//all
app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => next(error));
});

//info
app.get("/info", (request, response) => {
  let text = `Phonebook has info for ${persons.length}`;
  let infoText = "<p>" + text + "</p>" + "<p>" + new Date() + "</p>";

  console.log(infoText);
  console.log(persons);
  console.log(new Date());
  response.send(infoText);
});

//person by id
app.get("/api/notes/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((returnedPerson) => {
      if (returnedPerson) {
        response.json(returnedPerson);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

//delete person
app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

//add new person
app.post("/api/persons", (request, response, next) => {
  const body = request.body;
  console.log("Post body", body);

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({ error: "content missing", body });
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  console.log(newPerson);

  newPerson
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

// tämä tulee kaikkien muiden middlewarejen ja routejen rekisteröinnin jälkeen!
app.use(errorHandler);

//app use port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/*let persons = [
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
];*/
