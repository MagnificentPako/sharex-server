var express = require("express")
var app = express()

app.get("/", (req, res) => {
	res.send(`
	<form method='post' enctype='multipart/formdata'>
		<input name="file" type="file">
		<input name="username" type="text">
		<input name="password" type="password">
		<input type="submit">
	</form>
	`)
})

app.post("/", (req, res) => {
	res.send("Hai")
})

app.listen(6969)
