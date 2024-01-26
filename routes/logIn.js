const express = require('express')
const router = express.Router()

router.get('/login', (req, res, next) => {
    // check login and redirect
    if(req.body.username) {
        console.log(req.body)
    }
    res.send('<form action="/store-login" method="POST"><input type="text" name="username"><button type="submit">Submit</button></form>')
})

router.post('/store-login', (req, res, next) => {
    console.log(req.body)
    res.send(`<script>localStorage.setItem('username', '${req.body.username}'); window.location.href = "/"</script>`)
})

module.exports = router