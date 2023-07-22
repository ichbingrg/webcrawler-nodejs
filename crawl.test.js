const {normalizeURL, getURLsFromHTML} = require('./crawl')

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
test("getURLfromHTML : absolute urls ", ()=>{
    const inputHTMLBody =`
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `

    const inputBaseURL = "https://blog.boot.dev/path/" 
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]

    expect(actual).toEqual(expected)
})

test("getURLfromHTML : relative urls ", ()=>{
    const inputHTMLBody =`
    <html>
        <body>
            <a href="/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `

    const inputBaseURL = "https://blog.boot.dev" 
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]

    expect(actual).toEqual(expected)
})


test("getURLfromHTML : both relative and absolute urls ", ()=>{
    const inputHTMLBody =`
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/">
                Boot.dev PATH1
            </a>
            <a href="/path2/">
                Boot.dev PATH2
            </a>
        </body>
    </html>   
    `

    const inputBaseURL = "https://blog.boot.dev" 
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"]

    expect(actual).toEqual(expected)
})

test("getURLfromHTML : invalid urls ", ()=>{
    const inputHTMLBody =`
    <html>
        <body>
            <a href="invalid">
                INVALID URL
            </a>
        </body>
    </html>   
    `

    const inputBaseURL = "https://blog.boot.dev" 
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = []

    expect(actual).toEqual(expected)
})
