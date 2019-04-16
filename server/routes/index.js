const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    msg: '测试'
  })
})

router.get('/nsp', function(req, res, next) {
  res.json({
    nsp: `mp-${new Date().getTime()}`
  })
})

module.exports = router
