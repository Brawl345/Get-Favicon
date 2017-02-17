// TODO: Custom folder?
// Set up context menu
var contextMenuTitle = chrome.i18n.getMessage("getCurrentFavicon");
chrome.contextMenus.create({
  id: "5678-get-favicon",
  title: contextMenuTitle,
  contexts: ["page"]
});

var contextMenuTitle_AllFavicons = chrome.i18n.getMessage("getAllFavicons");
chrome.contextMenus.create({
  id: "5678-get-faviconforall",
  title: contextMenuTitle_AllFavicons,
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

function queryAllTabs() {
  chrome.tabs.query({
    currentWindow: true
  }, function(tabs) {
    for (i = 0; i < tabs.length; i++) {
      var faviconUrl = tabs[i].favIconUrl;
      downloadFavicon(faviconUrl);
    }
  });
}

// Do the action, if button/context menu entry is clicked
chrome.browserAction.onClicked.addListener(queryTab);
chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId == "5678-get-favicon") {
    downloadFavicon(tab.favIconUrl);
  } else if (info.menuItemId == "5678-get-faviconforall") {
    queryAllTabs();
  }
});