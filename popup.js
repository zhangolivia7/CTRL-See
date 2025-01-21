document.addEventListener('DOMContentLoaded', () => {
    const historyList = document.getElementById('history');
    const clearButton = document.getElementById('clear-history');
  
    // Load copy history from storage
    chrome.storage.local.get('copyHistory', (data) => {
      const copyHistory = data.copyHistory || [];
      copyHistory.forEach((text, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${text}`;
        historyList.appendChild(listItem);
      });
    });
  
    // Clear history when the button is clicked
    clearButton.addEventListener('click', () => {
      chrome.storage.local.set({ copyHistory: [] }, () => {
        historyList.innerHTML = ''; // Clear the UI
      });
    });
  });
  