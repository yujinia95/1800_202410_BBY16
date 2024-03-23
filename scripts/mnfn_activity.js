function myFunction() {
    alert("Going back to main page");

    window.location.href = "/main.html";
}

var imageSave;
function saveUserImage() {
    imageSave = db.collection("experienceImage").doc(imageHold)
    imageSave.get().then(userImage => {
        let
    })
}