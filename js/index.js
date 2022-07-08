window.onload = function () {
    fetchAPI(`?page=${Math.round((Math.random(1,9000)*100))}&sfw`, 8)( createMovieCard, "opening-movies");
    fetchAPI(`?page=${Math.round((Math.random(1,9000)*100))}&sfw`, 4)(createMovieCard, "coming-movies");
  
    // Fetch the API's movies, up to maxnum, and execute a certain function with the array and remaining args. Curried for easier use.
    function fetchAPI(fetchQuery, maxNum) {
        return function(myFunction, ...functionArgs) {
            console.log(fetchQuery);
            // If no query given, return random page
            if(!fetchQuery) {
                fetchQuery = `?page=${Math.round((Math.random(1,9000)*100))}&sfw`;
            };
    
            const movieDB = [];
    
            // Fetch the query
            fetch(`https://api.jikan.moe/v4/anime${fetchQuery}`)
                .then(data => {return data.json()})
                .then(animeList => {
                    let amountControl = 0;
                    animeList.data.forEach(data => {
                        // If enough animes displayed, stop
                        if(amountControl >= maxNum) {
                            return;
                        };
    
                        // Create a new anime object
                        const fetchedAnime = {
                            title: (data.title_english) ? data.title_english : data.title,
                            image: data.images.jpg.image_url,
                            duration: data.duration,
                            genre: data.genres,
                            isFavorite: (data.score > 7.1)
                        };
    
                        // Cache and display anime
                        movieDB.push(fetchedAnime);
                        amountControl++;
                    });
    
    
                    myFunction(movieDB, ...functionArgs);
                });
        };
    };
    

    // This here makes each movie card and diplays it in a certain container
    function createMovieCard(movieArray, mainContainerID) {
        // For each movie, create a card and append them to the main container of your choice
        const mainContainer = document.getElementById(mainContainerID);
        movieArray.forEach(foundMovie => {
            // Simple movie card layout
            const cardWrap = document.createElement("div");
            cardWrap.className = "col-12 col-md-6 col-lg-4 col-xl-3";
    
            const mainCard = document.createElement("div");
            mainCard.className = "pbu-movie-card";
            cardWrap.appendChild(mainCard);
    
            const movieImg = document.createElement("img");
            movieImg.src = foundMovie.image;
            movieImg.alt = `${foundMovie.image} poster`;
            mainCard.appendChild(movieImg);
    
            const movieTextBox = document.createElement("div");
            movieTextBox.className = "d-flex flex-row justify-content-between";
            mainCard.appendChild(movieTextBox);
    
            const movieTextOnly = document.createElement("div");
            movieTextOnly.className = "d-flex flex-column";
            movieTextBox.appendChild(movieTextOnly);
    
            const movieTitle = document.createElement("h3");
            movieTitle.innerHTML = foundMovie.title;
            movieTextOnly.appendChild(movieTitle);
    
            // Concatenate the genre names
            const movieParagraph = document.createElement("p");
            let genres = "";
            if(foundMovie.genre) {
                foundMovie.genre.forEach(genre => {
                    genres += `${genre.name}, `;
                 });
            } else {
                genres = "N/A";
            };
            genres = genres.slice(0,-2);
            movieParagraph.innerHTML = `${foundMovie.duration} | ${genres}`;
            movieTextOnly.appendChild(movieParagraph);
    
            // If the score is high enough, it gets a heart
            if(foundMovie.isFavorite) {
                const movieHeart = document.createElement("div");
                movieHeart.id ="heart";
                movieTextBox.appendChild(movieHeart);
            };
    
            mainContainer.appendChild(cardWrap);
        });
    };
    
    // Get me all the elements that will be used over and over so I don't waste CPU re-initializing these
    const searchForm = document.getElementById("search-bar");
    const formInput = document.querySelector("#search-bar>input");
    const animeDataList = document.getElementById("animeOptions");

    // Add a listener that makes suggestions on entering stuff in the input
    searchForm.addEventListener("input", event => {
        event.preventDefault();
        // Remove old suggestions, also when someone deletes below 3 characters
        for(optionElement of document.getElementsByTagName("option")) {
            optionElement.remove();
        };

        // MyAnimeList does not process strings smaller than 3 letters
        if(formInput.value.length < 3) {
            return;
        };
    
        // Fetch 3 movies and put them inside fetchedMovies
        fetchedMovies = fetchAPI(`?q=${formInput.value}`, 3)(addDataListOptions);
    });

    function addDataListOptions(fetchedMovies) {
        // Make an option for each movie in the list
        fetchedMovies.forEach(fetchedMovie => {
            const newAnimeOption = document.createElement("option");
            newAnimeOption.value = fetchedMovie.title;
            newAnimeOption.innerText = `${fetchedMovie.title}`;
            //console.log(fetchedMovie.images.jpg.small_image_url);
            animeDataList.appendChild(newAnimeOption);
        });
    };
};