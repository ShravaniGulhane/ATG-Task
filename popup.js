document.addEventListener("DOMContentLoaded", () => {
    const titleDisplay = document.getElementById("titleDisplay");
    const refreshBtn = document.getElementById("refreshBtn");
    const copyBtn = document.getElementById("copyBtn");
  
    async function fetchTabTitle() {
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        titleDisplay.textContent = tab?.title || "No title found";
      } catch (err) {
        titleDisplay.textContent = "Error fetching title";
        console.error("fetchTabTitle error:", err);
      }
    }
  
    // Auto-fetch when popup opens
    fetchTabTitle();
  
  
    // Copy button
    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        const text = titleDisplay.textContent || "";
        try {
          await navigator.clipboard.writeText(text);
          const prev = copyBtn.textContent;
          copyBtn.textContent = "Copied!";
          setTimeout(() => { copyBtn.textContent = prev; }, 1200);
        } catch (err) {
          console.error("clipboard write failed:", err);
          copyBtn.textContent = "Failed";
          setTimeout(() => { copyBtn.textContent = "Copy"; }, 1200);
        }
      });
    }
  });
  