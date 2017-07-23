// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var init = false;

chrome.browserAction.onClicked.addListener(function() {

    if (!init) {
        chrome.tabs.executeScript(null, {
            file: "jquery-3.2.1.min.js"
        });
        chrome.tabs.executeScript(null, {
            file: "jquery-ui.min.js"
        });
        chrome.tabs.executeScript(null, {
            file: "interact.min.js"
        });

        chrome.tabs.insertCSS(null, {
            file: "styles.css"
        });

        chrome.webRequest.onHeadersReceived.addListener(
            function(details) {
                for (var i = 0; i < details.responseHeaders.length; ++i) {
                    var header = (details.responseHeaders[i]).name.toLowerCase();
                    if (header == 'x-frame-options' || header == 'frame-options') {
                        details.responseHeaders.splice(i, 1); // Remove header
                    }
                }
                return { responseHeaders: details.responseHeaders };
            }, {
                urls: ["<all_urls>"], // Pattern to match all http(s) pages
                types: ['sub_frame']
            }, ['blocking', 'responseHeaders']
        );

        init = true;
    }

    chrome.tabs.executeScript(null, {
        file: "create.js"
    });


});
// chrome.tabs.executeScript
// $('a').onmousein