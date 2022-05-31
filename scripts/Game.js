export class Game {
    constructor () {
    }

    /* Permet de trouver le prochain élément qui inclus un certain selecteur.
    La fonction n'est pas de moi, elle a par contre littéralement été un life saver 
    dans le cadre de ce TP. Elle parait simple mais il fallait y penser :)
    Je suis pas mal certain de réutiliser le "matches", que je ne 
    connaissais pas, à l'avenir.
    https://gomakethings.com/finding-the-next-and-previous-sibling-elements-that-match-a-selector-with-vanilla-js/*/

    getNextSibling(elem, selector) {
        var sibling = elem.nextElementSibling;
        while (sibling) {
            if (sibling.matches(selector)) return sibling;
            sibling = sibling.nextElementSibling
        }
    };

    // Gère le passage à un autre joueur
    nextPlayer() {
        let findme = this.elStop.parentNode;
        let nextStop = this.getNextSibling (findme, '.disabled')
        if (nextStop === undefined) {
            this.nextPlayerLast();
        } else {
        nextStop.classList.remove('disabled');
        }
    }

    // Gère le passage à un autre joueur si il est le dernier à joueur du tour
    nextPlayerLast() {
        if (this.elBoard.firstElementChild.classList.contains('disabled')){
            this.elBoard.firstElementChild.classList.remove('disabled')
        } else {
            let findme = this.elBoard.firstElementChild;
            let nextStop = this.getNextSibling (findme, '.disabled')
            if (nextStop !== undefined) {
                nextStop.classList.remove('disabled');
            }
        }
    }

   // Gestion de la fin de partie et de la comptabilité des scores
   scores (dom) {
        for (let i = 0; i < this.tabIndex.length; i++) {
            dom += `<p>Joueur ${[i+1]} : ${this.tabIndex[i]} points</p>`;
        }
        this.elBoard.firstElementChild.insertAdjacentHTML('beforebegin', dom)
   }

    // Gestion de la fin de partie et de la comptabilité des scores
    endGame () {
        let dom ="";
        let bestScore = Math.max.apply(0, this.tabIndex);
        let draw = [], i = -1;
        while ((i = this.tabIndex.indexOf(bestScore, i+1)) != -1){
            draw.push(i);
        }

        if (bestScore == "0") { 
            dom = `<h2 style="color:red;">Aucun gagnant:<h2>`;
            this.scores(dom, draw, bestScore);
        }

        if (draw.length > 1 && bestScore != "0") {
            dom = `<h2 style="color:red;">Aucun gagnant, les joueurs sont à égalité :<h2>`;
            this.scores(dom, draw, bestScore);
        } else if (bestScore != "0"){
            dom = `<h2 style="color:green;">Le joueur ${draw[0]+1} a gagné avec un score de ${bestScore} points !!<h2>`;
            this.scores(dom, draw, bestScore);
        }
    }
}