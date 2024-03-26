/*document.addEventListener('DOMContentLoaded', function () {
    // Function to retrieve and display the image for the specified activity
    function retrieveImage(activity) {
        const imageContainer = document.getElementById('photoContainer');

        if (imageContainer) {
            // Reference to the document for the specified activity
            const imageRef = db.collection('userExperience').doc(activity);

            // Retrieve the document
            imageRef.get().then((doc) => {
                if (doc.exists) {
                    // Document exists, proceed to access its data
                    const imageUrl = doc.data().imageUrl;

                    // Create image element and append it to the container
                    const imageElement = document.createElement('img');
                    imageElement.src = imageUrl;
                    imageElement.style.width = '300px';
                    imageElement.style.height = '200px';

                    // Clear previous content and append the new image
                    imageContainer.innerHTML = '';
                    imageContainer.appendChild(imageElement);
                } else {
                    // Document does not exist, handle accordingly
                    console.log("No document found for activity: ", activity);
                }
            }).catch((error) => {
                console.log("Error getting document for activity: ", activity, error);
            });
        } else {
            console.log("Photo container element not found.");
        }
    }

    // Call the function for each activity
    retrieveImage('walking');
    retrieveImage('reading');
    retrieveImage('puzzles');
    retrieveImage('photography');
    retrieveImage('painting');
    retrieveImage('exercise');
    retrieveImage('cooking');
    retrieveImage('adventure');*/

    // Function to handle the "No, enough for today" button click
    function myFunction() {
        alert("Going back to the main page");
        window.location.href = "/main.html";
    }
