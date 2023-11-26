// popup.js

$(document).ready(function () {
  // Load the current state from storage for font and visibility
  chrome.storage.sync.get(['fontState', 'visibilityState'], function (data) {
    var fontState = data.fontState || 'default';
    var visibilityState = data.visibilityState || 'visible';

    // Set the initial state of the font toggle button
    updateFontButtonState(fontState);

    // Set the initial state of the visibility toggle button
    updateVisibilityButtonState(visibilityState);

    // Add click event listener to the font toggle button
    $('#toggleFontButton').click(function () {
      // Toggle the font state
      fontState = (fontState === 'default') ? 'comfortaa' : 'default';

      // Save the font state to storage
      chrome.storage.sync.set({ 'fontState': fontState }, function () {
        // Update the font toggle button state in the popup
        updateFontButtonState(fontState);

        // Send a message to the content script to apply the font
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleFont', fontState: fontState });
        });
      });
    });

    // Add click event listener to the visibility toggle button
    $('#toggleVisibilityButton').click(function () {
      // Toggle the visibility state
      visibilityState = (visibilityState === 'visible') ? 'hidden' : 'visible';

      // Save the visibility state to storage
      chrome.storage.sync.set({ 'visibilityState': visibilityState }, function () {
        // Update the visibility toggle button state in the popup
        updateVisibilityButtonState(visibilityState);

        // Send a message to the content script to toggle the visibility
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleVisibility', visibilityState: visibilityState });
        });
      });
    });
  });

  function updateFontButtonState(fontState) {
    // Update the font toggle button text based on the font state
    $('#toggleFontButton').text((fontState === 'default') ? 'Default Font' : 'Comfortaa Font');
    $('#toggleFontButton').toggleClass('comfortaa-font', fontState === 'comfortaa');
  }

  function updateVisibilityButtonState(visibilityState) {
    // Update the visibility toggle button text based on the visibility state
    $('#toggleVisibilityButton').text((visibilityState === 'visible') ? 'Hide Headers' : 'Show Headers');
    $('#toggleVisibilityButton').toggleClass('comfortaa-visibility', visibilityState === 'hidden');
  }
});
