function StructError(node) {
    node.status({
      fill: 'red',
      shape: 'ring',
      text: result.errorMsg
    })
  }

module.exports = function(config, msg, node, result) {
    let struct = msg.payload
    let rules = config.rules
    for (const r of rules) {
      if (r.n in struct) {
        switch (r.t) {
          case 'string':
            if (typeof r.vt !== 'string') result.errors.push({
              key: r.n,
              msg: 'invalid type',
              type: r.t,
              value: struct[r.n],
              default: r.vt
            })
            break;
          case 'integer':
            if (typeof struct[r.n] !== 'number' || !Number.isInteger(struct[r.n])) result.errors.push({
              key: r.n,
              msg: 'invalid type',
              type: r.t,
              value: struct[r.n],
              default: r.vt
            })
            break;
          case 'float':
            if (!(Number.isFloat(struct[r.n]))) result.errors.push({
              key: r.n,
              msg: 'invalid type',
              type: r.t,
              value: struct[r.n],
              default: r.vt
            })
            break;
          case 'array':
            if (!(struct[r.n].isArray())) result.errors.push({
              key: r.n,
              msg: 'invalid type',
              type: r.t,
              value: struct[r.n],
              default: r.vt
            })
            break;
          case 'boolean':
            if (typeof struct[r.n] !== 'boolean') result.errors.push({
              key: r.n,
              msg: 'invalid type',
              type: r.t,
              value: struct[r.n],
              default: r.vt
            })
            break;
          default:
            result.errors.push({
              key: r.n,
              msg: 'unkown type',
              type: r.t,
              value: struct[r.n],
              default: r.vt
            })
            break;
        }
      } else {
        if (r.vt !== "") {
          struct[r.n] = r.vt
        } else {
          result.errors.push({
            key: r.n,
            msg: 'missing',
            type: r.t,
            value: struct[r.n],
            default: r.vt
          })
        }
      }
    }
  
    for (let s = Object.keys(struct).length - 1; s >= 0; s--) {
      let na = true
      for (const r of rules) {
        if (Object.keys(struct)[s] === r.n) {
          na = false
          break
        }
      }
      if (na) delete struct[Object.keys(struct)[s]]
    }
  
    msg.payload = struct
    if (result.errors.length > 0) {
      msg.payload = result.errors
      if (node !== null) {
        node.send([null, msg])
        StructError(node)
      }
    } else {
      if (node !== null) {
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