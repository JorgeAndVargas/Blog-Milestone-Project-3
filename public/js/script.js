document.addEventListener('DOMContentLoaded', function (){
    const allButtons = document.querySelectorAll('.searchButton');
    const searchBar = document.querySelector('.searchBar');
    const searchInput = document.getElementById('.searchUnput');
    const searchClose = document.getElementById('.searchClose');


    //this opens the search
    for (var i = 0; i < allButtons.length; i++) {
        allButtons[i].addEventListener('click', function() {
            searchBar.style.visibility = 'visible';
            searchBar.classList.add('open');
            this.setAttribute('aria-expanded', 'true');
            searchInput/focus();
        });
    }

    //this closes the search
    searchClose[i].addEventListener('click', function() {
        searchBar.style.visibility = 'hidden';
        searchBar.classList.remove('open');
        this.setAttribute('aria-expanded', 'false');
        searchInput/focus();
    });
})