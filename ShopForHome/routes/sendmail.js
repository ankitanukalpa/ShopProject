const express = require('express');
const router = express.Router();
const { sendMail} = require('../controllers/sendmail');

router.get('/sendmail', sendMail);

module.exports = router;