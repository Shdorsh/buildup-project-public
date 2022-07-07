window.onload = function () {
    let movieDB =[{
        title : "Mission Impossible - Fallout",
        image : "https://www.themoviedb.org/t/p/original/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg",
        duration : 147,
        genre : "adventure",
        isFavorite : false,
        comingSoon: false,
    },
    {
        title : "Dave Made A Maze",
        image : "https://image.tmdb.org/t/p/original/aELfPpsXN7zGBTm44XbBC7ZSOW6.jpg",
        duration : 80,
        genre : "comedy",
        isFavorite : true,
        comingSoon: false,
    },
    {
        title : "Interstate 60: Episodes of The Road",
        image : "http://images.moviepostershop.com/interstate-60-episodes-of-the-road-movie-poster-2002-1020476895.jpg",
        duration : 112,
        genre : "adventure",
        isFavorite : true,
        comingSoon: false,
    },
    {
        title : "Walk Hard: The Dewey Cox Story",
        image : "https://i0.wp.com/www.regarder-films.net/wp-content/uploads/2020/04/walk-hard.jpg",
        duration : 96,
        genre : "comedy, musical",
        isFavorite : true,
        comingSoon: true,
    },
    {
        title : "Morbin' Time",
        image : "https://www.moviemeter.nl/images/cover/1127000/1127986.jpg",
        duration : 108,
        genre : "adventure",
        isFavorite : false,
        comingSoon: true,
    },
    {
        title : "Ocean's Eleven",
        image : "https://image.tmdb.org/t/p/original/v5D7K4EHuQHFSjveq8LGxdSfrGS.jpg",
        duration : 117,
        genre : "action",
        isFavorite : false,
        comingSoon: false,
    },
    {
        title : "Fear and Loathing in Las Vegas",
        image : "https://i2.wp.com/voicesfilm.com/wp-content/uploads/2014/01/936full-fear-and-loathing-in-las-vegas-poster.jpg",
        duration : 118,
        genre : "adventure",
        isFavorite : true,
        comingSoon: true,
    },
    {
        title : "Mel Brooks' Spaceballs",
        image : "https://img.moviesrankings.com/t/p/w1280/lQ5Hr8111Pkl0Mb1dWFiKX1S2br.jpg",
        duration : 96,
        genre : "sci-fi, comedy",
        isFavorite : true,
        comingSoon: true,
    },
    {
        title : "50 First Dates",
        image : "https://image.tmdb.org/t/p/original/lzUI2Cg7OMfcUNv3f7MywYNBjs6.jpg",
        duration : 95,
        genre : "romance, comedy",
        isFavorite : true,
        comingSoon: false,
    },
    {
        title : "Dinotopia",
        image : "http://www.moriareviews.com/rongulator/wp-content/uploads/Dinotopia-2002-poster.jpg",
        duration : 250,
        genre : "adventure",
        isFavorite : true,
        comingSoon: false,
    },
    {
        title : "Cube",
        image: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/31b64051045451.58e115d8dac37.jpg",
        duration : 90,
        genre : "horror",
        isFavorite : false,
        comingSoon : false,
    },
    {
        title : "Atlantis: The Lost Empire",
        image: "https://amc-theatres-res.cloudinary.com/v1579117705/amc-cdn/production/2/movies/4000/3974/Poster/p_800x1200_AMC_AtlantisTheLostEmpire_12022019.jpg",
        duration : 95,
        genre : "adventure",
        isFavorite : false,
        comingSoon : false,
    }];
/*
<div class="col-12 col-md-6 col-lg-4 col-xl-3">
    <div class="pbu-movie-card">

        <div>
            <img src="https://www.themoviedb.org/t/p/original/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg" alt="Mission Impossible - Fallout" />
        </div>
        <div class="d-flex flex-row justify-content-between">
            <div class="d-flex flex-column">
                <!-- h3 and p -->
                <h3>Mission Impossible - Fallout</h3>
                <p>147 MIN | ADVENTURE</p>
            </div>
            <div>
                <!-- Heart -->
            </div>
        </div>
    </div>
</div>
*/
    // This here makes each movie card and diplays it in a certain container
    function createMovieCard(mainContainerID, foundMovie) {
        const mainContainer = document.getElementById(mainContainerID);
        const cardWrap = document.createElement("div");
        cardWrap.className = "col-12 col-md-6 col-lg-4 col-xl-3";

        const mainCard = document.createElement("div");
        mainCard.className = "pbu-movie-card";
        cardWrap.appendChild(mainCard);

        const movieImg = document.createElement("img");
        movieImg.src = foundMovie.image;
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

        const movieParagraph = document.createElement("p");
        movieParagraph.innerHTML = foundMovie.duration + " min | " + foundMovie.genre;
        movieTextOnly.appendChild(movieParagraph);

        if(foundMovie.isFavorite) {
            const movieHeart = document.createElement("div");
            movieHeart.id ="heart"
            movieTextBox.appendChild(movieHeart);
        }

        mainContainer.appendChild(cardWrap);
    };

    // Make movies inside the "opening this week" tab
    // Initialize loop variables
    let foundObjects = 0
    let i = 0;
    while(foundObjects < 8) {
        let foundMovie = movieDB[i];

        // Only create a moviecard if the movie is already out
        if(!foundMovie.comingSoon) {
            createMovieCard("opening-movies",foundMovie);
        }

        // Increment and check if the loop is broken by going over the array's length
        i++;
        if(i >= movieDB.length)
            break;
    };

    // Make movies inside the coming soon tab
    // Same thing...
    foundObjects = 0;
    i = 0;
    while(foundObjects < 4) {
        let foundMovie = movieDB[i];

        // ...except for showing the ones that aren't out
        if(foundMovie.comingSoon) {
            createMovieCard("coming-movies",foundMovie);
        }

        i++;
        if(i >= movieDB.length)
            break;
    };
};