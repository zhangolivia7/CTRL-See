document.addEventListener('DOMContentLoaded', () => {
  const historyList = document.getElementById('history');
  const clearButton = document.getElementById('clear-history');

  // Load copy history from storage
  chrome.storage.local.get('copyHistory', (data) => {
    const copyHistory = data.copyHistory || [];
    copyHistory.forEach((text, index) => {
      addListItem(historyList, text, index);
    });
  });

  // Clear history when button clicked
  clearButton.addEventListener('click', () => {
    chrome.storage.local.set({ copyHistory: [] }, () => {
      historyList.innerHTML = ''; // Clear the UI
    });
  });

  // Function to add new list item
  function addListItem(list, text, index) {
    const listItem = document.createElement('li');

    // Create text container
    const textContainer = document.createElement('span');
    textContainer.textContent = text;
    textContainer.style.flex = '1'; // Make the text take up the available space

    // Create copy icon
    const copyIcon = document.createElement('span');
    copyIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 96 960 960" width="18"><path d="M120 936V216h480v120H240v600h480v-240h120v360H120Zm240-240V216h480v480H360Zm240-120h120V336H600v240Z"/></svg>`;
    copyIcon.style.cursor = 'pointer';
    copyIcon.style.marginRight = '10px';
    copyIcon.addEventListener('click', () => {
      navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied!');
      });
    });

    // Create delete icon
    const deleteIcon = document.createElement('span');
    deleteIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 96 960 960" width="18"><path d="M261 936q-39 0-66-27t-27-66V336h-60v-60h240v-60h240v60h240v60h-60v507q0 39-27 66t-66 27H261Zm438-600H261v507h438V336ZM360 786h60V426h-60v360Zm180 0h60V426h-60v360ZM261 336v507-507Z"/></svg>`;
    deleteIcon.style.cursor = 'pointer';
    deleteIcon.addEventListener('click', () => {
      chrome.storage.local.get('copyHistory', (data) => {
        const updatedHistory = data.copyHistory.filter((_, i) => i !== index);
        chrome.storage.local.set({ copyHistory: updatedHistory }, () => {
          list.innerHTML = ''; // Clear list
          updatedHistory.forEach((text, newIndex) => {
            addListItem(list, text, newIndex); // Rebuild list
          });
        });
      });
    });

    // Append text and icons to list item
    listItem.appendChild(textContainer);
    listItem.appendChild(copyIcon);
    listItem.appendChild(deleteIcon);

    // Append the list item to list
    list.appendChild(listItem);
  }

  // Function for copied notif
  function showNotification(message) {
    // Check if a notification already exists and remove it
    const existingNotification = document.getElementById('notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.id = 'notification';
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '50%';
    notification.style.left = '50%';
    notification.style.transform = 'translate(-50%, -50%)';
    notification.style.background = 'rgba(0, 0, 0, 0.8)';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '8px';
    notification.style.zIndex = '1000';
    notification.style.fontSize = '14px';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s ease';

    // Append notification to the body
    document.body.appendChild(notification);

    // Fade in
    setTimeout(() => {
      notification.style.opacity = '1';
    }, 10);

    // Remove notif after 1 second
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 1000);
  }
});