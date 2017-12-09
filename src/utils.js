let allProducts = [];
const url = 'http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com'
const axios = require('axios');


/**
 * get all productions by category
 * @param  {String} category    production category
 * @param  {Array}  productions initial production array
 * @return {Array}             get matched category production
 */
module.exports.getProductionByCategory = function(category="none",productions=[]){
	return productions.filter(item=>{
		return item.category === category;
	})
}

/**
 * productions validation check
 * @param  {Array} productions initial productions
 * @return {Array}             valided productions array
 */
module.exports.filterProductionsByValidation = function(productions){
	return productions.filter(product=>{
		return typeof product === 'object'
			&& typeof product.category === 'string'
			&& typeof product.weight === 'number' && product.weight >=0
			&& typeof product.size === 'object' 
			&& typeof product.size.length === 'number' && product.size.length >=0
			&& typeof product.size.height === 'number' && product.size.height >=0
			&& typeof product.size.width === 'number' && product.size.width >=0
	})
}

/**
 * iterative access APIs to get all products
 * @param  {String}   uri API URI
 * @param  {Function} cb  callback function
 * @return {Function}       callback function
 */
module.exports.getAllProducts = function(uri,cb){
	iterativeGet(uri,(err,products)=>{
		if (err){
			return cb(err);
		}
		return cb(null,products);
	})
}
function iterativeGet(uri,callback){
	const apiUrl = url + uri;
	axios.get(apiUrl)
	.then(res=>{
		const objects = res.data.objects||[];
		const next = res.data.next;
		allProducts = allProducts.concat(objects);
		if (!next){
			return callback(null,allProducts);
		}else {
			iterativeGet(next,callback)
		}
	})
	.catch(err=>{
		return callback(err);
	})
}