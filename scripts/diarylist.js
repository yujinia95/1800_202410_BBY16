
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Firebase Auth and Firestore
    const db = firebase.firestore();
    const auth = firebase.auth();

    // Function to delete a diary entry
    function deleteDiary(userId, diaryId) {
        // it goes into user's subcollection('diaries') and delete the specific diary(diaryID).
        db.collection('users').doc(userId).collection('diaries').doc(diaryId).delete().then(() => {
            console.log("Document successfully deleted!");
            fetchAndDisplayDiaries(userId); // Refresh the diary entries display
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    // Sets up an observer on the Auth object to listen for changes in the user's sign-in state.
    auth.onAuthStateChanged(user => {
        if (user) {
             // Calls a function to fetch and display the diary entries for the signed-in user using their unique ID.
            fetchAndDisplayDiaries(user.uid);
        } else {
            console.log("User is not signed in.");
        }
    });

    // Obtain a reference to the container that holds all diary entries
    const diariesContainer = document.getElementById('diaryEntriesContainer');
    // Add a click event listener to the diariesContainer. This listener will react to all clicks within the container.
    diariesContainer.addEventListener('click', function (e) {
        // Check if the clicked element is a delete button. This is determined by the presence of the 'delete-btn' class.
        if (e.target && e.target.matches('.delete-btn')) {
            // Retrieve the unique ID of the diary entry to be deleted from the clicked button's data-diary-id attribute.
            const diaryId = e.target.getAttribute('data-diary-id');
            // Attempt to retrieve the current user's UID from Firebase Auth. If no user is logged in, this will be null.
            const userId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
            // Check if a user ID was successfully retrieved, meaning a user is logged in.
            if (userId) {
                // Display a confirmation dialog to the user, ensuring they want to proceed with deletion.
                const isConfirmed = confirm("Are you sure you want to delete this diary entry?");
                // If the user confirms the deletion, proceed to call the deleteDiary function with the user ID and diary ID.
                if (isConfirmed) {
                    deleteDiary(userId, diaryId);
                }
            } else {
                // Log an error if no user is signed in. Deleting diary entries requires user authentication.
                console.error("User is not signed in.");
            }
        }
    });

    // Defines a function that fetches diary entries for a specific user and displays them on the web page.
    function fetchAndDisplayDiaries(userId) {
        const diariesRef = db.collection('users').doc(userId).collection('diaries');
        diariesRef.get().then(querySnapshot => {
            const diariesContainer = document.getElementById('diaryEntriesContainer');
             // Ensure diariesContainer is a flex container if not already
            diariesContainer.className = 'row';
            // Clear the container before adding new entries
            diariesContainer.innerHTML = ''; 

            // Iterates over each document in the querySnapshot, which contains the fetched diary entries.
            querySnapshot.forEach(doc => {
                // Retrieves the data from the document snapshot doc, which includes the diary entry details
                const diary = doc.data();
                // Extracts the document ID from doc and stores it in diaryId
                const diaryId = doc.id; 

                // Defines a template literal string diaryHtml that contains the HTML structure for displaying a single diary entry.
                // Adjusted for 3 columns per row on medium devices
                //Places the diary entry's title and content into the card body, using placeholders within the template literal to insert the values dynamically. Defaults are provided in case data is missing.
                const diaryHtml = `
                    <div class="col-md-4 col-sm-6 mb-4">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">${diary.title || 'No Title'}</h5>
                                <p class="card-text">${diary.content}</p>
                            </div>
                            <div class="card-footer">
                                <small class="text-muted">${diary.timestamp.toDate().toDateString()}</small>
                                <small class="text-muted">Rating: ${diary.rating || 'Not rated'}</small>
                                <!-- Include the delete button with a data-diary-id attribute -->
                                <button class="btn btn-info delete-btn" data-diary-id="${diaryId}">Delete</button>
                            </div>
                        </div>
                    </div>
                `;
                diariesContainer.innerHTML += diaryHtml;
            });
        }).catch(error => {
            console.error("Error fetching diaries: ", error);
        });
    }
});