var express = require("express")
var multer = require("multer")

var upload = multer({ dest: "uploads/" })

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

app.post("/", upload.single("file"), (req, res) => {
	res.send(JSON.stringify(req.body) + "\n" + JSON.stringify(req.file))
})

app.listen(6969)
