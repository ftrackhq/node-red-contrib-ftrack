require('isomorphic-fetch');
var ftrack = require('ftrack-javascript-api');

module.exports = function(RED) {
    function FtrackSessionNode(config) {
        RED.nodes.createNode(this,config);
        this.ftrack_config = RED.nodes.getNode(config.server)
        var node = this;

        if (this.ftrack_config){
            this.session = new ftrack.Session(
                this.ftrack_config.server_url,
                this.ftrack_config.api_user,
                this.ftrack_config.api_key
            )
            this.session.initializing.then(function () {
                console.log('API session initialized successfully.');
                node.status({fill:"green",shape:"dot",text:"connected"});

            });

            node.on('input', function(msg) {
                console.log('running query', msg.payload)
                var request = this.session.query(msg.payload);
                
                request.then(function(response){
                    msg.topic='ftrack.query.result';
                    msg.payload = response.data;
                    node.send(msg);
                }).catch(function(error){
                    node.error(error)
                })
            });
        } else {
            node.status({fill:"red",shape:"ring",text:"disconnected"});
        }

    }
    RED.nodes.registerType(
        "ftrack-session", FtrackSessionNode);
}