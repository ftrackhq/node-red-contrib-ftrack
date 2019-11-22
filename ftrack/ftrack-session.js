var ftrack = require('ftrack-javascript-api');


module.exports = function(RED) {
    function FtrackSessionNode(config) {
        RED.nodes.createNode(this,config);
        this.ftrack_config = RED.nodes.getNode(config.server)
        
        if (this.ftrack_config){
            this.session = new ftrack.Session(
                this.ftrack_config.server_url,
                this.ftrack_config.api_user,
                this.ftrack_config.api_key
            )
            this.session.initializing.then(function () {
                console.log('API session initialized successfully.');
            });
        }

    }
    RED.nodes.registerType(
        "ftrack-session", FtrackSessionNode);
}