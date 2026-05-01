/**
 * @file recette.js
 * @description Classe Recette — EthnicEats
 * Représente une recette de cuisine avec ses ingrédients et instructions.
 * Diagramme de classes : Recette est consultée par Client et compose des Ingrédients
 * Aucune dépendance Firebase — structure de données pure
 */

class Recette {
  /**
   * @param {Object}        data
   * @param {string}        data.id
   * @param {string}        data.titre
   * @param {string}        data.categorie      - ex : "marocain" | "italien" | "asiatique/japonais" …
   * @param {string}        data.description    - description culturelle courte
   * @param {Array<string>} data.etapes         - List<String> : étapes numérotées de préparation
   * @param {number}        data.prixEstime     - Double : prix estimé en MAD (base 1 portion)
   * @param {string}        [data.image]        - URL de l'image du plat
   * @param {string}        [data.difficulte]   - "facile" | "moyen" | "difficile"
   * @param {Array<Object>} [data.ingredients]  - liste d'Ingrédients associés (plain objects)
   * @param {boolean}       [data.populaire]    - true si affiché dans "Plats populaires"
   */
  constructor({
    id           = '',
    titre        = '',
    categorie    = '',
    description  = '',
    etapes       = [],
    prixEstime   = 0,
    image        = '',
    difficulte   = 'facile',
    ingredients  = [],
    populaire    = false,
  } = {}) {
    this.id          = id;
    this.titre       = titre;
    this.categorie   = categorie;
    this.description = description;
    this.etapes      = etapes;
    this.prixEstime  = prixEstime;
    this.image       = image;
    this.difficulte  = difficulte;
    this.ingredients = Array.isArray(ingredients) ? ingredients : [];
    this.populaire   = populaire;

    this._valider();
  }

  // ─── Validation ────────────────────────────────────────────────────────────

  /**
   * Valide tous les champs de la recette.
   * @throws {Error}
   */
  _valider() {
    if (typeof this.id !== 'string') {
      throw new Error('Recette : id doit être une chaîne.');
    }

    if (!this.titre || typeof this.titre !== 'string' || this.titre.trim().length < 2) {
      throw new Error('Recette : titre est obligatoire (min 2 caractères).');
    }

    if (!this.categorie || typeof this.categorie !== 'string' || this.categorie.trim() === '') {
      throw new Error('Recette : categorie est obligatoire.');
    }

    const categoriesValides = [
      'marocain', 'italien', 'mexicain', 'espagnol', 'français',
      'asiatique', 'asiatique/japonais', 'asiatique/chinois',
      'asiatique/coréen', 'asiatique/vietnamien', 'asiatique/indien',
    ];
    if (!categoriesValides.includes(this.categorie.toLowerCase())) {
      // Avertissement non bloquant — permet d'ajouter de nouvelles cuisines sans modifier le model
      console.warn(`Recette : catégorie non reconnue → "${this.categorie}".`);
    }

    if (typeof this.description !== 'string') {
      throw new Error('Recette : description doit être une chaîne.');
    }

    if (!Array.isArray(this.etapes)) {
      throw new Error('Recette : etapes doit être un tableau de chaînes.');
    }
    if (this.etapes.some(e => typeof e !== 'string')) {
      throw new Error('Recette : chaque étape doit être une chaîne de caractères.');
    }

    if (typeof this.prixEstime !== 'number' || this.prixEstime < 0) {
      throw new Error('Recette : prixEstime doit être un nombre positif ou nul.');
    }

    const difficultesValides = ['facile', 'moyen', 'difficile'];
    if (!difficultesValides.includes(this.difficulte)) {
      throw new Error(
        `Recette : difficulte invalide → "${this.difficulte}". ` +
        `Valeurs acceptées : ${difficultesValides.join(', ')}.`
      );
    }

    if (!Array.isArray(this.ingredients)) {
      throw new Error('Recette : ingredients doit être un tableau.');
    }

    if (typeof this.populaire !== 'boolean') {
      throw new Error('Recette : populaire doit être un booléen.');
    }
  }

  // ─── Méthodes (diagramme) ──────────────────────────────────────────────────

  /**
   * Retourne une description détaillée de la recette.
   * Correspond à getDetails(): String dans le diagramme.
   *
   * @returns {string}
   */
  getDetails() {
    const nbIngredients = this.ingredients.length;
    const nbEtapes      = this.etapes.length;

    return (
      `${this.titre} — ${this.categorie}\n` +
      `Difficulté : ${this.difficulte}\n` +
      `Ingrédients : ${nbIngredients}\n` +
      `Étapes : ${nbEtapes}\n` +
      `Prix estimé : ${this.prixEstime} MAD\n` +
      `Description : ${this.description}`
    );
  }

  /**
   * Calcule le prix total de la recette selon les préférences du client.
   * Correspond à calculerPrix(preferences: Map): Double dans le diagramme.
   *
   * Règles métier (décrites dans la doc) :
   *  - "souk"        → coefficient 0.8  (moins cher)
   *  - "supermarche" → coefficient 1.0  (prix standard)
   *  - "mix"         → coefficient 0.9  (intermédiaire)
   *  - priorite "moins_cher"  → −5 % supplémentaire
   *  - priorite "plus_frais"  → +5 % supplémentaire
   *  - priorite "plus_rapide" → pas d'impact sur le prix
   *
   * @param {Map<string, any>} preferences - Map retournée par Client.obtenirPreferencesMap()
   * @returns {number} prix calculé en MAD, arrondi à 2 décimales
   */
  calculerPrix(preferences) {
    if (!(preferences instanceof Map)) {
      throw new Error('calculerPrix : preferences doit être une instance de Map.');
    }

    const source   = preferences.get('sourcePreferee') || 'supermarche';
    const priorite = preferences.get('priorite')       || 'plus_rapide';

    const coeffSource = { souk: 0.8, supermarche: 1.0, mix: 0.9 };
    const coeffPrio   = { moins_cher: 0.95, plus_frais: 1.05, plus_rapide: 1.0 };

    const coeff = (coeffSource[source] ?? 1.0) * (coeffPrio[priorite] ?? 1.0);
    const prix  = this.prixEstime * coeff;

    return Math.round(prix * 100) / 100;
  }

  // ─── Méthodes métier complémentaires ───────────────────────────────────────

  /**
   * Retourne les ingrédients ajustés pour un nombre de portions donné.
   * Les quantités de base correspondent à 1 portion.
   *
   * @param {number} nbPortions - entier ≥ 1
   * @returns {Array<Object>} liste d'ingrédients avec quantités recalculées
   */
  obtenirIngredientsPourPortions(nbPortions) {
    if (!Number.isInteger(nbPortions) || nbPortions < 1) {
      throw new Error('obtenirIngredientsPourPortions : nbPortions doit être un entier ≥ 1.');
    }

    return this.ingredients.map(ing => ({
      ...ing,
      quantite: Math.round(((ing.quantite || 0) * nbPortions) * 1000) / 1000,
    }));
  }

  /**
   * Retourne le nombre d'ingrédients de la recette.
   * @returns {number}
   */
  get nbIngredients() {
    return this.ingredients.length;
  }

  // ─── Sérialisation ─────────────────────────────────────────────────────────

  /**
   * Sérialise en plain object.
   * @returns {Object}
   */
  versObjet() {
    return {
      id:          this.id,
      titre:       this.titre,
      categorie:   this.categorie,
      description: this.description,
      etapes:      [...this.etapes],
      prixEstime:  this.prixEstime,
      image:       this.image,
      difficulte:  this.difficulte,
      ingredients: this.ingredients.map(i => (typeof i.versObjet === 'function' ? i.versObjet() : { ...i })),
      populaire:   this.populaire,
    };
  }

  /**
   * Crée une instance Recette depuis un plain object.
   * @param {Object} data
   * @returns {Recette}
   */
  static depuisObjet(data) {
    return new Recette(data);
  }
}

if (typeof module !== 'undefined') module.exports = Recette;
