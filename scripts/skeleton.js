//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {                   //if the pointer to "user" object is not null, then someone is logged in
            // User is signed in.
            // Do something for the user here.
            console.log($('#navbarPlaceholder').load('./nav_after_login.html'));
            console.log($('#footerPlaceholder').load('./text/footer.html'));
        } else {
            // No user is signed in.
            console.log($('#navbarPlaceholder').load('./nav_before_login.html'));
            console.log($('#footerPlaceholder').load('./text/footer.html'));
        }
    });
}
loadSkeleton(); //invoke the function


// Function to load and display the navbar
function loadNavbar() {
    fetch('nav-before-login.html')
      .then(response => response.text())
      .then(navbarHTML => {
        // Assuming there's a placeholder element with the id 'navbar-placeholder' in login.html
        document.getElementById('navbar-placeholder') = navbarHTML;
      })
      .catch(error => console.error('Error loading navbar:', error));
  }
  
  // Call the function when the window loads
  window.addEventListener('load', loadNavbar);

function homeFunction(){
    window.location.href = "main.html"
}
function personalFunction(){

}
function diaryFunction(){
}
  