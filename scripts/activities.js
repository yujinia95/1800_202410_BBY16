//Storing keys with keys' values. This helps to find each activites find its own html.
const activitiesInfo = {
    walking: { name: "Mindful Walking", url: "/mindfullness_activity/mnfn_walking.html" },
    adventure: { name: "Adventure new cafe & restaurant", url: "/mindfullness_activity/mnfn_adventure.html" },
    painting: { name: "Painting", url: "/mindfullness_activity/mnfn_painting.html" },
    photography: { name: "Photography", url: "/mindfullness_activity/mnfn_photography.html" },
    cooking: { name: "Cooking & Baking", url: "/mindfullness_activity/mnfn_cooking.html" },
    reading: { name: "Reading", url: "/mindfullness_activity/mnfn_reading.html" },
    exercise: { name: "Exercise", url: "/mindfullness_activity/mnfn_exercise.html" },
    puzzles: { name: "Puzzles", url: "/mindfullness_activity/mnfn_puzzles.html" },
    watching_movie: { name: "Watching Movie", url: "/mindfullness_activity/mnfn_watching_movie.html" },
    volunteer: { name: "Volunteer", url: "/mindfullness_activity/mnfn_volunteer.html" },
    visit_family: { name: "Visit a family", url: "/mindfullness_activity/mnfn_visit_family.html" },
    meditation: { name: "Meditation", url: "/mindfullness_activity/mnfn_meditation.html" },
    discover_music: { name: "Discover favourite music", url: "/mindfullness_activity/mnfn_discover_music.html" },
    exhibition: { name: "Exhibition", url: "/mindfullness_activity/mnfn_exhibition.html" },
    cleaning: { name: "Cleaning", url: "/mindfullness_activity/mnfn_cleaning.html" },
};
function fetchAndDisplayActivities() {
firebase.auth().onAuthStateChanged(function(user) {
if (user) {
    const userId = user.uid;
    // Limits the results as 3 entries from users(Collection),user.UID(docutment),activities(subcollection).fields.
    // This one to get user's recent 3 activities.
    const activitiesRef = db.collection('users').doc(userId).collection('activities').orderBy("timestamp", "desc").limit(3);

    activitiesRef.get().then(snapshot => {
        //If activities' documents are empty in activities subcollection
        if (snapshot.empty) {
            document.getElementById('submitBtn').style.display = 'none';
            //Display challenge button (This button nevigates to choosing activity html)
            document.getElementById('challengesButton').style.display = 'block'; // Show if no activities
            document.getElementById('clear-button').style.display = 'none'; // Show if no activities

            return;
        }
        //If all activities are completed,
        let allActivitiesCompleted = true;
        let activitiesCount = 0; // Track the number of activities

        //Iterating each document in the snapshot
        snapshot.docs.forEach((doc, index) => {
            activitiesCount++; // Increment for each activity found
            // Taking current document
            const data = doc.data();
            // Finding a HTML element that matches to the current activity
            const activityElement = document.getElementById(`challenge${index + 1}`);

            //If the avobe HTML element exsist,
            if (activityElement) {
                //Find activity details from above activitiesInfo(Object).
                const activity = activitiesInfo[doc.id];
                if (activity) {
                    let elementContent;
                    // If fields status chage to "completed"
                    if (data.status === "completed") {
                        //Activitiy colour chages
                        elementContent = `<span style="color: #006400;">${activity.name} - Completed</span>`;
                    // If still in progress,
                    } else if (data.status === "in progress") {
                        //Activitiy colour changes
                        elementContent = `<a href="${activity.url}" style="color: #FFA500;">${activity.name} - In Progress</a>`;
                        allActivitiesCompleted = false;
                    } else {
                        // If activity not started, link to activity page itself.
                        elementContent = `<a href="${activity.url}">${activity.name}</a>`;
                        allActivitiesCompleted = false;
                    }

                    activityElement.innerHTML = elementContent;
                } else {
                    activityElement.innerHTML = "Activity not found";
                    allActivitiesCompleted = false;
                }
            }
        });
        ////This part updates buttons whether okay to appear or not depends on situation
        const journalButton = document.getElementById('submitBtn');
        const challengesButton = document.getElementById('challengesButton');
        //If activity in subcollection are 3,
        if (activitiesCount === 3) {
            challengesButton.style.display = 'none'; // Hide challenges button if 3 activities are displayed
        } else {
            challengesButton.style.display = 'block'; // Otherwise, show it
        }
        //If all 3 activities are completed and activities in subcollection are 3,
        if (allActivitiesCompleted && activitiesCount === 3) {
            journalButton.style.display = 'block'; // Show only if all activities are completed and 3 activities are displayed
        } else {
            journalButton.style.display = 'none';
        }
    });
} else {
    console.log("No user is signed in.");
    document.getElementById('submitBtn').style.display = 'none';
    document.getElementById('challengesButton').style.display = 'block'; // Default to showing if no user
}
});
}
//This function nevigate to diary html.
function setupJournalButtonEventListener() {
const journalButton = document.getElementById('submitBtn');
journalButton.addEventListener('click', function() {
window.location.href = './diary.html';
});
}

window.onload = function() {
fetchAndDisplayActivities();
setupJournalButtonEventListener();
};