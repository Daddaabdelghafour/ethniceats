/**
 * @file ingredient.js
 * @description Classe Ingredient — EthnicEats
 * Représente un ingrédient utilisé dans une recette ou présent dans le panier.
 * Diagramme de classes : Ingredient est composé par Recette et contenu dans Commande
 * Aucune dépendance Firebase — structure de données pure
 */

class Ingredient {
  /**
   * @param {Object} data
   * @param {string} data.nom          - nom de l'ingrédient (ex : "Tomates")
   * @param {number} data.quantite     - Double : quantité nécessaire (ex : 0.5)
   * @param {string} data.unite        - unité de mesure : "g" | "kg" | "ml" | "l" | "unite" | "pack"
   * @param {number} data.prixUnitaire - Double : prix par unité/kg/pack en MAD
   * @param {string} [data.id]         - identifiant unique de l'ingrédient
   * @param {string} [data.image]      - URL de l'image de l'ingrédient
   * @param {string} [data.source]     - "souk" | "supermarche" | "mix" (source d'approvisionnement)
   * @param {string} [data.typeVente]  - "flexible" | "pack" (flexible = g/kg, pack = unité fixe)
   * @param {number} [data.taillepack] - Double : taille d'un pack en unité (ex : 1 pour 1kg de riz)
   */
  constructor({
    id           = '',
    nom          = '',
    quantite     = 0,
    unite        = '',
    prixUnitaire = 0,
    image        = '',
    source       = '',
    typeVente    = 'flexible',
    taillePack   = 1,
  } = {}) {
    this.id           = id;
    this.nom          = nom;
    this.quantite     = quantite;
    this.unite        = unite;
    this.prixUnitaire = prixUnitaire;
    this.image        = image;
    this.source       = source;
    this.typeVente    = typeVente;
    this.taillePack   = taillePack;

    this._valider();
  }

  // ─── Validation ────────────────────────────────────────────────────────────

  /**
   * Valide tous les champs de l'ingrédient.
   * @throws {Error}
   */
  _valider() {
    if (typeof this.id !== 'string') {
      throw new Error('Ingredient : id doit être une chaîne.');
    }

    if (!this.nom || typeof this.nom !== 'string' || this.nom.trim().length < 1) {
      throw new Error('Ingredient : nom est obligatoire.');
    }

    if (typeof this.quantite !== 'number' || this.quantite < 0) {
      throw new Error(`Ingredient "${this.nom}" : quantite doit être un nombre positif ou nul.`);
    }

    const unitesValides = ['g', 'kg', 'ml', 'l', 'unite', 'pack'];
    if (!unitesValides.includes(this.unite)) {
      throw new Error(
        `Ingredient "${this.nom}" : unite invalide → "${this.unite}". ` +
        `Valeurs acceptées : ${unitesValides.join(', ')}.`
      );
    }

    if (typeof this.prixUnitaire !== 'number' || this.prixUnitaire < 0) {
      throw new Error(`Ingredient "${this.nom}" : prixUnitaire doit être un nombre positif ou nul.`);
    }

    if (typeof this.image !== 'string') {
      throw new Error(`Ingredient "${this.nom}" : image doit être une chaîne.`);
    }

    const sourcesValides = ['souk', 'supermarche', 'mix', ''];
    if (!sourcesValides.includes(this.source)) {
      throw new Error(
        `Ingredient "${this.nom}" : source invalide → "${this.source}". ` +
        `Valeurs acceptées : souk, supermarche, mix.`
      );
    }

    const typesVenteValides = ['flexible', 'pack'];
    if (!typesVenteValides.includes(this.typeVente)) {
      throw new Error(
        `Ingredient "${this.nom}" : typeVente invalide → "${this.typeVente}". ` +
        `Valeurs acceptées : flexible, pack.`
      );
    }

    if (typeof this.taillePack !== 'number' || this.taillePack <= 0) {
      throw new Error(`Ingredient "${this.nom}" : taillePack doit être un nombre strictement positif.`);
    }
  }

  // ─── Méthodes métier ───────────────────────────────────────────────────────

  /**
   * Calcule le prix total de cet ingrédient selon sa quantité et son prixUnitaire.
   * Tient compte du typeVente : pour un "pack", la quantité est arrondie
   * au nombre de packs nécessaires (arrondi supérieur).
   *
   * @returns {number} prix en MAD, arrondi à 2 décimales
   */
  calculerPrixTotal() {
    let quantiteFacturee;

    if (this.typeVente === 'pack') {
      // Arrondir au nombre de packs entiers nécessaires
      const nbPacks     = Math.ceil(this.quantite / this.taillePack);
      quantiteFacturee  = nbPacks * this.taillePack;
    } else {
      // Produit flexible : facturation exacte à la quantité
      quantiteFacturee = this.quantite;
    }

    const prix = quantiteFacturee * this.prixUnitaire;
    return Math.round(prix * 100) / 100;
  }

  /**
   * Adapte la quantité aux formats de vente réels selon les préférences du client.
   * - "souk"        → prix ×0.8
   * - "supermarche" → prix ×1.0
   * - "mix"         → prix ×0.9
   * Met également à jour la source de l'ingrédient.
   *
   * @param {Map<string, any>} preferences - Map retournée par Client.obtenirPreferencesMap()
   * @returns {number} prixUnitaire ajusté, arrondi à 4 décimales
   */
  appliquerPreferences(preferences) {
    if (!(preferences instanceof Map)) {
      throw new Error('appliquerPreferences : preferences doit être une instance de Map.');
    }

    const sourceClient = preferences.get('sourcePreferee') || 'supermarche';
    const coeffSource  = { souk: 0.8, supermarche: 1.0, mix: 0.9 };
    const coeff        = coeffSource[sourceClient] ?? 1.0;

    this.source       = sourceClient;
    this.prixUnitaire = Math.round(this.prixUnitaire * coeff * 10000) / 10000;

    return this.prixUnitaire;
  }

  /**
   * Ajuste la quantité selon un nombre de portions.
   * Modifie l'instance en place et retourne la nouvelle quantité.
   *
   * @param {number} nbPortions - entier ≥ 1
   * @param {number} quantiteBase - quantité pour 1 portion
   * @returns {number} quantité ajustée
   */
  ajusterQuantitePourPortions(nbPortions, quantiteBase) {
    if (!Number.isInteger(nbPortions) || nbPortions < 1) {
      throw new Error('ajusterQuantitePourPortions : nbPortions doit être un entier ≥ 1.');
    }
    if (typeof quantiteBase !== 'number' || quantiteBase <= 0) {
      throw new Error('ajusterQuantitePourPortions : quantiteBase doit être un nombre > 0.');
    }

    this.quantite = Math.round(quantiteBase * nbPortions * 1000) / 1000;
    return this.quantite;
  }

  /**
   * Retourne la quantité affichée en format lisible avec son unité.
   * Ex : "500 g", "1.5 kg", "2 pack"
   *
   * @returns {string}
   */
  quantiteFormatee() {
    return `${this.quantite} ${this.unite}`;
  }

  /**
   * Retourne le nombre de packs nécessaires pour couvrir la quantité demandée.
   * Uniquement pertinent pour typeVente === "pack".
   *
   * @returns {number} entier (arrondi supérieur)
   */
  get nbPacksNecessaires() {
    if (this.typeVente !== 'pack') return null;
    return Math.ceil(this.quantite / this.taillePack);
  }

  // ─── Sérialisation ─────────────────────────────────────────────────────────

  /**
   * Sérialise en plain object.
   * @returns {Object}
   */
  versObjet() {
    return {
      id:           this.id,
      nom:          this.nom,
      quantite:     this.quantite,
      unite:        this.unite,
      prixUnitaire: this.prixUnitaire,
      image:        this.image,
      source:       this.source,
      typeVente:    this.typeVente,
      taillePack:   this.taillePack,
    };
  }

  /**
   * Crée une instance Ingredient depuis un plain object.
   * @param {Object} data
   * @returns {Ingredient}
   */
  static depuisObjet(data) {
    return new Ingredient(data);
  }

  /**
   * Crée une copie indépendante de l'instance (utile pour le panier).
   * @returns {Ingredient}
   */
  cloner() {
    return new Ingredient(this.versObjet());
  }
}

if (typeof module !== 'undefined') module.exports = Ingredient;
