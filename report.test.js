const {sortPages} = require('./report')
const {test, expect} = require("@jest/globals")

test('Report - sortPages', () => {
    const input = {
        "https://google.com" : 5,
        "https://google.com/home" : 3,
        "https://google.com/about" : 7,
        
    }
    const actual = sortPages(input)
    const expected = [
        ["https://google.com/about" , 7],
        ["https://google.com" , 5],
        ["https://google.com/home" , 3],
        ]
    
    expect(actual).toEqual(expected)
}
)