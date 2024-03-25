// firebase.initializeApp()

function addStoryToFirestore(addTxt, stars) {
    // Reference to Firestore database
    var db = firebase.firestore();

    // Get the current date and time
    let currentDate = new Date();

    // Get the selected rating
    let rating = null;
    const checkedStar = document.querySelector('input[name="star"]:checked');
    if (checkedStar) {
        rating = checkedStar.getAttribute("data-base");
    }

    // Add the story to Firestore
    return db.collection("diaries").add({
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
                window.location.href = "/diarythanks.html"; // Redirect to diarythanks.html
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    } else {
        console.error("Text and/or stars not available.");
    }
}

document.getElementById("addBtn").addEventListener("click", addStory);