//expressを使うためのコード
const express = require('express');
const app = express();
app.use(express.static('public'));

//DBの接続
const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Takaki7979',
    database:'todo'
});

//formから送信された値を受け取れるようにする
app.use(express.urlencoded({extended: false}));

//DB接続確認
connection.connect((err) => {
    if(err){
        console.log('error connecting:' + err.stack);
        return;
    }
    console.log('success');
})

//top画面の表示
app.get('/', (req, res) => {
    res.render('top.ejs');
});

//index画面の表示
app.get('/index', (req, res) => {
    connection.query(
        'SELECT * FROM lists',
        (error, results) => {
            res.render('index.ejs', {lists: results});
        }
    );
});

//new画面の表示
app.get('/new', (req, res) => {
    res.render('new.ejs');
});

//new画面　データの追加
app.post('/create', (req, res) => {
    connection.query(
        'INSERT INTO lists(name) VALUES(?)',
        [req.body.listName],
        (error, results) => {
            connection.query(
                'SELECT * FROM lists',
                (error, results) => {
                    res.redirect('index');
                }
            );
        }
    );
});

//index画面　削除
app.post('/delete/:id', (req, res) => {
    connection.query(
        'DELETE FROM lists WHERE id = (?)',
        [req.params.id],
        (error, results) => {
            res.redirect('/index');
        }
    );
});

//edit画面　表示
app.get('/edit/:id', (req, res) => {
    connection.query(
      'SELECT * FROM lists WHERE id = (?)',
      [req.params.id],
      (error, results) => {
          res.render('edit.ejs', {list:results[0]});
      }  
    );
});

//DB更新
app.post('/update/:id', (req, res) => {
    connection.query(
        'UPDATE lists SET name = ? WHERE id = ?',
        [req.body.listName, req.params.id],
        (error, results) => {
            res.redirect('/index');
        }
    );
});
//サーバを起動
app.listen(3333);
