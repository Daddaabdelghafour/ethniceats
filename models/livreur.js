/**
 * @file livreur.js
 * @description Classe Livreur — EthnicEats
 */

import Utilisateur from './utilisateur.js';

export class Livreur extends Utilisateur {
  constructor({
    id               = '',
    nomComplet       = '',
    email            = '',
    motDePasse       = '',
    telephoneContact = '',
    permisImage      = '',
    gainsTotaux      = 0,
    nbLivraisons     = 0,
    statutActuel     = 'disponible',
  } = {}) {
    super({ id, nomComplet, email, motDePasse, role: 'livreur' });
    this.telephoneContact = telephoneContact;
    this.permisImage      = permisImage;
    this.gainsTotaux      = gainsTotaux;
    this.nbLivraisons     = nbLivraisons;
    this.statutActuel     = statutActuel;
    this._validerLivreur();
  }

  _validerLivreur() {
    if (!this.telephoneContact || typeof this.telephoneContact !== 'string')
      throw new Error('Livreur : telephoneContact est obligatoire.');
    if (!Utilisateur.validerTelephone(this.telephoneContact))
      throw new Error(`Livreur : telephoneContact invalide → "${this.telephoneContact}".`);
    if (typeof this.gainsTotaux !== 'number' || this.gainsTotaux < 0)
      throw new Error('Livreur : gainsTotaux doit être un nombre positif ou nul.');
    if (!Number.isInteger(this.nbLivraisons) || this.nbLivraisons < 0)
      throw new Error('Livreur : nbLivraisons doit être un entier positif ou nul.');
    const statutsValides = ['disponible', 'en_livraison', 'indisponible'];
    if (!statutsValides.includes(this.statutActuel))
      throw new Error(`Livreur : statutActuel invalide → "${this.statutActuel}".`);
  }

  accepterCommande(idCommande) {
    if (!idCommande || typeof idCommande !== 'string')
      throw new Error('accepterCommande : idCommande invalide.');
    if (this.statutActuel === 'en_livraison')
      throw new Error('accepterCommande : le livreur a déjà une commande en cours.');
    if (this.statutActuel === 'indisponible')
      throw new Error('accepterCommande : le livreur est indisponible.');
    this.statutActuel = 'en_livraison';
  }

  mettreAJourStatut(statut) {
    const statutsValides = ['disponible', 'en_livraison', 'indisponible'];
    if (!statutsValides.includes(statut))
      throw new Error(`mettreAJourStatut : statut invalide → "${statut}".`);
    this.statutActuel = statut;
  }

  consulterStats() {
    return new Map([
      ['gainsTotaux',  this.gainsTotaux],
      ['nbLivraisons', this.nbLivraisons],
      ['statutActuel', this.statutActuel],
    ]);
  }

  enregistrerLivraison(fraisLivraison) {
    if (typeof fraisLivraison !== 'number' || fraisLivraison < 0)
      throw new Error('enregistrerLivraison : fraisLivraison invalide.');
    this.nbLivraisons += 1;
    this.gainsTotaux   = Math.round((this.gainsTotaux + fraisLivraison) * 100) / 100;
    this.statutActuel  = 'disponible';
  }

  modifierTelephoneContact(nouveauNumero) {
    if (!Utilisateur.validerTelephone(nouveauNumero))
      throw new Error(`modifierTelephoneContact : numéro invalide → "${nouveauNumero}".`);
    this.telephoneContact = nouveauNumero.trim();
  }

  versObjet() {
    return {
      ...super.versObjet(),
      telephoneContact: this.telephoneContact,
      permisImage:      this.permisImage,
      gainsTotaux:      this.gainsTotaux,
      nbLivraisons:     this.nbLivraisons,
      statutActuel:     this.statutActuel,
    };
  }

  static depuisObjet(data) {
    return new Livreur(data);
  }
}

export default Livreur;
