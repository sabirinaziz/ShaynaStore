const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const app = express()

let server = require('http').Server(app);
//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')))

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
	res.sendFile(path.join(__dirname, '/dist/index.html'))
})

const port = process.env.PORT || 8080
server.listen(port, () => {
    console.log("App is running on port " + port);
});