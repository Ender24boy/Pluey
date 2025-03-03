(function () {
    window.originalText = null;
  
    // Wait for an element matching a single selector
    function waitForElement(selector, callback) {
      const interval = setInterval(() => {
        const element = document.querySelector(selector);
        if (element) {
          clearInterval(interval);
          callback(element);
        }
      }, 100);
    }
  
    // Edit the post using the element found with the first selector
    function editPost_bsky(inputMessage) {
      waitForElement('.css-146c3p1.r-1xnzce8', (element) => {
        if (!window.originalText) {
          window.originalText = element.textContent;
        }
        const newText = editText(window.originalText, inputMessage);
        element.textContent = newText;
        chrome.runtime.sendMessage({ action: "showResetButton" });
      });
    }
  
    // Edit the post using the element found with the second selector
    function editPost_twitter(inputMessage) {
        waitForElement('div.css-175oi2r.r-1s2bzr4 > div[data-testid="tweetText"]', (element) => {
        if (!window.originalText) {
          window.originalText = element.textContent;
        }
        const newText = editText(window.originalText, inputMessage);
        element.textContent = newText;
        chrome.runtime.sendMessage({ action: "showResetButton" });
      });
    }
  
    // Reset the post using the element found with the first selector
    function resetMessage_bsky() {
      waitForElement('.css-146c3p1.r-1xnzce8', (element) => {
        if (window.originalText) {
          element.textContent = window.originalText;
        }
        chrome.runtime.sendMessage({ action: "hideResetButton" });
      });
    }
  
    // Reset the post using the element found with the second selector
    function resetMessage_twitter() {
        waitForElement('div.css-175oi2r.r-1s2bzr4 > div[data-testid="tweetText"]', (element) => {
        if (window.originalText) {
          element.textContent = window.originalText;
        }
        chrome.runtime.sendMessage({ action: "hideResetButton" });
      });
    }
  
    // Listen for messages from the extension and call both functions
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === "editPost") {
        editPost_bsky(message.inputMessage);
        editPost_twitter(message.inputMessage);
      } else if (message.action === "resetMessage") {
        resetMessage_bsky();
        resetMessage_twitter();
      }
    });
  })();
  