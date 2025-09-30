// Function to toggle dark mode
function toggleDarkMode() {
    // Toggle the dark-mode class on the body
    document.body.classList.toggle('dark-mode');
  
    // Save the current mode in localStorage
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark'); // Save 'dark' theme
      setToggleButtonIcon('dark'); // Update toggle button icon
    } else {
      localStorage.setItem('theme', 'light'); // Save 'light' theme
      setToggleButtonIcon('light'); // Update toggle button icon
    }
  }
  
  // Function to load the saved theme on page load
  function loadTheme() {
    const savedTheme = localStorage.getItem('theme'); // Get the saved theme from localStorage
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode'); // Apply dark mode if saved as 'dark'
      setToggleButtonIcon('dark'); // Update toggle button icon
    } else {
      document.body.classList.remove('dark-mode'); // Ensure light mode if saved as 'light'
      setToggleButtonIcon('light'); // Update toggle button icon
    }
  }
  
  // Function to set the toggle button icon
  function setToggleButtonIcon(mode) {
    const toggleButton = document.querySelector('.dark-mode-toggle');
    if (mode === 'dark') {
      toggleButton.textContent = '☀️'; // Sun icon for light mode
    } else {
      toggleButton.textContent = '🌙'; // Moon icon for dark mode
    }
  }
  
  // Initialize the theme on page load
  document.addEventListener('DOMContentLoaded', loadTheme);
  