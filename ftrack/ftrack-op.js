module.exports = function(RED) {
    function FtrackOpNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var op = config.op
        var payloadType = config.payloadType
        var payload = config.payload

        var query = function(msg, command){
            var request = msg.ftrack_session.query(command);
                
            request.then(function(response){
                msg.topic='ftrack.query.result';
                msg.payload = response.data;
                node.send(msg);
            }).catch(function(error){
                node.error(error)
            })
        }

        var thumbnail = function(msg, command){
            var request = msg.ftrack_session.thumbnailUrl(command);
            msg.topic='ftrack.query.result';
            msg.payload = request;
            node.send(msg);
        }

        node.on('input', function(msg) {
            var command = null;
            
            if (payloadType === "str"){
                command = payload
            } else {
                command = RED.util.getMessageProperty(msg, payload) 
                console.log('command', command)
            }
            
            console.log('payloadType', payloadType)
    
            switch(op)
            {
                case "query":query(msg, command); break;
                case "thumbnail": thumbnail(msg, command) ;break;
            }

        });

    }
    RED.nodes.registerType(
        "ftrack-op", FtrackOpNode);
}