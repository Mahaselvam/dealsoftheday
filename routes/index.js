var express = require('express'),
	request = require('request'),
	http = require('http'),
	router = express.Router(),
  path = require('path'),
	aff = require('flipkart-affiliate'),
	_ = require('lodash');

var config =require('../config/config');

var fkc = aff.createClient({
  FkAffId: config.flipkart.id,
  FkAffToken: config.flipkart.token,
  responseType: 'json'
});

/* GET home page. */
router.get('/', function(req, res, next) {
	fkc.getCategoryFeed({
		trackingId: config.flipkart.id
	}, function(err, result){
			if(err){
				console.log(err);
				res.render('index', {
					title : 'Express',
					categoryFlag : false
				});
			}else {
				result = JSON.parse(result)

				var apiListings = result.apiGroups.affiliate.apiListings;
				var categoryList = Object.keys(apiListings);
				var categoryObject = [];
				for(var i=0;i<categoryList.length;i++){
					var tempObject = {};
					var categoryName = categoryList[i];
					var url = apiListings[categoryName].availableVariants['v1.1.0'].get;
					tempObject.category = categoryList[i];
					var tempCategory = categoryList[i].replace("_"," ");
					tempObject.categoryName = tempCategory.charAt(0).toUpperCase() + tempCategory.slice(1);;
					tempObject.url = url;
					categoryObject.push(tempObject);
				}
				res.render('index', {
					title : 'Express',
					categoryFlag : true,
					categoryList : categoryObject
				});
			}
	});
	/*res.render('index', {
		title : 'Express'
	});*/
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
	var action = req.body.action;
	var flag = req.body.flag;
	if(store =='Flipkart'){
		if(flag =='deals'){
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
		}else if(flag =='offers'){
			fkc.getAllOffers(null,function(error, response){
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
		}else if(flag =='keyword'){
			console.log(req.body.keyword);
			fkc.keywordSearch({
		    query: "gumber", //search String
		    resultCount: "10" //no of products in result
		  }, function(err, results){
		    if(err){
					console.log('Error:', err);
					res.send({
						flag : false,
						data : err
					});
		    } else{
					res.send({
						flag : true,
						data : JSON.parse(results)
					});
		    }
		});
		}
	}else {
		res.send({
			flag : false,
			store: 'none'
		});
	}

});

router.post('/fk/search/category', function(req, res, next) {
	fkc.getProductsFeed({
	  url: req.body.url
	}, function(error, response){
		if(error){
			console.log('Error:', error);
			res.send({
				flag : false,
				data : error
			});
		}else{
			res.send({
				flag : true,
				response : JSON.parse(response)
			});
		}
	});
});

module.exports = router;
