import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase.auth';
import 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";

const docRef = doc(db, "cities", "SF");
const docSnap = await getDoc(docRef);
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const userinfo = auth.currentUser;

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

function addStory() {
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
            content: stars.value, // I added this code for the star.

            timestamp: firebase.firestore.Timestamp.fromDate(currentDate)
        })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
                addTxt.value = ""; // Clear input field after adding
                stars.value = ""; // Clear the stars...........................
                showStories();
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    });

    // Function to display stories from Firestore
    function showStories() {
        // Reference to Firestore database
        var db = firebase.firestore();

        // Reference to the collection "diaries"
        var diariesRef = db.collection("diaries");

        // Reference to the div where you display stories
        var storiesDiv = document.getElementById("addTxt");

        // Clear previous entries before adding new ones
        while (storiesDiv.firstChild) {
            storiesDiv.removeChild(storiesDiv.firstChild);
        }
        // Get all documents from the "diaries" collection
        diariesRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // For each document, retrieve data and display it
                let diaryData = doc.data();
                console.log("Diary ID: ", doc.id);
                console.log("Content: ", addTxt.value.content);
                console.log("Timestamp: ", diaryData.timestamp.toDate());
                // Assuming you have a field named "rating" in your document
                console.log("Rating: ", diaryData.rating);

                // Here you can display the retrieved data on your webpage
            });
        }).catch((error) => {
            console.error("Error getting documents: ", error);
        });
    }
}

// Function to get the selected rating
// function getRating() {
//     var rating = 0;
//     var stars = document.getElementsByName('star');

//     // Loop through all the stars to find the selected one
//     for (var i = 0; i < stars.length; i++) {
//         if (stars[i].checked) {
//             rating = parseInt(stars[i].id.split('-')[1]); // Get the numeric value of the selected star
//             break; // Exit the loop once a star is found
//         }
//     }

//     return rating;
// }

// // Function to add a story
// function addStory() {
//     var storyText = document.getElementById("addTxt").value;
//     var rating = getRating(); // Get the selected rating

//     // Add the story to Firebase Firestore
//     db.collection("diaryEntries").add({
//         text: storyText,
//         rating: rating
//     })
//     .then(function(docRef) {
//         console.log("Document written with ID: ", docRef.id);
//         document.getElementById("addTxt").value = ""; // Clear the text area after adding the story
//         // Optionally, you can show a success message or perform other actions here
//     })
//     .catch(function(error) {
//         console.error("Error adding document: ", error);
//         // Handle errors here
//     });
// }




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