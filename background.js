let copyHistory = [];

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ copyHistory: [] });
});

document.addEventListener('copy', () => {
    const copiedText = document.getSelection().toString();

    if (copiedText) {
        chrome.storage.local.get('copyHistory', (data) => {
            copyHistory = data.copyHistory;
            copyHostpry.unshift(copiedText);
            chrome.storage.local.set({ copyHistory });
        });
    }
});