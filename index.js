module.exports = function (RED) {
  function StructNode(config) {
    RED.nodes.createNode(this, config)
    this.on('input', function (msg) {
      result = {
        errorCode: 0,
        errorMsg: 'Error',
        errors: [],
        struct: ''
      }
      require('./validation')(config, msg, this, result)
    })
  }
  if (RED && RED.nodes) RED.nodes.registerType('struct', StructNode)
}