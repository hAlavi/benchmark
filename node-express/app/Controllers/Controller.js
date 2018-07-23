const Country = require('../Models/Country');
const User = require('../Models/User');

class Controller 
{
	hello(req, res) {
		return res.json({ hello: 'world' });
	}

	static isPrime(n) {
		var result = true;
		
		if (n <= 1) {
			result = false;
		}
		else {
			// We only need to check up to the sqrt of the number.
			for (var i=2; i*i<=n; i++) {
				if (n % i === 0) {
					// This number is evenly divisible by i, so it is not prime.
					result = false;
					break;
				}
			}
		}
		
		return result;
	}
	
	/**
	 * @param {number} n
	 * @return {number}
	 */
	static countPrimes(n) {
		var result = 0;
		
		for (var i=0; i<n; i++) {
			if (Controller.isPrime(i)) {
				result++;
			}
		}
		
		return result;
	}

	static isPrimeInt(n) {
		var result = true;
		let tUint = new Uint32Array(1);
		tUint[0] = n;
		if (tUint[0] <= 1) {
			result = false;
		}
		else {
			// We only need to check up to the sqrt of the number.
			for (var i=2; i*i<=tUint[0]; i++) {
				if (tUint[0] % i === 0) {
					// This number is evenly divisible by i, so it is not prime.
					result = false;
					break;
				}
			}
		}
		
		return result;
	}
	
	/**
	 * @param {number} n
	 * @return {number}
	 */
	static countPrimesInt(n) {
		let result = new Uint32Array(1);
		
		for (var i=0; i<n; i++) {
			if (Controller.isPrimeInt(i)) {
				result[0]++;
			}
		}
		
		return result[0];
	}

	compute(req, res) {
		let x = 0, y = 1;

		let max = 10000 + Math.random() * 500;

		for (let i = 0; i <= max; i++) {
		    let z = x + y;
		    x = y;
		    y = z;
		}

		return res.json({ status: 'done' })
	}

	prime(req, res) {
		var i = Controller.countPrimes(10000000);

		return res.json({ status: 'done' , result:i})
	}

	primeInt(req, res) {
		var i = Controller.countPrimesInt(10000000);

		return res.json({ status: 'done' , result:i})
	}

	async countries(req, res) {
		let data = await Country.fetchAll();

		return res.json({ data });
	}

	async users(req, res) {
		let data = await User.query(q => {
				q.innerJoin('UserCountryMapping', 'User.id', 'UserCountryMapping.userId');
				q.innerJoin('Country', 'UserCountryMapping.countryId', 'Country.id');
				q.groupBy('User.id');
				q.where('UserCountryMapping.countryId', '17');
			})
			.fetchAll({
			 	withRelated: ['countries']
			})

		return res.json({ data });
	}
}

module.exports = new Controller();