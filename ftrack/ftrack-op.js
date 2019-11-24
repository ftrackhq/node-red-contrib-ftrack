module.exports = function(RED) {
    function FtrackOpNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var op = config.op

        var query = function(msg){
            var request = msg.ftrack_session.query(config.query);
                
            request.then(function(response){
                msg.topic='ftrack.query.result';
                msg.payload = response.data;
                node.send(msg);
            }).catch(function(error){
                node.error(error)
            })
        }

        node.on('input', function(msg) {

            switch(op)
            {
                case "query":query(msg);
            }

        });

    }
    RED.nodes.registerType(
        "ftrack-op", FtrackOpNode);
}