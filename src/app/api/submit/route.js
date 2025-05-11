import { NextResponse } from 'next/server'; 
import pool from '../../lib/db/postgres';
import { v4 as uuidv4 } from 'uuid';

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
  await pool.query(
    `INSERT INTO demoResponses (pid, age, sex, hand, vr) VALUES ($1, $2, $3, $4, $5)`,
    [pid, data.demoResponses.age, data.demoResponses.sex, data.demoResponses.hand, data.demoResponses.VRf]
  );

  // Insert SB responses
  await insertGenericResponses('sbResponses', 15, data.sbResponses, pid);

  responses.forEach(async ({ nasa, ssq, ueqs, textual, spatial, visual }) => {
    const task = nasa.task;

    // SSQ, UEQs, Textual
    await insertGenericResponses('ssqResponses', 16, ssq, pid, order, task);
    await insertGenericResponses('ueqsResponses', 8, ueqs, pid, order, task);
    await insertGenericResponses('textualResponses', 20, textual, pid, order, task);

    // NASA
    await pool.query(
      `INSERT INTO nasaResponses (pid, ordr, task, mentalDemand, physicalDemand, temporalDemand, performance, effort, frustration)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
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
    await pool.query(
      `INSERT INTO visualResponses (pid, ordr, task, selectedIds) VALUES ($1, $2, $3, $4)`,
      [pid, order, task, visual.join(', ')]
    );

    // Spatial
    await insertGenericResponses('spatialResponses', 20, spatial, pid, order, task, true);
  });

  return NextResponse.json({ message: 'Data saved successfully!' }, { status: 200 });
}

function generateKeys(count) {
  return Array.from({ length: count }, (_, i) => `q${i + 1}`);
}

async function insertGenericResponses(table, count, data, pid, order = null, task = null, numericKeys = false) {
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

  const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
  const sql = `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`;

  await pool.query(sql, values);
}

// TODO: 
//generatescore....