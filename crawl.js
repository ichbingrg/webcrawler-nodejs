const {JSDOM} = require('jsdom');

const crawlPage = async (currentURL) =>  {
    console.log(`actively crawling ${currentURL}`)
        
    
    // if user gives bad link
    try{
        const resp = await fetch(currentURL)

        // check for status 200
        if(resp.status > 399){
            console.log(`error in fetch with status code: ${resp.status} on page: ${currentURL}`)
            return
        }
        
        // make sure the response is html
        const contentType = resp.headers.get("content-type")
        if(!contentType.includes("text/html")){
            console.log(`error in fetch with non html response, content type : ${contentType} on page: ${currentURL}`)
            return
        }

        console.log(await resp.text())
    }catch(e){
        console.log(`Error in fetch : ${e.message}, on page : ${currentURL}`);
    }

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