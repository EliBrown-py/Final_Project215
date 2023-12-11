const setUpMovies = () => {
    const popularMoviesSearchBar = $('#popularMoviesSearchBar');
    const notification = $('#notification');
    let popularMoviesData = []; 
    let watchlist = [];
//Get the data from the API 
    const fetchPopularMovies = () => {
        $.ajax({
            type: "GET",
            url: "https://api.themoviedb.org/3/movie/popular",
            data: {
                api_key: "e850dc9acce537861c54fe0e3a07d366",
                language: "en-US",
                page: 1,
            },
            dataType: "json",
            success: function (data) {
                console.log("Popular Movies Data:", data.results);
                popularMoviesData = data.results;
                displayPopularMovies(popularMoviesData);
            },
            error: function (xhr, status, error) {
                alert(
                    "Result: " +
                    status +
                    " " +
                    error +
                    " " +
                    xhr.status +
                    " " +
                    xhr.statusText
                );
            },
        });
    };
    //Display the result if getting the data from the api was successful
    const displayPopularMovies = (movies) => {
        const popularMoviesList = $("#popularMoviesList");
        popularMoviesList.empty();
        movies.forEach((movie) => {
            let movieItem = createMovieItem(movie);
            popularMoviesList.append(movieItem);
        });
    };
    //create movie items 
    const createMovieItem = (movie, isOnWatchlist = false) => {
        let movieItem = $("<li>").addClass("movie");
        $("<h2>").text(movie.title).appendTo(movieItem);
        $("<p>").text("Release Date: " + movie.release_date).appendTo(movieItem);
        $("<img>").attr("src", "https://image.tmdb.org/t/p/w200" + movie.poster_path).appendTo(movieItem);

        
        const buttonText = isOnWatchlist ? 'Remove' : 'Add to Watchlist';
        const buttonFunction = isOnWatchlist ? removeFromWatchlist : addToWatchlist;

        const watchlistButton = $('<button>').text(buttonText).click(function () {
            buttonFunction(movie);
        });
        watchlistButton.appendTo(movieItem);

        return movieItem;
    };
//Search for popular movies 
    const findPopularMovies = (searchTerm) => {
        const filteredPopularMovies = popularMoviesData.filter(function (movie) {
            return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
        });
        displayPopularMovies(filteredPopularMovies);
    };

    const addToWatchlist = (movie) => {
        watchlist.push(movie);
        updateWatchlistUI();
        showNotification('Added to Watchlist');
    };

    const removeFromWatchlist = (movie) => {
        const index = watchlist.findIndex(item => item.id === movie.id);
        if (index !== -1) {
            watchlist.splice(index, 1);
        }
        updateWatchlistUI();
        showNotification('Removed from Watchlist');
    };
//Update the webpage 
    const updateWatchlistUI = () => {
        const watchlistSection = $('#watchlist');
        watchlistSection.empty();
        watchlist.forEach(movie => {
            const movieItem = createMovieItem(movie, true);
            movieItem.appendTo(watchlistSection);
        });
    };

    const showNotification = (message) => {
        notification.text(message).fadeIn(500).delay(1500).fadeOut(500);
    };


    popularMoviesSearchBar.on('input', function () {
        const searchTerm = $(this).val().trim();
        findPopularMovies(searchTerm);
    });

    // Fetch and display popular movies
    fetchPopularMovies();
}; 
$(document).ready(setUpMovies);
