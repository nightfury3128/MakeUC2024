chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "scan_email") {
      const emailText = document.body.innerText;
      sendResponse({ emailText });
    }
  });
  