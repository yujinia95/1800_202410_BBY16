  
  // Function to fetch activities and their status for the current authenticated user from Firestore
  async function fetchActivitiesForCurrentUser() {
    try {
      const userinfo = auth.currentUser;
      if (!userinfo) throw new Error('User not authenticated');
      
      const userId = userinfo.uid;
      const activitiesRef = db.collection('users').doc(userId).collection('activities');
      const snapshot = await activitiesRef.get();
      
      // Fetch the 'activityName' field and 'status' from each document
      const activities = snapshot.docs.map(doc => ({
        name: doc.data().activityName,
        status: doc.data().status // Assuming there is a 'status' field
      }));
      return activities;
    } catch (error) {
      console.error('Error fetching activities:', error);
      return []; // Return an empty array in case of error
    }
  }
  
  // Calendar generation logic with activity status coloring
  async function generateCalendar() {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    const today = now.getDate();
  
    const datesElement = document.getElementById('dates');
    if (!datesElement) return; // Safety check
    datesElement.innerHTML = ''; // Clear previous dates
  
    // Fetch activities for the current user
    const activities = await fetchActivitiesForCurrentUser();
  
    for (let day = 1, firstDayOfMonth = new Date(year, month, 1).getDay(); day <= new Date(year, month + 1, 0).getDate(); day++) {
      const dayElement = document.createElement('div');
      dayElement.textContent = day;
      
      if (day === today) {
        dayElement.classList.add('today');
        activities.forEach(({name, status}) => {
          const activityElement = document.createElement('p');
          activityElement.textContent = name;
          // Apply color based on status
          if (status === 'completed') {
            activityElement.style.color = '#006400';
          } else if (status === 'in progress') {
            activityElement.style.color = '#FFA500';
          }
          dayElement.appendChild(activityElement);
        });
      }
  
      // Adjust for first day of the month
      if (day === 1) {
        dayElement.style.gridColumnStart = firstDayOfMonth + 1;
      }
  
      datesElement.appendChild(dayElement);
    }
  
    // Set month and year title
    document.querySelector('.month-year').textContent = `${now.toLocaleDateString('default', { month: 'long' })} ${year}`;
  }
  
  // Check authentication state before generating the calendar
  auth.onAuthStateChanged(user => {
    if (user) {
      generateCalendar();
    } else {
      console.log('User is not signed in.');
      // Optionally, prompt for login or handle unauthenticated user case here
    }
  });