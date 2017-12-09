const expect = require( 'chai' ).expect;
const app = require( '../src/app');
const utils = require('../src/utils')
const Production = require('../src/production');

describe("get products by category",function(){
	it('get one product:when category equals Batteries',function(done){
		const category = 'Batteries';
		const products = [
	        {
	            "category": "Air Conditioners",
	            "title": "Window Seal for Portable Air Conditioner Outlets",
	            "weight": 235,
	            "size": {
	                "width": 26,
	                "length": 26,
	                "height": 5
	            }
	        },
	        {
	            "category": "Batteries",
	            "title": "10 Pack Kogan CR2032 3V Button Cell Battery",
	            "weight": 60,
	            "size": {
	                "width": 5.8,
	                "length": 19,
	                "height": 0.3
	            }
	        },
	        {
	            "category": "Air Conditioners",
	            "title": "Kogan 10,000 BTU Portable Air Conditioner (2.9KW)",
	            "weight": 26200,
	            "size": {
	                "width": 49.6,
	                "length": 38.7,
	                "height": 89
	            }
	        }
	    ]
	    try {
	    	const finalProducts = utils.getProductionByCategory(category,products);
	    	expect(finalProducts.length).equals(1);
	    	done();
	    } catch (err){
	    	done(err)
	    }
	})
	it('get two product:when category equals air conditioners',function(done){
		const category = 'Air Conditioners';
		const products = [
	        {
	            "category": "Air Conditioners",
	            "title": "Window Seal for Portable Air Conditioner Outlets",
	            "weight": 235,
	            "size": {
	                "width": 26,
	                "length": 26,
	                "height": 5
	            }
	        },
	        {
	            "category": "Batteries",
	            "title": "10 Pack Kogan CR2032 3V Button Cell Battery",
	            "weight": 60,
	            "size": {
	                "width": 5.8,
	                "length": 19,
	                "height": 0.3
	            }
	        },
	        {
	            "category": "Air Conditioners",
	            "title": "Kogan 10,000 BTU Portable Air Conditioner (2.9KW)",
	            "weight": 26200,
	            "size": {
	                "width": 49.6,
	                "length": 38.7,
	                "height": 89
	            }
	        }
	    ]
	    try {
	    	const finalProducts = utils.getProductionByCategory(category,products);
	    	expect(finalProducts.length).equals(2);
	    	done();
	    } catch (err){
	    	done(err)
	    }
	})
})

describe("products validation check",function(){
	const data = [
		["product"],
		[{"category":100}],
		[
			{
				"category":"Air Conditioners",
				"weight":-5
			}
		],
		[
			{
				"category":"Air Conditioners",
				"weight":5,
				"size":"size"
			}
		],
		[
			{
				"category":"Air Conditioners",
				"weight":5,
				"size":{
					"length":"length"
				}
			}
		],
		[
			{
				"category":"Air Conditioners",
				"weight":5,
				"size":{
					"length":10,
					"height":"height"
				}
			}
		],
		[
			{
				"category":"Air Conditioners",
				"weight":5,
				"size":{
					"length":10,
					"height":10,
					"width":"width"
				}
			}
		]
	]
	data.forEach(item=>{
		it('product invalid: when product properties are not correct',function(done){
			try {
				const products = utils.filterProductionsByValidation(item);
				expect(products.length).equals(0);
				done();
			}catch (err){
				done(err)
			}
		})
	})
})

describe('calculate products average weigh',function(){
	it('Get correct average weight',function(done){
		const products = [
			{
	            "category": "Air Conditioners",
	            "title": "Window Seal for Portable Air Conditioner Outlets",
	            "weight": 10,
	            "size": {
	                "width": 10,
	                "length": 10,
	                "height": 10
	            }
	        },
	        {
	            "category": "Batteries",
	            "title": "10 Pack Kogan CR2032 3V Button Cell Battery",
	            "weight": 60,
	            "size": {
	                "width": 5.8,
	                "length": 19,
	                "height": 0.3
	            }
	        },
	        {
	            "category": "Air Conditioners",
	            "title": "Kogan 10,000 BTU Portable Air Conditioner (2.9KW)",
	            "weight": 10,
	            "size": {
	                "width": 20,
	                "length": 20,
	                "height": 20
	            }
	        }
		]
		try {
			const airConditionerProducts = utils.getProductionByCategory('Air Conditioners',products);
			const filterAirConditionerProducts = utils.filterProductionsByValidation(airConditionerProducts);
			const weights = filterAirConditionerProducts.map(item=>{
				const product = new Production(item);
				return product.calWeight();
			})
			const totalWeight = weights.reduce((accumulator, currentValue) => accumulator + currentValue);
			const averageWeight = totalWeight/(weights.length);
			expect(averageWeight).equals(1.125)
			done();
		}catch(err){
			done(err)
		}
	})
})
