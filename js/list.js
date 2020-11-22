const makeList = genreList => {
    var htmlGenreList = document.getElementById('videogame-genre-list');
    genreList.forEach(genre => {
        htmlGenreList.innerHTML += '<li><input type="checkbox" id="genre-' + genre + '" name="genre" value="' + genre + '" checked>' +
            '<label for="genre-' + genre + '">' + genre + '</label></li>';
    });
}