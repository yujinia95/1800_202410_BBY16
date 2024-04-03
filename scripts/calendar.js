
function generateCalendar() {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('default', { month: 'long' }) + ' ' + year;
    document.querySelector('.month-year').textContent = dateString;

    const datesElement = document.getElementById('dates');
    datesElement.innerHTML = ''; // Clear previous dates

    // Add empty divs for the blank days at the start of the month
    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
        datesElement.innerHTML += '<div></div>';
    }

    // Add day numbers for the current month
    for (let i = 1; i <= daysInMonth; i++) {
        datesElement.innerHTML += `<div id="hi${i}">${i}</div>`;
    }
}

// Generate the calendar when the page loads
window.onload = function() {
    generateCalendar();
};
