const { normalize } = require('path')
const {normalizeURL} = require('./crawl')

const {test, expect} = require('@jest/globals')

test("normalizeURL: strip protocol", ()=>{
    const input ="https://blog.boot.dev/path"
    const actual = normalizeURL(input)
    const expected = "blog.boot.dev/path"

    expect(actual).toEqual(expected)
})

test("normalizeURL: strip trailing slash", ()=>{
    const input ="https://blog.boot.dev/path/"
    const actual = normalizeURL(input)
    const expected = "blog.boot.dev/path"

    expect(actual).toEqual(expected)
})

test("normalizeURL: case insensitivity", ()=>{
    const input ="https://Blog.boot.Dev/path/"
    const actual = normalizeURL(input)
    const expected = "blog.boot.dev/path"

    expect(actual).toEqual(expected)
})
test("normalizeURL: strip http protocol", ()=>{
    const input ="http://Blog.boot.Dev/path/"
    const actual = normalizeURL(input)
    const expected = "blog.boot.dev/path"

    expect(actual).toEqual(expected)
})