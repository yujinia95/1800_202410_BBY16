/**document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('#lezChallenge').addEventListener('click', function () {
        
        let selectedActivity = document.querySelector('input[name="listGroupRadio"]:checked').value;

        
        let activityHTMLs = {
            "Mindful Walking": "/mindfullness_activity/mnfn_walking",
            "Adventure new cafe & restaurant": "mnfn_adventure.html",
            
        };

        
        let selectedHtmlPath = activityHTMLs[selectedActivity];

        
        if (selectedHtmlPath) {
            window.location.href = selectedHtmlPath;
        } else {
            alert("Please select an activity.");
        }
    });
});*/

/**function processForm(){
    document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("lezChallenge").addEventListener("click", function (){
        if(document.getElementById("firstRadio").checked)
            window.location.href = "/mindfullness_activity/mnfn_walking.html";
        if(document.getElementById("secondRadio").checked)
            window.location.href = "/mindfullness_activity/mnfn_adventure.html";
        if(document.getElementById("thirdRadio").checked)
            window.location.href = "/mindfullness_activity/mnfn_painting.html";
        if(document.getElementById("fourthRadio").checked)
            window.location.href = "/mindfullness_activity/mnfn_photography.html";
        if(document.getElementById("fifthRadio").checked)
            window.location.href = "/mindfullness_activity/mnfn_cooking.html";
        if(document.getElementById("sixthRadio").checked)
            window.location.href = "/mindfullness_activity/mnfn_reading.html";
        if(document.getElementById("seventhRadio").checked)
            window.location.href = "/mindfullness_activity/mnfn_exercise.html";
        if(document.getElementById("eighthRadio").checked)
            window.location.href = "/mindfullness_activity/mnfn_puzzles.html";
    });
    });
}
processForm();*/

/**function processForm(){
    document.getElementById("lezChallenge").addEventListener("click", function (){
        var radios = document.getElementsByName('listGroupRadio');
        console.log(radious);
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                window.location.href = radios[i].value;
                break;
            }
        }
    });
}

processForm();
console.log(processForm());*/
/** 
console.log("Form element:", document.getElementById("myForm"));

document.getElementById("lezChallenge").addEventListener("click", function () {
    console.log("Attaching event listener to button");


    var selectedActivity = document.querySelector('input[name="listGroupRadio"]:checked');

    console.log("Selected activity:", selectedActivity);

    if (selectedActivity) {
        window.location.href = selectedActivity.value;
    } else {

        alert("Please select an activity.");
    }
});*/

function myFunction() {
    alert("Going back to main page");

    window.location.href = "/main.html";
}