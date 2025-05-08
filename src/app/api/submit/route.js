// import pool from '../../lib/database/postgres';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(
  './responses.db',
  sqlite3.OPEN_READWRITE, // Only open if it exists
  (err) => {
    if (err) {
      console.error('Database does not exist or cannot be opened:', err.message);
      process.exit(1); // or handle it gracefully
    } else {
      console.log('Connected to existing database.');
    }
  }
);

// db.run(`CREATE TABLE IF NOT EXISTS demoResponses (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   age TEXT, 
//   sex TEXT,
//   hand TEXT,
//   vr TEXT
// )`);

// db.run(`CREATE TABLE IF NOT EXISTS sbResponses (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   q1 TEXT,
//   q2 TEXT,
//   q3 TEXT,
//   q4 TEXT,
//   q5 TEXT,
//   q6 TEXT,
//   q7 TEXT,
//   q8 TEXT,
//   q9 TEXT,
//   q10 TEXT,
//   q11 TEXT,
//   q12 TEXT,
//   q13 TEXT,
//   q14 TEXT,
//   q15 TEXT
// );`);

// db.run(`CREATE TABLE IF NOT EXISTS visualResponses (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   selectedIds TEXT
// );`);

// db.run(`CREATE TABLE IF NOT EXISTS spatialResponses (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   q1 TEXT,
//   q2 TEXT,
//   q3 TEXT,
//   q4 TEXT,
//   q5 TEXT,
//   q6 TEXT,
//   q7 TEXT,
//   q8 TEXT,
//   q9 TEXT,
//   q10 TEXT,
//   q11 TEXT,
//   q12 TEXT,
//   q13 TEXT,
//   q14 TEXT,
//   q15 TEXT,
//   q16 TEXT
// );`);



// db.run(`CREATE TABLE IF NOT EXISTS ueqsResponses (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   q1 TEXT,
//   q2 TEXT,
//   q3 TEXT,
//   q4 TEXT,
//   q5 TEXT,
//   q6 TEXT,
//   q7 TEXT,
//   q8 TEXT
// );`);

// db.run(`CREATE TABLE IF NOT EXISTS nasaResponses (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   mentalDemand TEXT,
//   physicalDemand TEXT,
//   temporalDemand TEXT,
//   performance TEXT,
//   effort TEXT,
//   frustration TEXT
// );`);


// db.run(`CREATE TABLE IF NOT EXISTS ssqResponses (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   q1 TEXT,
//   q2 TEXT,
//   q3 TEXT,
//   q4 TEXT,
//   q5 TEXT,
//   q6 TEXT,
//   q7 TEXT,
//   q8 TEXT,
//   q9 TEXT,
//   q10 TEXT,
//   q11 TEXT,
//   q12 TEXT,
//   q13 TEXT,
//   q14 TEXT,
//   q15 TEXT,
//   q16 TEXT
// );`);

// db.run(`CREATE TABLE IF NOT EXISTS spatialResponses (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   q1 TEXT,
//   q2 TEXT,
//   q3 TEXT,
//   q4 TEXT,
//   q5 TEXT,
//   q6 TEXT,
//   q7 TEXT,
//   q8 TEXT,
//   q9 TEXT,
//   q10 TEXT,
//   q11 TEXT,
//   q12 TEXT,
//   q13 TEXT,
//   q14 TEXT,
//   q15 TEXT,
//   q16 TEXT,
//   q17 TEXT,
//   q18 TEXT,
//   q19 TEXT,
//   q20 TEXT
// );`);


// Handle POST request
export async function POST(request) {
  const { data } = await request.json();

  {
    const keys = generateKeys(20);
    insertResponsesSpatial('spatialResponses', keys, data.spatialResponses);
  }

  {
    const keys = generateKeys(20);
    insertResponses('textualResponses', keys, data.textualResponses);
  }

  db.run(
    `INSERT INTO demoResponses (age, sex, hand, vr) VALUES (?, ?, ?, ?)`,
    [data.demoResponses.age, data.demoResponses.sex, data.demoResponses.hand, data.demoResponses.VRf]
  );

  {
    const keys = generateKeys(15);
    insertResponses('sbResponses', keys, data.sbResponses);
  }

  {
    const keys = generateKeys(16);
    insertResponses('ssqResponses', keys, data.ssqResponses);
  }

  {
    const keys = generateKeys(8);
    insertResponses('ueqsResponses', keys, data.ueqsResponses);
  }

  db.run(
    `INSERT INTO nasaResponses (mentalDemand, physicalDemand, temporalDemand, performance, effort, frustration) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data.nasaResponses.mentalDemand,
      data.nasaResponses.physicalDemand,
      data.nasaResponses.temporalDemand,
      data.nasaResponses.performance,
      data.nasaResponses.effort,
      data.nasaResponses.frustration
    ]
  );

  db.run(
    `INSERT INTO visualResponses (selectedIds) VALUES (?)`,
    [data.visualResponses.join(', ')],
  );
  
  return new Response(JSON.stringify({ message: 'Data saved!' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Helpers
function generateKeys(count) {
  return Array.from({ length: count }, (_, i) => `q${i + 1}`);
}

function insertResponsesSpatial(table, keys, data) {
  const placeholders = keys.map(() => '?').join(', ');
  const values = keys.map(k => data[k.slice(1)]); // 'q1' → '1'
  db.run(
    `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`,
    values
  );
}

function insertResponses(table, keys, data) {
  const placeholders = keys.map(() => '?').join(', ');
  const values = keys.map(k => data[k]);
  db.run(
    `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`,
    values
  );
}