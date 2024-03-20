function loadFooter() {
    fetch('/footer.html')
      .then(response => response.text())
      .then(footerHTML => {
        // Select all elements with the class 'footer-class' and insert the footer content
        document.querySelectorAll('.footer-class').forEach(container => {
          container.innerHTML = footerHTML;
        });
      })
      .catch(error => console.error('Error loading footer:', error));
  }
  
  // Call the function when the window loads
  window.addEventListener('load', loadFooter);