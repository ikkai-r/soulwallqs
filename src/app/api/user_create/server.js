const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('./responses.db');

app.use(cors());
app.use(bodyParser.json());

// Create tables
const tables = [
    'demoResponses',
    'sbResponses',
    'ssqResponses',
    'visualResponses',
    'spatialResponses',
    'textualResponses',
    'ueqsResponses',
    'nasaResponses'
  ];
  
  tables.forEach(table => {
    db.run(`CREATE TABLE IF NOT EXISTS ${table} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT,
      value TEXT
    )`);
});

// POST endpoint to store all responses
app.post('/submit', (req, res) => {
    const { data } = req.body; 
    
    for (const table in data) {
      const responses = data[table];
      if (Array.isArray(responses)) {
        // for visualResponses
        responses.forEach((value, index) => {
          db.run(`INSERT INTO ${table} (key, value) VALUES (?, ?)`, 
            [`item${index + 1}`, value]); 
        });
      } else {
        // for object responses
        for (const key in responses) {
          db.run(`INSERT INTO ${table} (key, value) VALUES (?, ?)`, 
            [key, responses[key]]); 
        }
      }
    }
  
    res.json({ message: 'Data saved!' });
    console.log('Data saved:', data); // Log the data to the console
  });
  
  app.listen(3001, () => console.log('Server running on http://localhost:3001'));