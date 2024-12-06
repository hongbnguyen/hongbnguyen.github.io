function showDescription(projectId) {
    const allDescriptions = document.querySelectorAll(".project-details");
    const projectCards = document.querySelectorAll(".project-card");
  
    // Hide all descriptions
    allDescriptions.forEach((description) => description.classList.add("hidden"));
  
    // Remove the 'selected' class from all project cards
    projectCards.forEach((card) => card.classList.remove("selected"));
  
    // Show the relevant description and add 'selected' class to the clicked card
    document.getElementById(projectId).classList.remove("hidden");
    event.currentTarget.classList.add("selected");
  }
  
  function closeDescription() {
    const allDescriptions = document.querySelectorAll(".project-details");
    const projectCards = document.querySelectorAll(".project-card");
  
    // Hide all descriptions and remove 'selected' class
    allDescriptions.forEach((description) => description.classList.add("hidden"));
    projectCards.forEach((card) => card.classList.remove("selected"));
  }
  
  // Attach click handlers to project cards
  document.addEventListener("DOMContentLoaded", () => {
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((card) => {
      card.addEventListener("click", () => {
        const projectId = card.getAttribute("data-project");
        showDescription(projectId);
      });
    });
  });
  