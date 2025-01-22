// Developed by Olivia Zhang (Github: https://github.com/zhangolivia7/CTRL-See)

document.addEventListener('copy', () => {
  const copiedText = document.getSelection().toString();
  if (copiedText) {
    chrome.runtime.sendMessage({ type: 'COPIED_TEXT', text: copiedText });
  }
});