let express = require('express')
let mongoose = require('mongoose');
var cookieSession = require('cookie-session')
const cors = require('cors')

const AccountRouter = require('./routes/account')
const ApiRouter = require('./routes/api')

let app = express();
var port = 3001;

const dbPath = 'mongodb://localhost/firstrest';
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath, options);
mongo.then(() => {
    console.log('connected');
}, error => {
    console.log(error, 'error');
})

app.use(cookieSession({
    name: 'session',
    keys: ['secretkey'],
    maxAge: 24*60*60*1000
}))

app.use(express.json())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.get('/', (req, res) => res.send(`Welcome ${req.session.username}`));
app.use('/account', AccountRouter)
app.use('/api', ApiRouter)

app.listen(port, function() {
    console.log("Running FirstRest on Port "+ port);
})
