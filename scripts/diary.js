
// function addStoryToFirestore(userId, addTxt, stars) {
//     // Reference to Firestore database
//     var db = firebase.firestore();

//     // Get the current date and time
//     let currentDate = new Date();

//     // Get the selected rating
//     let rating = null;
//     if (stars) {
//         rating = stars.getAttribute("data-base");
//     }

//     // Path to user's diary sub-collection
//     const userDiariesRef = db.collection("users").doc(userId).collection("diaries");

//     // Add the story to the user's diaries sub-collection
//     return userDiariesRef.add({
//         content: addTxt.value,
//         rating: rating,
//         timestamp: firebase.firestore.Timestamp.fromDate(currentDate)
//     });
// }

// function addStory(userId) {
//     // Assuming you have a way to get the current user's ID
//     // let userId = firebase.auth().currentUser.uid; 

//     let addBtn = document.getElementById("addBtn");
//     let addTxt = document.getElementById("addTxt");
//     let stars = document.querySelector('input[name="star"]:checked');
    
//     // Check if both addTxt and stars are available
//     if (addTxt && stars) {
//         addStoryToFirestore(userId, addTxt, stars)
//             .then(function (docRef) {
//                 addTxt.value = ""; // Clear input field after adding
//                 stars.checked = false; // Clear the selected star
//                 window.location.href = "/diarythanks.html"; // Redirect to diarythanks.html
//             })
//             .catch(function (error) {
//                 console.error("Error adding document: ", error);
//             });
//     } else {
//         console.error("Text and/or stars not available.");
//     }
// }

function addStoryToFirestore(addTxt, stars) {
    // Reference to Firestore database
    var db = firebase.firestore();

    // Get the current user's UID
    var userId = firebase.auth().currentUser.uid;

    // Get the current date and time
    let currentDate = new Date();

    // Get the selected rating
    let rating = null;
    const checkedStar = document.querySelector('input[name="star"]:checked');
    if (checkedStar) {
        rating = checkedStar.getAttribute("data-base");
    }

    // Adjust the path to point to the 'diaries' subcollection under the user's document in the 'users' collection
    const userDiaryRef = db.collection("users").doc(userId).collection("diaries");

    /// Add the story to the user's 'diaries' subcollection
    return userDiaryRef.add({
        content: addTxt.value,
        rating: rating,
        timestamp: firebase.firestore.Timestamp.fromDate(currentDate)
    });
}

function addStory() {
    // If user adds a story, add it to Firestore
    let addBtn = document.getElementById("addBtn");
    let addTxt = document.getElementById("addTxt");
    let stars = document.querySelector('input[name="star"]:checked');
    
    // Check if both addTxt and stars are available
    if (addTxt && stars) {
        addStoryToFirestore(addTxt, stars)
            .then(function (docRef) {
                addTxt.value = ""; // Clear input field after adding
                stars.checked = false; // Clear the selected star
                window.location.href = "/diarylist.html"; // Redirect to diarythanks.html
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    } else {
        console.error("Text and/or stars not available.");
    }
}

document.getElementById("addBtn").addEventListener("click", addStory);