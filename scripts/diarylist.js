// Select the .row element with the data-masonry attribute
var masonryGrid = document.querySelector('.row[data-masonry="{"percentPosition": true }"]');

// Initialize Masonry on the selected element
var masonry = new Masonry(masonryGrid, {
  // options
  itemSelector: '.col',
  columnWidth: '.col',
  percentPosition: true
});


function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("hikeCardTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 

    db.collection(collection).get()   //the collection called "hikes"
        .then(allHikes=> {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allHikes.forEach(doc => { //iterate thru each doc
                var title = doc.data().name;       // get value of the "name" key
                var details = doc.data().details;  // get value of the "details" key
								var hikeCode = doc.data().code;    //get unique ID to each hike to be used for fetching right image
                var hikeLength = doc.data().length; //gets the length field
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-length').innerHTML = hikeLength +"km";
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = `./images/${hikeCode}.jpg`; //Example: NV01.jpg

                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery, Example: "hikes-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

displayCardsDynamically("hikes");  //input param is the name of the collection


// Assuming you have a function to retrieve data from Firestore and create cards
function createCard(data) {
    // Create a new card element
    var card = document.createElement('div');
    card.classList.add('col'); // Add Bootstrap grid class for column

    // Add content to the card (assuming data contains card content)
    card.innerHTML = `
        <div class="card h-100">
            <!-- Card content here -->
        </div>
    `;

    // Append the card to the row
    var row = document.querySelector('.row');
    row.appendChild(card);

    // Dynamically adjust the width of the cards
    var cards = document.querySelectorAll('.col');
    var cardWidth = (100 / Math.min(cards.length, 3)) + '%'; // Maximum of 3 columns
    cards.forEach(function(card) {
        card.style.width = cardWidth;
    });
}

// Example usage: Retrieve data from Firestore and create cards dynamically
// Assuming you have a Firestore query that retrieves data and then calls createCard function
// firestoreQuery().then(function(data) {
//     createCard(data);
// });










// // Function to show elements from localStorage
// function showStories() {
//     let stories = localStorage.getItem("stories");
//     if (stories == null) {
//         storiesObj = [];
//     } else {
//         storiesObj = JSON.parse(stories);
//     }
//     let html = "";
//     storiesObj.forEach(function (element, index) {
//         html += `
//               <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
//                       <div class="card-body">
//                           <h5 class="card-title">Story ${index + 1}</h5>
//                           <p class="card-text"> ${element}</p>
//                           <button id="${index}"onclick="deleteStory(this.id)" class="btn btn-primary">Delete Story</button>
//                       </div>
//                   </div>`;
//     });
//     let storiesElm = document.getElementById("stories");
//     if (storiesObj.length != 0) {
//         storiesElm.innerHTML = html;
//     } else {
//         storiesElm.innerHTML = "Nothing to show! Use \"Write a story\" section above to write your story.";
//     }
// }

// //   // Function to delete a story
// function deleteStory(index) {
//     //   console.log("I am deleting", index);

//     let stories = localStorage.getItem("stories");
//     if (stories == null) {
//         storiesObj = [];
//     } else {
//         storiesObj = JSON.parse(stories);
//     }

//     storiesObj.splice(index, 1);
//     localStorage.setItem("stories", JSON.stringify(storiesObj));
//     showStories();
// }

// let search = document.getElementById('searchTxt');
// search.addEventListener("input", function () {

//     let inputVal = search.value.toLowerCase();
//     // console.log('Input event fired!', inputVal);
//     let storyCards = document.getElementsByClassName('noteCard');
//     Array.from(storyCards).forEach(function (element) {
//         let cardTxt = element.getElementsByTagName("p")[0].innerText;
//         if (cardTxt.includes(inputVal)) {
//             element.style.display = "block";
//         }
//         else {
//             element.style.display = "none";
//         }
//         // console.log(cardTxt);
//     })
// })
