
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
            diariesContainer.innerHTML = ''; // Clear the container before adding new entries

            querySnapshot.forEach(doc => {
                const diary = doc.data();

                /**
                 * When we fix the issue for the uploading pictures we can modify this code to retrieve the data from subcollection
                 * 
                const photoId = diary.photoId;
                const photoRef = db.collection('users').doc(userId).collection('usersActivityPhoto').doc(photoId);

                photoRef.get().then(photoDoc => {
                const photoData = photoDoc.data();
                const imageUrl = photoData ? photoData.url : 'default_image_url'; // Use a default image URL if no photo data is found
                 
                <!-- Use a placeholder image if the diary entry doesn't have an image -->
                    <img src="${diary.image || 'path/to/default_image.jpg'}" class="card-img-top" alt="Diary Image">
                between <div class="card h-100"> <div class="card-body"> right below.         
                */

                const diaryHtml = `
                    <div class="col">
                        <div class="card h-100">
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

            // If you're using Masonry for layout:
            if (window.Masonry) {
                new Masonry(diariesContainer, {
                    itemSelector: '.col',
                    columnWidth: '.col',
                    percentPosition: true
                });
            }
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