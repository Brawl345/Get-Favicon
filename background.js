// Replace "browser." with "chrome." to make this add-on work with Chromium browsers

// Set up context menu
var contextMenuTitle = browser.i18n.getMessage("extensionName");
browser.contextMenus.create({
  id: "5678-get-favicon",
  title: contextMenuTitle,
  contexts: ["page"]
});

// Download the favicon, if it exists
function downloadFavicon(faviconUrl) {
  if (typeof faviconUrl != "undefined") {
    browser.downloads.download({
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
  browser.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    // Since there can only be one active tab in one active window, 
    // the array has only one element
    var faviconUrl = tabs[0].favIconUrl;
    console.log(faviconUrl)
    downloadFavicon(faviconUrl);
  });
}

// Do the action, if button/context menu entry is clicked
browser.browserAction.onClicked.addListener(queryTab);
browser.contextMenus.onClicked.addListener(function(info, tab) {
    downloadFavicon(tab.favIconUrl)
});