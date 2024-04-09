function addStoryToFirestore(addTitle, addTxt, stars) {
    // initializes a reference to my Firestore database
    var db = firebase.firestore();

    // Get the current user's UID(Unique Identifier) 
    // of the curretly signed-in user through Firebase Authentication
    var userId = firebase.auth().currentUser.uid;

    // Creates a new 'Date'object
    // Get the current date and time
    let currentDate = new Date();

    // Get the selected rating
    let rating = null;
    // document.querySelector searches the document for an element that matches the specified CSS selector:
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

    let addTitle = document.getElementById("addTitle");
    let addTxt = document.getElementById("addTxt");
    let stars = document.querySelector('input[name="star"]:checked');

    // Check if both addTxt and stars are available
    if (addTitle && addTxt && stars) {
        // If user adds a story, add it to each title, body, star in Firestore
        addStoryToFirestore(addTitle, addTxt, stars)
            .then(function (docRef) {
                addTitle.value = ""; // Clear title field after adding
                addTxt.value = ""; // Clear input field after adding
                if (stars) stars.checked = false; // Clear the selected star
                window.location.href = "/diarylist.html"; // Redirect to diarylist.html
                alert("Diary saved successfully! Great Job!") // Show pop-up message
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    } else {
        console.error("Title, Text and/or stars not available.");
    }
}
//if user click the button that has 'addbtn' ID, addstory function activates
document.getElementById("addBtn").addEventListener("click", addStory);

// 
function deleteDiary(diaryId) {
    var userId = firebase.auth().currentUser.uid; // Assuming user is logged in
    var db = firebase.firestore();
    db.collection("users").doc(userId).collection("diaries").doc(diaryId).delete()
        .then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
}

// If user delte a story, delete it from Firestore
document.addEventListener('click', function(e) {
    if (e.target && e.target.matches('.delete-btn')) {
        const diaryId = e.target.getAttribute('data-diary-id');
        deleteDiary(diaryId);
    }
});

function showStories() {
    window.location.href = "/diarylist.html"; // Redirect to diarylist.html
}
document.getElementById("checkStories").addEventListener("click", showStories);