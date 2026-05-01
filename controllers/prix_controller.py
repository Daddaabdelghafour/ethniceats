# ============================================================
#  EthnicEats — controllers/prix_controller.py
#  Controleur Prix (Python)
#
#  Responsabilites :
#    - Calcul du prix du panier selon les preferences client
#    - Calcul des frais de livraison
#    - Calcul du total final
#
#  Endpoints Flask (definis dans app.py) :
#    POST /api/prix/panier
#    POST /api/prix/livraison
#
#  ⚠️  Ce controleur ne touche pas Firebase.
#      Il recoit des donnees JSON du frontend et retourne des calculs.
# ============================================================

from models.ingredient_calcul import (
    ajuster_ingredient_pour_panier,
    calculer_sous_total,
    prix_unitaire,
)
from models.commande_calcul import (
    calculer_frais_livraison,
    calculer_temps_estime,
    generer_points_collecte,
    calculer_total_commande,
)


def calculer_panier(recette, nb_portions, preferences):
    """
    Calcule le panier complet depuis une recette.
    Appele par POST /api/prix/panier

    Equivalent de initialiserPanier() dans panierController.js.

    Args:
        recette (dict): objet recette complet depuis data/recettes.js
        nb_portions (int): nombre de portions (>= 1)
        preferences (dict): { "sourcePreferee": str, "priorite": str, "budgetMax": float }

    Returns:
        dict: {
            "success": bool,
            "ingredients": list,
            "sous_total": float,
            "frais_livraison": float,
            "total": float,
            "temps_estime": int,
            "fourchette": str,
            "points_collecte": list,
            "message": str
        }
    """
    try:
        if not recette or not isinstance(recette, dict):
            return {"success": False, "message": "Recette invalide."}

        if not isinstance(nb_portions, int) or nb_portions < 1:
            return {"success": False, "message": "nb_portions doit etre un entier >= 1."}

        if not preferences or not isinstance(preferences, dict):
            return {"success": False, "message": "Preferences invalides."}

        source_preferee = preferences.get("sourcePreferee", "supermarche")
        priorite = preferences.get("priorite", "moins_cher")
        portions_base = recette.get("portions", 1) or 1

        # Calcul des ingredients ajustes
        ingredients = [
            ajuster_ingredient_pour_panier(ing, nb_portions, portions_base, source_preferee)
            for ing in recette.get("ingredients", [])
        ]

        sous_total = calculer_sous_total(ingredients)

        frais_result = calculer_frais_livraison(priorite, source_preferee)
        frais_livraison = frais_result["frais_livraison"]

        totaux = calculer_total_commande(ingredients, frais_livraison)
        temps_result = calculer_temps_estime(priorite)
        points_collecte = generer_points_collecte(source_preferee)

        return {
            "success": True,
            "ingredients": ingredients,
            "sous_total": sous_total,
            "frais_livraison": frais_livraison,
            "total": totaux["total"],
            "temps_estime": temps_result["temps_estime"],
            "fourchette": temps_result["fourchette"],
            "points_collecte": points_collecte,
            "message": "",
        }

    except Exception as e:
        return {"success": False, "message": f"Erreur calcul panier : {str(e)}"}


def calculer_livraison(adresse, preferences):
    """
    Calcule uniquement les frais de livraison et le temps estime.
    Appele par POST /api/prix/livraison

    Args:
        adresse (dict): { "ville": str, ... }
        preferences (dict): { "priorite": str, "sourcePreferee": str }

    Returns:
        dict: {
            "success": bool,
            "frais_livraison": float,
            "temps_estime": int,
            "fourchette": str,
            "points_collecte": list,
            "message": str
        }
    """
    try:
        priorite = preferences.get("priorite", "moins_cher")
        source_preferee = preferences.get("sourcePreferee", "mix")

        frais_result = calculer_frais_livraison(priorite, source_preferee)
        temps_result = calculer_temps_estime(priorite)
        points_collecte = generer_points_collecte(source_preferee)

        return {
            "success": True,
            "frais_livraison": frais_result["frais_livraison"],
            "temps_estime": temps_result["temps_estime"],
            "fourchette": temps_result["fourchette"],
            "points_collecte": points_collecte,
            "message": "",
        }

    except Exception as e:
        return {"success": False, "message": f"Erreur calcul livraison : {str(e)}"}
