# ============================================================
#  EthnicEats — controllers/livraison_controller.py
#  Controleur Livraison (Python)
#
#  Responsabilites :
#    - Generation du plan de livraison (itineraire)
#    - Validation de l'adresse de livraison
#    - Estimation du temps selon les points de collecte
#
#  Endpoints Flask (definis dans app.py) :
#    POST /api/livraison/plan
#    POST /api/livraison/valider-adresse
#
#  ⚠️  Ce controleur ne touche pas Firebase.
#      Il recoit des donnees JSON et retourne un plan de livraison.
# ============================================================

from models.commande_calcul import (
    generer_points_collecte,
    calculer_temps_estime,
    calculer_frais_livraison,
    valider_commande,
)


def generer_plan_livraison(adresse, ingredients, preferences):
    """
    Genere le plan de livraison complet pour une commande.
    Appele par POST /api/livraison/plan

    Le plan contient :
      - Les points de collecte selon la source preferee (max 2)
      - L'ordre de collecte optimise
      - L'adresse de livraison finale
      - Le temps estime total

    Args:
        adresse (dict): { "adresse": str, "ville": str, "telephone": str }
        ingredients (list): liste d'ingredients du panier
        preferences (dict): { "sourcePreferee": str, "priorite": str }

    Returns:
        dict: {
            "success": bool,
            "plan": {
                "etapes": list,
                "temps_estime": int,
                "fourchette": str,
                "frais_livraison": float,
                "nb_etapes": int
            },
            "message": str
        }
    """
    try:
        source_preferee = preferences.get("sourcePreferee", "mix")
        priorite = preferences.get("priorite", "moins_cher")

        # Points de collecte (max 2 selon doc metier)
        points_collecte = generer_points_collecte(source_preferee)

        # Temps et frais
        temps_result = calculer_temps_estime(priorite)
        frais_result = calculer_frais_livraison(priorite, source_preferee)

        # Construction des etapes de livraison
        etapes = []

        for i, point in enumerate(points_collecte, start=1):
            etapes.append({
                "ordre": i,
                "type": "collecte",
                "label": point["label"],
                "source": point["type"],
                "description": _description_collecte(point["type"], ingredients),
            })

        # Etape finale : livraison au client
        etapes.append({
            "ordre": len(etapes) + 1,
            "type": "livraison",
            "label": f"Livraison — {adresse.get('adresse', '')}, {adresse.get('ville', '')}",
            "source": "client",
            "description": "Depot des ingredients a l'adresse du client.",
        })

        plan = {
            "etapes": etapes,
            "temps_estime": temps_result["temps_estime"],
            "fourchette": temps_result["fourchette"],
            "frais_livraison": frais_result["frais_livraison"],
            "nb_etapes": len(etapes),
        }

        return {"success": True, "plan": plan, "message": ""}

    except Exception as e:
        return {"success": False, "plan": None, "message": f"Erreur generation plan : {str(e)}"}


def valider_adresse(adresse):
    """
    Valide une adresse de livraison.
    Appele par POST /api/livraison/valider-adresse

    Args:
        adresse (dict): { "adresse": str, "ville": str, "telephone": str }

    Returns:
        dict: { "success": bool, "valide": bool, "message": str }
    """
    try:
        if not isinstance(adresse, dict):
            return {"success": True, "valide": False, "message": "Adresse invalide."}

        champs_requis = ["adresse", "ville", "telephone"]
        for champ in champs_requis:
            if not adresse.get(champ) or not isinstance(adresse[champ], str):
                return {
                    "success": True,
                    "valide": False,
                    "message": f"Champ manquant ou invalide : {champ}.",
                }

        # Validation basique du numero de telephone (Maroc : 06/07 + 8 chiffres)
        telephone = adresse["telephone"].strip().replace(" ", "").replace("-", "")
        if not (telephone.startswith(("06", "07", "+2126", "+2127")) and len(telephone) >= 10):
            return {
                "success": True,
                "valide": False,
                "message": "Numero de telephone invalide. Format attendu : 06XXXXXXXX ou 07XXXXXXXX.",
            }

        return {"success": True, "valide": True, "message": ""}

    except Exception as e:
        return {"success": False, "valide": False, "message": str(e)}


# ─── Helpers prives ───────────────────────────────────────────────────────────

def _description_collecte(type_source, ingredients):
    """
    Genere une description des ingredients a collecter selon la source.

    Args:
        type_source (str): "souk" | "supermarche"
        ingredients (list): ingredients du panier

    Returns:
        str: description lisible
    """
    if type_source == "souk":
        return "Legumes frais, herbes et epices."
    elif type_source == "supermarche":
        return "Produits emballes, conserves et condiments."
    return "Tous les ingredients necessaires."
