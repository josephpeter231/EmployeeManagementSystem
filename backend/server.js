const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'employeemanagementsystem',
  password: 'root',
  port: 5432,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// GET all employees
app.get('/employees', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM employees');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST a new employee
app.post('/employees', async (req, res) => {
  try {
    const { name, dept, desig, dob, gender, salary } = req.body;
    const newEmployee = await pool.query(
      'INSERT INTO employees (name, dept, desig, dob, gender, salary) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, dept, desig, dob, gender, salary]
    );
    res.json(newEmployee.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.put('/leave-application/:id', async (req, res) => {
  try {
    const { leave_reason, leave_days } = req.body;
    const { id } = req.params;
    
    // Assuming 'approval' is a string type representing the status
    const updateLeaveQuery = `
      UPDATE employees 
      SET leave_reason = $1, leave_days = $2
      WHERE id = $3
    `;
    await pool.query(updateLeaveQuery, [leave_reason,leave_days, id]);

    res.status(200).send('Leave application updated successfully');
  } catch (err) {
    console.error('Error updating leave application:', err);
    res.status(500).send('Server Error');
  }
});

app.put('/leave-application/reduction/:id', async (req, res) => {
  try {
    const { leave_reason, leave_days,salary } = req.body;
    const { id } = req.params;
        
    // Assuming 'approval' is a string type representing the status
    const updateLeaveQuery = `
      UPDATE employees 
      SET leave_reason = $1, leave_days = $2,salary = $3
      WHERE id = $4
    `;
    await pool.query(updateLeaveQuery, [leave_reason,leave_days,salary, id]);

    res.status(200).send('Leave application updated successfully');
  } catch (err) {
    console.error('Error updating leave application:', err);
    res.status(500).send('Server Error');
  }
});
  


app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
