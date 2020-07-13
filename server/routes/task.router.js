const express = require('express');
const taskRouter = express.Router();
const pool = require('../modules/pool');

taskRouter.get('/', (req, res) => {
  // console.log('in GET');
  const queryText = `SELECT * FROM "list" ORDER BY "id" DESC;`;
  pool
    .query(queryText)
    .then((dbResponse) => {
      console.log(dbResponse);
      res.send(dbResponse.rows);
    })
    .catch((error) => {
      console.log('error in GET', error);
      res.sendStatus(500);
    });
});

taskRouter.post('/', (req, res) => {
  const taskData = req.body;
  const queryText = `INSERT INTO "list" ("task")
    VALUES($1);`;
  pool
    .query(queryText, [taskData.task])
    .then((dbResponse) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Error saving to database:', err);
      res.sendStatus(500);
    });
});

taskRouter.put('/:id', (req, res) => {
  const id = req.params.id;
  const queryText = `UPDATE "list" SET "task_completed"=$1 WHERE "id"=$2;`;
  pool
    .query(queryText, ['Y', id])
    .then((dbResponse) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('error', err);
      res.sendStatus(500);
    });
});

taskRouter.delete('/:id', (req, res) => {
  const id = req.params.id;
  const queryText = `DELETE FROM "list" WHERE "id"=$1;`;
  console.log(queryText);
  pool
    .query(queryText, [id])
    .then((dbResponse) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('error in DELETE', err);
      res.sendStatus(500);
    });
});

module.exports = taskRouter;
