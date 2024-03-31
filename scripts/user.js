var currentUser;               //points to the document of the user who is logged in

function populateFirestoreUser() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            // Get the reference to the user document using the user's UID:
            currentUserRef = db.collection("users").doc(user.uid);
            
            // Retrieve user data
            currentUserRef.get().then(doc => {
                if (doc.exists) {
                    // Here, you can populate user information in your application
                    const userData = doc.data();
                    console.log("User data:", userData);
                } else {
                    console.log("No user data found.");
                }
            }).catch(error => {
                console.log("Error getting user data:", error);
            });
        } else {
            console.log("No user is logged in.");
        }
    });
}
populateUserInfo();
