document.addEventListener('DOMContentLoaded', function () {
    const enableExtensionCheckbox = document.getElementById('enableExtension');
    const reloadPageButton = document.getElementById('reloadPage');

    chrome.storage.sync.get(['extensionEnabled'], function (result) {
      enableExtensionCheckbox.checked = result.extensionEnabled || false;
    });

    enableExtensionCheckbox.addEventListener('change', function () {
      chrome.storage.sync.set({ 'extensionEnabled': this.checked }, function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.reload(tabs[0].id);
        });
      });
    });

    reloadPageButton.addEventListener('click', function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.reload(tabs[0].id);
      });
    });
  });
