// Function to load and display the navbar
function loadNavbar() {
    fetch('/nav-after-login.html')
      .then(response => response.text())
      .then(navbarHTML => {
        // Select all elements with the class 'navbar-placeholder' and insert the navbar content
        document.querySelectorAll('.navbar-placeholder').forEach(container => {
          container.innerHTML = navbarHTML;
        });
      })
      .catch(error => console.error('Error loading navbar:', error));
  }
  
  // Call the function when the window loads
  window.addEventListener('load', loadNavbar);