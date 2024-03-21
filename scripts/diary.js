// If user adds a story, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let diary = firebase.getItem("diary");
    if (stories == null) {
        storiesObj = [];
    } else {
        storiesObj = JSON.parse(stories);
    }
    storiesObj.push(addTxt.value);
    localStorage.setItem("stories", JSON.stringify(storiesObj));
    addTxt.value = ""; //to make the text blank after clicking the button
    console.log(storiesObj);
    showStories();
});

// Handle form submission
document.getElementById('addbtn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission behavior
  
    // Get the diary entry content
    const entryContent = document.getElementById('addtext').value;
  
    // Store the entry in Firebase
    db.collection("diary").add({
      content: entryContent,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    // .then(function(docRef) {
    //   console.log("Diary entry written with ID: ", docRef.id);
    //   // Optionally, display a success message or clear the form
    // })
    // .catch(function(error) {
    //   console.error("Error adding diary entry: ", error);
    // });
  });