# ============================================================
#  EthnicEats — controllers/recherche_controller.py
#  Controleur Recherche (Python)
#
#  Responsabilites :
#    - Recherche de recettes par nom ou ingredient
#    - Filtrage par categorie
#    - Tri intelligent selon les preferences client
#
#  Endpoints Flask (definis dans app.py) :
#    POST /api/recherche
#    POST /api/recherche/categorie
#
#  ⚠️  Ce controleur recoit les recettes depuis le frontend
#      (data/recettes.js est cote JS). Il ne lit pas de fichier local.
# ============================================================

from models.recette_calcul import (
    rechercher_recettes,
    filtrer_par_categorie,
    scorer_recettes,
)


def rechercher(recettes, query, preferences=None):
    """
    Recherche des recettes et les trie selon les preferences.
    Appele par POST /api/recherche

    Args:
        recettes (list): toutes les recettes (envoyees par le frontend)
        query (str): terme de recherche
        preferences (dict): { "priorite": str, "sourcePreferee": str }

    Returns:
        dict: {
            "success": bool,
            "resultats": list,
            "nb_resultats": int,
            "message": str
        }
    """
    try:
        if not isinstance(recettes, list):
            return {"success": False, "resultats": [], "nb_resultats": 0, "message": "Recettes invalides."}

        result = rechercher_recettes(recettes, query)

        if not result["resultats"]:
            return {
                "success": True,
                "resultats": [],
                "nb_resultats": 0,
                "message": "Aucune recette trouvee.",
            }

        # Tri selon les preferences si fournies
        resultats = result["resultats"]
        if preferences:
            resultats = scorer_recettes(resultats, preferences)

        return {
            "success": True,
            "resultats": resultats,
            "nb_resultats": len(resultats),
            "message": "",
        }

    except Exception as e:
        return {"success": False, "resultats": [], "nb_resultats": 0, "message": str(e)}


def rechercher_par_categorie(recettes, categorie, preferences=None):
    """
    Filtre les recettes par categorie et les trie selon les preferences.
    Appele par POST /api/recherche/categorie

    Args:
        recettes (list): toutes les recettes
        categorie (str): categorie principale
        preferences (dict): { "priorite": str, "sourcePreferee": str }

    Returns:
        dict: {
            "success": bool,
            "resultats": list,
            "nb_resultats": int,
            "message": str
        }
    """
    try:
        if not categorie or not isinstance(categorie, str):
            return {"success": False, "resultats": [], "nb_resultats": 0, "message": "Categorie invalide."}

        resultats = filtrer_par_categorie(recettes, categorie)

        if preferences:
            resultats = scorer_recettes(resultats, preferences)

        return {
            "success": True,
            "resultats": resultats,
            "nb_resultats": len(resultats),
            "message": "",
        }

    except Exception as e:
        return {"success": False, "resultats": [], "nb_resultats": 0, "message": str(e)}
