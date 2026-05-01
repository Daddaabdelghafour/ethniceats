/**
 * @file utilisateur.js
 * @description Classe de base Utilisateur — EthnicEats
 */

export class Utilisateur {
  constructor({ id = '', nomComplet = '', email = '', motDePasse = '', role = '' } = {}) {
    this.id         = id;
    this.nomComplet = nomComplet;
    this.email      = email;
    this.motDePasse = motDePasse;
    this.role       = role;
    this._valider();
  }

  _valider() {
    if (typeof this.id !== 'string') throw new Error('Utilisateur : id doit être une chaîne.');
    if (!this.nomComplet || typeof this.nomComplet !== 'string' || this.nomComplet.trim().length < 2)
      throw new Error('Utilisateur : nomComplet est obligatoire (min 2 caractères).');
    if (!this.email || typeof this.email !== 'string' || this.email.trim() === '')
      throw new Error('Utilisateur : email est obligatoire.');
    if (!Utilisateur.validerEmail(this.email))
      throw new Error(`Utilisateur : email invalide → "${this.email}".`);
    if (!this.motDePasse || typeof this.motDePasse !== 'string' || this.motDePasse.length < 6)
      throw new Error('Utilisateur : motDePasse obligatoire (min 6 caractères).');
    const rolesValides = ['client', 'livreur'];
    if (!rolesValides.includes(this.role))
      throw new Error(`Utilisateur : role invalide → "${this.role}".`);
  }

  sAuthentifier(email, motDePasse) {
    if (!email || !motDePasse) return false;
    return this.email === email && this.motDePasse === motDePasse;
  }

  modifierProfil(nouveauNom) {
    if (!nouveauNom || typeof nouveauNom !== 'string' || nouveauNom.trim().length < 2)
      throw new Error('modifierProfil : nouveauNom invalide.');
    this.nomComplet = nouveauNom.trim();
  }

  seDeconnecter() {
    this.id         = '';
    this.motDePasse = '';
  }

  static validerEmail(email) {
    if (typeof email !== 'string') return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  static validerTelephone(telephone) {
    if (typeof telephone !== 'string') return false;
    return /^\+?[\d\s\-()]{8,15}$/.test(telephone.trim());
  }

  versObjet() {
    return { id: this.id, nomComplet: this.nomComplet, email: this.email, role: this.role };
  }

  static depuisObjet(data) {
    return new Utilisateur(data);
  }
}

export default Utilisateur;
