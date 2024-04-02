
document.addEventListener('DOMContentLoaded', function () {
    // Initialize Firebase Auth and Firestore
    const db = firebase.firestore();
    const auth = firebase.auth();

    // Masonry Layout Initialization
    const masonryGrid = document.querySelector('.row[data-masonry]');
    if (masonryGrid) {
        new Masonry(masonryGrid, {
            itemSelector: '.col',
            columnWidth: '.col',
            percentPosition: true
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

    function fetchAndDisplayDiaries(userId) {
        const diariesRef = db.collection('users').doc(userId).collection('diaries');
        diariesRef.get().then(querySnapshot => {
            const diariesContainer = document.getElementById('diaryEntriesContainer');
            // Ensure diariesContainer is a flex container if not already
            diariesContainer.className = 'row';
            diariesContainer.innerHTML = ''; // Clear the container before adding new entries

            querySnapshot.forEach(doc => {
                const diary = doc.data();

                const diaryHtml = `
                    <div class="col-md-4 col-sm-6 mb-4"> <!-- Adjusted for 3 columns per row on medium devices -->
                        <div class="card h-100">
                            <!-- Placeholder for future image functionality -->
                            <div class="card-body">
                                <h5 class="card-title">${diary.title || 'No Title'}</h5>
                                <p class="card-text">${diary.content}</p>
                            </div>
                            <div class="card-footer">
                                <small class="text-muted">${diary.timestamp.toDate().toDateString()}</small>
                                <small class="text-muted">Rating: ${diary.rating || 'Not rated'}</small>
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