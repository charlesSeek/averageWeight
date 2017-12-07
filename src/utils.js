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