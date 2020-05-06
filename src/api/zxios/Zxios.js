// const createXHR = () => {
//     if (typeof XMLHttpRequest != "undefined") {
//         return new XMLHttpRequest();
//     } else if (typeof ActiveXoject != "undefined") {
//         if (typeof arguments.callee.activeXString != "string") {
//             var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"];
//             let i, len;
//             for (i = 0, len = versions.length; i < len, i++;) {
//                 try {
//                     new ActiveXoject(versions[i]);
//                     arguments.callee.activeXString = versions[i];
//                     break;
//                 } catch (ex) {
//                     //跳过
//                 }
//             }
//         }
//         return new ActiveXoject(arguments.callee.activeXString);
//     } else {
//         throw new Error("No XHR object available");
//     }
// }
let baseURL = 'http://localhost:9000/api/'
const getQueryUrl = (url,params) => {
    if (params) {
        let p = 0
        for (let key in params) {
            if (p == 0) {
                url += '?'+key+'='+params[key]
            } else {
                url += '&'+key+'='+params[key]
            }
            p++       
        }
        return url     
    }
    return url
}
const get = (url,params) => {
    return new Promise(function(resolve, reject) {
        var XHR = new XMLHttpRequest();
        XHR.onreadystatechange = function() {
            if (XHR.readyState == 4) {
                if (XHR.status == 200) {
                    try {
                        var response = JSON.parse(XHR.responseText);
                        console.log('get返回',XHR.responseText,response)
                        resolve(response);
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(new Error(XHR.statusText));
                }
            }
        }
        XHR.open('GET', baseURL+getQueryUrl(url, params), true);
        XHR.send();
    })
}
const post = (url,data,isFormData=false) => {
    return new Promise(function(resolve, reject) {
        var XHR = new XMLHttpRequest();
        XHR.onreadystatechange = function() {
            if (XHR.readyState == 4) {
                if (XHR.status == 200) {
                    try {                       
                        var response = JSON.parse(XHR.responseText);
                        console.log('post返回',XHR.responseText,response)
                        resolve(response);
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(new Error(XHR.statusText));
                }
            }
        }
        let newData = {}
        if (data&&isFormData) {
            let formData = new FormData()
            for (let i in data) {
                formData.append(i, data[i])
            }
            newData = formData
        } else {
            newData = JSON.stringify(data)
        }

        XHR.open('POST', baseURL+url, true);
        if (!isFormData) {
            XHR.setRequestHeader('Content-Type', 'application/json')
        }
        console.log(newData, JSON.stringify(newData))
        XHR.send(newData)
    })
}

export default {
    get,
    post
}