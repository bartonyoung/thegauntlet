const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/routes.js');
const multiparty = require('connect-multiparty');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);


const app = express();
const multipartyMiddleware = multiparty();

app.use(require('express-session')({
  key: 'session',
  secret: 'SUPER SECRET SECRET',
  store: new MySQLStore({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'thegauntlet'
  })
})
);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(multipartyMiddleware);
app.use('/api', routes);

const port = process.env.PORT || 8000;
app.listen(port, function() {       
  console.log('Gauntlet server listening on port:', port);
});

