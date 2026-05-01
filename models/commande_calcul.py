# ============================================================
#  EthnicEats — models/commande_calcul.py
#  Logique métier Commande (Python)
#
#  Responsabilités :
#    - Validation des données d'une commande
#    - Calcul des frais de livraison selon les préférences
#    - Calcul du temps estimé de livraison
#    - Génération des points de collecte
#    - Calcul des totaux
#
#  ⚠️  Ce model ne touche pas Firebase.
#      La persistance est gérée par firestoreService.js côté JS.
# ============================================================

STATUTS = [
    "commande_passee",
    "confirmee",
    "en_preparation",
    "en_livraison",
    "arrive",
    "livree",
]

MODES_PAIEMENT = ["livraison", "carte"]

FRAIS_LIVRAISON_BASE = 20  # MAD
TEMPS_BASE_MINUTES = 30


def calculer_frais_livraison(priorite="moins_cher", source_preferee="mix"):
    """
    Calcule les frais de livraison selon les préférences client.

    Base : 20 MAD
    Ajustements :
      - "plus_rapide" → +10 MAD (service express)
      - "moins_cher"  → -5 MAD  (livraison économique)
      - "plus_frais"  → +5 MAD  (priorité qualité)
      - source "mix"  → +5 MAD  (deux points de collecte)

    Args:
        priorite (str): "moins_cher" | "plus_rapide" | "plus_frais"
        source_preferee (str): "souk" | "supermarche" | "mix"

    Returns:
        dict: { "frais_livraison": int, "message": str }
    """
    frais = FRAIS_LIVRAISON_BASE

    ajustements_priorite = {
        "plus_rapide": 10,
        "moins_cher": -5,
        "plus_frais": 5,
    }
    frais += ajustements_priorite.get(priorite, 0)

    if source_preferee == "mix":
        frais += 5

    frais = max(5, frais)  # plancher à 5 MAD

    return {"frais_livraison": frais, "message": ""}


def calculer_temps_estime(priorite="moins_cher"):
    """
    Calcule le temps de livraison estimé en minutes.

    Base : 30 minutes
    Ajustements :
      - "plus_rapide" → 22-35 min
      - "moins_cher"  → 30-45 min
      - "plus_frais"  → 35-50 min

    Args:
        priorite (str): "moins_cher" | "plus_rapide" | "plus_frais"

    Returns:
        dict: { "temps_estime": int, "fourchette": str }
    """
    fourchettes = {
        "plus_rapide": (22, 35),
        "moins_cher":  (30, 45),
        "plus_frais":  (35, 50),
    }

    temps_min, temps_max = fourchettes.get(priorite, (30, 45))
    temps_estime = round((temps_min + temps_max) / 2)
    fourchette = f"{temps_min}-{temps_max} min"

    return {"temps_estime": temps_estime, "fourchette": fourchette}


def generer_points_collecte(source_preferee="mix"):
    """
    Genere les points de collecte selon la source preferee du client.
    Maximum 2 points (doc metier).

    Args:
        source_preferee (str): "souk" | "supermarche" | "mix"

    Returns:
        list: liste de dicts { "type": str, "label": str }
    """
    if source_preferee == "souk":
        return [{"type": "souk", "label": "Souk local - produits frais"}]
    elif source_preferee == "supermarche":
        return [{"type": "supermarche", "label": "Supermarche - produits emballes"}]
    else:  # mix
        return [
            {"type": "souk",        "label": "Souk local - legumes et epices"},
            {"type": "supermarche", "label": "Supermarche - produits emballes"},
        ]


def calculer_total_commande(ingredients, frais_livraison):
    """
    Calcule le sous-total et le total final d'une commande.

    Args:
        ingredients (list): liste d'ingredients avec champ "prixTotal"
        frais_livraison (float): frais de livraison en MAD

    Returns:
        dict: { "sous_total": float, "total": float }
    """
    sous_total = round(sum(ing.get("prixTotal", 0) for ing in ingredients), 2)
    total = round(sous_total + frais_livraison, 2)
    return {"sous_total": sous_total, "total": total}


def valider_commande(client_id, panier, adresse, mode_paiement):
    """
    Valide les donnees d'une commande avant creation.
    Note : le champ adresse utilise "adresse" (et non "rue") conformement
    au model commande.js (_validerAdresse).

    Args:
        client_id (str): UID Firebase du client
        panier (list): liste d'ingredients
        adresse (dict): { "adresse", "ville", "telephone" }
        mode_paiement (str): "livraison" | "carte"

    Returns:
        dict: { "valide": bool, "message": str }
    """
    if not client_id or not isinstance(client_id, str):
        return {"valide": False, "message": "Identifiant client invalide."}

    if not isinstance(panier, list) or len(panier) == 0:
        return {"valide": False, "message": "Le panier est vide ou invalide."}

    if not isinstance(adresse, dict):
        return {"valide": False, "message": "Adresse de livraison invalide."}

    # Champs requis selon commande.js (_validerAdresse)
    champs_requis = ["adresse", "ville", "telephone"]
    for champ in champs_requis:
        if not adresse.get(champ):
            return {
                "valide": False,
                "message": f"L'adresse doit contenir : {', '.join(champs_requis)}.",
            }

    if mode_paiement not in MODES_PAIEMENT:
        return {
            "valide": False,
            "message": f'Mode de paiement invalide : "{mode_paiement}". Choisissez "livraison" ou "carte".',
        }

    return {"valide": True, "message": ""}
