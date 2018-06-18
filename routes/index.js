var express = require('express'),
	request = require('request'),
	http = require('http'),
	router = express.Router(),
  path = require('path'),
	aff = require('flipkart-affiliate');

var config =require('../config/config');

var fkc = aff.createClient({
  FkAffId: config.flipkart.id,
  FkAffToken: config.flipkart.token,
  responseType: 'json'
});

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title : 'Express'
	});
});
router.get('/home', function(req, res, next) {
	res.render('home', {
		title : 'Express'
	});
});
router.get('/about', function(req, res, next) {
	res.render('about', {
		title : 'Express'
	});
});
router.get('/service', function(req, res, next) {
	res.render('service', {
		title : 'Express'
	});
});
router.get('/contact', function(req, res, next) {
	res.render('contact', {
		title : 'Express'
	});
});

router.post('/store/search', function(req, res, next) {

	var store = req.body.store;
	if(store =='flipkart'){
		fkc.getDealsOfDay(null,function(error, response){
		  if(error){
				console.log('Error:', error);
				res.send({
					flag : false,
					data : error
				});
		  }else{
				res.send({
					flag : true,
					data : JSON.parse(response)
				});
		  }
		});
	}else {
		res.send({
			flag : false,
			store: 'none'
		});
	}

});

module.exports = router;
