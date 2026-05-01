/**
 * @file client.js
 * @description Classe Client — EthnicEats
 */

import Utilisateur from './utilisateur.js';

export class Client extends Utilisateur {
  constructor({
    id             = '',
    nomComplet     = '',
    email          = '',
    motDePasse     = '',
    budgetMax      = 0,
    sourcePreferee = '',
    priorite       = '',
    favoris        = [],
  } = {}) {
    super({ id, nomComplet, email, motDePasse, role: 'client' });
    this.budgetMax      = budgetMax;
    this.sourcePreferee = sourcePreferee;
    this.priorite       = priorite;
    this.favoris        = Array.isArray(favoris) ? favoris : [];
    this._validerClient();
  }

  _validerClient() {
    if (typeof this.budgetMax !== 'number' || this.budgetMax < 0)
      throw new Error('Client : budgetMax doit être un nombre positif ou nul.');
    const sourcesValides = ['souk', 'supermarche', 'mix', ''];
    if (!sourcesValides.includes(this.sourcePreferee))
      throw new Error(`Client : sourcePreferee invalide → "${this.sourcePreferee}".`);
    const prioritesValides = ['moins_cher', 'plus_rapide', 'plus_frais', ''];
    if (!prioritesValides.includes(this.priorite))
      throw new Error(`Client : priorite invalide → "${this.priorite}".`);
    if (!Array.isArray(this.favoris))
      throw new Error('Client : favoris doit être un tableau.');
  }

  definirPreferences(budget, source, priorite) {
    if (typeof budget !== 'number' || budget < 0)
      throw new Error('definirPreferences : budget invalide.');
    const sourcesValides = ['souk', 'supermarche', 'mix'];
    if (!sourcesValides.includes(source))
      throw new Error(`definirPreferences : source invalide → "${source}".`);
    const prioritesValides = ['moins_cher', 'plus_rapide', 'plus_frais'];
    if (!prioritesValides.includes(priorite))
      throw new Error(`definirPreferences : priorite invalide → "${priorite}".`);
    this.budgetMax      = budget;
    this.sourcePreferee = source;
    this.priorite       = priorite;
  }

  ajouterAuFavoris(recette) {
    if (!recette || typeof recette !== 'object')
      throw new Error('ajouterAuFavoris : recette invalide.');
    if (!recette.id)
      throw new Error('ajouterAuFavoris : la recette doit avoir un id.');
    const dejaPresent = this.favoris.some(f => f.id === recette.id);
    if (!dejaPresent) this.favoris.push(recette);
  }

  retirerDesFavoris(recetteId) {
    if (!recetteId) throw new Error('retirerDesFavoris : recetteId requis.');
    const index = this.favoris.findIndex(f => f.id === recetteId);
    if (index === -1) return false;
    this.favoris.splice(index, 1);
    return true;
  }

  estEnFavoris(recetteId) {
    return this.favoris.some(f => f.id === recetteId);
  }

  passerCommande() {
    if (!this.sourcePreferee || !this.priorite)
      throw new Error('passerCommande : les préférences doivent être définies.');
    return true;
  }

  obtenirPreferencesMap() {
    return new Map([
      ['budgetMax',      this.budgetMax],
      ['sourcePreferee', this.sourcePreferee],
      ['priorite',       this.priorite],
    ]);
  }

  versObjet() {
    return {
      ...super.versObjet(),
      budgetMax:      this.budgetMax,
      sourcePreferee: this.sourcePreferee,
      priorite:       this.priorite,
      favoris:        this.favoris.map(f => (typeof f.versObjet === 'function' ? f.versObjet() : f)),
    };
  }

  static depuisObjet(data) {
    return new Client(data);
  }
}

export default Client;
