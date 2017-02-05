// Replace "chrome." with "chrome." to make this add-on work with Chromium browsers

// Set up context menu
var contextMenuTitle = chrome.i18n.getMessage("extensionName");
chrome.contextMenus.create({
  id: "5678-get-favicon",
  title: contextMenuTitle,
  contexts: ["page"]
});

// Download the favicon, if it exists
function downloadFavicon(faviconUrl) {
  if (faviconUrl) {
    chrome.downloads.download({
        url: faviconUrl,
        conflictAction: 'uniquify'
    });
  }
}

// Error handler
function onError(error) {
  console.log(`Error: ${error}`);
}

function queryTab() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    // Since there can only be one active tab in one active window, 
    // the array has only one element
    var faviconUrl = tabs[0].favIconUrl;
    downloadFavicon(faviconUrl);
  });
}

// Do the action, if button/context menu entry is clicked
chrome.browserAction.onClicked.addListener(queryTab);
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    downloadFavicon(tab.favIconUrl)
});