const {JSDOM} = require('jsdom');

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
    getURLsFromHTML
}