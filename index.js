let express = require("express");
let bodyParser = require("body-parser");
let cron = require("node-cron");
let fs = require("fs");
let https = require('https');
let config = require("./config.json");
let mongoose = require("mongoose");
let cors = require("cors");


let app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
	{ extended: true }
));
let mongoDB = "mongodb://127.0.0.1:27017/comments";
mongoose.connect(mongoDB, { usemongoclient: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on("error", console.error.bind(console, 'MongoDB Connection Error: '));


let Schema = mongoose.Schema;

let CommentsSchema = new Schema({

	comments: String
});

let CommentsModel = mongoose.model('CommentsModel', CommentsSchema);

app.get("/showcomment", (req, res) => {
	console.log("News API got a hit");
	CommentsModel.find({}, (err, Comments) => {
		res.json(Comments);
		res.end();
	});
});

app.post("/addcomment", (req, res) => {
	// let comment = req.param("value");
	// comments.forEach(comment => {
	// 	let commentsInstance = new CommentsModel(comment);
	// 	commentsInstance.save((err) => {
	// 		if (err) {
	// 			throw err;
	// 		}
	// 	})
	// })
	console.log("API got hit")
	let commentValue = req.param("comments");
	let commentBy = req.param("commentBy");
	console.log("Comment By" + commentBy)
	//let commentValue = req.query.comment;
	console.log(commentValue);
	let commentInstance = new CommentsModel({comments: commentValue});
	console.log(commentInstance);
	commentInstance.save((err) => {
		if(err) {
			throw err;
		}
		res.end();
	});
})
app.listen(8080, () => {
    console.log('Server started at http://localhost:8080/');
});