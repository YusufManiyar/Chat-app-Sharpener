const express = require('express')
const router = express.Router()
const fs = require('fs');

router.post('/add-message', (req, res, next) => {
    // check login and redirect
    const name = Object.keys(req.body)[0]
    const value = Object.values(req.body)[0]

    const message = `${name} : ${value}\n`
    fs.appendFile('messages.txt', message, (err) => {
        if (err) {
          console.error('Error writing to file:', err);
        } else {
          console.log('Text added to file successfully!');
        }
      });
      
    res.send('<script>window.location.href = "/"</script>')
})

router.post('/store-login', (req, res, next) => {
    console.log(req.body)
    res.send(`<script>localStorage.setItem('username', '${req.body.username}'); window.location.href = "/"</script>`)
})

module.exports = router