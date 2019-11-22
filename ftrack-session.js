var ftrack = require('ftrack-javascript-api');


module.exports = function(RED) {
    function FtrackSession(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            msg.payload = msg.payload.toLowerCase();
            node.send(msg);
        });
    }
    RED.nodes.registerType("ftrack-session", FtrackSession);
}