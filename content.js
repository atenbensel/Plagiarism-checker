// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === "highlightText") {
      // Highlight the specified text on the page
      const selection = window.getSelection();
      const range = document.createRange();
      range.setStart(message.node, message.startOffset);
      range.setEnd(message.node, message.endOffset);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  });
  
  // Load and initialize Google Ads
  loadAdsScript();
  initializeAds();
  
