const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./db/connection');

const UserEndPoint = require('./api/UserEndPoint');

const app = express();


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


connection.authenticate()
    .then(() => { console.log('MySQL has been connected') })
    .catch(error => console.log(error));


app.use("/api/user", UserEndPoint);


app.get("/", (req, res) => {
    res.status(200).json({ status: "Ok" });
});

app.listen(8080, () => {
    console.log("The server has been started");
});