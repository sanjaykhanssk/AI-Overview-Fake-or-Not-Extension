chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        console.log("Website loaded....")
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['main.js']
      });
      chrome.tabs.executeScript({
        file: 'google-gen-ai.js'
      }, function() {
        // Script loaded successfully
        console.log('Script loaded successfully');
      });
    }
  });
  