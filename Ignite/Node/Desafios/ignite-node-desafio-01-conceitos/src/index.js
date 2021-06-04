const express = require("express");
const cors = require("cors");

const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const user = users.find((user) => user.username === username);

  if (!user)
    return response.status(404).send({
      error: "Mensagem do erro",
    });

  next();
  return true;
}

app.post("/users", (request, response) => {
  const { name, username } = request.body;

  const existingUser = users.find((user) => user.username === username);

  if (existingUser)
    return response.status(400).send({ error: "Username already taken" });

  const user = {
    id: uuidv4(),
    name,
    username,
    todos: [],
  };

  users.push(user);

  response.status(201).send(user);
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  const { username } = request.headers;

  const { todos } = users.find((user) => user.username === username);

  response.send(todos);
});

app.post("/todos", checksExistsUserAccount, (request, response) => {
  const { username } = request.headers;
  const { title, deadline } = request.body;

  const user = users.find((user) => user.username === username);

  const task = {
    id: uuidv4(),
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date(),
  };

  user.todos.push(task);

  response.status(201).send(task);
});

app.put("/todos/:id", checksExistsUserAccount, (request, response) => {
  const { username } = request.headers;
  const { title, deadline } = request.body;

  const { id } = request.params;

  const user = users.find((user) => user.username === username);

  const task = user.todos.find((task) => task.id === id);

  if (!task) return response.status(404).send({ error: "TODO not found" });

  task.title = title;
  task.deadline = new Date(deadline);

  response.status(200).send(task);
});

app.patch("/todos/:id/done", checksExistsUserAccount, (request, response) => {
  const { username } = request.headers;
  const { id } = request.params;

  const user = users.find((user) => user.username === username);

  const task = user.todos.find((task) => task.id === id);

  if (!task) return response.status(404).send({ error: "TODO not found" });

  task.done = true;

  response.send(task);
});

app.delete("/todos/:id", checksExistsUserAccount, (request, response) => {
  const { username } = request.headers;
  const { id } = request.params;

  const user = users.find((user) => user.username === username);

  const taskIndex = user.todos.findIndex((task) => task.id === id);

  if (taskIndex < 0)
    return response.status(404).send({ error: "TODO not found" });

  user.todos.splice(taskIndex, 1);

  response.status(204).send();
});

module.exports = app;
