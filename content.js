// content.js

// Function to apply or remove the Comfortaa font and adjust font size based on the fontState
function applyFont(fontState) {
  if (fontState === 'comfortaa') {
    // Apply Comfortaa font to the content and reduce font size by 10px
    $('body').css({
      'font-family': 'Comfortaa, sans-serif',
      'font-size': 'calc(1em - 3px)', // Reduce font size by 10px
    });
  } else {
    // Remove Comfortaa font from the content and reset font size to default
    $('body').css({
      'font-family': '',
      'font-size': '' // Reset to the default font size
    });
  }
}

// Observer configuration
const observerConfig = {
  childList: true, // observe direct children of the target
  subtree: true,    // observe all descendants of the target
};

// MutationObserver callback
const observerCallback = function(mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList' || mutation.type === 'subtree') {
      // Apply the font whenever the DOM structure changes
      chrome.storage.sync.get('fontState', function (data) {
        var fontState = data.fontState || 'default';
        applyFont(fontState);
      });
    }
  }
};

// Create a MutationObserver with the callback and configuration
const observer = new MutationObserver(observerCallback);

// Start observing the target node for configured mutations
observer.observe(document.body, observerConfig);

// Check the font state on page load and apply the font
chrome.storage.sync.get('fontState', function (data) {
  var fontState = data.fontState || 'default';
  applyFont(fontState);
});

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'toggleFont') {
    // Apply or remove the Comfortaa font and adjust font size based on the fontState
    applyFont(request.fontState);

    // Send a response to acknowledge that the font has been toggled
    sendResponse({ success: true });
  }
});
