module.exports = function (RED) {
  function StructNode(config) {
    RED.nodes.createNode(this, config)
    this.on('input', function (msg) {
      require('./validation')(config, msg, this)
    })
  }
  if (RED && RED.nodes) RED.nodes.registerType('struct', StructNode)
}