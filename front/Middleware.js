var CURRENT_IP = "localhost:3000"

function getBaseUrl() {

    return "http://" + CURRENT_IP;
}

function endpoint(endpointURL) {

    return getBaseUrl() + endpointURL;
}

document.getElementById