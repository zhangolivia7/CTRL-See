document.addEventListener('copy', () => {
  const copiedText = document.getSelection().toString();
  if (copiedText) {
    chrome.runtime.sendMessage({ type: 'COPIED_TEXT', text: copiedText });
  }
});