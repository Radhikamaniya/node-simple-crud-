var express = require('express');  
var app = express(); 
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

//SCHEMA
var BookSchema = mongoose.Schema({
	  name: String,
	  price: Number,
	  quantity: Number
	}); 
var Book = mongoose.model('Book', BookSchema, "book"); //MODEL
	
app.post("/",function(req,res){	
	//INSERT	
	console.log(req.body)
	var book1 = new Book({
            name : req.body.name,
            price : req.body.price,
            quantity : req.body.quantity
        }); 
	book1.save(function (err, book) {
	      if (err) return console.error(err);
	      id=book._id;
	      console.log(book._id + " saved to books collection.");	      
	      res.status(200).send(book);
	      //res.send(book._id + " saved to books collection.")
    }); 
})

app.get("/",(req,res)=>{
//Get all
	Book.find(function (err, books) {
  		if (err) return console.error(err);
  		console.log(books);
  		res.send(books);
	})
});
app.get("/:id",(req,res)=>{
	//Get one req.params.id
	Book.findById({"_id":req.params.id}, function (err, book) 
	{
        if (err) return res.status(500).send(
        	"There was a problem finding.");
        if (!book) return res.status(404).send(
        	"No data found.");
        res.status(200).send(book);
    });
});

app.put("/:id",(req,res)=>{
//UPDATE  req.params.id, req.body
    Book.findOneAndUpdate({"_id":req.params.id}, req.body, 
    	{new: true}, function (err, book) {
        if (err) return res.status(500).send(
        	"There was a problem updating.");
        res.status(200).send(book);
    });
});

app.delete("/:id",(req,res)=>{
//DELETE req.params.id deleteOne() deleteMany() findOneAndRemove()
	Book.findOneAndRemove({"_id":req.params.id},
	 function (err, book) {
        if (err) return res.status(500).send(
        	"There was a problem deleting.");
        res.status(200).send("Book: "+ book.name 
        	+" was deleted.");
    });
});

app.listen(8001);
