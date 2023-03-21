const express = require('express');
const app = express();

let contacts = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
];

app.get('/', (request, response) => {
  response.send('<h1>Home Page</h1>');
});

app.get('/api/persons', (request, response) => {
  response.json(contacts);
});

app.post('/api/persons', (request, response) => {
  const id = Math.floor(Math.random() * 1000);
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    });
  }

  const contact = {
    content: body.content,
    important: body.important || false,
    id: id,
  }

  contacts = notes.concat(contact);

  response.json(contact);
});

app.get('/api/persons/:id', (request, response) => {
  const id = +(request.params.id);
  response.json(contacts.find(contact => contact.id === id));
});

app.delete('/api/persons/:id', (request, response) => {
  const id = +(request.params.id);
  contacts = contacts.filter(contact => contact.id !== id);

  response.status(204).end();
});

app.get('/info', (request, response) => {
  response.send(`
    <p>Phonebook has info for ${contacts.length} people</p>
    <p>${Date()}</p>
  `);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
