
// SmartHomeFinds mobile navigation

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.textContent = "☰";
    });
  });
}

// Automatically update copyright year

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Contact form (Web3Forms) – submits in the background and shows a message
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  const statusEl = document.getElementById("cf-status");
  const submitBtn = document.getElementById("cf-submit");

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    statusEl.className = "form-status";
    statusEl.textContent = "Sending…";
    submitBtn.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(contactForm)
      });
      const result = await response.json();

      if (response.ok && result.success) {
        statusEl.className = "form-status ok";
        statusEl.textContent = "Thank you! Your message has been sent. We will reply as soon as we can.";
        contactForm.reset();
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      statusEl.className = "form-status err";
      statusEl.textContent = "Sorry, your message could not be sent. Please email us directly at armaghanahmadshad@gmail.com.";
    } finally {
      submitBtn.disabled = false;
    }
  });
}
