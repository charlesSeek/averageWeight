class Production {
	/**
	 * Production contructor
	 * @param  {String} options.category production category
	 * @param  {String} options.title    production title
	 * @param  {Number} options.weight   production weight factor
	 * @param  {Object} options.size     production size object, contains height,weight and length
	 * @return {Object}                  production object
	 */
	constructor({category='none',title='none',weight=0,size={}}){
		this.category = category;
		this.title =  title;
		this.weight = weight;
		this.size = size;
	}
	/**
	 * category getter method
	 * @return {String} production category
	 */
	getCategory(){
		return this.category;
	}
	/**
	 * title getter method
	 * @return {String} production title
	 */
	getTitle(){
		return this.title;
	}
	/**
	 * weight getter method
	 * @return {Number} production weight factor
	 */
	getWeight(){
		return this.weight;
	}
	/**
	 * size getter method
	 * @return {Object} production size
	 */
	getSize(){
		return this.size;
	}
	/**
	 * production weight calculation method
	 * @return {Number} production weight
	 */
	calWeight(){
		const length = this.size.length||0;
		const width = this.size.width||0;
		const height = this.size.height||0;
		const weight = this.weight||0;
		return length*width*height*weight/(100*100*100);
	}
}
module.exports = Production;