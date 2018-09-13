// window.addEventListener(
//   'load',
//   function() {
//       chrome.browserAction.onClicked.addListener(function(tab) {
//           chrome.tabs.executeScript(tab.id, {
//           // code: '_20p.startApp(\'' + tab.url + '\');'
//               code: '_20p.startAppInIframe(\'' + tab.url + '\');'
//           });
//       });
//   },
//   false
// );

// var servers = {
//     crawl1: ['crawl1:28897'],
//     a207: ['crawl005.arzx:28897']
// };

// (function createMenuForIp() {
//     for (var prop in servers) {
//         var server = servers[prop];
//         if (server instanceof Array) {
//             chrome.contextMenus.create({
//                 type: 'normal',
//                 title: prop,
//                 id: prop,
//         // onclick: changeIp
//             });
//             for (var i = 0; i < server.length; i++) {
//                 chrome.contextMenus.create({
//                     type: 'normal',
//                     title: server[i],
//                     id: server[i],
//                     parentId: prop,
//                     onclick: changeIp
//                 });
//             }
//         } else if (typeof server === 'string') {
//             chrome.contextMenus.create({
//                 type: 'normal',
//                 title: server,
//                 id: server,
//                 onclick: changeIp
//             });
//         }
//     }
// })();

// function changeIp(info, tab) {
//     chrome.storage.sync.set({ ip: info.menuItemId }, function() {
//     //do something
//     });
// }

let fetchParams = {};

// 服务器地址选项
chrome.storage.sync.set({
    urlList: [{
        label: 'http://localhost:28897',
        value: 'http://localhost:28897'
    }, {
        label: 'http://localhost:28898',
        value: 'http://localhost:28898'
    }]
}, function () {});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.msg) {
        // 监听content script传来的params
        case 'setParam':
            fetchParams[request.paramName] = request.paramValue;
            break;
        case 'getParam':
            sendResponse(fetchParams);
            break;
        default:
            sendAjax(JSON.parse(request), sender, sendResponse);
    }
});

function sendAjax(data, sender, sendResponse) {
    var httpRequest = new XMLHttpRequest();
    var res;
    var formData = '';
    for (var i in data.params) {
        if (data.params[i].trim() !== '') {
            formData += ('&' + i + '=' + encodeURIComponent(data.params[i]));
        }
    }
    httpRequest.onreadystatechange = getData;
    httpRequest.open('post', data.url, false);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8;');
    httpRequest.send(formData.replace('&', ''));

    function getData() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                res = httpRequest.responseText;
            }
        }
    }
    sendResponse(res);
}