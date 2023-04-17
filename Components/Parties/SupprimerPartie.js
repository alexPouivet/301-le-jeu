import openDatabase from '../../Components/OpenDatabase';
const db = openDatabase();

const supprimerPartie = function(game_id) {

  return new Promise(function(resolve, reject) {

    db.transaction((tx) => {

      tx.executeSql(
        "SELECT infos_parties_joueurs.joueur_id, infos_parties_joueurs.score_joueur, infos_parties_joueurs.classement_joueur FROM infos_parties_joueurs WHERE infos_parties_joueurs.partie_id = ?", [game_id], (_, { rows: { _array } }) => {
          supprimerInfosPartie(game_id, db, _array).then(function() {
            resolve(game_id);
          })
        }
      );

    })

  })

}

const supprimerInfosPartie = function(game_id, db, joueurs) {

  return new Promise(function(resolve, reject) {

    db.transaction((tx) => {
      // supprime partie
      tx.executeSql(
        "DELETE FROM parties WHERE parties.partie_id = ?", [game_id]
      );
      // supprime infos partie joueurs participants
      tx.executeSql(
        "DELETE FROM infos_parties_joueurs WHERE infos_parties_joueurs.partie_id = ?", [game_id]
      );
      // mets à jour infos joueurs
      for (let i = 0; i < joueurs.length; i++) {

        let points = 301 - joueurs[i].score_joueur;
        // Mise a joueur Points joueur
        tx.executeSql('UPDATE joueurs SET nb_points = nb_points - ?, nb_parties = nb_parties - ? WHERE joueur_id = ?', [points, 1, joueurs[i].joueur_id]);

        //  Mise a jour Victoires joueur
        if (joueurs[i].classement_joueur == 1 && joueurs[i].score_joueur == 0) {

          tx.executeSql('UPDATE joueurs SET nb_victoires = nb_victoires - ? WHERE joueur_id = ?', [1, joueurs[i].joueur_id]);

        }

        // Mise a jour Podiums joueur
        if (joueurs[i].classement_joueur <= 3 && joueurs[i].classement_joueur !== null) {

          tx.executeSql('UPDATE joueurs SET nb_podiums = nb_podiums - ? WHERE joueur_id = ?', [1, joueurs[i].joueur_id]);

        }

        // Mise a jour Position joueur
        tx.executeSql(`SELECT joueurs.positions_parties, joueurs.joueur_id FROM joueurs WHERE joueurs.joueur_id = ?`, [joueurs[i].joueur_id], (_, { rows: { _array } }) => {

          let positionsParties = _array[0].positions_parties;
          let positionsPartiesJSON = JSON.parse(positionsParties);
          let position_partie = null;

          for (var i = 0; i < positionsPartiesJSON.length; i++) {

            if (positionsPartiesJSON[i].partie_id == game_id) {
              position_partie = i;
            }

          }

          positionsPartiesJSON.splice(position_partie, 1);
          let positionsPartiesStringify = JSON.stringify(positionsPartiesJSON);

          // Modifie la position du joueur dans la partie
          tx.executeSql('UPDATE joueurs SET positions_parties = ? WHERE joueur_id = ?', [positionsPartiesStringify, _array[0].joueur_id]);

        });

      }

    })
    resolve(game_id);
  })
}

export default supprimerPartie;
