const prefix = "https://freedium.cfd/";  // Replace with your actual prefix

// Function to fetch the URL of the current tab
function getCurrentTabUrl(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTabUrl = tabs[0].url;
    callback(currentTabUrl);
  });
}

// Add prefix to a single URL
function addPrefixToUrl(url) {
  return prefix + url;
}

// Function to handle adding prefix to a list of URLs
function addPrefixToUrls(urlsList) {
  return urlsList.map(url => addPrefixToUrl(url.trim()));
}

// Listen for message from popup
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "prefixCurrentTab") {
    getCurrentTabUrl(function (url) {
      const updatedUrl = addPrefixToUrl(url);
      // Open the updated URL in a new tab
      chrome.tabs.create({ url: updatedUrl });
      sendResponse({ updatedUrl: updatedUrl });
    });
    return true; // Keep the message channel open for sendResponse
  }

  if (message.action === "prefixUrls") {
    const updatedUrls = addPrefixToUrls(message.urls);
    // Open each prefixed URL in a new tab
    updatedUrls.forEach(updatedUrl => {
      chrome.tabs.create({ url: updatedUrl });
    });
    sendResponse({ updatedUrls: updatedUrls });
  }
});
