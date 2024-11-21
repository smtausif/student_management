const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./db');
const Student = require('./models/student');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

sequelize.sync()
  .then(() => console.log('Database synced successfully'))
  .catch(err => console.error('Database sync failed:', err));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'form.html'));
});

app.post('/students', async (req, res) => {
  try {
    console.log(req.body);
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.map(err => err.message);
      res.status(400).json({ errors: validationErrors });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

app.get('/students', async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/students/:student_id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.student_id);
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/students/:student_id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.student_id);
    if (student) {
      await student.update(req.body);
      res.json(student);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.map(err => err.message);
      res.status(400).json({ errors: validationErrors });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

app.delete('/students/:student_id', async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.student_id);
    if (student) {
      await student.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
