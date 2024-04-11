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

// add user's new diary
function addStory() {
    // gather user input for each sectors
    let addTitle = document.getElementById("addTitle");
    let addTxt = document.getElementById("addTxt");
    let stars = document.querySelector('input[name="star"]:checked');

    // Check if both addTxt and stars are available
    if (addTitle && addTxt && stars) {
        // If user adds a story, add it to each title, body, star in Firestore
        addStoryToFirestore(addTitle, addTxt, stars)
            .then(function (docRef) {
                // Clear title field after adding
                addTitle.value = "";
                // Clear input field after adding 
                addTxt.value = ""; 
                 // Clear the selected star
                if (stars) stars.checked = false;
                // Redirect to diarylist.html
                window.location.href = "/diarylist.html";
                 // Show pop-up message
                alert("Diary saved successfully! Great Job!")
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    } else {
        console.error("Title, Text and/or stars not available.");
    }
}
// if user click the button that has 'addbtn' ID, addstory function activates
document.getElementById("addBtn").addEventListener("click", addStory);

// Define a function named deleteDiary to handle the deletion of diary entries.
function deleteDiary(diaryId) {
    // Retrieve the current user's unique identifier (UID) from Firebase Authentication.
    var userId = firebase.auth().currentUser.uid; // Assuming user is logged in
     // Retrieve the current user's unique identifier (UID) from Firebase Authentication.
    var db = firebase.firestore();
     // Navigate through the Firestore collections and documents to reach the specific diary entry.
    db.collection("users").doc(userId).collection("diaries").doc(diaryId).delete()
        .then(() => {
            // Log a confirmation message in the console if the diary entry is successfully deleted.
            console.log("Document successfully deleted!");
        // Catch and log any errors that occur during the deletion process.
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
}

// Attach an event listener to the entire document that listens for all click events.
document.addEventListener('click', function(e) {
     // Check if the clicked element (e.target) exists and if it matches the selector '.delete-btn'.
    if (e.target && e.target.matches('.delete-btn')) {
        // Retrieve the value of the 'data-diary-id' attribute from the clicked element.
        const diaryId = e.target.getAttribute('data-diary-id');
        // Call the deleteDiary function, passing the retrieved diaryId as an argument.
        deleteDiary(diaryId);
    }
});

// have a function to check the stored stories.
function showStories() {
    // Redirect to diarylist.html
    window.location.href = "/diarylist.html";
}
// when user clicks the button has 'checkStories' ID, it fetches showStories function
document.getElementById("checkStories").addEventListener("click", showStories);