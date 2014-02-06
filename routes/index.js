
/*
 * GET home page.
 */

var models = require('../models/')

exports.index = function(req, res){
	var models = require('../models/')
	models.Page.find(function(err, docs){
		res.render('index', { pages: docs });
	})
};

exports.show = function(req, res){

	var url_name = req.params.url_name;

	models.Page.findOne({"url_name":url_name}, function(err, docs) {
		res.render('show', {"pages":docs});
	});
};

exports.add = function(req,res) {
  res.render('add');
};

exports.update = function(req,res) {
	var body = req.body.bodyUpdate;
	var url_name = req.body.url_nameUpdate;

	models.Page.update({"url_name": url_name}, {"body": body}, function (err, res) {
	})
	res.redirect('wiki/'+url_name);
}

exports.delete = function(req,res) {
	var url_name = req.body.url_nameDelete;

	models.Page.remove({"url_name": url_name}, function (err, res) {
	})
	res.redirect('/');
}

exports.add_page = function(req,res) {
  // STUDENT ASSIGNMENT:
  // add definitions of the `title`, `body` and `url_name` variables here
  var title = req.body.title;
  var body = req.body.body;

	var generateUrlName = function(name) {
	  if (typeof name != "undefined" && name !== "") {
	    // Removes all non-alphanumeric characteres from name
	    // And make spaces underscore
	    return name.replace(/[\s]/ig,"_").replace(/[^\w]/ig,"");
	  } else {
	    // Generates random 5 letter string
	    return Math.random().toString(36).substring(2,7);
	  }
	};

	var url_name = generateUrlName(title);

  var p = new models.Page({ "title": title, "body":body, "url_name": url_name});
  p.save();
  res.redirect('/');
};

