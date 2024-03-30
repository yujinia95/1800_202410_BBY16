// Initialize the Firebase UI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        ///// 💀💀💀💀💀💀💀💀💀💀IF YOU WANT TO COPY THE CODE FROM THE LECTURE, AT LEAST DO IT PROPERLY 💀💀💀💀💀💀💀💀💀💀
        var user = authResult.user;                           
        if (authResult.additionalUserInfo.isNewUser) {    
          db.collection("users").doc(user.uid).set({  
            name: user.displayName,                
            email: user.email,                   
          }).then(function () {
            console.log("New user into firestore");
            window.location.assign("main.html");   
          }).catch(function (error) {
            console.log("Error no new user in firestore: " + error);
          });
        } else {
          return true;
        }
        return false;
      },

      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'main.html',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
    //   firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //   firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //   firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    //   firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    //   firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };

  ui.start ('#firebaseui-auth-container',uiConfig);