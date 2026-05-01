# ============================================================
#  EthnicEats — models/ingredient_calcul.py
#  Logique metier Ingredient (Python)
#
#  Responsabilites :
#    - Calcul du prix unitaire selon la source preferee
#    - Calcul du prix total d'un ingredient (pack ou flexible)
#    - Ajustement des quantites selon le ratio de portions
#
#  ⚠️  Ce model ne touche pas Firebase.
#      Les donnees ingredients proviennent de data/recettes.js.
# ============================================================

import math


def prix_unitaire(ingredient, source_preferee="supermarche"):
    """
    Retourne le prix unitaire d'un ingredient selon la source preferee.
    Equivalent de _prixUnitaire() dans panierController.js.

    Args:
        ingredient (dict): ingredient avec prixSouk, prixSupermarche, prixBase
        source_preferee (str): "souk" | "supermarche" | "mix"

    Returns:
        float: prix unitaire en MAD
    """
    prix_base = ingredient.get("prixBase", ingredient.get("prix", 0))
    prix_souk = ingredient.get("prixSouk", prix_base)
    prix_supermarche = ingredient.get("prixSupermarche", prix_base)

    if source_preferee == "souk":
        return prix_souk
    elif source_preferee == "supermarche":
        return prix_supermarche
    else:  # mix : moyenne des deux
        moyenne = (prix_souk + prix_supermarche) / 2
        return round(moyenne, 2)


def prix_total_ingredient(ingredient):
    """
    Calcule le prix total d'un ingredient en tenant compte du type de vente.
    Equivalent de _prixTotalIngredient() dans panierController.js.

    Types :
      - "pack"     : quantitePanier * prixUnitaire
      - "flexible" : quantiteRecette * prixUnitaire

    Args:
        ingredient (dict): ingredient avec type, quantitePanier,
                           quantiteRecette, prixUnitaire

    Returns:
        float: prix total arrondi a 2 decimales
    """
    prix = ingredient.get("prixUnitaire", ingredient.get("prix", 0))

    if ingredient.get("type") == "pack":
        quantite = ingredient.get("quantitePanier", 1)
        return round(quantite * prix, 2)
    else:
        quantite = ingredient.get("quantiteRecette", ingredient.get("quantite", 0))
        return round(quantite * prix, 2)


def ajuster_ingredient_pour_panier(ingredient, nb_portions, portions_base, source_preferee="supermarche"):
    """
    Calcule toutes les valeurs d'un ingredient pour le panier :
    quantites ajustees, prix unitaire, prix total.
    Equivalent de la logique dans initialiserPanier() de panierController.js.

    Args:
        ingredient (dict): ingredient brut depuis data/recettes.js
        nb_portions (int): nombre de portions demande
        portions_base (int): nombre de portions de base de la recette
        source_preferee (str): "souk" | "supermarche" | "mix"

    Returns:
        dict: ingredient enrichi pret pour le panier
    """
    ratio = nb_portions / portions_base

    quantite_recette = round(ingredient.get("quantiteRecette", 0) * ratio, 3)

    if ingredient.get("type") == "pack":
        packs_base = ingredient.get("quantitePanier", 1)
        quantite_panier = math.ceil(packs_base * ratio)
    else:
        quantite_panier = quantite_recette

    prix_base = ingredient.get("prixBase", ingredient.get("prix", 0))

    ingredient_ajuste = {
        "nom":            ingredient.get("nom", ""),
        "unite":          ingredient.get("unite", ""),
        "type":           ingredient.get("type", "flexible"),
        "icone":          ingredient.get("icone", ""),
        "formatVente":    ingredient.get("formatVente"),
        "unitePanier":    ingredient.get("unitePanier", ingredient.get("unite", "")),
        "quantiteRecette": quantite_recette,
        "quantitePanier":  quantite_panier,
        "prixUnitaire":   prix_unitaire(ingredient, source_preferee),
        "prixSouk":       ingredient.get("prixSouk", prix_base),
        "prixSupermarche": ingredient.get("prixSupermarche", prix_base),
        "prixBase":       prix_base,
    }

    ingredient_ajuste["prixTotal"] = prix_total_ingredient(ingredient_ajuste)

    return ingredient_ajuste


def calculer_sous_total(ingredients):
    """
    Calcule le sous-total d'une liste d'ingredients.

    Args:
        ingredients (list): ingredients avec champ "prixTotal"

    Returns:
        float: sous-total en MAD arrondi a 2 decimales
    """
    return round(sum(ing.get("prixTotal", 0) for ing in ingredients), 2)
