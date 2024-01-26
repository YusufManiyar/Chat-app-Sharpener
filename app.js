const express = require('express')
const bodyParser = require('body-parser')
const logIn = require('./routes/logIn.js')
const message = require('./routes/message.js')
const fs = require('fs');
const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/', (req, res, next) => {
    res.send(`<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script>console.log(localStorage.getItem("username"));
    try {
    axios.post('/', { username: localStorage.getItem("username")})
  .then(response => {
    // Handle the response
    const data = response.data
    const scriptElement = document.createElement("script");scriptElement.textContent = data;document.head.appendChild(scriptElement)
  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error);
  });
}
catch(error) {
    console.log(error)
}</script>
`)
})

app.post('/', (req, res, next) => {
    console.log("user", req.body)
    if(!req.body.username) {
        res.send('window.location.href = "/login"')
    }
    else {
        let messages = fs.readFileSync(`messages.txt`, 'utf8')
        res.send(`const formHtmlString = '<form action="/add-message" method="POST"><input type="text" name="${req.body.username}"><button type="submit">Send</button></form>';

        // Create a temporary container element
        const container = document.createElement('div');
      
        // Create a <p> tag with other data
        const paragraphTag = document.createElement('p');
        paragraphTag.textContent = \`${messages}\`;
      
        // Append the <p> tag to the container
        container.appendChild(paragraphTag);
      
        // Create another <div> for the form tag
        const formContainer = document.createElement('div');
      
        // Set the form container's innerHTML to your form HTML string
        formContainer.innerHTML = formHtmlString;
      
        // Append the form container to the container
        container.appendChild(formContainer);
      
        // Append the container to the body
        document.body.appendChild(container);
      
      `)
    }
})


app.use(logIn)
app.use(message)
app.listen(4000)