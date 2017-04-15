var express = require("express")
var multer = require("multer")
var randomstring = require("randomstring")
var mime = require("mime")

var upload = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, "/tmp/my-uploads")
	},
	filename: (req, file ,cb) => {
		cb(null, randomstring(8),".", mime.extension(file.mimetype))
	}
})

var app = express()

app.get("/", (req, res) => {
	res.send(`
	<form action='/' method='post' enctype='multipart/form-data'>
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
