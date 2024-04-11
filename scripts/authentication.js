var ui = firebaseui.auth.AuthUI.getInstance();
if (!ui) {
    ui = new firebaseui.auth.AuthUI(firebase.auth());
}
var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            var user = authResult.user;
            if (authResult.additionalUserInfo.isNewUser) {
                db.collection("users").doc(user.uid).set({
                    name: user.displayName,
                    email: user.email,
                }).then(function () {
                    console.log("New user added to firestore");

                    // Add empty "activities" sub-collection for the new user
                    db.collection("users").doc(user.uid).collection("activities").doc().set({
                        placeholderField: true
                    });
                    db.collection("users").doc(user.uid).collection("diaries").doc().set({
                        placeholderField: true
                    });
                    
                    console.log("Activities sub-collection added for the user");
                    window.location.assign("main.html");
                    
                    


                }).catch(function (error) {
                    console.log("Error adding new user: " + error);
                });
            } else {
                return true;
            }
            return false;
        },
        uiShown: function () {
            document.getElementById('loader').style.display = 'none';
        }
    },
    signInFlow: 'popup',
    signInSuccessUrl: 'main.html',
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    tosUrl: '<your-tos-url>',
    privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#firebaseui-auth-container', uiConfig);
