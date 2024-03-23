    // Function to get the selected rating
    function getRating() {
        var rating = 0;
        var stars = document.getElementsByName('star');

        // Loop through all the stars to find the selected one
        for (var i = 0; i < stars.length; i++) {
            if (stars[i].checked) {
                rating = parseInt(stars[i].id.split('-')[1]); // Get the numeric value of the selected star
                break; // Exit the loop once a star is found
            }
        }

        return rating;
    }

    // Function to add a story
    function addStory() {
        var storyText = document.getElementById("addTxt").value;
        var rating = getRating(); // Get the selected rating

        // Add the story to Firebase Firestore
        db.collection("diaries").add({
            text: storyText,
            rating: rating
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById("addTxt").value = ""; // Clear the text area after adding the story
            // Optionally, you can show a success message or perform other actions here
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
            // Handle errors here
        });
    }

