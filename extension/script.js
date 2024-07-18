const form = document.querySelector("form");

const replaceImages = () => {
     document.body.style.background = "red";
};

form.addEventListener("submit", async (e) => {
     e.preventDefault();

     const [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
     });

     chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: replaceImages,
     });
});