const EXTENSION_ID = "lkgkdffamlgcdknohhpnomehnpidafig"; // Replace with your real ID

const fallbackLinks = {
  LinkedIn: "https://www.linkedin.com/feed/",
  WhatsApp: "https://wa.me/?text=",
  Gmail: (content) =>
    `https://mail.google.com/mail/?view=cm&fs=1&to=&su=Generated Post&body=${encodeURIComponent(
      content
    )}`,
  Instagram: "https://www.instagram.com/",
};

export const sendPostToExtension = async (platform, content) => {
  try {
    if (window.chrome?.runtime?.sendMessage) {
      chrome.runtime.sendMessage(
        EXTENSION_ID,
        {
          action: "open_and_paste",
          platform,
          content,
        },
        (response) => {
          if (chrome.runtime.lastError) {
            console.warn("Extension error:", chrome.runtime.lastError.message);
            fallbackToRedirect(platform, content);
          } else {
            console.log("✅ Extension responded:", response);
          }
        }
      );
    } else {
      fallbackToRedirect(platform, content);
    }
  } catch (err) {
    console.error("Extension communication failed:", err);
    fallbackToRedirect(platform, content);
  }
};

const fallbackToRedirect = (platform, content) => {
  console.warn("⚠️ Extension not available. Copying to clipboard and redirecting...");

  // ✅ Copy to clipboard
  navigator.clipboard.writeText(content).then(() => {
    alert("📋 Text copied to clipboard! Please paste it manually.");

    // 🔁 Redirect
    const url =
      platform === "Gmail"
        ? fallbackLinks.Gmail(content)
        : platform === "WhatsApp"
        ? `${fallbackLinks.WhatsApp}${encodeURIComponent(content)}`
        : fallbackLinks[platform] || "https://www.google.com/";

    window.open(url, "_blank");
  }).catch((err) => {
    console.error("❌ Failed to copy:", err);

    // Still redirect even if copy fails
    const url =
      platform === "Gmail"
        ? fallbackLinks.Gmail(content)
        : platform === "WhatsApp"
        ? `${fallbackLinks.WhatsApp}${encodeURIComponent(content)}`
        : fallbackLinks[platform] || "https://www.google.com/";

    window.open(url, "_blank");
  });
};
