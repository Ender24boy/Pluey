
document.getElementById('hideButton').addEventListener('click', async () => {
  const inputMessage = document.getElementById('textInput').value;
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { action: "editPost", inputMessage });
});

document.getElementById('resetButton').addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { action: "resetMessage" });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "showResetButton") {
    document.getElementById('resetButton').style.display = 'inline';
  } else if (message.action === "hideResetButton") {
    document.getElementById('resetButton').style.display = 'none';
  }
});
