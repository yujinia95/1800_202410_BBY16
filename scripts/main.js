function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayName);  //print the user name in the browser console
            userName = user.displayName;

            // method #1:  insert with JS
            document.getElementById("name-goes-here").innerText = userName;    

            //method #2:  insert using jquery
            //$("#name-goes-here").text(userName); //using jquery

            //method #3:  insert using querySelector
            //document.querySelector("#name-goes-here").innerText = userName

        } else {
            // No user is signed in.
            console.log ("No user is logged in");
        }
    });
}
getNameFromAuth(); //run the function

// // // Function to read the quote of the day from the Firestore "quotes" collection
// // // Input param is the String representing the time of day aka, the document name
// function readQuote(daytime) {
//     db.collection("quotes").doc(daytime)                                                      //name of the collection and documents should matach excatly with what you have in Firestore
//       .onSnapshot(dayDoc => {                                                               //arrow notation
//            console.log("current document data: " + dayDoc.data());                          //.data() returns data object
//            document.getElementById("quote-goes-here").innerHTML = dayDoc.data().quote4;      //using javascript to display the data on the right place
           
//            //Here are other ways to access key-value data fields
//            //$('#quote-goes-here').text(dayDoc.data().quote);         //using jquery object dot notation
//            //$("#quote-goes-here").text(dayDoc.data()["quote"]);      //using json object indexing
// 		       //document.querySelector("#quote-goes-here").innerHTML = dayDoc.data().quote;
//       })
// }

// readQuote("evening");

function readQuote(day) {
    db.collection("quotes").doc(day) // Constructing the document ID based on the daytime parameter
      .get() // Fetching the document data
      .then((doc) => {
          if (doc.exists) {
              // Accessing the "quote" field from the document data
              const quote = doc.data().quote;
              console.log("Quote of the day:", quote);
              document.getElementById("quote-goes-here").innerHTML = quote;
          } else {
              console.log("No quote found for", day);
          }
      })
      .catch((error) => {
          console.log("Error getting quote:", error);
      });
}

readQuote("evening");
readQuote("morning");

