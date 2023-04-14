import openDatabase from '../../Components/OpenDatabase';
const db = openDatabase();

const supprimerJoueur = function(joueur_id) {

  return new Promise(function(resolve, reject) {

    selectGames(joueur_id, db).then((games) => {

      let arrayGames = null;

      if (games !== null) {

        arrayGames = games.map(game => { return game.partie_id });

      }

      db.transaction((tx) => {

        // si le joueur est dans des parties
        if (arrayGames !==  null) {

          //  boucle pour mettre à jour les données des parties
          for (var i = 0; i < arrayGames.length; i++) {

            let partie_id = arrayGames[i];

            tx.executeSql(`UPDATE parties SET nb_joueurs = nb_joueurs - 1, nb_joueurs_restant = nb_joueurs_restant - 1 WHERE partie_id = ?`, [ partie_id ], (_, { rows: _array } ) => {

              // suppression du joueur de la table infos_parties_joueurs
              tx.executeSql("DELETE FROM infos_parties_joueurs WHERE infos_parties_joueurs.joueur_id = ?", [joueur_id]);

              tx.executeSql("SELECT parties.nb_joueurs FROM parties WHERE parties.partie_id = ?", [partie_id], (_, { rows: { _array } } ) => {

                let nbJoueurs = _array[0].nb_joueurs;

                tx.executeSql("SELECT * FROM infos_parties_joueurs WHERE infos_parties_joueurs.partie_id = ?", [partie_id], (_, { rows: { _array } } ) => {

                  let compteur = 1;

                  for (var i = 0; i < nbJoueurs; i++) {

                    if( _array[i].score_joueur !== 0 && _array[i].position_joueur_en_cours !== null) {

                      // Mise à jour de la position des joueurs en cours qui n'ont pas fini la partie
                      tx.executeSql('UPDATE infos_parties_joueurs SET position_joueur_en_cours = ?, position_joueur = ? WHERE joueur_id = ? AND partie_id = ?', [compteur, i + 1, _array[i].joueur_id, partie_id]);

                      compteur++;

                    }

                  }

                });

                tx.executeSql("SELECT * FROM infos_parties_joueurs WHERE infos_parties_joueurs.partie_id = ?", [partie_id]);

              })

            });

          }

        }

        // suppression du joueur de la table joueurs
        tx.executeSql(`DELETE FROM joueurs WHERE joueur_id = ?`, [joueur_id]);

        resolve();

      })

    });


  })
}

const selectGames = function(joueur_id, db) {

  return new Promise(function(resolve, reject) {

    db.transaction((tx) => {

      tx.executeSql(
        `SELECT parties.partie_id, GROUP_CONCAT(infos_parties_joueurs.joueur_id) AS joueurs
          FROM parties
          INNER JOIN infos_parties_joueurs ON parties.partie_id = infos_parties_joueurs.partie_id
          INNER JOIN joueurs ON infos_parties_joueurs.joueur_id = joueurs.joueur_id
          GROUP BY infos_parties_joueurs.partie_id
          ORDER BY parties.partie_id DESC
          `
        , [], (_, { rows: { _array } }) => {

          const games = _array.map( game => {

            game.joueurs = game.joueurs.split(',');

            return game;

          })

          let filterGames = games.map(game => {

            let isInGame = null;

            for (const id_joueur of game.joueurs){

              if (id_joueur == joueur_id) {
                isInGame = "ok"
                break;
              } else {
                isInGame = null
              }

            }

            if (isInGame == "ok") {
              return game
            }
            else {

            }

          })

          filterGames = filterGames.filter(game => game !== undefined)


          resolve(filterGames);

        });

    });

  });

}

export default supprimerJoueur;
