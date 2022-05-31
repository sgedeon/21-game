import { Game } from './Game.js';
import { Card } from './Card.js';

let PlayerEnd = 0;

export class Player extends Game {
    constructor (joueur, elBoard, elStop, elStart, tabIndex, index, sabot) {
        super ()
        this.joueur = joueur;
        this.elStop = elStop;
        this.elStart = elStart;
        this.elBoard = elBoard;
        this.index = index;
        this.tabIndex = tabIndex;
        this.sabot = sabot;
        this.playerPoints = 0;
        this.play();
        this.stop();
    }

    // Gère la fonction jouer de chaque joueur
    play() {
        PlayerEnd = this.tabIndex.length + this.tabIndex.length;
        // Variable à décrémenter dès qu'un joueur ne peut plus jouer
        this.elStart.addEventListener('click',function() {
            let playerResults = new Card (this.sabot).playerCard();
            this.playerPoints += playerResults[2];
            this.tabIndex[this.index-1] = this.playerPoints;
            this.elStart.parentNode.classList.add('disabled');

            // Comportements si le score joueur dépasse 21
            if (this.playerPoints > 21) {
                this.tabIndex[this.index-1] = 0;
                this.elStop.parentNode.setAttribute('class','endPlay');
                PlayerEnd--;
                if (PlayerEnd == this.tabIndex.length) {
                    this.endGame();
                }
                this.joueur.insertAdjacentHTML('afterbegin', "<p>Vous avez dépassé 21 looser!!</p>")
                if (!this.elStop.parentNode.nextElementSibling) {
                    this.nextPlayerLast();
                } else {
                    this.nextPlayer();
                }
            } 

            // Comportement si le score du joueur est égale à 21
            if (this.playerPoints == 21) {
                this.tabIndex[this.index-1] = this.playerPoints;
                this.endGame();
            }

            // Comportement du dernier élément 
            if (!this.elStop.parentNode.nextElementSibling && this.playerPoints != 21) {
                this.nextPlayerLast();
            }

            /* Comportement si le score du joueur est en dessous de 21 
                et qu'il n'est pas le dernier du tour */
            if (this.playerPoints < 21 && this.elStop.parentNode.nextElementSibling) {
                this.nextPlayer();
            }

            if (this.playerPoints <= 21) {
                if (playerResults[0][0] === "Reine") {
                    this.joueur.insertAdjacentHTML('afterbegin', `<p>Vous avez tirez une ${playerResults[0][0]} de ${playerResults[1][0]} pour un total de ${this.playerPoints} points</p></div>`);
                    this.joueur.insertAdjacentHTML('beforebegin', `<div class="cardstack" style="font-size: 12px;"><div class="card rank${playerResults[0][0]}${playerResults[1][2]}">${playerResults[0][1]}<br/>${playerResults[1][1]}</div>`);
                } else {
                    this.joueur.insertAdjacentHTML('afterbegin', `<p>Vous avez tirez un ${playerResults[0][0]} de ${playerResults[1][0]} pour un total de ${this.playerPoints} points</p></div>`);
                    this.joueur.insertAdjacentHTML('beforebegin', `<div class="cardstack" style="font-size: 12px;"><div class="card rank${playerResults[0][0]}${playerResults[1][2]}">${playerResults[0][1]}<br/>${playerResults[1][1]}</div>`);
                }
            }
        }.bind(this));
    }

    // Gère la sortie volontaire d'un joueur de la partie
    stop() {
        this.elStop.addEventListener('click',function() {
            this.tabIndex[this.index-1] = this.playerPoints;
            console.log(this.tabIndex);
            this.elStop.parentNode.setAttribute('class','endPlay');
            PlayerEnd--;
            if (PlayerEnd == this.tabIndex.length) {
                this.endGame();
            }
            if (!this.elStop.parentNode.nextElementSibling) {
                this.nextPlayerLast();
            } else {
                this.nextPlayer();
            }
            this.joueur.insertAdjacentHTML('afterbegin', `<p>Vous avez arrêtez de jouer et votre total de points est de ${this.playerPoints}</p></div>`);
        }.bind(this))
    }
}
