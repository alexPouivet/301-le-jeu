import { registerRootComponent } from 'expo';

import openDatabase from './Components/OpenDatabase';
const db = openDatabase();

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

db.transaction((tx) => {
  tx.executeSql(" PRAGMA foreign_keys=on ");
  // suppression de la table game v1 dans la bdd
  tx.executeSql(
    "DROP TABLE IF EXISTS game"
  );
  // suppression de la table joueur v1 dans la bdd
  tx.executeSql(
    "DROP TABLE IF EXISTS joueur"
  );
  //
  // création de la table joueurs v2 dans la bdd
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS joueurs (joueur_id integer primary key not null, nom_joueur text, avatar_slug text, profil integer, nb_parties integer, nb_victoires integer, nb_points integer, nb_podiums integer, positions_parties text)"
  );
  // création de la table parties v2 dans la bdd
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS parties (partie_id integer primary key not null, date text, horaire time, statut text, nb_palets int, nb_joueurs int, nb_joueurs_restant int, tour_partie int, gagnant_partie text, tour_joueur int)"
  );
  // création de la table infos_parties_joueurs dans la bdd
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS infos_parties_joueurs (infos_parties_joueurs_id integer primary key not null, partie_id integer references parties(partie_id), joueur_id integer references joueurs(joueur_id), score_joueur int, tour_joueur int, classement_joueur int, position_joueur int, position_joueur_en_cours int)"
  );

});
