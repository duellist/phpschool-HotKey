function checkForValidUrl(tabId, changeInfo, tab) {
    if (tab.url.indexOf('www.phpschool.com') > -1) {
        chrome.pageAction.show(tabId);
    }
};
chrome.tabs.onUpdated.addListener(checkForValidUrl);