const express = require('express')
const { getSessionId } = require('../controller/ManageSessionId')

const router = express.Router()

router.post('/sessionId', getSessionId)

module.exports = router