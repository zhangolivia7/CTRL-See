// Developed by Olivia Zhang (Github: https://github.com/zhangolivia7/CTRL-See)

// Listen for copy events triggered within the page
document.addEventListener('copy', (event) => {
  const selection = document.getSelection();
  const copiedText = selection ? selection.toString().trim() : '';

  // Check if the copied content is part of hyperlink
  const anchorElement = selection?.anchorNode?.parentElement.closest('a');
  if (anchorElement && anchorElement.href) {
    chrome.runtime.sendMessage({ type: 'COPIED_TEXT', text: anchorElement.href });
    return;
  }

  // Fallback to plain copied text
  if (copiedText) {
    chrome.runtime.sendMessage({ type: 'COPIED_TEXT', text: copiedText });
  }
});
