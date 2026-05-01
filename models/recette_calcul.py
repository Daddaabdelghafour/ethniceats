# ============================================================
#  EthnicEats — models/recette_calcul.py
#  Logique metier Recette (Python)
#
#  Responsabilites :
#    - Filtrage et scoring des recettes
#    - Recherche insensible a la casse et aux accents
#    - Calcul des quantites selon les portions
#
#  ⚠️  Ce model ne touche pas Firebase.
#      Les recettes proviennent de data/recettes.js (cote JS).
#      Ce model travaille sur des donnees JSON envoyees par le frontend.
# ============================================================

import unicodedata
import re


def normaliser(texte):
    """
    Normalise une chaine pour la recherche :
    minuscules + suppression des accents.
    Equivalent de _normaliser() dans recetteController.js.

    Args:
        texte (str): chaine a normaliser

    Returns:
        str: chaine normalisee
    """
    texte = texte.lower()
    texte = unicodedata.normalize("NFD", texte)
    texte = re.sub(r"[\u0300-\u036f]", "", texte)
    return texte


def rechercher_recettes(recettes, query):
    """
    Recherche des recettes par nom de recette ou par nom d'ingredient.
    Insensible a la casse et aux accents.
    Equivalent de rechercherRecettes() dans recetteController.js.

    Args:
        recettes (list): liste complete des recettes (depuis data/recettes.js)
        query (str): terme de recherche (min 1 caractere)

    Returns:
        dict: { "resultats": list, "nb_resultats": int, "message": str }
    """
    if not query or not isinstance(query, str) or len(query.strip()) < 1:
        return {"resultats": [], "nb_resultats": 0, "message": "Recherche invalide (minimum 1 caractere)."}

    terme = normaliser(query.strip())

    resultats = []
    for r in recettes:
        # Correspondance par titre
        if normaliser(r.get("titre", "")).find(terme) != -1:
            resultats.append(r)
            continue

        # Correspondance par nom d'ingredient
        ingredients = r.get("ingredients", [])
        if any(normaliser(ing.get("nom", "")).find(terme) != -1 for ing in ingredients):
            resultats.append(r)

    return {
        "resultats": resultats,
        "nb_resultats": len(resultats),
        "message": "",
    }


def filtrer_par_categorie(recettes, categorie):
    """
    Filtre les recettes par categorie principale.
    Pour "asiatique", inclut toutes les sous-categories.
    Equivalent de getRecettesParCategorie() dans recetteController.js.

    Args:
        recettes (list): liste complete des recettes
        categorie (str): categorie principale

    Returns:
        list: recettes filtrees
    """
    cat = normaliser(categorie.strip())

    if cat == "asiatique":
        return [
            r for r in recettes
            if normaliser(r.get("categorie", "")) == "asiatique"
            or normaliser(r.get("categorie", "")).startswith("asiatique/")
        ]

    return [r for r in recettes if normaliser(r.get("categorie", "")) == cat]


def scorer_recettes(recettes, preferences):
    """
    Trie et score les recettes selon les preferences client.

    Criteres de scoring :
      - priorite "moins_cher"  → tri par prix croissant
      - priorite "plus_rapide" → tri par temps de preparation croissant
      - priorite "plus_frais"  → recettes "populaire: true" en premier
      - source "souk"          → bonus aux recettes avec prixSouk
      - source "supermarche"   → bonus aux recettes avec prixSupermarche

    Args:
        recettes (list): liste de recettes
        preferences (dict): { "priorite": str, "sourcePreferee": str }

    Returns:
        list: recettes triees par score decroissant
    """
    priorite = preferences.get("priorite", "moins_cher")
    source = preferences.get("sourcePreferee", "mix")

    def score(recette):
        s = 0

        # Bonus recettes populaires
        if recette.get("populaire"):
            s += 10

        # Scoring selon priorite
        if priorite == "plus_frais" and recette.get("populaire"):
            s += 20

        # Prix moyen de la recette (pour tri "moins_cher")
        ingredients = recette.get("ingredients", [])
        if ingredients:
            if source == "souk":
                prix_moy = sum(ing.get("prixSouk", ing.get("prixBase", 0)) for ing in ingredients) / len(ingredients)
            elif source == "supermarche":
                prix_moy = sum(ing.get("prixSupermarche", ing.get("prixBase", 0)) for ing in ingredients) / len(ingredients)
            else:
                prix_moy = sum(ing.get("prixBase", 0) for ing in ingredients) / len(ingredients)

            if priorite == "moins_cher":
                # Prix bas = score eleve (on inverse)
                s += max(0, 100 - prix_moy)

        return s

    return sorted(recettes, key=score, reverse=True)


def calculer_quantites_portions(recette, nb_portions):
    """
    Retourne une copie de la recette avec les quantites d'ingredients
    recalculees selon le nombre de portions demande.
    Equivalent de calculerQuantitesPortions() dans recetteController.js.

    Args:
        recette (dict): objet recette complet
        nb_portions (int): nombre de portions souhaite (>= 1)

    Returns:
        dict: { "recette": dict, "message": str }
              ou { "recette": None, "message": str } si erreur
    """
    if not isinstance(nb_portions, int) or nb_portions < 1:
        return {"recette": None, "message": "nb_portions doit etre un entier >= 1."}

    portions_base = recette.get("portions", 1) or 1
    ratio = nb_portions / portions_base

    ingredients_ajustes = []
    for ing in recette.get("ingredients", []):
        quantite_recette = round(ing.get("quantiteRecette", 0) * ratio, 3)

        if ing.get("type") == "pack":
            packs_base = ing.get("quantitePanier", 1)
            import math
            quantite_panier = math.ceil(packs_base * ratio)
        else:
            quantite_panier = quantite_recette

        ingredients_ajustes.append({
            **ing,
            "quantiteRecette": quantite_recette,
            "quantitePanier": quantite_panier,
        })

    recette_ajustee = {
        **recette,
        "portions": nb_portions,
        "ingredients": ingredients_ajustes,
    }

    return {"recette": recette_ajustee, "message": ""}
