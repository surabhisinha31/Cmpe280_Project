var kafka = require('kafka-node');
var ENV_VAR = require('../config_backend/config');
;
function ConnectionProvider() {
    this.getConsumer = function (topic_name) {
        // if (!this.kafkaConsumerConnection) {

        this.client = new kafka.Client(ENV_VAR.IP_KAFKA);
        /*this.client.refreshMetadata([{topic: topic_name}], (err) => {
            if (err) {
                console.warn('Error refreshing kafka metadata', err);
            }
        });*/
        this.kafkaConsumerConnection = new kafka.Consumer(this.client, [{ topic: topic_name, partition: 0 }]);
        this.client.on('ready', function () { console.log('client ready!') })
        // }
        return this.kafkaConsumerConnection;
    };

    //Code will be executed when we start Producer
    this.getProducer = function () {

        if (!this.kafkaProducerConnection) {
            this.client = new kafka.Client(ENV_VAR.IP_KAFKA);
            /*this.client.refreshMetadata([{topic: topic_name}], (err) => {
                if (err) {
                    console.warn('Error refreshing kafka metadata', err);
                }
            });*/
            var HighLevelProducer = kafka.HighLevelProducer;
            this.kafkaProducerConnection = new HighLevelProducer(this.client);
            //this.kafkaConnection = new kafka.Producer(this.client);
            console.log("connection.js", 'producer ready');
        }
        return this.kafkaProducerConnection;
    };
}
exports = module.exports = new ConnectionProvider;