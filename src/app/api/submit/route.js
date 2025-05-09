// import pool from '../../lib/database/postgres';
import sqlite3 from 'sqlite3';
import { v4 as uuidv4 } from 'uuid';

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

// Creating db
// const db = new sqlite3.Database('./responses.db');

// db.run(`CREATE TABLE IF NOT EXISTS demoResponses (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   pid TEXT,
//   age TEXT, 
//   sex TEXT,
//   hand TEXT,
//   vr TEXT
// )`);

// db.run(`CREATE TABLE IF NOT EXISTS sbResponses (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   pid TEXT,
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
//   pid TEXT,
//   ordr TEXT,
//   task TEXT,
//   selectedIds TEXT
// );`);

// db.run(`CREATE TABLE IF NOT EXISTS spatialResponses (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   pid TEXT,
//   ordr TEXT,
//   task TEXT,
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
//   pid TEXT,
//   ordr TEXT,
//   task TEXT,
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
//   pid TEXT,
//   ordr TEXT,
//   task TEXT,
//   mentalDemand TEXT,
//   physicalDemand TEXT,
//   temporalDemand TEXT,
//   performance TEXT,
//   effort TEXT,
//   frustration TEXT
// );`);


// db.run(`CREATE TABLE IF NOT EXISTS ssqResponses (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   pid TEXT,
//   ordr TEXT,
//   task TEXT,
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
//   pid TEXT,
//   ordr TEXT,
//   task TEXT,
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

// db.run(`CREATE TABLE IF NOT EXISTS textualResponses (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   pid TEXT,
//   ordr TEXT,
//   task TEXT,
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

  const pid = uuidv4();
  const order = data.nasaResponses.task =='SoulWall' ? 1 : 0;  //1 for SoulWall first, 0 for Map

  const responses = [
    {
      nasa: data.nasaResponses,
      ssq: data.ssqResponses,
      ueqs: data.ueqsResponses,
      textual: data.textualResponses,
      spatial: data.spatialResponses,
      visual: data.visualResponses,
    },
    {
      nasa: data.nasaResponses2,
      ssq: data.ssqResponses2,
      ueqs: data.ueqsResponses2,
      textual: data.textualResponses2,
      spatial: data.spatialResponses2,
      visual: data.visualResponses2,
    }
  ];

  // Insert demographic responses
  db.run(
    `INSERT INTO demoResponses (pid, age, sex, hand, vr) VALUES (?, ?, ?, ?, ?)`,
    [pid, data.demoResponses.age, data.demoResponses.sex, data.demoResponses.hand, data.demoResponses.VRf]
  );

  // Insert SB responses
  insertGenericResponses('sbResponses', 15, data.sbResponses, pid);

  responses.forEach(({ nasa, ssq, ueqs, textual, spatial, visual }) => {
    const task = nasa.task;

    // SSQ, UEQs, Textual
    insertGenericResponses('ssqResponses', 16, ssq, pid, order, task);
    insertGenericResponses('ueqsResponses', 8, ueqs, pid, order, task);
    insertGenericResponses('textualResponses', 20, textual, pid, order, task);

    // NASA
    db.run(
      `INSERT INTO nasaResponses (pid, ordr, task, mentalDemand, physicalDemand, temporalDemand, performance, effort, frustration)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        pid,
        order,
        task,
        nasa.mentalDemand,
        nasa.physicalDemand,
        nasa.temporalDemand,
        nasa.performance,
        nasa.effort,
        nasa.frustration
      ]
    );

    // Visual
    db.run(
      `INSERT INTO visualResponses (pid, ordr, task, selectedIds) VALUES (?, ?, ?, ?)`,
      [pid, order, task, visual.join(', ')]
    );

    // Spatial
    insertGenericResponses('spatialResponses', 20, spatial, pid, order, task, true);
  });

  return new Response(JSON.stringify({ message: 'Data saved!' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

function generateKeys(count) {
  return Array.from({ length: count }, (_, i) => `q${i + 1}`);
}

function insertGenericResponses(table, count, data, pid, order = null, task = null, numericKeys = false) {
  const keys = generateKeys(count);
  const values = [];
  
  // Always include pid
  const columns = ['pid'];
  values.push(pid);

  // Conditionally include 'ordr' and 'selectedTask'
  if (order !== null && task !== null) {
    columns.push('ordr', 'task');
    values.push(order, task);
  }

  // if (score !== null) {
  //   columns.push('score');
  //   values.push(score);
  // }

  // Add response values
  keys.forEach(k => {
    const key = numericKeys ? k.slice(1) : k;
    columns.push(k);
    values.push(data[key]);
  });

  const placeholders = columns.map(() => '?').join(', ');
  const sql = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;

  db.run(sql, values);
}

// TODO: 
//generatescore....