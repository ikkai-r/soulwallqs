import { NextResponse } from 'next/server'; 
import pool from '../../lib/db/postgres';
import { v4 as uuidv4 } from 'uuid';

// Handle POST request
export async function POST(request) {
  const { data } = await request.json();

  const pid = uuidv4();
  const order = data.nasaResponses.task == 'SoulWall' ? 1 : 0;  //1 for SoulWall first, 0 for Map

  const responses = [
    {
      nasa: data.nasaResponses,
      ssq: data.ssqResponses,
      ueqs: data.ueqsResponses,
      textual: data.textualResponses,
      spatial: data.spatialResponses,
      visual: data.visualResponses,
    }
  ];


  console.log(data.visualResponses);
  console.log(data.spatialResponses);
  console.log(data.textualResponses);

  // Insert demographic responses
  await pool.query(
    `INSERT INTO demoresponses (pid, age, sex, hand, vr) VALUES ($1, $2, $3, $4, $5)`,
    [pid, data.demoResponses.age, data.demoResponses.sex, data.demoResponses.hand, data.demoResponses.VRf]
  );

  // Insert SB responses
  await insertGenericResponses('sbresponses', 15, data.sbResponses, pid);


  responses.forEach(async ({ nasa, ssq, ueqs, textual, spatial, visual }) => {
    const task = nasa.task;

    // SSQ, UEQs, Textual
    await insertGenericResponses('ssqresponses', 16, ssq, pid, order, task);
    await insertGenericResponses('ueqsresponses', 8, ueqs, pid, order, task);
    await insertGenericResponses('textualresponses', 20, textual, pid, order, task);

    // NASA
    await pool.query(
      `INSERT INTO nasaresponses (pid, ordr, task, mentalDemand, physicalDemand, temporalDemand, performance, effort, frustration)
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
        nasa.frustration,
      ]
    );

    // Visual
    let visualScore = 0;
    let visualPt = 0;
    if (task === 'SoulWall') {
      const correctIds = [1, 5, 9, 10, 11, 12, 13, 14, 16, 19]

      visualScore = correctIds.reduce(
        (acc, id) => acc + (visual.selectedIds.includes(id) ? 1 : 0),
        0
      );
      console.log('visual score sw', visualScore);
    } else {
      const correctIds = [1, 2, 3, 5, 6, 8, 10, 12, 15, 18]
      visualScore = correctIds.reduce(
        (acc, id) => acc + (visual.selectedIds.includes(id) ? 1 : 0),
        0
      );
      console.log('visual score ct', visualScore);
    }

    visualPt = visualScore / 10;
    await pool.query(
      `INSERT INTO visualresponses (pid, ordr, task, selectedIds, score, pt, timesecs) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [pid, order, task, visual.selectedIds.join(', '), visualScore, visualPt, visual.timesecs]
    );
   
    // Spatial
    await insertGenericResponses('spatialresponses', 20, spatial, pid, order, task, true);
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

  if(table == 'spatialresponses') {
    let userAnswers = data;
    let correctAnswers = [];
    if (task == 'SoulWall') { 
       correctAnswers = ['t', 's', 'a', 'n', 'o', 'm', 'p', 'c', 'f', 'i', 'r', 'g', 'j', 'l', 'e', 'k', 'q', 'b', 'h', 'd'];
    } else {
      correctAnswers = ['i', 'j', 'm', 'a', 'b', 'e', 'f', 'o', 'r', 's', 'g', 'p', 'q', 'c', 'n', 'd', 'h', 'k', 't', 'l'];
    }

   let score = Object.entries(userAnswers)
      .slice(0, 20)
      .reduce((acc, [key, val]) => {
          const userAnswer = (val ?? '').toString().toLowerCase();
          const correctAnswer = (correctAnswers[+key - 1] ?? '').toLowerCase();
          return acc + (userAnswer === correctAnswer ? 1 : 0);
      }, 0);
    let spatialPt = score / 20;
    
    columns.push('score', 'pt', 'timesecs');
    values.push(score, spatialPt, data.timesecs);
    console.log('spatialtime', data.timesecs);

    console.log('spatial score', task, score);
  } else if (table == 'ueqsresponses') {
    const pragmaticMean = calculateMeanRange(data, 1, 4);
    const hedonicMean = calculateMeanRange(data, 5, 8); 

    columns.push('pMean', 'hMean');
    values.push(pragmaticMean, hedonicMean);

    console.log('Pragmatic Quality Mean:', pragmaticMean.toFixed(2));
    console.log('Hedonic Quality Mean:', hedonicMean.toFixed(2));
  } else if (table == 'sbresponses') {
      const sbMean = calculateMeanRange(data, 1, 15);
      let sbCategory = "Poor"

      if (sbMean > 4) {
        sbCategory = "Good"
      }

    columns.push('mean', 'category');
    values.push(sbMean, sbCategory);

    console.log('SB Mean:', sbMean.toFixed(2));
  }  else if (table == 'ssqresponses') {
      const ssqWeights = {
        nausea: ['q1', 'q2', 'q6', 'q7', 'q8', 'q9', 'q15', 'q16', 'q10'],
        oculomotor: ['q1', 'q2', 'q3', 'q4', 'q5', 'q9', 'q11'],
        disorientation: ['q5', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12', 'q13', 'q14']
      };

      const valueToNumber = (value) => {
        const mapping = {
          'None': 0,
          'Slight': 1,
          'Moderate': 2,
          'Severe': 3
        };

        return mapping[value] || 0; // default to 0 if value is not recognized
      };

      const toNumber = (key) => valueToNumber(data[key]);
      
      const nauseaSum = ssqWeights.nausea.reduce((sum, key) => sum + toNumber(key), 0);
      const oculomotorSum = ssqWeights.oculomotor.reduce((sum, key) => sum + toNumber(key), 0);
      const disorientationSum = ssqWeights.disorientation.reduce((sum, key) => sum + toNumber(key), 0);
      const totalSum = Object.keys(data).reduce((sum, key) => sum + toNumber(key), 0);

      const nauseaScore =  (nauseaSum) * 9.54;
      const oculomotorScore =  (oculomotorSum) * 7.58;
      const disorientationScore =  (disorientationSum) * 13.92;
      const totalScore =  (totalSum) * 3.74;
          
      columns.push('nscore', 'oscore', 'dscore', 'totalscore');
      values.push(nauseaScore, oculomotorScore, disorientationScore, totalScore);
  } else if (table == 'textualresponses') {

      columns.push('timesecs');
      values.push(data.timesecs);
          console.log('textualtime', data.timesecs);

  }


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

function calculateMeanRange(responses, start, end) {
  let total = 0;
  let count = 0;

  for (let i = start; i <= end; i++) {
    const key = `q${i}`;
    if (responses[key] !== undefined) {
      total += Number(responses[key]);
      count++;
    }
  }

  return count > 0 ? total / count : 0;
}