import pool from '../../lib/database/postgres';

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
    let visualScore = 0;
    if (task === 'SoulWall') {
      const correctIds = [1, 5, 9, 10, 11, 12, 13, 14, 16, 19]

      visualScore = correctIds.reduce(
        (acc, id) => acc + (visual.includes(id) ? 1 : 0),
        0
      );
      console.log('visual score sw', visualScore);
    } else {
      const correctIds = [1, 2, 3, 5, 6, 8, 10, 12, 15, 18]
      visualScore = correctIds.reduce(
        (acc, id) => acc + (visual.includes(id) ? 1 : 0),
        0
      );
      console.log('visual score ct', visualScore);
    }

    db.run(
      `INSERT INTO visualResponses (pid, ordr, task, selectedIds, score) VALUES (?, ?, ?, ?, ?)`,
      [pid, order, task, visual.join(', '), visualScore]
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

  if(table == 'spatialResponses') {
    let userAnswers = data;
    let correctAnswers = [];
    if (task == 'SoulWall') { 
       correctAnswers = ['t', 's', 'a', 'n', 'o', 'm', 'p', 'c', 'f', 'i', 'r', 'g', 'j', 'l', 'e', 'k', 'q', 'b', 'h', 'd'];
    } else {
      correctAnswers = ['i', 'j', 'm', 'a', 'b', 'e', 'f', 'o', 'r', 's', 'g', 'p', 'q', 'c', 'n', 'd', 'h', 'k', 't', 'l'];
    }

    let score = Object.entries(userAnswers).reduce((acc, [key, val]) => {
      return acc + (val.toLowerCase() === correctAnswers[+key - 1].toLowerCase() ? 1 : 0);
    }, 0);
    
    columns.push('score');
    values.push(score);

    console.log('spatial score', task, score);
  }

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