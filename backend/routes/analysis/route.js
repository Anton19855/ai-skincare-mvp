const express = require('express')
const user_router = express.Router()
const { analyze } = require('../../controllers/analysis.controller')
const { getReport } = require('../../controllers/analysis.controller')
const upload = require('../../middlewares/upload')
const verify = require('../../middlewares/verifyUser')

user_router.post('/analyze', upload.single('image'),  analyze)
user_router.get('/report/:user_id', getReport)


module.exports = user_router