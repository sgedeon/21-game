import { Board } from './Board.js';

(function() {

    let elForm = document.querySelector('[data-js-form]');
    let elGame = document.querySelector('[data-js-game]');
    if (elForm && elGame) {
        new Board (elForm, elGame);
    }

})();








