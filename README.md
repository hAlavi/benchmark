# Simple Benchmarking
### Benchmarking Express-NodeJS vs SpringBoot-Java
Based on Mihai Cracan - https://github.com/mihaicracan/web-rest-api-benchmark work,
Two more endpoints added as well as mock dataset.

Five different API endpoints:

|      Tests       |JAVA                           |NodeJS                       |
|------------------|-------------------------------|-----------------------------|
|Simple Calc.      |   localhost:8080/compute      |   localhost:3000/compute    |
|Complex Calc.     |   localhost:8080/prime        |   localhost:3000/prime      |
|Simple REST       |   localhost:8080/countries    |   localhost:3000/countries  |
|Complex REST      |   localhost:8080/users        |   localhost:3000/users      |
|Tweak Complex Calc|   localhost:8080/primeint     |   localhost:3000/primeint   |


### Installation
List of tools should be installed:
1. MySQL  
> **Note:** you can change the settings of MySQL Connection instance inside Application.Java for Java code and config.js for NodeJS
2. NodeJS and npm/yarn
> **http://blog.teamtreehouse.com/install-node-js-npm-windows**
3. PM2 for multi-threading 
> **npm install pm2 -g**
4. MySQL workbench (optional)

## Execution
- **NodeJS**
> pm2 start index.js 
- **Java**
> start the service.

### Results
https://imgur.com/a/i18hyeN
