
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
    normalizeURL
}