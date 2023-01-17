const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const { readdirSync } = require('fs')
const { uuid } = require('uuidv4');
const app = express()
const options = {
    origin: "http://localhost:3000",
    useSuccessStatus: 200
}

app.use(express.json())
app.use(cors(options))

app.use((req, res, next) => {
    // generate a new session ID
    const sessionId = uuid();

    // save the session ID to the request object
    req.sessionId = sessionId;

    // continue with the request
    next();
});

//routes
readdirSync('./routes').map((r) => app.use('/', require('./routes/' + r)))


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`server listening to port ${PORT}`)
})
