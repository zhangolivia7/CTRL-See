chrome.runtime.onMessage.addListener((message) => {
    if (message.type === 'COPIED_TEXT') {
      const copiedText = message.text;
  
      // Retrieve existing history from storage and add the new text
      chrome.storage.local.get('copyHistory', (data) => {
        const copyHistory = data.copyHistory || [];
        copyHistory.unshift(copiedText); // Add new text to the start of the array
        chrome.storage.local.set({ copyHistory });
      });
    }
  });
  