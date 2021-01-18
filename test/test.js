const {
    expect
} = require('@jest/globals')

const result = {
    errorCode: 0,
    errorMsg: 'Error',
    errors: [],
    struct: ''
}

const config = []
const structure = []

describe("Struct Test Default", () => {
    test('Success: Default test', async () => {
        require('../index')
        expect(1).toEqual(1)
    })
})

describe("Struct Tests", () => {
    test('Success: test 1', async () => {
        config.push({
            rules: [{
                n: "c",
                t: "integer",
                vt: ""
            }]
        })
        structure.push({
            payload: {
                c: "4",
                d: "5"
            }
        })
        expect(require('../validation')(config[0], structure[0], null, JSON.parse(JSON.stringify(result)))).toStrictEqual([{
            "default": "",
            "key": "c",
            "msg": "invalid type",
            "type": "integer",
            "value": "4"
        }])
    })
    test('Success: test 2', async () => {
        structure.push({
            payload: {
                c: 4,
                d: "5"
            }
        })
        expect(require('../validation')(config[0], structure[1], null, JSON.parse(JSON.stringify(result)))).toStrictEqual({
            c: 4
        })
    })
})