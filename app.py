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
from datetime import datetime

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

from controllers.prix_controller import calculer_panier, calculer_livraison
from controllers.recherche_controller import rechercher, rechercher_par_categorie
from controllers.livraison_controller import generer_plan_livraison, valider_adresse
from services.mysql_user_service import email_exists, create_utilisateur

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


@app.route("/api/firebase-email-verified", methods=["POST"])
def firebase_email_verified():
    print("[DEBUG] /api/firebase-email-verified called")
    try:
        data = request.get_json()
        print("[DEBUG] Data received:", data)
        user_id = data.get("user_id")
        if not user_id:
            print("[DEBUG] user_id missing")
            return jsonify({"success": False, "message": "user_id is required."}), 400
        from services.mysql_user_service import set_email_verified
        result = set_email_verified(user_id)
        print("[DEBUG] set_email_verified result:", result)
        if result:
            return jsonify({"success": True, "message": "Email marqué comme vérifié dans MySQL."})
        else:
            return jsonify({"success": False, "message": "Erreur lors de la mise à jour."}), 500
    except Exception as e:
        print("[ERROR] Exception in /api/firebase-email-verified:", e)
        import traceback
        traceback.print_exc()
        return jsonify({"success": False, "message": str(e)}), 500


@app.route("/api/register", methods=["POST"])
def register():
    print("[DEBUG] /api/register called")
    try:
        data = request.get_json()
        print("[DEBUG] Data received:", data)
        email = data.get("email")
        if not email:
            print("[DEBUG] Email missing")
            return jsonify({"success": False, "message": "Email requis."}), 400
        if email_exists(email):
            print("[DEBUG] Email already exists:", email)
            return jsonify({"success": False, "message": "Email déjà utilisé."}), 409
        # Générer un UID unique pour l'utilisateur
        user_data = {
            "uid": str(uuid.uuid4()),
            "email": email,
            "emailVerifie": False,
            "nomComplet": data.get("nomComplet"),
            "telephone": data.get("telephone"),
            "budgetMax": data.get("budgetMax", 0),
            "preferencesDefinies": data.get("preferencesDefinies", False),
            "priorite": data.get("priorite"),
            "role": data.get("role"),
            "sourcePreferee": data.get("sourcePreferee"),
            "favoris": data.get("favoris"),
            "adresseLivraison": data.get("adresseLivraison"),
            "creeLe": datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"),
            "ville": data.get("ville"),
            "adresse": data.get("adresse")
        }
        print("[DEBUG] user_data:", user_data)
        result = create_utilisateur(user_data)
        print("[DEBUG] create_utilisateur result:", result)
        if result:
            return jsonify({"success": True, "message": "Inscription réussie.", "uid": user_data["uid"]})
        else:
            return jsonify({"success": False, "message": "Erreur lors de la création de l'utilisateur."}), 500
    except Exception as e:
        print("[ERROR] Exception in /api/register:", e)
        import traceback
        traceback.print_exc()
        return jsonify({"success": False, "message": str(e)}), 500


# ─── Lancement ────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    debug = os.environ.get("FLASK_ENV") != "production"
    app.run(host="0.0.0.0", port=port, debug=debug)


