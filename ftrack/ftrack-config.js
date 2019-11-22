

module.exports = function(RED) {
    function FtrackConfigNode(n) {
        RED.nodes.createNode(this,n);
        this.server_url = n.server_url;
        this.api_user = n.api_user;
        this.api_key = n.api_key;
    }
    RED.nodes.registerType(
        "ftrack-config", FtrackConfigNode);
}