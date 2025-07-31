document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("responseMessage").textContent =
    "Thanks, Vyas! Your message has been sent.";
});
