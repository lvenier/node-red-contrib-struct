module.exports = function (RED) {
  var result = {
    errorCode: 0,
    errorMsg: '',
    superStruct: ''
  }

  function SuperStructError (node, code, msg) {
    result.errorCode = code
    result.errorMsg = msg
    node.status({
      fill: 'red',
      shape: 'ring',
      text: msg
    })
    node.error(msg)
  }

  function SuperStructNode (config) {
    RED.nodes.createNode(this, config)
    var node = this
    node.on('input', function (msg) {
      node.status({
        fill: 'green',
        shape: 'ring',
        text: result.transitTime
      })
      node.send(msg)
    })
  }
  RED.nodes.registerType('superStruct', SuperStructNode)
}
