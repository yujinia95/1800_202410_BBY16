
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

        } else {
            // No user is signed in.
            console.log("No user is logged in");
        }
    });
}
getNameFromAuth(); //run the function

//goes into database and grabs a random quote from the database
function readRandomQuote(day) {
    db.collection("quotes").doc(day)
        .get()
        .then((doc) => {
            if (doc.exists) {
                const quotes = [];
                // Collect all quotes from the document
                for (let i = 0; i < 4; i++) {
                    if (doc.data().hasOwnProperty(`quote${i}`)) {
                        quotes.push(doc.data()[`quote${i}`]);
                    }
                }
                const randomIndex = Math.floor(Math.random() * quotes.length); // Generate a random index
                const randomQuote = quotes[randomIndex]; // Select a random quote from the array
                document.getElementById("quote-goes-here").innerHTML = randomQuote;
            } else {
                console.log("No quotes found for", day);
            }
        })
        .catch((error) => {
            console.log("Error getting quote:", error);
        });
}

readRandomQuote("evening");


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
// function clearActivitiesCollectionForCurrentUser(currentDate = new Date()) {
//     const user = firebase.auth().currentUser; // Get the currently authenticated user

//     if (user) {
//         const userRef = db.collection('users').doc(user.uid); // Reference to the user's document
//         userRef.get().then(doc => {
//             if (!doc.exists) {
//                 console.log('No such user!');
//                 return;
//             }

//             const userData = doc.data();
//             const lastResetDate = userData.lastResetDate;
//             const today = new Date().toLocaleDateString();

//             // Check if the last reset date is today; if not, clear activities and update the lastResetDate
//             if (lastResetDate !== today) {
//                 // Path to the user's activities needs to be specific to the user
//                 const activitiesRef = userRef.collection('activities');

//                 // Fetch and clear activities
//                 activitiesRef.get()
//                     .then(snapshot => {
//                         snapshot.forEach(doc => {
//                             // Assuming there's a timestamp field you're comparing against
//                             const docDate = doc.data().timestamp?.toDate()?.toLocaleDateString();
//                             if (docDate < today) {
//                                 doc.ref.delete().then(() => {
//                                     console.log(`Deleted activity ${doc.id} for user ${user.uid}`);
//                                 }).catch(error => {
//                                     console.error('Error deleting activity:', error);
//                                 });
//                             }
//                         });

//                         // Update the user's lastResetDate to today after clearing activities
//                         userRef.update({ lastResetDate: today }).then(() => {
//                             console.log('User lastResetDate updated and activities cleared.');
//                         });
//                     })
//                     .catch(error => {
//                         console.error('Error clearing activities collection:', error);
//                     });
//             } else {
//                 console.log('Activities already cleared for today.');
//             }
//         }).catch(error => {
//             console.error('Error fetching user document:', error);
//         });
//     } else {
//         console.log('No authenticated user found.');
//     }
// }

// // Check if a user is logged in before attempting to clear their activities collection
// firebase.auth().onAuthStateChanged(user => {
//     if (user) {
//         // User is logged in, call clearActivitiesCollectionForCurrentUser
//         const customDate = new Date('2024-04-01'); // Replace '2024-04-02' with the desired date
//         //clearActivitiesCollectionForCurrentUser(customDate);
//     } else {
//         // No authenticated user found
//         console.log('No authenticated user found.');
//     }
// });




