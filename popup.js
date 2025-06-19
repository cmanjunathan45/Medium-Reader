document.getElementById("prefixCurrentTab").addEventListener("click", function() {
  chrome.runtime.sendMessage({ action: "prefixCurrentTab" }, function(response) {
    // No need to log anything now
  });
});

document.getElementById("prefixUrls").addEventListener("click", function() {
  const urlsInput = document.getElementById("urlsInput").value;
  const urlsArray = urlsInput.split("\n").filter(url => url.trim() !== "");

  chrome.runtime.sendMessage({ action: "prefixUrls", urls: urlsArray }, function(response) {
    // No need to log anything now
  });
});
