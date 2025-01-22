// Developed by Olivia Zhang (Github: https://github.com/zhangolivia7/CTRL-See)

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'COPIED_TEXT') {
    const copiedText = message.text;

    // Retrieve existing history from storage and add new text
    chrome.storage.local.get('copyHistory', (data) => {
      const copyHistory = data.copyHistory || [];
      copyHistory.unshift(copiedText); // Add new text to start of array
      chrome.storage.local.set({ copyHistory });
    });
  }
});