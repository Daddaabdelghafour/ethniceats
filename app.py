# ============================================================
#  EthnicEats — app.py
#  Serveur Flask — Point d'entree backend Python
#
#  Endpoints disponibles :
#    POST /api/prix/panier          → calcul complet du panier
#    POST /api/prix/livraison       → frais de livraison + temps estime
#    POST /api/recherche            → recherche de recettes
#    POST /api/recherche/categorie  → filtre par categorie
#    POST /api/livraison/plan       → plan de livraison
#    POST /api/livraison/valider-adresse → validation adresse
#
#  Lancement :
#    pip install flask flask-cors
#    python app.py
#
#  Pour le deploiement sur Render :
#    - Fichier de demarrage : app.py
#    - Commande build : pip install flask flask-cors
#    - La variable d'environnement PORT est geree automatiquement
# ============================================================

import os
import uuid
from datetime import datetime, timedelta

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

from controllers.prix_controller import calculer_panier, calculer_livraison
from controllers.recherche_controller import rechercher, rechercher_par_categorie
from controllers.livraison_controller import generer_plan_livraison, valider_adresse
from services.mysql_commande_service import (
    create_commande,
    get_commande,
    get_commandes_client,
    get_commandes_disponibles,
    get_commandes_livreur,
    get_historique_client,
    get_historique_livreur,
    update_commande,
)
from services.mysql_user_service import (
    add_favori,
    create_utilisateur,
    email_exists,
    get_favoris,
    get_preferences,
    get_utilisateur,
    get_utilisateur_by_reset_token,
    remove_favori,
    set_email_verified,
    set_preferences,
    set_reset_token,
    update_utilisateur,
    verify_password,
)

app = Flask(__name__)
CORS(app)  # Autorise les appels depuis le frontend HTML


def _abs(*parts: str) -> str:
    """Construit un chemin absolu basé sur le dossier de l'application."""
    return os.path.join(app.root_path, *parts)


@app.route("/", methods=["GET"])
def index():
    """Sert la page d'accueil du frontend."""
    return send_from_directory(_abs("views", "auth"), "choix-role.html")


@app.route("/register.html", methods=["GET"])
@app.route("/register", methods=["GET"])
def register_page():
    """Sert la page d'inscription."""
    return send_from_directory(_abs("views", "auth"), "register.html")


@app.route("/login.html", methods=["GET"])
@app.route("/login", methods=["GET"])
def login_page():
    """Sert la page de connexion."""
    return send_from_directory(_abs("views", "auth"), "login.html")


@app.route("/verification.html", methods=["GET"])
@app.route("/verification", methods=["GET"])
def verification_page():
    """Sert la page de verification email."""
    return send_from_directory(_abs("views", "auth"), "verification.html")


@app.route("/preferences.html", methods=["GET"])
@app.route("/preferences", methods=["GET"])
def preferences_page():
    """Sert la page des preferences initiales."""
    return send_from_directory(_abs("views", "auth"), "preferences.html")


@app.route("/forgotpassword", methods=["GET"])
@app.route("/mot-de-passe-oublie.html", methods=["GET"])
def forgot_password_page():
    """Sert la page de mot de passe oublie."""
    return send_from_directory(_abs("views", "auth"), "mot-de-passe-oublie.html")


@app.route("/accueil", methods=["GET"])
@app.route("/acceuil", methods=["GET"])
def client_accueil_page():
    """Sert la page d'accueil client."""
    return send_from_directory(_abs("views", "client"), "accueil.html")


@app.route("/asiatique", methods=["GET"])
@app.route("/asiatique.html", methods=["GET"])
def asiatique_page():
    """Sert la page categorie asiatique."""
    return send_from_directory(_abs("views", "client"), "asiatique.html")


@app.route("/recette-detail", methods=["GET"])
@app.route("/recette-detail.html", methods=["GET"])
def recette_detail_page():
    """Sert la page de detail d'une recette. Le parametre ?id= est gere cote JS."""
    return send_from_directory(_abs("views", "client"), "recette-detail.html")


@app.route("/categorie", methods=["GET"])
@app.route("/categorie.html", methods=["GET"])
def categorie_page():
    """Sert la page de categorie. Le parametre ?cat= est gere cote JS."""
    return send_from_directory(_abs("views", "client"), "categorie.html")


@app.route("/panier", methods=["GET"])
@app.route("/panier.html", methods=["GET"])
def panier_page():
    """Sert la page panier."""
    return send_from_directory(_abs("views", "client"), "panier.html")


@app.route("/suivi-commande", methods=["GET"])
@app.route("/suivi-commande.html", methods=["GET"])
def suivi_commande_page():
    """Sert la page de suivi de commande."""
    return send_from_directory(_abs("views", "client"), "suivi-commande.html")

@app.route("/modifier-profil-client", methods=["GET"])
@app.route("/modifier-profil-client.html", methods=["GET"])
def modifier_profil_client_page():
    """Sert la page de modification du profil client."""
    return send_from_directory(_abs("views", "client"), "modifier-profil-client.html")


@app.route("/suivi-detail", methods=["GET"])
@app.route("/suivi-detail.html", methods=["GET"])
def suivi_detail_page():
    """Sert la page de detail de suivi. Le parametre ?id= est gere cote JS."""
    return send_from_directory(_abs("views", "client"), "suivi-detail.html")


@app.route("/profil-client", methods=["GET"])
@app.route("/profil-client.html", methods=["GET"])
def profil_client_page():
    """Sert la page profil client."""
    return send_from_directory(_abs("views", "client"), "profil-client.html")


@app.route("/checkout", methods=["GET"])
@app.route("/checkout.html", methods=["GET"])
def checkout_page():
    """Sert la page de validation de commande (checkout)."""
    return send_from_directory(_abs("views", "client"), "checkout.html")

@app.route("/historique", methods=["GET"])
@app.route("/historique.html", methods=["GET"])
def historique_page():
    """Sert la page de l'historique des commandes."""
    return send_from_directory(_abs("views", "client"), "historique.html")

@app.route("/favoris", methods=["GET"])
@app.route("/favoris.html", methods=["GET"])
def favoris_page():
    """Sert la page des recettes favorites."""
    return send_from_directory(_abs("views", "client"), "favoris.html")


# ─── Routes Livreur ───────────────────────────────────────────────────────────

@app.route("/livreur/commandes", methods=["GET"])
@app.route("/livreur/commandes.html", methods=["GET"])
def livreur_commandes_page():
    """Sert la page des commandes livreur."""
    return send_from_directory(_abs("views", "livreur"), "commandes.html")

@app.route("/livreur/en-cours", methods=["GET"])
@app.route("/livreur/en-cours.html", methods=["GET"])
def livreur_en_cours_page():
    """Sert la page en cours livreur."""
    return send_from_directory(_abs("views", "livreur"), "en-cours.html")

@app.route("/livreur/profil", methods=["GET"])
@app.route("/livreur/profil.html", methods=["GET"])
def livreur_profil_page():
    """Sert la page profil livreur."""
    return send_from_directory(_abs("views", "livreur"), "profil-livreur.html")

@app.route("/livreur/historique", methods=["GET"])
@app.route("/livreur/historique.html", methods=["GET"])
def livreur_historique_page():
    """Sert la page historique livreur."""
    return send_from_directory(_abs("views", "livreur"), "historique-livreur.html")

@app.route("/livreur/modifier-profil", methods=["GET"])
@app.route("/livreur/modifier-profil.html", methods=["GET"])
def livreur_modifier_profil_page():
    """Sert la page modifier profil livreur."""
    return send_from_directory(_abs("views", "livreur"), "modifier-profil-livreur.html")



@app.route("/favicon.ico", methods=["GET"])
def favicon():
    """Evite une erreur 404 lorsque le navigateur demande une favicon."""
    return "", 204


@app.route("/views/<path:filename>", methods=["GET"])
def serve_views(filename):
    """Sert les fichiers du dossier views/ (HTML, assets éventuels)."""
    return send_from_directory(_abs("views"), filename)


@app.route("/controllers/<path:filename>", methods=["GET"])
def serve_controllers(filename):
    """Sert les modules JavaScript du dossier controllers/."""
    return send_from_directory(_abs("controllers"), filename)


@app.route("/services/<path:filename>", methods=["GET"])
def serve_services(filename):
    """Sert les modules JavaScript du dossier services/."""
    return send_from_directory(_abs("services"), filename)


@app.route("/models/<path:filename>", methods=["GET"])
def serve_models(filename):
    """Sert les modules JavaScript du dossier models/."""
    return send_from_directory(_abs("models"), filename)


@app.route("/data/<path:filename>", methods=["GET"])
def serve_data(filename):
    """Sert les données JavaScript du dossier data/."""
    return send_from_directory(_abs("data"), filename)


@app.route("/images/<path:filename>", methods=["GET"])
def serve_images(filename):
    """Sert les images locales du dossier images/."""
    return send_from_directory(_abs("images"), filename)



# ─── Sante du serveur ─────────────────────────────────────────────────────────

@app.route("/api/health", methods=["GET"])
def health():
    """Verifie que le serveur est en ligne."""
    return jsonify({"status": "ok", "message": "EthnicEats API Python operationnelle."})


# ─── Prix ─────────────────────────────────────────────────────────────────────

@app.route("/api/prix/panier", methods=["POST"])
def route_calculer_panier():
    """
    Calcule le panier complet depuis une recette.

    Body JSON :
    {
        "recette": { ...objet recette... },
        "nbPortions": 4,
        "preferences": { "sourcePreferee": "mix", "priorite": "moins_cher", "budgetMax": 0 }
    }
    """
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "message": "Body JSON manquant."}), 400

    recette = data.get("recette")
    nb_portions = data.get("nbPortions", 4)
    preferences = data.get("preferences", {})

    result = calculer_panier(recette, nb_portions, preferences)
    return jsonify(result)


@app.route("/api/prix/livraison", methods=["POST"])
def route_calculer_livraison():
    """
    Calcule les frais de livraison et le temps estime.

    Body JSON :
    {
        "adresse": { "ville": "Casablanca" },
        "preferences": { "priorite": "moins_cher", "sourcePreferee": "mix" }
    }
    """
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "message": "Body JSON manquant."}), 400

    adresse = data.get("adresse", {})
    preferences = data.get("preferences", {})

    result = calculer_livraison(adresse, preferences)
    return jsonify(result)


# ─── Recherche ────────────────────────────────────────────────────────────────

@app.route("/api/recherche", methods=["POST"])
def route_rechercher():
    """
    Recherche des recettes par nom ou ingredient.

    Body JSON :
    {
        "recettes": [ ...toutes les recettes... ],
        "query": "poulet",
        "preferences": { "priorite": "moins_cher", "sourcePreferee": "mix" }
    }
    """
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "message": "Body JSON manquant."}), 400

    recettes = data.get("recettes", [])
    query = data.get("query", "")
    preferences = data.get("preferences")

    result = rechercher(recettes, query, preferences)
    return jsonify(result)


@app.route("/api/recherche/categorie", methods=["POST"])
def route_rechercher_categorie():
    """
    Filtre les recettes par categorie.

    Body JSON :
    {
        "recettes": [ ...toutes les recettes... ],
        "categorie": "Marocain",
        "preferences": { "priorite": "moins_cher", "sourcePreferee": "mix" }
    }
    """
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "message": "Body JSON manquant."}), 400

    recettes = data.get("recettes", [])
    categorie = data.get("categorie", "")
    preferences = data.get("preferences")

    result = rechercher_par_categorie(recettes, categorie, preferences)
    return jsonify(result)


# ─── Livraison ────────────────────────────────────────────────────────────────

@app.route("/api/livraison/plan", methods=["POST"])
def route_plan_livraison():
    """
    Genere le plan de livraison complet.

    Body JSON :
    {
        "adresse": { "adresse": "123 Rue X", "ville": "Casablanca", "telephone": "0612345678" },
        "ingredients": [ ...ingredients du panier... ],
        "preferences": { "sourcePreferee": "mix", "priorite": "moins_cher" }
    }
    """
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "message": "Body JSON manquant."}), 400

    adresse = data.get("adresse", {})
    ingredients = data.get("ingredients", [])
    preferences = data.get("preferences", {})

    result = generer_plan_livraison(adresse, ingredients, preferences)
    return jsonify(result)


@app.route("/api/livraison/valider-adresse", methods=["POST"])
def route_valider_adresse():
    """
    Valide une adresse de livraison.

    Body JSON :
    {
        "adresse": { "adresse": "123 Rue X", "ville": "Casablanca", "telephone": "0612345678" }
    }
    """
    data = request.get_json()
    if not data:
        return jsonify({"success": False, "message": "Body JSON manquant."}), 400

    adresse = data.get("adresse", {})
    result = valider_adresse(adresse)
    return jsonify(result)


@app.route("/api/register", methods=["POST"])
def register():
    try:
        data = request.get_json() or {}
        email = data.get("email")
        mot_de_passe = data.get("motDePasse")
        role = data.get("role")
        if not email or not mot_de_passe:
            return jsonify({"success": False, "message": "Email et mot de passe requis."}), 400
        if role not in {"client", "livreur"}:
            return jsonify({"success": False, "message": "Rôle invalide."}), 400
        if email_exists(email):
            return jsonify({"success": False, "message": "Email déjà utilisé."}), 409

        verification_token = str(uuid.uuid4())
        user_data = {
            "uid": str(uuid.uuid4()),
            "email": email,
            "motDePasse": mot_de_passe,
            "emailVerifie": False,
            "nomComplet": data.get("nomComplet"),
            "telephone": data.get("telephone"),
            "budgetMax": data.get("budgetMax", 0),
            "preferencesDefinies": data.get("preferencesDefinies", False),
            "priorite": data.get("priorite"),
            "role": role,
            "sourcePreferee": data.get("sourcePreferee"),
            "favoris": data.get("favoris") or [],
            "adresseLivraison": data.get("adresseLivraison"),
            "creeLe": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
            "ville": data.get("ville"),
            "adresse": data.get("adresse"),
            "gainsTotaux": data.get("gainsTotaux", 0),
            "nbLivraisons": data.get("nbLivraisons", 0),
            "statutActuel": data.get("statutActuel", "disponible"),
            "permisImage": data.get("permisImage"),
            "verificationToken": verification_token,
        }
        result = create_utilisateur(user_data)
        if result:
            return jsonify(
                {
                    "success": True,
                    "message": "Inscription réussie.",
                    "uid": user_data["uid"],
                    "verificationToken": verification_token,
                }
            )
        return jsonify({"success": False, "message": "Erreur lors de la création de l'utilisateur."}), 500
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = data.get("email")
    mot_de_passe = data.get("motDePasse")
    if not email or not mot_de_passe:
        return jsonify({"success": False, "message": "Email et mot de passe requis."}), 400

    utilisateur = verify_password(email, mot_de_passe)
    if not utilisateur:
        return jsonify({"success": False, "message": "Identifiants incorrects."}), 401

    if not utilisateur.get("emailVerifie"):
        return jsonify(
            {
                "success": False,
                "emailVerifie": False,
                "user": utilisateur,
                "message": "Votre email n'est pas encore vérifié.",
            }
        ), 403

    return jsonify({"success": True, "user": utilisateur})


@app.route("/api/email/verify", methods=["POST"])
def verify_email():
    data = request.get_json() or {}
    uid = data.get("uid")
    if not uid:
        return jsonify({"success": False, "message": "uid requis."}), 400
    utilisateur = get_utilisateur(uid)
    if not utilisateur:
        return jsonify({"success": False, "message": "Utilisateur introuvable."}), 404
    if not set_email_verified(uid):
        return jsonify({"success": False, "message": "Erreur lors de la vérification."}), 500
    utilisateur = get_utilisateur(uid)
    return jsonify({"success": True, "role": utilisateur.get("role"), "user": utilisateur})


@app.route("/api/email/resend", methods=["POST"])
def resend_email_verification():
    data = request.get_json() or {}
    uid = data.get("uid")
    if not uid:
        return jsonify({"success": False, "message": "uid requis."}), 400
    token = str(uuid.uuid4())
    if not update_utilisateur(uid, {"verificationToken": token, "emailVerifie": False}):
        return jsonify({"success": False, "message": "Impossible de régénérer la vérification."}), 500
    return jsonify({"success": True, "verificationToken": token})


@app.route("/api/users/<user_id>", methods=["GET"])
def get_user(user_id):
    utilisateur = get_utilisateur(user_id)
    if not utilisateur:
        return jsonify({"success": False, "message": "Utilisateur introuvable."}), 404
    return jsonify({"success": True, "user": utilisateur})


@app.route("/api/users/<user_id>", methods=["PUT"])
def update_user(user_id):
    data = request.get_json() or {}
    updates = {}
    if "nomComplet" in data:
        updates["nomComplet"] = data.get("nomComplet")
    if "telephoneContact" in data:
        updates["telephone"] = data.get("telephoneContact")
    if "telephone" in data:
        updates["telephone"] = data.get("telephone")
    email_change = False
    if "email" in data:
        updates["email"] = data.get("email")
        updates["emailVerifie"] = False
        updates["verificationToken"] = str(uuid.uuid4())
        email_change = True
    if "ville" in data:
        updates["ville"] = data.get("ville")
    if "adresse" in data:
        updates["adresse"] = data.get("adresse")

    if not updates:
        return jsonify({"success": False, "message": "Aucune donnée à mettre à jour."}), 400

    if not update_utilisateur(user_id, updates):
        return jsonify({"success": False, "message": "Mise à jour impossible."}), 500

    utilisateur = get_utilisateur(user_id)
    return jsonify(
        {
            "success": True,
            "user": utilisateur,
            "emailChange": email_change,
            "verificationToken": updates.get("verificationToken"),
        }
    )


@app.route("/api/users/<user_id>/password", methods=["PUT"])
def update_password(user_id):
    data = request.get_json() or {}
    ancien = data.get("ancienMdp")
    nouveau = data.get("nouveauMdp")
    if not ancien or not nouveau:
        return jsonify({"success": False, "message": "Ancien et nouveau mot de passe requis."}), 400
    utilisateur = get_utilisateur(user_id)
    if not utilisateur:
        return jsonify({"success": False, "message": "Utilisateur introuvable."}), 404
    if verify_password(utilisateur.get("email", ""), ancien) is None:
        return jsonify({"success": False, "message": "Mot de passe actuel incorrect."}), 403
    if not update_utilisateur(user_id, {"motDePasse": nouveau}):
        return jsonify({"success": False, "message": "Mise à jour impossible."}), 500
    return jsonify({"success": True, "message": "Mot de passe mis à jour."})


@app.route("/api/password/reset-request", methods=["POST"])
def reset_password_request():
    data = request.get_json() or {}
    email = data.get("email")
    if not email:
        return jsonify({"success": False, "message": "Email requis."}), 400
    if not email_exists(email):
        return jsonify({"success": False, "message": "Aucun compte trouvé avec cet email."}), 404
    token = str(uuid.uuid4())
    expires_at = datetime.utcnow() + timedelta(hours=1)
    if not set_reset_token(email, token, expires_at):
        return jsonify({"success": False, "message": "Impossible de créer la demande."}), 500
    return jsonify({"success": True, "message": "Demande enregistrée."})


@app.route("/api/password/reset", methods=["POST"])
def reset_password():
    data = request.get_json() or {}
    token = data.get("token")
    nouveau = data.get("nouveauMdp")
    if not token or not nouveau:
        return jsonify({"success": False, "message": "Token et nouveau mot de passe requis."}), 400
    utilisateur = get_utilisateur_by_reset_token(token)
    if not utilisateur:
        return jsonify({"success": False, "message": "Token invalide ou expiré."}), 404
    if not update_utilisateur(utilisateur["uid"], {"motDePasse": nouveau, "resetToken": None, "resetTokenExpires": None}):
        return jsonify({"success": False, "message": "Impossible de réinitialiser le mot de passe."}), 500
    return jsonify({"success": True, "message": "Mot de passe réinitialisé."})


@app.route("/api/users/<user_id>/preferences", methods=["GET"])
def get_user_preferences(user_id):
    preferences = get_preferences(user_id)
    if preferences is None:
        return jsonify({"success": False, "message": "Utilisateur introuvable."}), 404
    return jsonify({"success": True, "preferences": preferences})


@app.route("/api/users/<user_id>/preferences", methods=["PUT"])
def update_user_preferences(user_id):
    data = request.get_json() or {}
    if not set_preferences(user_id, data):
        return jsonify({"success": False, "message": "Impossible d'enregistrer les préférences."}), 500
    return jsonify({"success": True, "message": "Préférences enregistrées."})


@app.route("/api/users/<user_id>/favoris", methods=["GET"])
def get_user_favoris(user_id):
    return jsonify({"success": True, "favoris": get_favoris(user_id)})


@app.route("/api/users/<user_id>/favoris", methods=["POST"])
def add_user_favori(user_id):
    data = request.get_json() or {}
    recette_id = data.get("recetteId")
    if not recette_id:
        return jsonify({"success": False, "message": "recetteId requis."}), 400
    favoris = add_favori(user_id, recette_id)
    return jsonify({"success": True, "favoris": favoris})


@app.route("/api/users/<user_id>/favoris/<recette_id>", methods=["DELETE"])
def remove_user_favori(user_id, recette_id):
    favoris = remove_favori(user_id, recette_id)
    return jsonify({"success": True, "favoris": favoris})


@app.route("/api/commandes", methods=["POST"])
def create_commande_route():
    data = request.get_json() or {}
    if not data.get("clientId"):
        return jsonify({"success": False, "message": "Commande invalide."}), 400
    if not data.get("id"):
        data["id"] = f"ORD-{uuid.uuid4().hex[:8].upper()}"
    if create_commande(data):
        return jsonify({"success": True, "commandeId": data["id"]})
    return jsonify({"success": False, "message": "Erreur lors de la création."}), 500


@app.route("/api/commandes/<commande_id>", methods=["GET"])
def get_commande_route(commande_id):
    commande = get_commande(commande_id)
    if not commande:
        return jsonify({"success": False, "message": "Commande introuvable."}), 404
    return jsonify({"success": True, "commande": commande})


@app.route("/api/commandes/<commande_id>", methods=["PUT"])
def update_commande_route(commande_id):
    data = request.get_json() or {}
    if not update_commande(commande_id, data):
        return jsonify({"success": False, "message": "Impossible de mettre à jour."}), 500
    return jsonify({"success": True})


@app.route("/api/commandes", methods=["GET"])
def list_commandes():
    client_id = request.args.get("clientId")
    livreur_id = request.args.get("livreurId")
    if client_id:
        return jsonify({"success": True, "commandes": get_commandes_client(client_id)})
    if livreur_id:
        statuts = request.args.get("statut")
        statuts_list = statuts.split(",") if statuts else None
        return jsonify({"success": True, "commandes": get_commandes_livreur(livreur_id, statuts_list)})
    return jsonify({"success": True, "commandes": []})


@app.route("/api/commandes/disponibles", methods=["GET"])
def commandes_disponibles():
    return jsonify({"success": True, "commandes": get_commandes_disponibles()})


@app.route("/api/commandes/livreur/en-cours", methods=["GET"])
def commandes_livreur_en_cours():
    livreur_id = request.args.get("livreurId")
    if not livreur_id:
        return jsonify({"success": False, "message": "livreurId requis."}), 400
    statuts = ["confirmee", "en_preparation", "en_livraison", "arrive"]
    commandes = get_commandes_livreur(livreur_id, statuts)
    return jsonify({"success": True, "commandes": commandes})


@app.route("/api/commandes/historique", methods=["GET"])
def commandes_historique():
    client_id = request.args.get("clientId")
    livreur_id = request.args.get("livreurId")
    if client_id:
        return jsonify({"success": True, "commandes": get_historique_client(client_id)})
    if livreur_id:
        return jsonify({"success": True, "commandes": get_historique_livreur(livreur_id)})
    return jsonify({"success": False, "message": "clientId ou livreurId requis."}), 400


# ─── Lancement ────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_ENV") != "production"
    app.run(host="0.0.0.0", port=port, debug=debug)
