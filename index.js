var express = require("express")
var app = express()

app.get("/", (req, res) => {
	res.send(`
	<form method='post' enctype='multipart/formdata'>
		<input name="file" type="file">
	</form>
	`)
})

app.post("/", (req, res) => {
	res.send("Hai")
})

app.listen(6969)
