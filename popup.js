document.addEventListener("DOMContentLoaded", () => {
  const titleContainer = document.getElementById("titleContainer");
  const titleDisplay = document.getElementById("titleDisplay");
  const getTitleBtn = document.getElementById("getTitleBtn");
  const copyBtn = document.getElementById("copyBtn");

  async function fetchTabTitle() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      titleDisplay.textContent = tab?.title || "No title found";
      titleContainer.style.display = "flex"; // Show title block after fetching
    } catch (err) {
      titleDisplay.textContent = "Error fetching title";
      titleContainer.style.display = "flex";
      console.error("fetchTabTitle error:", err);
    }
  }

  getTitleBtn.addEventListener("click", fetchTabTitle);

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
});
