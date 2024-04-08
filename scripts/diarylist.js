
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Firebase Auth and Firestore
    const db = firebase.firestore();
    const auth = firebase.auth();

    // Function to delete a diary entry
    function deleteDiary(userId, diaryId) {
        db.collection('users').doc(userId).collection('diaries').doc(diaryId).delete().then(() => {
            console.log("Document successfully deleted!");
            fetchAndDisplayDiaries(userId); // Refresh the diary entries display
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    // Fetch and display diaries when user state changes
    auth.onAuthStateChanged(user => {
        if (user) {
            fetchAndDisplayDiaries(user.uid);
        } else {
            console.log("User is not signed in.");
            // Optionally, redirect to login page
        }
    });

    // Setup click event listener for delete button clicks
    const diariesContainer = document.getElementById('diaryEntriesContainer');
    diariesContainer.addEventListener('click', function (e) {
        if (e.target && e.target.matches('.delete-btn')) {
            const diaryId = e.target.getAttribute('data-diary-id');
            // Make sure to retrieve the userId within this function scope
            const userId = firebase.auth().currentUser ? firebase.auth().currentUser.uid : null;
            if (userId) {
                // Show confirmation dialog
                const isConfirmed = confirm("Are you sure you want to delete this diary entry?");
                if (isConfirmed) {
                    deleteDiary(userId, diaryId);
                }
            } else {
                console.error("User is not signed in.");
            }
        }
    });

    // Function to fetch and display diaries
    function fetchAndDisplayDiaries(userId) {
        const diariesRef = db.collection('users').doc(userId).collection('diaries');
        diariesRef.get().then(querySnapshot => {
            const diariesContainer = document.getElementById('diaryEntriesContainer');
            // Ensure diariesContainer is a flex container if not already
            diariesContainer.className = 'row';
            diariesContainer.innerHTML = ''; // Clear the container before adding new entries

            querySnapshot.forEach(doc => {
                const diary = doc.data();
                const diaryId = doc.id; // Get the document ID to use in the delete button

                const diaryHtml = `
                    <div class="col-md-4 col-sm-6 mb-4"> <!-- Adjusted for 3 columns per row on medium devices -->
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

    // Listen for auth state changes to fetch diaries for the logged-in user
    auth.onAuthStateChanged(user => {
        if (user) {
            fetchAndDisplayDiaries(user.uid);
        } else {
            console.log("User is not signed in.");
            // Optionally, redirect to a login page
        }
    });
});