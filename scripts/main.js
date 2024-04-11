
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
function clearActivitiesCollection() {
    const user = firebase.auth().currentUser; // Get the currently authenticated user

    if (user) { 
         //  alert('insideClearbutton');

        const userRef = db.collection('users').doc(user.uid); // Reference to the user's document
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const month = yesterday.getMonth() + 1; // Adding 1 to adjust the month index
        const day = yesterday.getDate();
        const year = yesterday.getFullYear();
        //const yesterdayString = `${month}-${day}-${year}`;
        const yesterdayString = yesterday.toLocaleDateString();
        
        console.log("yesterday: " + yesterdayString);

        // Path to the user's activities needs to be specific to the user
        const activitiesRef = userRef.collection('activities');

        // Fetch and clear activities
        activitiesRef.get()
            .then(snapshot => {
                const deletePromises = []; // Array to store delete promises
                snapshot.forEach(doc => {
                    // Assuming there's a timestamp field you're comparing against
                    const docDate = doc.data().timestamp?.toDate()?.toLocaleDateString();
                    console.log (docDate + " " + yesterdayString);
                    if (docDate > yesterdayString) {
                        // Add the delete promise to the array
                        deletePromises.push(doc.ref.delete().then(() => {
                            console.log(`Deleted activity ${doc.id} for user ${user.uid}`);
                        }));
                    }
                });

                // Wait for all delete promises to resolve
                return Promise.all(deletePromises);
            })
            .then(() => {
                // Reload the page once all activities are cleared
                reloadPage();
            })
            .catch(error => {
                console.error('Error clearing activities collection:', error);
            });
    } else {
        console.log('No authenticated user found.');
    }
}

// Reload the page
function reloadPage() {
    location.reload();
}




