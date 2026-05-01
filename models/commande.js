/**
 * @file commande.js
 * @description Classe Commande — EthnicEats
 * Représente une commande passée par un client et livrée par un livreur.
 * Diagramme de classes : Commande est passée par Client, livrée par Livreur,
 *                        et contient des Ingrédients.
 * Aucune dépendance Firebase — structure de données pure
 */

export class Commande {
  /**
   * Statuts valides dans l'ordre du cycle de vie (doc + diagramme d'états)
   */
  static STATUTS = [
    'commande_passee',
    'confirmee',
    'en_preparation',
    'en_livraison',
    'arrive',
    'livree',
  ];

  /**
   * Modes de paiement acceptés
   */
  static MODES_PAIEMENT = ['livraison', 'carte'];

  /**
   * @param {Object}        data
   * @param {string}        data.id               - identifiant unique (ex : "ORD-1024")
   * @param {Date|string}   data.dateCreation      - Date de création de la commande
   * @param {string}        data.statut            - statut courant (voir STATUTS)
   * @param {number}        data.prixTotal         - Double : total TTC en MAD
   * @param {Array<string>} data.itineraire        - List<String> : points de collecte (max 2)
   * @param {Array<Object>} data.ingredients       - ingrédients commandés (plain objects)
   * @param {string}        data.clientId          - id du Client ayant passé la commande
   * @param {string}        [data.livreurId]       - id du Livreur assigné (vide avant confirmation)
   * @param {string}        [data.modePaiement]    - "livraison" | "carte"
   * @param {number}        [data.fraisLivraison]  - Double : frais de livraison en MAD
   * @param {number}        [data.sousTotal]       - Double : sous-total hors frais en MAD
   * @param {Object}        [data.adresseLivraison]- { adresse, ville, telephone }
   * @param {number}        [data.tempsEstime]     - Integer : temps estimé en minutes
   */
  constructor({
    id               = '',
    dateCreation     = new Date(),
    statut           = 'commande_passee',
    prixTotal        = 0,
    itineraire       = [],
    ingredients      = [],
    clientId         = '',
    livreurId        = '',
    modePaiement     = 'livraison',
    fraisLivraison   = 0,
    sousTotal        = 0,
    adresseLivraison = {},
    tempsEstime      = 30,
  } = {}) {
    this.id               = id;
    this.dateCreation     = dateCreation instanceof Date ? dateCreation : new Date(dateCreation);
    this.statut           = statut;
    this.prixTotal        = prixTotal;
    this.itineraire       = Array.isArray(itineraire)  ? itineraire  : [];
    this.ingredients      = Array.isArray(ingredients) ? ingredients : [];
    this.clientId         = clientId;
    this.livreurId        = livreurId;
    this.modePaiement     = modePaiement;
    this.fraisLivraison   = fraisLivraison;
    this.sousTotal        = sousTotal;
    this.adresseLivraison = adresseLivraison && typeof adresseLivraison === 'object'
      ? adresseLivraison
      : {};
    this.tempsEstime      = tempsEstime;

    this._valider();
  }

  // ─── Validation ────────────────────────────────────────────────────────────

  /**
   * Valide tous les champs de la commande.
   * @throws {Error}
   */
  _valider() {
    if (!this.id || typeof this.id !== 'string') {
      throw new Error('Commande : id est obligatoire.');
    }

    if (!(this.dateCreation instanceof Date) || isNaN(this.dateCreation.getTime())) {
      throw new Error('Commande : dateCreation invalide.');
    }

    if (!Commande.STATUTS.includes(this.statut)) {
      throw new Error(
        `Commande : statut invalide → "${this.statut}". ` +
        `Valeurs acceptées : ${Commande.STATUTS.join(', ')}.`
      );
    }

    if (typeof this.prixTotal !== 'number' || this.prixTotal < 0) {
      throw new Error('Commande : prixTotal doit être un nombre positif ou nul.');
    }

    if (!Array.isArray(this.itineraire)) {
      throw new Error('Commande : itineraire doit être un tableau.');
    }
    if (this.itineraire.length > 2) {
      throw new Error('Commande : itineraire ne peut pas dépasser 2 points de collecte (doc métier).');
    }
    if (this.itineraire.some(p => typeof p !== 'string')) {
      throw new Error('Commande : chaque point de l\'itineraire doit être une chaîne.');
    }

    if (!Array.isArray(this.ingredients) || this.ingredients.length === 0) {
      throw new Error('Commande : ingredients est obligatoire et ne peut pas être vide.');
    }

    if (!this.clientId || typeof this.clientId !== 'string') {
      throw new Error('Commande : clientId est obligatoire.');
    }

    if (typeof this.livreurId !== 'string') {
      throw new Error('Commande : livreurId doit être une chaîne.');
    }

    if (!Commande.MODES_PAIEMENT.includes(this.modePaiement)) {
      throw new Error(
        `Commande : modePaiement invalide → "${this.modePaiement}". ` +
        `Valeurs acceptées : ${Commande.MODES_PAIEMENT.join(', ')}.`
      );
    }

    if (typeof this.fraisLivraison !== 'number' || this.fraisLivraison < 0) {
      throw new Error('Commande : fraisLivraison doit être un nombre positif ou nul.');
    }

    if (typeof this.sousTotal !== 'number' || this.sousTotal < 0) {
      throw new Error('Commande : sousTotal doit être un nombre positif ou nul.');
    }

    if (!Number.isInteger(this.tempsEstime) || this.tempsEstime < 0) {
      throw new Error('Commande : tempsEstime doit être un entier positif ou nul (en minutes).');
    }

    this._validerAdresse(this.adresseLivraison);
  }

  /**
   * Valide l'objet adresse de livraison.
   * @param {Object} adresse
   */
  _validerAdresse(adresse) {
    if (typeof adresse !== 'object' || adresse === null) {
      throw new Error('Commande : adresseLivraison doit être un objet.');
    }
    // Champs obligatoires uniquement au moment du checkout (statut > commande_passee)
    if (this.statut !== 'commande_passee' && this.statut !== 'confirmee' && this.statut !== 'en_preparation' && this.statut !== 'en_livraison' && this.statut !== 'arrive' && this.statut !== 'livree') {
      const champsReq = ['adresse', 'ville', 'telephone'];
      for (const champ of champsReq) {
        if (!adresse[champ] || typeof adresse[champ] !== 'string') {
          throw new Error(`Commande : adresseLivraison.${champ} est obligatoire après création.`);
        }
      }
    }
  }

  // ─── Méthodes (diagramme) ──────────────────────────────────────────────────

  /**
   * Synchronise le statut de la commande vers l'étape suivante du cycle de vie.
   * Correspond à synchroniserStatut(): void dans le diagramme.
   * La persistance Firebase est déléguée au contrôleur.
   *
   * @returns {string} nouveau statut
   * @throws {Error} si la commande est déjà livrée
   */
  synchroniserStatut() {
    const indexActuel = Commande.STATUTS.indexOf(this.statut);

    if (indexActuel === -1) {
      throw new Error(`synchroniserStatut : statut courant inconnu → "${this.statut}".`);
    }
    if (indexActuel === Commande.STATUTS.length - 1) {
      throw new Error('synchroniserStatut : la commande est déjà au statut final "livree".');
    }

    this.statut = Commande.STATUTS[indexActuel + 1];
    return this.statut;
  }

  /**
   * Archive la commande une fois livrée.
   * Correspond à archiver(): void dans le diagramme.
   * Marque la commande comme archivée (déplacée vers l'historique côté contrôleur).
   *
   * @returns {boolean} true si l'archivage est possible
   * @throws {Error} si la commande n'est pas encore livrée
   */
  archiver() {
    if (this.statut !== 'livree') {
      throw new Error(
        `archiver : impossible d'archiver une commande au statut "${this.statut}". ` +
        `La commande doit être au statut "livree".`
      );
    }
    this.archivee = true;
    return true;
  }

  // ─── Méthodes métier complémentaires ───────────────────────────────────────

  /**
   * Assigne un livreur à la commande.
   * Appelé par le contrôleur quand un livreur accepte la commande.
   * Met automatiquement le statut à "confirmee".
   *
   * @param {string} livreurId
   */
  assignerLivreur(livreurId) {
    if (!livreurId || typeof livreurId !== 'string') {
      throw new Error('assignerLivreur : livreurId invalide.');
    }
    if (this.statut !== 'commande_passee') {
      throw new Error('assignerLivreur : un livreur ne peut être assigné que sur une commande en attente.');
    }

    this.livreurId = livreurId;
    this.statut    = 'confirmee';
  }

  /**
   * Calcule le temps estimé de livraison selon les préférences du client.
   * Base : 30 min. "plus_rapide" → −5 min, "plus_frais" → +5 min.
   *
   * @param {Map<string, any>} preferences - Map retournée par Client.obtenirPreferencesMap()
   * @returns {number} temps estimé en minutes (entier)
   */
  calculerTempsEstime(preferences) {
    if (!(preferences instanceof Map)) {
      throw new Error('calculerTempsEstime : preferences doit être une instance de Map.');
    }

    const priorite    = preferences.get('priorite') || 'plus_rapide';
    const ajustements = { plus_rapide: -5, moins_cher: 0, plus_frais: 5 };
    const ajust       = ajustements[priorite] ?? 0;

    this.tempsEstime = Math.max(20, 30 + ajust); // plancher à 20 min
    return this.tempsEstime;
  }

  /**
   * Vérifie si la commande est active (non archivée et non livrée).
   * @returns {boolean}
   */
  estActive() {
    return this.statut !== 'livree' && !this.archivee;
  }

  /**
   * Retourne le libellé lisible du statut courant (pour affichage badge UI).
   * @returns {string}
   */
  get libelleStatut() {
    const libelles = {
      commande_passee: 'Commande passée',
      confirmee:       'Confirmée',
      en_preparation:  'En préparation',
      en_livraison:    'En livraison',
      arrive:          'Arrivé',
      livree:          'Livrée',
    };
    return libelles[this.statut] || this.statut;
  }

  /**
   * Retourne le nombre d'ingrédients dans la commande.
   * @returns {number}
   */
  get nbIngredients() {
    return this.ingredients.length;
  }

  /**
   * Génère un identifiant de commande unique au format "ORD-XXXX".
   * @returns {string}
   */
  static genererIdCommande() {
    const num = Math.floor(1000 + Math.random() * 9000);
    return `ORD-${num}`;
  }

  // ─── Sérialisation ─────────────────────────────────────────────────────────

  /**
   * Sérialise en plain object.
   * @returns {Object}
   */
  versObjet() {
    return {
      id:               this.id,
      dateCreation:     this.dateCreation.toISOString(),
      statut:           this.statut,
      prixTotal:        this.prixTotal,
      itineraire:       [...this.itineraire],
      ingredients:      this.ingredients.map(i => (typeof i.versObjet === 'function' ? i.versObjet() : { ...i })),
      clientId:         this.clientId,
      livreurId:        this.livreurId,
      modePaiement:     this.modePaiement,
      fraisLivraison:   this.fraisLivraison,
      sousTotal:        this.sousTotal,
      adresseLivraison: { ...this.adresseLivraison },
      tempsEstime:      this.tempsEstime,
      archivee:         this.archivee || false,
    };
  }

  /**
   * Crée une instance Commande depuis un plain object (ex : snapshot Firestore).
   * @param {Object} data
   * @returns {Commande}
   */
  static depuisObjet(data) {
    return new Commande(data);
  }
}

export default Commande;

if (typeof module !== 'undefined') module.exports = Commande;
