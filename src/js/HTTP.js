const API_url = "http://api.degheselle.fr/";

// TODO : proper handling of status

function get(path, callback)
{
    let xhr = new XMLHttpRequest();

    if (!xhr) {
        console.error("Cannot create XMLHTTP instance.");
        return false;
    }
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                callback(JSON.parse(xhr.responseText));
            } else {
                console.error(`Error with the request (status ${xhr.status})`);
            }
        }
    };
    xhr.open('GET', API_url + path);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}

function post(path, callback, data, auth)
{
    var xhr = new XMLHttpRequest();

    xhr.open("POST", API_url + path);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(`${auth.username}:${auth.password}`));
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange  = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            callback(xhr.status, JSON.parse(xhr.response));
        }
    };
}

module.exports = {
    get,
    post
};