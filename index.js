var express = require("express")
var app = express()

app.use(express.bodyParser())

app.get("/", (req, res) => {
	res.send(`
	<form action='/' method='post' enctype='multipart/formdata'>
		<input name="file" type="file">
		<input name="username" type="text">
		<input name="password" type="password">
		<input type="submit">
	</form>
	`)
})

app.post("/", (req, res) => {
	res.send(JSON.stringify(req.body))
})

app.listen(6969)
