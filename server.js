var express = require('express');
var app = new express();

var multer = require('multer'),
    bodyParser = require('body-parser'),
    path = require('path');

var upload = multer({ dest: './uploads/'});

var port = process.env.PORT || 8080;

app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', upload.single('uploadedFile'), function(req, res) {
	console.log(req);
	console.log(req.file);
	//res.status(204).end();

	var metadata = {
		original_name: req.file.originalname,
		type: req.file.mimetype,
		size: req.file.size
	};
	res.send(metadata);
});

app.listen(port, function() {
	console.log("Express listening on " + port);
});