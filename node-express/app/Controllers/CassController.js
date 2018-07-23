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

class CassController{
    async users(req, res) {

    }
}

module.exports = new CassController();