const {JSDOM} = require('jsdom');

const crawlPage = async (baseURL, currentURL, pages) => {
    
    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)
    
    // if the two urls are not on the same host then, return the list of pages and don't work further
    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages
    }

    //check if the page is already crawled
    const normalizedCurrentURL = normalizeURL(currentURL)
    if (pages[normalizedCurrentURL]>0){
        pages[normalizedCurrentURL]++;
        return pages;
    }

    pages[normalizedCurrentURL] = 1 ;
    
    console.log(`actively crawling ${currentURL}`)

    // if user gives bad link
    try{
        const resp = await fetch(currentURL)

        // check for status 200
        if(resp.status > 399){
            console.log(`error in fetch with status code: ${resp.status} on page: ${currentURL}`)
            return pages
        }
        
        // make sure the response is html
        const contentType = resp.headers.get("content-type")
        if(!contentType.includes("text/html")){
            console.log(`error in fetch with non html response, content type : ${contentType} on page: ${currentURL}`)
            return pages
        }

        const htmlBody = await resp.text()

        const nextURLs = getURLsFromHTML(htmlBody, baseURL)

        for (const nextURL of nextURLs) {
            pages = await crawlPage(baseURL, nextURL, pages)
        }
    }catch(e){
        console.log(`Error in fetch : ${e.message}, on page : ${currentURL}`);
    }

    return pages
}


const getURLsFromHTML = (htmlBody, baseURL) =>{
    const urls = [];
    const dom =  new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')

    for (const linkElement of linkElements) {
        if(linkElement.href.slice(0,1)==="/") {
            // relative urls
            try{
                // check if it is a valid url
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                // this will throw an error if the url is not valid
                urls.push(urlObj.href)
                
            }catch (e){
                console.log("Error with relative url : " + e.message)
            }
            
        } else{
            //absolute urls
            try{
                // check if it is a valid url
                const urlObj = new URL(linkElement.href)
                // this will throw an error if the url is not valid
                urls.push(urlObj.href)

            }catch (e){
                console.log("Error with absolute url : " + e.message)
            }
        }

    }

    return urls;
}

const normalizeURL = (urlString) =>{
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`

    // .slice(-1) means the last character of the string
    if(hostPath.length > 0 && hostPath.slice(-1)==="/"){
        return hostPath.slice(0,-1)
    }

    return hostPath
}



module.exports={
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}