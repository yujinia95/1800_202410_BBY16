import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase.auth';
import 'firebase/firestore';
import { getStorage } from "firebase/storage";

// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBpuwWSDIrtySZXDZFZOTsfwOrZTEqYQKA",
    authDomain: "comp1800-project-e4999.firebaseapp.com",
    projectId: "comp1800-project-e4999",
    storageBucket: "comp1800-project-e4999.appspot.com",
    messagingSenderId: "1016028029476",
    appId: "1:1016028029476:web:8d3cc0437c5b2eb4d22eb1",
    measurementId: "G-2BD88FFZY9"
};
firebase.initializeApp(firebaseConfig);

// Reference to Firestore database
var db = firebase.firestore();

// If user adds a story, add it to Firestore
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");

    // Get the current date and time
    let currentDate = new Date();

    // Add the story to Firestore
    db.collection("diaries").add({
        content: addTxt.value,
        
        timestamp: firebase.firestore.Timestamp.fromDate(currentDate)
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            addTxt.value = ""; // Clear input field after adding
            showStories();
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
});

// Function to display stories from Firestore
function showStories() {
    // You can implement this function to retrieve stories from Firestore
    // and display them on your webpage
}


function writeStories() {
    console.log("inside write diaries");
    let hikeTitle = document.getElementById("title").value;
    let hikeLevel = document.getElementById("level").value;
    let hikeSeason = document.getElementById("season").value;
    let hikeDescription = document.getElementById("description").value;
    let hikeFlooded = document.querySelector('input[name="flooded"]:checked').value;
    let hikeScrambled = document.querySelector('input[name="scrambled"]:checked').value;

    // Get the star rating
		// Get all the elements with the class "star" and store them in the 'stars' variable
    const stars = document.querySelectorAll('.star');
		// Initialize a variable 'hikeRating' to keep track of the rating count
    let hikeRating = 0;
		// Iterate through each element in the 'stars' NodeList using the forEach method
    stars.forEach((star) => {
				// Check if the text content of the current 'star' element is equal to the string 'star'
        if (star.textContent === 'star') {
						// If the condition is met, increment the 'hikeRating' by 1
            hikeRating++;
        }
    });

    console.log(hikeTitle, hikeLevel, hikeSeason, hikeDescription, hikeFlooded, hikeScrambled, hikeRating);

    var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;

        // Get the document for the current user.
        db.collection("reviews").add({
            hikeDocID: hikeDocID,
            userID: userID,
            title: hikeTitle,
            level: hikeLevel,
            season: hikeSeason,
            description: hikeDescription,
            flooded: hikeFlooded,
            scrambled: hikeScrambled,
            rating: hikeRating, // Include the rating in the review
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            window.location.href = "thanks.html"; // Redirect to the thanks page
        });
    } else {
        console.log("No user is signed in");
        window.location.href = 'review.html';
    }
}



// // Handle form submission
// document.getElementById('addbtn').addEventListener('click', function (event) {
//     event.preventDefault(); // Prevent default form submission behavior

//     // Get the diary entry content
//     const entryContent = document.getElementById('addtext').value;

//     // Store the entry in Firebase
//     db.collection("diary").add({
//         content: entryContent,
//         timestamp: firebase.firestore.FieldValue.serverTimestamp()
//     })

    // .then(function(docRef) {
    //   console.log("Diary entry written with ID: ", docRef.id);
    //   // Optionally, display a success message or clear the form
    // })
    // .catch(function(error) {
    //   console.error("Error adding diary entry: ", error);
    // });
// });