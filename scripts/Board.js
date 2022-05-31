import { Player } from './Player.js';
import { Card } from './Card.js';

export class Board {
    constructor (elForm, elGame) {
        this.nbJoueurs = 0;
        this.elForm = elForm;
        this.elGame = elGame;
        this.elSubmit = this.elForm.querySelector('[data-js-submit]');
        this.elJoueurs = this.elForm.querySelector('[data-js-joueurs]');
        this.elParties = this.elForm.querySelector('[data-js-nbparties]');
        this.elBoard = this.elGame.querySelector('[data-js-board]');
        this.elRestart = this.elGame.querySelector('[data-js-restart]');
        this.start();
        this.restart();
    }

    //Gestion du nombres de parties terminées avec le session storage
    parties() {
        if(sessionStorage.getItem("parties") == null)
            sessionStorage.setItem("parties", JSON.stringify(0));

        let counterValue = Number(sessionStorage.getItem("counter"));
        sessionStorage.setItem("counter",JSON.stringify(counterValue + 1));

        return sessionStorage.getItem("counter");
    }

    //Gère la sélection du nombre de joueurs
    selecJoueurs() {
        this.elJoueurs.addEventListener('change', function() {
            this.nbJoueurs = parseInt(this.elJoueurs.value);
        }.bind(this));
    }

    //Gère le lancement d'une partie
    start() {
        this.elSubmit.addEventListener('click',function() {
            this.nbJoueurs = parseInt(this.elJoueurs.value);
            let nbparties = this.parties();
            this.sabot = new Card().deck(); 
            this.elParties.innerHTML = `Parties terminées: ${nbparties}`;
            this.elForm.classList.add('hidden');
            this.elGame.classList.remove('hidden');
            this.afficheJoueur();
        }.bind(this));
    }   

    //Relance une procédure de nouvelle partie
    restart() {
        this.elRestart.addEventListener('click',function() {
            this.nbJoueurs = parseInt(this.elJoueurs.value); 
            while(this.elBoard.hasChildNodes()) {
                this.elBoard.removeChild(this.elBoard.lastChild);
            }
            this.elForm.classList.remove('hidden');
            this.elGame.classList.add('hidden');
        }.bind(this));
    }

    //Mets la table de jeu en forme
    afficheJoueur() {
        let joueurDom = "";
        let tabIndex = [];
        let index = "";
        //Injecte les éléments voulus au DOM à l'instenciation d'une partie
        for (let i = 1; i < this.nbJoueurs + 1; i++) {
            if (i == 1) {
                joueurDom =    
                `<p>Joueur ${[i]}</p>
                 <div data-js-player="${[i]}"">
                    <button class="start" data-js-play="${[i]}">Jouer</button>
                    <button class="stop" data-js-stop="${[i]}">Stop</button>
                </div>`;
            }
            else {
                joueurDom =    
                `<p>Joueur ${[i]}</p>
                <div data-js-player="${[i]}" class="disabled"">
                    <button class="start" data-js-play="${[i]}">Jouer</button>
                    <button class="stop" data-js-stop="${[i]}">Stop</button>
                </div>`;
            }
            index = i;
            tabIndex.push(index);
            this.elBoard.insertAdjacentHTML('beforeend', joueurDom);
            this.joueur = this.elGame.querySelector(`[data-js-player="${i}"]`);
            this.elStop = this.elGame.querySelector(`[data-js-stop="${i}"]`);
            this.elStart = this.elGame.querySelector(`[data-js-play="${i}"]`);
            //Instanciation de la classe player pour chaque joueur
            new Player (this.joueur, this.elBoard, this.elStop,this.elStart, tabIndex, index, this.sabot);
        }
	}
}
