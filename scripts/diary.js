function addStoryToFirestore(addTitle, addTxt, stars) {
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
        title: addTitle.value,
        content: addTxt.value,
        rating: rating,
        timestamp: firebase.firestore.Timestamp.fromDate(currentDate)
    });
}

function addStory() {
    // If user adds a story, add it to Firestore
    let addTitle = document.getElementById("addTitle");
    let addTxt = document.getElementById("addTxt");
    let stars = document.querySelector('input[name="star"]:checked');
    // let addBtn = document.getElementById("addBtn");

    // Check if both addTxt and stars are available
    if (addTitle && addTxt && stars) {
        addStoryToFirestore(addTitle, addTxt, stars)
            .then(function (docRef) {
                addTitle.value = ""; // Clear title field after adding
                addTxt.value = ""; // Clear input field after adding
                stars.checked = false; // Clear the selected star
                window.location.href = "/diarylist.html"; // Redirect to diarythanks.html
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    } else {
        console.error("Title, Text and/or stars not available.");
    }
}

document.getElementById("addBtn").addEventListener("click", addStory);


function showStories() {
    window.location.href = "/diarylist.html"; // Redirect to diarythanks.html
}
document.getElementById("checkStories").addEventListener("click", showStories);