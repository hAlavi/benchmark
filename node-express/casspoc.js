const express = require('express');
const controller = require('./app/Controllers/Controller');
const app = express();
var models = require('express-cassandra');


models.setDirectory( __dirname + '/caModels').bind(
    {
        clientOptions: {
            contactPoints: ['127.0.0.1'],
            protocolOptions: { port: 9042 },
            keyspace: 'casspoc1',
            queryOptions: {consistency: models.consistencies.one}
        },
        ormOptions: {
            defaultReplicationStrategy : {
                class: 'SimpleStrategy',
                replication_factor: 1
            },
            migration: 'safe'
        }
    },
    function(err) {
        if(err) throw err;

        // 
    }
);

app.listen(3000, () => {
  	console.log('listening on 3000')
})

app.get('/hello', controller.hello);
app.get('/compute', controller.compute);
app.get('/prime', controller.prime);
app.get('/primeint', controller.primeInt);
app.get('/countries', controller.countries);
app.get('/users', controller.users);