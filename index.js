const express = require("express")
const multer = require("multer")
const randomstring = require("randomstring")
const mime = require("mime")
const fs = require("fs")

const config = require("config.json")

const upload = multer()

const app = express()

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
	//res.send(JSON.stringify(req.body) + "\n" + JSON.stringify(req.file))
	const newpath = "uploads/" + randomstring.generate(12) + "." + mime.extension(req.file.mimetype)
	fs.writeFile(newpath, eq.file.buffer, (err) => {
		if (err) throw err;
	})

	res.send(config.basePath + newpath);

})

app.listen(6969)
