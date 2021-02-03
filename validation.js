const s = require('superstruct')

function StructError(node) {
  node.status({
    fill: 'red',
    shape: 'ring',
    text: ''
  })
}

module.exports = function (config, msg, node) {

  const struct = msg.payload
  const rules = config.rules
  const SS = {}
  const SSD = {}

  if (msg.req.headers['content-type'].toLowerCase() !== 'application/json') {
    msg.payload = {
      error: 'invalid content type.'
    }
    node.send([null, msg])
    return msg.payload
  }

  for (const r of rules) {
    switch (r.t) {
      case 'string':
        SS[r.n] = s.string()
        break;
      case 'integer':
        SS[r.n] = s.number()
        break;
    }
    switch (r.m) {
      case 'default':
        SSD[r.n] = r.v
        break;
      case 'optional':
        SS[r.n] = s.optional(SS[r.n])
        break;
    }
  }

  const ss = s.defaulted(s.object(SS), SSD)
  const [err0, val0] = s.validate(struct, ss, {
    coerce: true
  })

  if (err0) {
    msg.payload = {
      error: err0
    }
    if (node !== null) {
      node.send([null, msg])
      StructError(node)
    }
  } else {
    if (node !== null) {
      msg.payload = val0
      node.send([msg, null])
      node.status({
        fill: 'green',
        shape: 'ring',
        text: 'ok'
      })
    }
  }
  return (msg.payload)
}