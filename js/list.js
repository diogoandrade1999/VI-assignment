const makeList = groupGenre => {
    var htmlGenreList = document.getElementById('videogame-genre-list');
    Object.keys(groupGenre).forEach(genre => {
        htmlGenreList.innerHTML += '<li><input type="checkbox" id="genre-' + genre + '" name="genre" value="' + genre + '" checked>' +
            '<label for="genre-' + genre + '">' + genre + '</label></li>';
    });
}