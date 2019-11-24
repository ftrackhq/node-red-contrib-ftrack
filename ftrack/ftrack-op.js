module.exports = function(RED) {
    function FtrackOpNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var op = config.op

        var query = function(msg){
            var command = msg.payload
            console.log('query', command)
            var request = msg.ftrack_session.query(command);
                
            request.then(function(response){
                msg.topic='ftrack.query.result';
                msg.payload = response.data;
                node.send(msg);
            }).catch(function(error){
                node.error(error)
            })
        }

        var thumbnail = function(msg){
            var command = msg.payload
            console.log('thumbnail', command)
            var request = msg.ftrack_session.thumbnailUrl(command);
            msg.topic='ftrack.query.result';
            msg.payload = request;
            node.send(msg);
        }

        node.on('input', function(msg) {

            switch(op)
            {
                case "query":query(msg);
                case "thumbnail": thumbnail(msg);
            }

        });

    }
    RED.nodes.registerType(
        "ftrack-op", FtrackOpNode);
}