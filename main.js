
const {crawlPage} = require('./crawl')


const main = () => {
    if (process.argv.length < 3){
        // process.argv = [<node>, <main.js>, <any argument provided during npm start>]
        console.log("no website provided");
        process.exit(1)
    }
    if (process.argv.length > 3){
        // process.argv = [<node>, <main.js>, <any argument provided during npm start>]
        console.log("too many command line arguments");
        process.exit(1)
    }

    const baseURL = process.argv[2];

    console.log("starting crawl of " + baseURL + "    ...");
    crawlPage(baseURL)
}

main()