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
    const activitiesRef = db.collection('users').doc(userId).collection('activities').orderBy("timestamp", "desc").limit(3);

    activitiesRef.get().then(snapshot => {
        if (snapshot.empty) {
            console.log('No activities found.');
            document.getElementById('submitBtn').style.display = 'none';
            document.getElementById('challengesButton').style.display = 'block'; // Show if no activities
            document.getElementById('clear-button').style.display = 'none'; // Show if no activities

            return;
        }

        let allActivitiesCompleted = true;
        let activitiesCount = 0; // Track the number of activities

        snapshot.docs.forEach((doc, index) => {
            activitiesCount++; // Increment for each activity found
            const data = doc.data();
            const activityElement = document.getElementById(`challenge${index + 1}`);

            if (activityElement) {
                const activity = activitiesInfo[doc.id];
                if (activity) {
                    let elementContent;

                    if (data.status === "completed") {
                        elementContent = `<span style="color: green;">${activity.name} - Completed</span>`;
                    } else if (data.status === "in progress") {
                        elementContent = `<a href="${activity.url}" style="color: orange;">${activity.name} - In Progress</a>`;
                        allActivitiesCompleted = false;
                    } else {
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

        const journalButton = document.getElementById('submitBtn');
        const challengesButton = document.getElementById('challengesButton');

        if (activitiesCount === 3) {
            challengesButton.style.display = 'none'; // Hide challenges button if 3 activities are displayed
        } else {
            challengesButton.style.display = 'block'; // Otherwise, show it
        }

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