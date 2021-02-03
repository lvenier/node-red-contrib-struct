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
    test('Error: test 1', async () => {
        config.push({
            rules: [{
                n: "c",
                t: "integer",
                m: "default",
                d: "",
                v: "",
                s: "0"
            }]
        })
        structure.push({
            payload: {
                c: "4",
                d: "5"
            }
        })
        expect(require('../validation')(config[0], structure[0], null)).toHaveProperty('error')
    })
    test('Error: test 2', async () => {
        structure.push({
            payload: {
                c: 4,
                d: "5"
            }
        })
        expect(require('../validation')(config[0], structure[1], null)).toHaveProperty('error')
    })
    test('Success: test 2', async () => {
        structure.push({
            payload: {
                c: 4
            }
        })
        expect(require('../validation')(config[0], structure[2], null)).toStrictEqual(structure[2].payload)
    })
})