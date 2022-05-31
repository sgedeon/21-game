export class Card {
    constructor (sabot){
        this.sabot = sabot;
    }

    deck(){
        //L'ensemble des variables pour afficher les information du tirage et afficher les cartes
        let suites = [["Pique","&spades;", "P"], ["Coeur","&hearts;", "C"], ["Trèfle","&clubs;", "T"], ["Carreau","&diams;","D"]];
        let cartes = [["2","2"], ["3","3"],["4","4"], ["5","5"], ["6","6"], ["7","7"], ["8","8"], ["9","9"], ["10","10"], ["Valet","V"], ["Reine","D"], ["Roi","R"], ["As","A"]];
        let sabot = [];

        for (let carte of cartes)
        {
            for(let suite of suites)
            {
                //Je transforme la string en un INT pour pouvoir exploiter le nombre de points
                let points = parseInt(carte);
                switch (carte[0]) {
                case "Valet":
                case "Reine": 
                case "Roi":
                //J'associe un nombre de points au figures et à l'AS
                    points = 10;
                    break;
                case "As":
                    points = 11;
                    break;
                }
                 //J'ajoute chaque carte au sabot
                let card = [carte,suite,points];
                sabot.push(card);
            }
        }
        return sabot;
        
    };

    // Retire une carte du jeu à chaque tour
    playerCard(){
        let card = Math.floor(Math.random() * this.sabot.length);
        let playerCard = this.sabot.splice(card, 1)[0];
        return playerCard;
    };
    
}


