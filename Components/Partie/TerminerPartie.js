import openDatabase from '../../Components/OpenDatabase';
const db = openDatabase();

const terminerPartie = function(game_id, classement) {

  return new Promise(function(resolve, reject) {

    db.transaction((tx) => {
      // Mise à jour du statut de la partie en cours en finie
      tx.executeSql('UPDATE parties SET statut = ? WHERE partie_id = ?', ["finie", game_id]);

      for (let i = 0; i < classement.length; i++) {

        let positionJoueur = i + 1;

        if (classement[i].classement_joueur == null) {

          tx.executeSql('UPDATE infos_parties_joueurs SET classement_joueur = ? WHERE infos_parties_joueurs.joueur_id = ? AND infos_parties_joueurs.partie_id = ?', [ positionJoueur, classement[i].joueur_id, game_id]);

          if (positionJoueur <= 3) {
            // Ajoute un podium au total du nombre de podium du joueur
            tx.executeSql('UPDATE joueurs SET nb_podiums = nb_podiums + ? WHERE joueur_id = ?', [1, classement[i].joueur_id]);
          }

        }

        tx.executeSql(`SELECT joueurs.positions_parties FROM joueurs WHERE joueurs.joueur_id = ?`, [classement[i].joueur_id], (_, { rows: { _array } }) => {

          let positionsParties = _array[0].positions_parties;
          let positionsPartiesJSON = JSON.parse(positionsParties);

          let position = {
            "partie_id": game_id,
            "position": positionJoueur
          }

          positionsPartiesJSON.push(position);

          let positionsPartiesStringify = JSON.stringify(positionsPartiesJSON);

          // Ajoute la position du joueur dans la partie
          tx.executeSql('UPDATE joueurs SET positions_parties = ? WHERE joueur_id = ?', [positionsPartiesStringify, classement[i].joueur_id]);

        });

      }

    })
    resolve(game_id)
  })
}

export default terminerPartie;
