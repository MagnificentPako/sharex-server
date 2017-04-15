const express = require('express')
const multer = require('multer')
const randomstring = require('randomstring')
const mime = require('mime')
const fs = require('fs')

const config = require('./config.json')

const upload = multer()

const app = express()

app.get('/', (req, res) => {
  res.send(`
	<form action='/' method='post' enctype='multipart/form-data'>
		<input name="file" type="file">
		<input name="username" type="text">
		<input name="password" type="password">
		<input type="submit">
	</form>
	`)
})

app.post('/', upload.single('file'), (req, res) => {
	// res.send(JSON.stringify(req.body) + "\n" + JSON.stringify(req.file))

  let sent = false

  if (config.users[req.body.username] !== undefined) {
	  if (config.users[req.body.username] === req.body.password) {
    const name = randomstring.generate(6)
    const newpath = 'uploads/' + name + '.' + mime.extension(req.file.mimetype)
    fs.writeFile(newpath, req.file.buffer, (err) => {
      if (err) throw err
    })
    sent = true
    res.send(config.basePath + name)
  }
  }
  if (!sent) {
    res.send('GET OUT NOW')
  }
})

const options = {
  root: __dirname + '/uploads/',
  dotfiles: 'deny',
  headers: {
    'x-timestamp': Date.now(),
    'x-sent': true
  }
}

app.get('/:img', (req, res) => {
  fs.readdir('uploads', (err, files) => {
    files.forEach(file => {
      if (file.startsWith(req.params.img)) {
        res.sendFile(file, options, err => {
          if (err) throw err
        })
      }
    })
  })
})

app.listen(6969)
