import { Bulbasaur } from './bulbasaur.js';
import { startGame } from './bulbasaur.js';
import $ from 'jquery';
import 'bootstrap';
import './styles.css';

$(document).ready(function() {
  let bulba = new Bulbasaur;
  $('#start-game').click(function(event) {
    event.preventDefault();
    bulba.increaseHunger($('#hunger-level'));
  });
  $('#feed').click(function(event) {
    event.preventDefault();
    let btn = $(this);
    btn.prop('disabled', true);
    setTimeout(function() {
      btn.prop('disabled', false);
    }, 1000);
    bulba.feed();
    let request = new XMLHttpRequest();
    const url = 'https://api.giphy.com/v1/gifs/search?api_key=3PLINuqhz03BffpRF1GEqFiAsHS4Aqv0&q=bulbasaur&limit=5&offset=0&rating=PG&lang=en';

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

    const getElements = function(response) {
      $('#bulba-been-fed').html(`<img src='${response.data[0].images.original.url}'>`);
    };
  });

  setInterval(() => {
    if (bulba.tooHungryWeOut() === true) {
      clearInterval(startGame);
      $('#bulba-out').text('Bulba ran away cause you no feed him :( If you would like to try again please refresh the browser');
    }
  }, 999);

});
