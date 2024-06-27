const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const md5 = require('md5');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bank'
})


app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('images'));
app.use(bodyParser.json());

connection.connect();

const checkUserIsLogged = (user, res) => {
  if (user) {
    return true;
  } else {
    res.status(401).json({ message: 'Not logged in' });
  }
}

// files

const writeImage = imageBase64 => {
  if (!imageBase64) {
    return null;
  }
  let type;
  let image;
  if (imageBase64) {
    if (imageBase64.indexOf('data:image\/png;base64,') === 0) {
      type = 'png';
      image = Buffer.from(imageBase64.replace(/^data:image\/png;base64,/, ''), 'base64');
    } else if (imageBase64.indexOf('data:image\/jpeg;base64,') === 0) {
      type = 'jpg';
      image = Buffer.from(imageBase64.replace(/^data:image\/jpeg;base64,/, ''), 'base64');
    } else {
      res.status(500).send('Unaccepted file type');
      return;
    }

    const filename = md5(uuidv4()) + '.' + type;
    fs.writeFileSync('images/accounts/' + filename, image);
    return filename;

  }
};


const deleteImage = accountId => {
  let sql = 'SELECT image FROM accounts where id = ?';
  connection.query(sql, [accountId], (err, results) => {
    if (err) {
      res.status
    } else {
      if (results[0].image) {
        fs.unlinkSync('images/accounts/' + results[0].image.split('/').pop());
      }
    }
  });
};


app.get('/home', (req, res) => {
  const sql = `
  SELECT 
      (SELECT COUNT(*) FROM accounts) AS allAccounts,
      (SELECT SUM(sum) FROM accounts) AS allSum,
      (SELECT COUNT(*) FROM accounts WHERE sum = '0') AS countEmpty,
      (SELECT COUNT(*) FROM accounts WHERE sum > '0') AS countPositive,
      (SELECT COUNT(*) FROM accounts WHERE sum < '0') AS countNegative,
      (SELECT COUNT(*) FROM accounts WHERE image IS NULL) AS countNoImage
  `;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const responseData = {
        allAccounts: results[0].allAccounts,
        allSum: results[0].allSum,
        countEmpty: results[0].countEmpty,
        countPositive: results[0].countPositive,
        countNegative: results[0].countNegative,
        countNoImage: results[0].countNoImage
      }
      res.json(responseData);
    }
  });
});

const doAuth = (req, res, next) => {
  const token = req.query.token || req.body.token || '';
  if (token === '') {
    return next();
  }

  const sql = `
    SELECT users.username, users.id, users.role
    FROM sessions
    LEFT JOIN users ON sessions.user_id = users.id
    WHERE sessions.id = ? AND sessions.time > ?
  `;
  const time = Date.now() - 1000 * 60 * 60 * 24;
  connection.query(sql, [token, time], (err, results) => {
    if (err) {
      res.status(500);
    } else {
      if (results.length > 0) {
        const user = results[0];
        req.user = user;
      }
    }
    return next();
  });
};

app.use(doAuth);

app.get('/accounts', (req, res) => {

  if (!checkUserIsLogged(req.user, res)) {
    return;
  }

  const sort = req.query.sort || 'pradinis';
  const filter = req.query.filter || 'visos';
  let sql = `SELECT * FROM accounts`;

  if (filter !== 'visos') {
    if (filter === 'blokuotos') {
      sql += ` WHERE status = 'blocked'`;
    } else if (filter === 'neblokuotos') {
      sql += ` WHERE status = 'unblocked'`;
    } else if (filter === 'tuscios') {
      sql += ` WHERE sum = 0`;
    } else if (filter === 'likutis teigiamas') {
      sql += ` WHERE sum > 0`;
    } else if (filter === 'likutis neigiamas') {
      sql += ` WHERE sum < 0`;
    }
  };

  if (sort !== 'pradinis') {
    if (sort === 'pavarde a-z') {
      sql += ` ORDER BY lastName ASC`;
    } else if (sort === 'pavarde z-a') {
      sql += ` ORDER BY lastName DESC`;
    } else if (sort === 'suma did') {
      sql += ` ORDER BY sum ASC`;
    } else if (sort === 'suma maz') {
      sql += ` ORDER BY sum DESC`;
    }
  };

  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500);
    } else {
      res.json(results);
    }
  });
});

app.post('/accounts', (req, res) => {

  const filename = writeImage(req.body.image);

  const { name, lastName, account, sum, status } = req.body;
  const sql = 'INSERT INTO accounts (name, lastName, account, sum, status, image) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(sql, [name, lastName, account, sum, status, filename !== null ? ('http://localhost:3001/accounts/' + filename) : null], (err, result) => {
    if (err) {
      res.status(500);
    } else {
      res.json({
        success: true,
        id: result.insertId,
        uuidv4: req.body.id,
        image: filename !== null ? ('http://localhost:3001/accounts/' + filename) : null,
        message: { type: 'success', text: 'Sąskaita sėkmingai sukurta.' }
      });
    }
  });
});

app.put('/accounts', (req, res) => {

  if (req.body.del) {
    deleteImage(req.body.id)
  }
  const filename = writeImage(req.body.image);
  const { name, lastName, sum, status, id } = req.body;
  let sql;
  let params;
  if (req.body.tax) {
    sql = 'UPDATE accounts SET sum = sum - 5';
  } else if (req.body.del || filename !== null) {
    sql = 'UPDATE accounts SET name = ?, lastName = ?, sum = ?, status = ?, image = ? WHERE id = ?';
    params = [name, lastName, sum, status, filename !== null ? ('http://localhost:3001/accounts/' + filename) : null, id];
  } else {
    sql = 'UPDATE accounts SET name = ?, lastName = ?, sum = ?, status = ? WHERE id = ?';
    params = [name, lastName, sum, status, id];
  }

  connection.query(sql, params, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({
        success: true,
        id,
        message: { type: 'casual', text: 'Pakeitimai išsaugoti.' }
      });
    }
  });
});


app.delete('/accounts/:id', (req, res) => {

  deleteImage(req.params.id);

  sql = 'DELETE FROM accounts WHERE id = ?';
  connection.query(sql, [req.params.id], (err) => {
    if (err) {
      res.status(500);
    } else {
      res.json({
        success: true,
        id: +req.params.id,
        message: { type: 'danger', text: 'Sąskaita ištrinta.' }
      });
    }
  });
});


app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  connection.query(sql, [username, md5(password)], (err, results) => {
    if (err) {
      res.status(500);
    } else {
      if (results.length > 0) {
        const token = md5(uuidv4());
        const sql = 'INSERT INTO sessions (id, user_id, time) VALUES (?, ?, ?)';
        connection.query(sql, [token, results[0].id, Date.now()], (err) => {
          if (err) {
            res.status(500);
          } else {
            res.json({ success: true, token, username: results[0].username })
          }
        });
      } else {
        res.status(401).json({ message: 'Wrong username or password' });
      }
    }
  });
});



app.listen(port, () => {
  console.log(`Bankas klauso ${port} porto.`);
});