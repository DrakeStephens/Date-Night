 // firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
   // var errorCode = error.code;
   // var errorMessage = error.message;
    // ...
  // });
function login(){
  
    var pwd = document.getElementById("pwd").value;
    var eml = document.getElementById("email").value; 
    var signInError = document.getElementById("login-error");
    if (eml === "") {
        signInError.classList.remove("hide")
    }
    else if (pwd === "") {
        signInError.classList.remove("hide")
    }
}
  
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
	  var providerData = user.providerData;
	  console.log(user)
      // ...
    } else {
      // User is signed out.
	  // ...
	  console.log("testing")
    }
  });

function searchForMovies() {
    
    const title = document.getElementById('movie-title').value;

    
    

    const Http = new XMLHttpRequest();
    const url = `https://www.omdbapi.com/?s=${title}&apikey=27761297`;
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        if (Http.readyState == 4) { //Ready state 4 means operation is complete for XMLHttpRequest
            const apiResponse = JSON.parse(Http.responseText)
            console.log(apiResponse)

            if (apiResponse.Error) {
                displayError(apiResponse.Error)
                return;
            }
            else {
                displayMovies(apiResponse.Search);
            }
        }
    }
}

function displayMovies(moviesArray) {
    const movieContainer = document.getElementById('movie-result-container');

    movieContainer.innerHTML = "";
    for (let i = 0; i < moviesArray.length; i++) {
        const movieTitleAndYear = document.createElement('div');
        movieTitleAndYear.innerText = `${moviesArray[i].Title} (${moviesArray[i].Type} released ${moviesArray[i].Year})`

        const favoriteButton = document.createElement("button");
        favoriteButton.innerText = "Add to favorites"
        favoriteButton.onclick = function () { addMovieToFavorites(moviesArray[i]) };

        const movieResult = document.createElement('div');
        movieContainer.append(movieResult);
        movieResult.append(movieTitleAndYear);

        /*OMDB API will reutnr "N/A" if an image is not available */
        if (moviesArray[i].Poster != 'N/A') {
            const movieImage = document.createElement('img');
            movieImage.src = moviesArray[i].Poster;
            movieResult.append(movieImage);
        }
        movieResult.append(favoriteButton);
    }
}

function displayError(errorMessage) {
    var movieTitle = document.getElementById("movie-title").value;
    var movieRating = document.getElementById("movie-rating").value;
    var displayError = document.getElementById("Please fill out the title field before submitting");

    if (movieTitle === "") {
        displayError.classList.remove("hide")
    }
    else if (movieRating === ""){
        displayError.classList.remove("hide")
    }
    /*TODO Replace this alert with a Modal and keep the error message (part of requirements is use Modal instead of alert)*/
    //alert(errorMessage);
    // if (title === "") {
    //     apiResponse.Error.remove("hide")
    // }
    // else if (title === "") {
    //     apiResponse.Search.remove("hide")
    // }
}


window.onload = function () {
    /*loop through local storage to display favorite movies*/
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem(localStorage
            .key(i)) == "favorite") {
            const favoriteDiv = document.createElement("div");
            favoriteDiv.innerText = localStorage.key(i);
            document.body.append(favoriteDiv)
        }
    }
    /*add Enter key event listener for movie title input*/
    document.getElementById('movie-title').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            searchForMovies();
        }
    });
}

function addMovieToFavorites(movieObject) {
    localStorage.setItem(movieObject.Title, "favorite")
}
