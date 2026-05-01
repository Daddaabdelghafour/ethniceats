
export const RECETTES = [
  // ==================== MAROCAIN ====================
  {
    id: "couscous-marocain",
    titre: "Couscous Marocain",
    categorie: "Marocain",
    sousCategorie: null,
    descriptionCourte: "Le plat emblématique marocain à base de semoule, légumes et viande, préparé en famille.",
    descriptionLongue: "Le couscous est bien plus qu'un plat au Maroc : c'est un rituel familial, généralement préparé le vendredi après la prière. La semoule de blé dur est cuite à la vapeur dans un couscoussier, absorbant les arômes d'un bouillon riche en légumes de saison (navets, carottes, courgettes, pois chiches) et en viande mijotée. Chaque région du Maroc a sa propre version — à Marrakech on l'accompagne de tfaya (oignons confits aux raisins secs), à Fès il est parfumé à la cannelle. Ce plat est le symbole du partage et de la convivialité marocaine.",
    image: "https://intervalledeco.ma/wp-content/uploads/2023/10/Images-ARTICLES-ID-1024-%C3%97-720-px.jpg",
    difficulte: "moyen",
    tempsPreparation: "90 min",
    portions: 4,
    populaire: true,
    ingredients: [
      { nom: "Semoule de couscous", quantiteRecette: 500, unite: "g", type: "pack", formatVente: "500g", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 14, icone: "semolina" },
      { nom: "Épaule d'agneau", quantiteRecette: 600, unite: "g", type: "flexible", formatVente: null, quantitePanier: 600, unitePanier: "g", prix: 90, prixBase: 90, prixSouk: 80, prixSupermarche: 100, icone: "lamb" },
      { nom: "Carottes", quantiteRecette: 300, unite: "g", type: "flexible", formatVente: null, quantitePanier: 300, unitePanier: "g", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "carrot" },
      { nom: "Courgettes", quantiteRecette: 300, unite: "g", type: "flexible", formatVente: null, quantitePanier: 300, unitePanier: "g", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "zucchini" },
      { nom: "Navets", quantiteRecette: 200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 200, unitePanier: "g", prix: 4, prixBase: 4, prixSouk: 3, prixSupermarche: 5, icone: "turnip" },
      { nom: "Pois chiches", quantiteRecette: 150, unite: "g", type: "pack", formatVente: "500g", quantitePanier: 1, unitePanier: "pack", prix: 10, prixBase: 10, prixSouk: 8, prixSupermarche: 12, icone: "chickpeas" },
      { nom: "Tomates", quantiteRecette: 200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 200, unitePanier: "g", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "tomato" },
      { nom: "Oignons", quantiteRecette: 150, unite: "g", type: "flexible", formatVente: null, quantitePanier: 150, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "onion" },
      { nom: "Huile d'olive", quantiteRecette: 60, unite: "ml", type: "pack", formatVente: "500ml", quantitePanier: 1, unitePanier: "pack", prix: 35, prixBase: 35, prixSouk: 30, prixSupermarche: 40, icone: "olive-oil" },
      { nom: "Ras el hanout", quantiteRecette: 15, unite: "g", type: "pack", formatVente: "50g", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "spice-blend" },
      { nom: "Beurre", quantiteRecette: 50, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 14, prixBase: 14, prixSouk: 12, prixSupermarche: 16, icone: "butter" }
    ],
    etapes: [
      "1. Faire revenir l'agneau coupé en morceaux dans l'huile d'olive avec les oignons émincés jusqu'à dorure.",
      "2. Ajouter les tomates concassées, le ras el hanout, sel et poivre. Laisser mijoter 10 min.",
      "3. Couvrir d'eau, ajouter les pois chiches et laisser cuire 30 min à feu moyen.",
      "4. Ajouter carottes, navets et courgettes coupés en gros morceaux. Cuire encore 25 min.",
      "5. Préparer la semoule : verser 500g dans un saladier, ajouter une pincée de sel et un filet d'huile, puis verser 550ml d'eau bouillante. Couvrir 5 min.",
      "6. Égrener la semoule à la fourchette et incorporer le beurre.",
      "7. Dresser la semoule dans un grand plat, disposer les légumes et la viande par-dessus, arroser de bouillon."
    ]
  },
  {
    id: "tajine-boeuf-pruneaux",
    titre: "Tajine de Bœuf aux Pruneaux",
    categorie: "Marocain",
    sousCategorie: null,
    descriptionCourte: "Un tajine sucré-salé fondant avec viande tendre, pruneaux et amandes dorées.",
    descriptionLongue: "Le tajine de bœuf aux pruneaux est l'un des plus beaux exemples de la cuisine marocaine qui marie avec harmonie le sucré et le salé. La viande de bœuf mijote lentement dans un mélange d'épices (cannelle, gingembre, safran) jusqu'à devenir fondante, tandis que les pruneaux caramélisés apportent une douceur exquise. Les amandes grillées ajoutent du croquant. Ce plat est souvent servi lors de grandes occasions, de mariages ou de fêtes familiales. Il incarne la générosité et la richesse culinaire de la tradition marocaine.",
    image: "https://img.cuisineaz.com/660x495/2018/03/19/i137999-tajine-d-agneau-aux-pruneaux.jpeg",
    difficulte: "moyen",
    tempsPreparation: "120 min",
    portions: 4,
    populaire: true,
    ingredients: [
      { nom: "Bœuf (épaule)", quantiteRecette: 700, unite: "g", type: "flexible", formatVente: null, quantitePanier: 700, unitePanier: "g", prix: 85, prixBase: 85, prixSouk: 75, prixSupermarche: 95, icone: "beef" },
      { nom: "Pruneaux", quantiteRecette: 200, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 15, prixSupermarche: 22, icone: "prunes" },
      { nom: "Amandes", quantiteRecette: 100, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 20, prixBase: 20, prixSouk: 16, prixSupermarche: 25, icone: "almonds" },
      { nom: "Oignons", quantiteRecette: 200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 200, unitePanier: "g", prix: 4, prixBase: 4, prixSouk: 2, prixSupermarche: 5, icone: "onion" },
      { nom: "Huile d'olive", quantiteRecette: 60, unite: "ml", type: "pack", formatVente: "500ml", quantitePanier: 1, unitePanier: "pack", prix: 35, prixBase: 35, prixSouk: 30, prixSupermarche: 40, icone: "olive-oil" },
      { nom: "Miel", quantiteRecette: 30, unite: "ml", type: "pack", formatVente: "250g", quantitePanier: 1, unitePanier: "pack", prix: 25, prixBase: 25, prixSouk: 20, prixSupermarche: 30, icone: "honey" },
      { nom: "Cannelle en poudre", quantiteRecette: 5, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "cinnamon" },
      { nom: "Gingembre en poudre", quantiteRecette: 5, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "ginger" },
      { nom: "Safran", quantiteRecette: 1, unite: "g", type: "pack", formatVente: "1 unité", quantitePanier: 1, unitePanier: "pack", prix: 15, prixBase: 15, prixSouk: 12, prixSupermarche: 18, icone: "saffron" }
    ],
    etapes: [
      "1. Couper le bœuf en cubes de 4 cm. Faire chauffer l'huile dans un tajine ou cocotte.",
      "2. Faire dorer les morceaux de bœuf sur toutes les faces. Réserver.",
      "3. Dans le même récipient, faire revenir les oignons émincés jusqu'à translucidité.",
      "4. Remettre le bœuf, ajouter cannelle, gingembre, safran, sel et poivre. Mélanger.",
      "5. Couvrir d'eau à mi-hauteur et laisser mijoter à feu doux 1h30.",
      "6. Dans une poêle, faire dorer les amandes à sec. Réserver.",
      "7. Ajouter les pruneaux et le miel au tajine, cuire encore 20 min jusqu'à sauce sirupeuse.",
      "8. Servir garni d'amandes dorées, accompagné de pain marocain."
    ]
  },
  {
    id: "pastilla-poulet",
    titre: "Pastilla au Poulet",
    categorie: "Marocain",
    sousCategorie: null,
    descriptionCourte: "Feuilleté croustillant marocain à base de poulet, amandes et cannelle, sucré-salé inoubliable.",
    descriptionLongue: "La pastilla est l'un des plats les plus sophistiqués de la gastronomie marocaine, symbole de la grande cuisine fassi (de Fès). Sa pâte warqa, fine comme du papier, renferme une farce généreuse de poulet effiloché aux oignons et épices, surmontée d'une couche d'œufs brouillés parfumés, le tout couronné d'amandes grillées mélangées à du sucre et de la cannelle. Savourer une pastilla, c'est faire l'expérience d'un mariage des saveurs unique — le croustillant de la pâte, le fondant de la farce et le sucré des amandes créent une harmonie gustative exceptionnelle.",
    image: "https://www.la-cuisine-marocaine.com/photos-recettes/bastilla-marocaine-poulet.jpg",
    difficulte: "difficile",
    tempsPreparation: "150 min",
    portions: 6,
    populaire: true,
    ingredients: [
      { nom: "Poulet entier", quantiteRecette: 1200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 1200, unitePanier: "g", prix: 70, prixBase: 70, prixSouk: 60, prixSupermarche: 80, icone: "whole-chicken" },
      { nom: "Feuilles de brick", quantiteRecette: 12, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 12, unitePanier: "pack", prix: 15, prixBase: 15, prixSouk: 12, prixSupermarche: 18, icone: "pastry-sheets" },
      { nom: "Amandes", quantiteRecette: 200, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 20, prixBase: 20, prixSouk: 16, prixSupermarche: 25, icone: "almonds" },
      { nom: "Œufs", quantiteRecette: 5, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 6, unitePanier: "pack", prix: 7, prixBase: 7, prixSouk: 5, prixSupermarche: 9, icone: "eggs" },
      { nom: "Oignons", quantiteRecette: 300, unite: "g", type: "flexible", formatVente: null, quantitePanier: 300, unitePanier: "g", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "onion" },
      { nom: "Beurre", quantiteRecette: 100, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 14, prixBase: 14, prixSouk: 12, prixSupermarche: 16, icone: "butter" },
      { nom: "Sucre glace", quantiteRecette: 30, unite: "g", type: "pack", formatVente: "500g", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "powdered-sugar" },
      { nom: "Cannelle en poudre", quantiteRecette: 10, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "cinnamon" },
      { nom: "Persil frais", quantiteRecette: 30, unite: "g", type: "flexible", formatVente: null, quantitePanier: 30, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "parsley" }
    ],
    etapes: [
      "1. Cuire le poulet avec les oignons, le persil, les épices dans 500ml d'eau pendant 45 min. Effilocher la viande.",
      "2. Réduire le bouillon restant, ajouter les œufs battus et brouiller à feu doux. Réserver.",
      "3. Faire griller les amandes, puis les mixer grossièrement avec sucre glace et cannelle.",
      "4. Préchauffer le four à 180°C. Beurrer un moule rond de 28 cm.",
      "5. Disposer 6 feuilles de brick en superposition dans le moule, en laissant déborder les bords. Beurrer entre chaque feuille.",
      "6. Étaler d'abord le mélange œufs/oignons, puis le poulet effiloché, puis le mélange amandes.",
      "7. Rabattre les feuilles débordantes sur la garniture, couvrir de 4 feuilles beurrées supplémentaires.",
      "8. Cuire au four 25-30 min jusqu'à dorure. Saupoudrer de sucre glace et cannelle avant de servir."
    ]
  },
  {
    id: "rfissa",
    titre: "Rfissa au Poulet",
    categorie: "Marocain",
    sousCategorie: null,
    descriptionCourte: "Plat de fête marocain, poulet aux lentilles et fenugrec servi sur msemen effiloché.",
    descriptionLongue: "La rfissa est un plat traditionnel marocain emblématique, souvent préparé après les accouchements ou lors de fêtes pour sa richesse nutritionnelle. Elle se compose de msemen (crêpes feuilletées marocaines) ou de trid effiloché, arrosé d'un bouillon généreux de poulet aux lentilles et au fenugrec. Les épices utilisées — ras el hanout, safran, gingembre — lui confèrent une profondeur aromatique incomparable. Ce plat est un symbole de maternage et de convivialité dans la culture marocaine, associé aux moments importants de la vie familiale.",
    image: "https://mafleurdoranger.com/wp-content/uploads/2015/02/ob_e9e669_rfissavid.jpg",
    difficulte: "difficile",
    tempsPreparation: "120 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Poulet fermier", quantiteRecette: 1000, unite: "g", type: "flexible", formatVente: null, quantitePanier: 1000, unitePanier: "g", prix: 65, prixBase: 65, prixSouk: 55, prixSupermarche: 75, icone: "chicken" },
      { nom: "Lentilles vertes", quantiteRecette: 200, unite: "g", type: "pack", formatVente: "500g", quantitePanier: 1, unitePanier: "pack", prix: 10, prixBase: 10, prixSouk: 8, prixSupermarche: 12, icone: "lentils" },
      { nom: "Msemen (crêpes marocaines)", quantiteRecette: 6, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 6, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 8, prixSupermarche: 15, icone: "flatbread" },
      { nom: "Oignons", quantiteRecette: 200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 200, unitePanier: "g", prix: 4, prixBase: 4, prixSouk: 2, prixSupermarche: 5, icone: "onion" },
      { nom: "Fenugrec", quantiteRecette: 10, unite: "g", type: "pack", formatVente: "50g", quantitePanier: 1, unitePanier: "pack", prix: 7, prixBase: 7, prixSouk: 5, prixSupermarche: 9, icone: "fenugreek" },
      { nom: "Ras el hanout", quantiteRecette: 10, unite: "g", type: "pack", formatVente: "50g", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "spice-blend" },
      { nom: "Safran", quantiteRecette: 1, unite: "g", type: "pack", formatVente: "1 unité", quantitePanier: 1, unitePanier: "pack", prix: 15, prixBase: 15, prixSouk: 12, prixSupermarche: 18, icone: "saffron" },
      { nom: "Huile d'olive", quantiteRecette: 60, unite: "ml", type: "pack", formatVente: "500ml", quantitePanier: 1, unitePanier: "pack", prix: 35, prixBase: 35, prixSouk: 30, prixSupermarche: 40, icone: "olive-oil" }
    ],
    etapes: [
      "1. Faire revenir le poulet coupé en morceaux avec les oignons dans l'huile d'olive.",
      "2. Ajouter le ras el hanout, le safran, le fenugrec, sel et poivre. Bien mélanger.",
      "3. Couvrir d'eau et laisser mijoter 45 min à feu moyen.",
      "4. Rincer les lentilles et les ajouter au bouillon. Cuire encore 30 min.",
      "5. Effilocher le msemen en petits morceaux et le disposer dans le fond d'un grand plat creux.",
      "6. Disposer les morceaux de poulet sur le msemen.",
      "7. Arroser généreusement de bouillon aux lentilles et servir immédiatement."
    ]
  },
  {
    id: "tangia-marrakchia",
    titre: "Tangia Marrakchia",
    categorie: "Marocain",
    sousCategorie: null,
    descriptionCourte: "Spécialité mythique de Marrakech, agneau mijoté lentement dans un pot en terre avec des épices.",
    descriptionLongue: "La tangia est le plat signature de Marrakech, né dans les ruelles de la médina. Traditionnellement préparée par les hommes célibataires, cette amphore en terre cuite remplie d'agneau, de citron confit, d'huile d'argan et d'épices était déposée dans les braises de la ferrana (boulangerie traditionnelle) où elle mijotait lentement pendant 6 à 8 heures. Ce mode de cuisson ultra-lente confère à la viande une tendreté incomparable et des arômes profondément développés. La tangia est aujourd'hui un incontournable des tables de fête marrakchies.",
    image: "https://www.marrakeche.com/wp-content/uploads/2021/02/A-Taste-of-Marrakech-Tender-Tanjia-Ready-to-Serve-scaled.jpg",
    difficulte: "moyen",
    tempsPreparation: "480 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Agneau (jarret)", quantiteRecette: 800, unite: "g", type: "flexible", formatVente: null, quantitePanier: 800, unitePanier: "g", prix: 110, prixBase: 110, prixSouk: 95, prixSupermarche: 125, icone: "lamb" },
      { nom: "Citron confit", quantiteRecette: 2, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 2, unitePanier: "pack", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "preserved-lemon" },
      { nom: "Huile d'argan", quantiteRecette: 60, unite: "ml", type: "pack", formatVente: "100ml", quantitePanier: 1, unitePanier: "pack", prix: 45, prixBase: 45, prixSouk: 40, prixSupermarche: 50, icone: "argan-oil" },
      { nom: "Ail", quantiteRecette: 6, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 30, unitePanier: "g", prix: 4, prixBase: 4, prixSouk: 2, prixSupermarche: 5, icone: "garlic" },
      { nom: "Ras el hanout", quantiteRecette: 15, unite: "g", type: "pack", formatVente: "50g", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "spice-blend" },
      { nom: "Cumin en poudre", quantiteRecette: 5, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "cumin" }
    ],
    etapes: [
      "1. Couper l'agneau en gros morceaux, placer dans un pot en terre ou une cocotte.",
      "2. Ajouter l'ail écrasé, le citron confit coupé en quartiers, l'huile d'argan.",
      "3. Saupoudrer de ras el hanout, cumin, sel et une pincée de safran.",
      "4. Ajouter 100ml d'eau, sceller hermétiquement le pot avec du papier aluminium.",
      "5. Cuire au four à 140°C pendant 6 heures (ou utiliser une cocotte sur feu très doux).",
      "6. Servir directement dans le pot avec du pain marocain chaud."
    ]
  },
  {
    id: "maakouda",
    titre: "Maakouda",
    categorie: "Marocain",
    sousCategorie: null,
    descriptionCourte: "Galettes de pommes de terre frites, dorées et épicées, typique street food marocain.",
    descriptionLongue: "La maakouda est une galette de pommes de terre écrasées, assaisonnée de cumin, coriandre et ail, plongée dans de l'huile bouillante jusqu'à être dorée et croustillante. C'est l'une des spécialités de rue les plus populaires du Maroc, vendue dans les souks et les médinas en sandwich dans du pain khobz avec harissa. Chaque région a sa petite touche personnelle — à Fès on la sert chaude avec de la tomate, à Casablanca en sandwich avec des frites. C'est un plat réconfortant, économique et délicieux, symbole de la cuisine populaire marocaine.",
    image: "https://recettesmarocaines.com/wp-content/uploads/2024/05/Recette-Maakouda-marocaine.jpg",
    difficulte: "facile",
    tempsPreparation: "45 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Pommes de terre", quantiteRecette: 600, unite: "g", type: "flexible", formatVente: null, quantitePanier: 600, unitePanier: "g", prix: 8, prixBase: 8, prixSouk: 5, prixSupermarche: 10, icone: "potato" },
      { nom: "Œufs", quantiteRecette: 2, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 2, unitePanier: "pack", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "eggs" },
      { nom: "Farine", quantiteRecette: 50, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "flour" },
      { nom: "Ail", quantiteRecette: 3, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 15, unitePanier: "g", prix: 2, prixBase: 2, prixSouk: 1, prixSupermarche: 3, icone: "garlic" },
      { nom: "Cumin en poudre", quantiteRecette: 5, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "cumin" },
      { nom: "Coriandre fraîche", quantiteRecette: 20, unite: "g", type: "flexible", formatVente: null, quantitePanier: 20, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "coriander" },
      { nom: "Huile de friture", quantiteRecette: 500, unite: "ml", type: "pack", formatVente: "1L", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 15, prixSupermarche: 22, icone: "frying-oil" }
    ],
    etapes: [
      "1. Faire cuire les pommes de terre dans de l'eau salée jusqu'à tendreté (20 min). Égoutter et écraser en purée.",
      "2. Ajouter les œufs, l'ail écrasé, le cumin, la coriandre ciselée, sel et poivre. Bien mélanger.",
      "3. Former des galettes rondes de 1 cm d'épaisseur. Les enfariner légèrement.",
      "4. Chauffer l'huile dans une poêle à 180°C.",
      "5. Faire frire les galettes 3-4 min de chaque côté jusqu'à dorure.",
      "6. Égoutter sur papier absorbant. Servir chaud en sandwich ou en accompagnement."
    ]
  },
  {
    id: "taktouka",
    titre: "Taktouka",
    categorie: "Marocain",
    sousCategorie: null,
    descriptionCourte: "Salade cuite marocaine de tomates et poivrons grillés à l'ail et au cumin.",
    descriptionLongue: "La taktouka est une salade cuite marocaine typique, à mi-chemin entre le condiment et l'accompagnement. Les tomates et poivrons verts sont d'abord grillés au four pour développer leurs saveurs, puis mijotés lentement avec de l'ail, du cumin, du paprika et de l'huile d'olive jusqu'à obtenir une texture fondante et concentrée. Souvent servie en entrée ou en meze avec du pain marocain, la taktouka accompagne également les poissons grillés et les brochettes. C'est un exemple parfait de la richesse gustative que la cuisine marocaine tire de simples légumes.",
    image: "https://cache.marieclaire.fr/data/photo/w1000_ci/6z/recette-salade-taktouka-poivrons-tomates.jpg",
    difficulte: "facile",
    tempsPreparation: "40 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Tomates", quantiteRecette: 400, unite: "g", type: "flexible", formatVente: null, quantitePanier: 400, unitePanier: "g", prix: 8, prixBase: 8, prixSouk: 5, prixSupermarche: 10, icone: "tomato" },
      { nom: "Poivrons verts", quantiteRecette: 300, unite: "g", type: "flexible", formatVente: null, quantitePanier: 300, unitePanier: "g", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "bell-pepper" },
      { nom: "Ail", quantiteRecette: 4, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 20, unitePanier: "g", prix: 2, prixBase: 2, prixSouk: 1, prixSupermarche: 3, icone: "garlic" },
      { nom: "Huile d'olive", quantiteRecette: 60, unite: "ml", type: "pack", formatVente: "500ml", quantitePanier: 1, unitePanier: "pack", prix: 35, prixBase: 35, prixSouk: 30, prixSupermarche: 40, icone: "olive-oil" },
      { nom: "Cumin en poudre", quantiteRecette: 5, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "cumin" },
      { nom: "Paprika", quantiteRecette: 5, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "paprika" },
      { nom: "Coriandre fraîche", quantiteRecette: 20, unite: "g", type: "flexible", formatVente: null, quantitePanier: 20, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "coriander" }
    ],
    etapes: [
      "1. Préchauffer le four à 200°C. Griller les poivrons entiers 20 min en les retournant.",
      "2. Mettre les poivrons dans un sac plastique 10 min puis peler, épépiner et couper en lanières.",
      "3. Peler et concasser les tomates.",
      "4. Dans une poêle, chauffer l'huile d'olive et faire revenir l'ail écrasé 1 min.",
      "5. Ajouter les tomates, cumin, paprika, sel. Cuire 10 min en remuant.",
      "6. Incorporer les poivrons grillés, mélanger et cuire encore 10 min à feu doux.",
      "7. Parsemer de coriandre fraîche et servir tiède ou à température ambiante."
    ]
  },
  {
    id: "djaj-m7mr",
    titre: "Poulet Rôti Marocain",
    categorie: "Marocain",
    sousCategorie: null,
    descriptionCourte: "Poulet rôti marocain parfumé aux épices, citron confit et herbes fraîches.",
    descriptionLongue: "Le djaj m7mr est la version marocaine du poulet rôti, relevé d'une marinade généreuse de chermoula — un mélange de coriandre, persil, ail, cumin, paprika et citron. Le poulet est enduit de cette marinade, puis farci d'herbes fraîches avant d'être rôti lentement au four ou dans un tajine. La peau devient dorée et craquante tandis que la chair reste moelleuse et juteuse. C'est un plat de la cuisine quotidienne marocaine, préparé aussi bien les jours de semaine que lors des occasions familiales.",
    image: "https://gateauetcuisinerachida.com/wp-content/uploads/2021/08/poulet-au-four-poulet-roti-poulet-a%CC%80-la-marocaine-avec-deghmira-et-amandes.jpg",
    difficulte: "facile",
    tempsPreparation: "90 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Poulet entier", quantiteRecette: 1200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 1200, unitePanier: "g", prix: 70, prixBase: 70, prixSouk: 60, prixSupermarche: 80, icone: "whole-chicken" },
      { nom: "Citron confit", quantiteRecette: 1, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 1, unitePanier: "pack", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "preserved-lemon" },
      { nom: "Ail", quantiteRecette: 5, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 25, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "garlic" },
      { nom: "Coriandre fraîche", quantiteRecette: 30, unite: "g", type: "flexible", formatVente: null, quantitePanier: 30, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "coriander" },
      { nom: "Persil frais", quantiteRecette: 30, unite: "g", type: "flexible", formatVente: null, quantitePanier: 30, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "parsley" },
      { nom: "Huile d'olive", quantiteRecette: 60, unite: "ml", type: "pack", formatVente: "500ml", quantitePanier: 1, unitePanier: "pack", prix: 35, prixBase: 35, prixSouk: 30, prixSupermarche: 40, icone: "olive-oil" },
      { nom: "Paprika", quantiteRecette: 8, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "paprika" },
      { nom: "Cumin en poudre", quantiteRecette: 5, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "cumin" }
    ],
    etapes: [
      "1. Préparer la chermoula : mixer ail, coriandre, persil, paprika, cumin, huile d'olive, sel et jus de citron confit.",
      "2. Enduire le poulet de chermoula sous et sur la peau. Laisser mariner 30 min minimum.",
      "3. Préchauffer le four à 200°C.",
      "4. Placer le poulet dans un plat allant au four, entourer de quartiers de citron confit.",
      "5. Rôtir 1h en arrosant régulièrement avec le jus de cuisson.",
      "6. Servir avec des olives marinées et du pain marocain."
    ]
  },
  {
    id: "seffa",
    titre: "Seffa",
    categorie: "Marocain",
    sousCategorie: null,
    descriptionCourte: "Vermicelles sucrés-salés avec poulet tendre, amandes, raisins secs et sucre glace.",
    descriptionLongue: "La seffa est un plat festif marocain qui incarne le génie de la cuisine sucrée-salée du Maghreb. Des vermicelles ou des cheveux d'ange sont cuits à la vapeur dans un couscoussier, puis dressés en dôme sur un grand plat et garnis de poulet fondant, d'amandes grillées, de raisins secs et saupoudrés de sucre glace et de cannelle. La combinaison de textures et de saveurs — la tendreté du poulet, le craquant des amandes, la douceur des raisins et la fraîcheur de la cannelle — crée une expérience gustative unique et mémorable.",
    image: "https://www.tastygourmandise.com/wp-content/uploads/2018/11/seffa-el-medfouna.png",
    difficulte: "moyen",
    tempsPreparation: "75 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Vermicelles fins", quantiteRecette: 400, unite: "g", type: "pack", formatVente: "500g", quantitePanier: 1, unitePanier: "pack", prix: 10, prixBase: 10, prixSouk: 8, prixSupermarche: 12, icone: "vermicelli" },
      { nom: "Poulet fermier", quantiteRecette: 800, unite: "g", type: "flexible", formatVente: null, quantitePanier: 800, unitePanier: "g", prix: 55, prixBase: 55, prixSouk: 45, prixSupermarche: 65, icone: "chicken" },
      { nom: "Amandes", quantiteRecette: 100, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 20, prixBase: 20, prixSouk: 16, prixSupermarche: 25, icone: "almonds" },
      { nom: "Raisins secs", quantiteRecette: 80, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 15, icone: "raisins" },
      { nom: "Sucre glace", quantiteRecette: 40, unite: "g", type: "pack", formatVente: "500g", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "powdered-sugar" },
      { nom: "Cannelle en poudre", quantiteRecette: 10, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "cinnamon" },
      { nom: "Beurre", quantiteRecette: 60, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 14, prixBase: 14, prixSouk: 12, prixSupermarche: 16, icone: "butter" }
    ],
    etapes: [
      "1. Cuire le poulet dans un bouillon épicé (oignons, cannelle, gingembre) 45 min. Effilocher.",
      "2. Faire gonfler les vermicelles à la vapeur dans un couscoussier pendant 20 min.",
      "3. Incorporer le beurre aux vermicelles cuits, mélanger délicatement.",
      "4. Faire gonfler les raisins secs dans de l'eau tiède 10 min. Égoutter.",
      "5. Faire dorer les amandes à sec dans une poêle.",
      "6. Dresser les vermicelles en dôme dans un grand plat. Disposer le poulet effiloché au centre.",
      "7. Garnir d'amandes, raisins secs. Saupoudrer généreusement de sucre glace et cannelle."
    ]
  },
  {
    id: "pastilla-poisson",
    titre: "Pastilla au Poisson",
    categorie: "Marocain",
    sousCategorie: null,
    descriptionCourte: "Feuilleté croustillant aux fruits de mer et poisson, parfumé aux épices et citron.",
    descriptionLongue: "La pastilla au poisson est une variante maritime de la célèbre pastilla marocaine, très populaire dans les villes côtières comme Essaouira, Agadir et Casablanca. Elle marie la croustillance de la pâte warqa avec une farce généreuse de poisson (merlan, lieu ou cabillaud) et fruits de mer (crevettes, calamars), assaisonnés de chermoula — coriandre, persil, ail, cumin et paprika. C'est un plat festif qui démontre la richesse des produits de la mer marocaine et le savoir-faire unique de la pâtisserie salée marocaine.",
    image: "https://mypatiss.com/wp-content/uploads/2023/05/pastilla.jpg",
    difficulte: "difficile",
    tempsPreparation: "90 min",
    portions: 6,
    populaire: false,
    ingredients: [
      { nom: "Filets de merlan", quantiteRecette: 500, unite: "g", type: "flexible", formatVente: null, quantitePanier: 500, unitePanier: "g", prix: 55, prixBase: 55, prixSouk: 45, prixSupermarche: 65, icone: "fish" },
      { nom: "Crevettes décortiquées", quantiteRecette: 200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 200, unitePanier: "g", prix: 40, prixBase: 40, prixSouk: 35, prixSupermarche: 50, icone: "shrimp" },
      { nom: "Feuilles de brick", quantiteRecette: 12, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 12, unitePanier: "pack", prix: 15, prixBase: 15, prixSouk: 12, prixSupermarche: 18, icone: "pastry-sheets" },
      { nom: "Vermicelles (pour farce)", quantiteRecette: 100, unite: "g", type: "pack", formatVente: "500g", quantitePanier: 1, unitePanier: "pack", prix: 10, prixBase: 10, prixSouk: 8, prixSupermarche: 12, icone: "vermicelli" },
      { nom: "Coriandre fraîche", quantiteRecette: 30, unite: "g", type: "flexible", formatVente: null, quantitePanier: 30, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "coriander" },
      { nom: "Beurre", quantiteRecette: 80, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 14, prixBase: 14, prixSouk: 12, prixSupermarche: 16, icone: "butter" },
      { nom: "Citron", quantiteRecette: 2, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 2, unitePanier: "g", prix: 4, prixBase: 4, prixSouk: 2, prixSupermarche: 5, icone: "lemon" }
    ],
    etapes: [
      "1. Préparer la chermoula : mixer coriandre, ail, cumin, paprika, citron, huile d'olive.",
      "2. Faire mariner le poisson et les crevettes dans la chermoula 30 min.",
      "3. Cuire le poisson et les crevettes à la vapeur 10 min. Émietter le poisson.",
      "4. Cuire les vermicelles, les mélanger à la farce de poisson.",
      "5. Préchauffer le four à 180°C. Monter la pastilla comme la version poulet.",
      "6. Cuire 25-30 min jusqu'à dorure. Servir immédiatement."
    ]
  },

  // ==================== ITALIEN ====================
  {
    id: "pizza-margherita",
    titre: "Pizza Margherita",
    categorie: "Italien",
    sousCategorie: null,
    descriptionCourte: "La pizza italienne classique : pâte croustillante, sauce tomate, mozzarella fondante et basilic frais.",
    descriptionLongue: "La Margherita est la reine des pizzas, inventée à Naples en 1889 en hommage à la reine Margherita di Savoia. Ses trois couleurs — rouge (tomate), blanc (mozzarella) et vert (basilic) — représentent le drapeau italien. Une vraie Margherita napolitaine est caractérisée par sa pâte fine au centre et gonflée sur les bords (le cornicione), sa sauce tomates San Marzano légèrement acide, sa mozzarella di bufala qui fond en créant des poches crémeuses et ses feuilles de basilic frais ajoutées après cuisson. C'est un plat qui prouve que la simplicité, quand elle est bien exécutée, atteint la perfection.",
    image: "https://images.pexels.com/photos/35760006/pexels-photo-35760006.jpeg",
    difficulte: "moyen",
    tempsPreparation: "120 min",
    portions: 4,
    populaire: true,
    ingredients: [
      { nom: "Farine type 00", quantiteRecette: 500, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 14, icone: "flour" },
      { nom: "Levure boulangère", quantiteRecette: 7, unite: "g", type: "pack", formatVente: "1 unité", quantitePanier: 1, unitePanier: "pack", prix: 5, prixBase: 5, prixSouk: 4, prixSupermarche: 6, icone: "yeast" },
      { nom: "Tomates pelées en conserve", quantiteRecette: 400, unite: "g", type: "pack", formatVente: "400g", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 15, icone: "canned-tomatoes" },
      { nom: "Mozzarella", quantiteRecette: 250, unite: "g", type: "pack", formatVente: "250g", quantitePanier: 1, unitePanier: "pack", prix: 30, prixBase: 30, prixSouk: 25, prixSupermarche: 35, icone: "mozzarella" },
      { nom: "Basilic frais", quantiteRecette: 15, unite: "g", type: "flexible", formatVente: null, quantitePanier: 15, unitePanier: "g", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "basil" },
      { nom: "Huile d'olive", quantiteRecette: 50, unite: "ml", type: "pack", formatVente: "500ml", quantitePanier: 1, unitePanier: "pack", prix: 35, prixBase: 35, prixSouk: 30, prixSupermarche: 40, icone: "olive-oil" },
      { nom: "Sel", quantiteRecette: 10, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 6, icone: "salt" }
    ],
    etapes: [
      "1. Mélanger farine, levure, sel et 300ml d'eau tiède. Pétrir 10 min jusqu'à pâte élastique.",
      "2. Laisser lever la pâte couverte dans un endroit chaud pendant 1h30.",
      "3. Préparer la sauce : écraser les tomates pelées à la main avec sel et filet d'huile d'olive.",
      "4. Préchauffer le four à 250°C (température maximale) avec une pierre ou plaque dans le four.",
      "5. Étaler la pâte finement en disque. Étaler la sauce tomate en laissant les bords libres.",
      "6. Garnir de mozzarella coupée en tranches.",
      "7. Cuire 8-10 min jusqu'à ce que la pâte soit dorée et le fromage bouillonnant.",
      "8. Garnir de basilic frais et d'un filet d'huile d'olive. Servir immédiatement."
    ]
  },
  {
    id: "carbonara",
    titre: "Spaghetti Carbonara",
    categorie: "Italien",
    sousCategorie: null,
    descriptionCourte: "Pâtes romaines crémeuses aux œufs, pecorino et viande halal, sans crème fraîche.",
    descriptionLongue: "La carbonara est l'une des pâtes les plus emblématiques de Rome, et l'une des plus mal imitées dans le monde. La vraie recette n'utilise pas de crème fraîche — la texture crémeuse vient du mélange savamment dosé de jaunes d'œufs et de pecorino romano râpé, que l'on incorpore hors du feu à des pâtes al dente et de la viande fumée sautée. Le secret est la température : trop chaude, la sauce s'œufs brouille ; trop froide, le fromage ne fond pas. Maîtriser la carbonara, c'est comprendre la cuisine romaine dans toute sa précision.",
    image: "https://images.pexels.com/photos/29039084/pexels-photo-29039084.jpeg",
    difficulte: "moyen",
    tempsPreparation: "30 min",
    portions: 4,
    populaire: true,
    ingredients: [
      { nom: "Spaghetti", quantiteRecette: 400, unite: "g", type: "pack", formatVente: "500g", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 14, icone: "pasta" },
      { nom: "Viande fumée halal (lardons de bœuf)", quantiteRecette: 200, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 25, prixBase: 25, prixSouk: 20, prixSupermarche: 30, icone: "smoked-beef" },
      { nom: "Œufs (jaunes)", quantiteRecette: 4, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 4, unitePanier: "pack", prix: 5, prixBase: 5, prixSouk: 4, prixSupermarche: 6, icone: "oeufs-jaunes" },
      { nom: "Pecorino romano râpé", quantiteRecette: 100, unite: "g", type: "pack", formatVente: "100g", quantitePanier: 1, unitePanier: "pack", prix: 28, prixBase: 28, prixSouk: 22, prixSupermarche: 35, icone: "parmesan" },
      { nom: "Poivre noir", quantiteRecette: 5, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "black-pepper" },
      { nom: "Sel", quantiteRecette: 10, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 6, icone: "salt" }
    ],
    etapes: [
      "1. Cuire les spaghetti al dente dans de l'eau très salée. Réserver 200ml d'eau de cuisson.",
      "2. Faire revenir la viande fumée à sec dans une poêle jusqu'à légère dorure. Réserver avec son gras.",
      "3. Battre les jaunes d'œufs avec le pecorino râpé et beaucoup de poivre noir moulu.",
      "4. Hors du feu, transférer les pâtes égouttées dans la poêle avec la viande.",
      "5. Incorporer le mélange œufs-fromage en ajoutant l'eau de cuisson petit à petit, en remuant vivement.",
      "6. La sauce doit être crémeuse — ni liquide ni brouillée. Rectifier avec eau de cuisson si nécessaire.",
      "7. Servir immédiatement avec pecorino supplémentaire et poivre noir."
    ]
  },
  {
    id: "lasagne-bolognese",
    titre: "Lasagne alla Bolognese",
    categorie: "Italien",
    sousCategorie: null,
    descriptionCourte: "Lasagnes généreuses en couches de pâtes, sauce bolognaise riche et béchamel crémeuse.",
    descriptionLongue: "Les lasagnes à la bolognaise sont le plat de fête par excellence de l'Émilie-Romagne. La vraie bolognaise (ragù alla bolognese) est une sauce lente mijotée au moins 3 heures, à base de bœuf haché, carottes, céleri et oignons dans un fond de vin blanc et lait — rien à voir avec les versions express. Intercalée avec des couches de pâtes fraîches et de béchamel maison, le tout gratiné au four, la lasagne devient un plat monumental qui réchauffe l'âme. C'est un plat de dimanche, de réunions familiales et de célébrations en Italie.",
    image: "https://i.pinimg.com/1200x/4d/41/07/4d4107eddeee80fcdef15c65ff83b5d2.jpg",
    difficulte: "difficile",
    tempsPreparation: "180 min",
    portions: 6,
    populaire: false,
    ingredients: [
      { nom: "Plaques de lasagne", quantiteRecette: 300, unite: "g", type: "pack", formatVente: "500g", quantitePanier: 1, unitePanier: "pack", prix: 15, prixBase: 15, prixSouk: 12, prixSupermarche: 18, icone: "lasagna-sheets" },
      { nom: "Bœuf haché", quantiteRecette: 500, unite: "g", type: "flexible", formatVente: null, quantitePanier: 500, unitePanier: "g", prix: 55, prixBase: 55, prixSouk: 45, prixSupermarche: 65, icone: "ground-beef" },
      { nom: "Tomates pelées en conserve", quantiteRecette: 400, unite: "g", type: "pack", formatVente: "400g", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 15, icone: "canned-tomatoes" },
      { nom: "Lait entier", quantiteRecette: 500, unite: "ml", type: "pack", formatVente: "1L", quantitePanier: 1, unitePanier: "pack", prix: 9, prixBase: 9, prixSouk: 8, prixSupermarche: 10, icone: "milk" },
      { nom: "Beurre", quantiteRecette: 60, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 14, prixBase: 14, prixSouk: 12, prixSupermarche: 16, icone: "butter" },
      { nom: "Farine", quantiteRecette: 60, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "flour" },
      { nom: "Carottes", quantiteRecette: 100, unite: "g", type: "flexible", formatVente: null, quantitePanier: 100, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "carrot" },
      { nom: "Céleri", quantiteRecette: 80, unite: "g", type: "flexible", formatVente: null, quantitePanier: 80, unitePanier: "g", prix: 4, prixBase: 4, prixSouk: 3, prixSupermarche: 5, icone: "celery" },
      { nom: "Parmesan râpé", quantiteRecette: 100, unite: "g", type: "pack", formatVente: "100g", quantitePanier: 1, unitePanier: "pack", prix: 30, prixBase: 30, prixSouk: 25, prixSupermarche: 35, icone: "parmesan" }
    ],
    etapes: [
      "1. Préparer le ragù : faire suer carottes, céleri et oignons émincés dans l'huile d'olive.",
      "2. Ajouter le bœuf haché, faire dorer. Ajouter vin blanc, laisser évaporer. Ajouter tomates et laisser mijoter 2h.",
      "3. Préparer la béchamel : faire fondre le beurre, ajouter farine, fouetter en ajoutant le lait chaud progressivement. Cuire jusqu'à épaississement.",
      "4. Préchauffer le four à 180°C. Huiler un grand plat à gratin.",
      "5. Alterner couches : pâtes, bolognaise, béchamel, parmesan (4 couches minimum).",
      "6. Terminer par béchamel et parmesan. Couvrir de papier aluminium.",
      "7. Cuire 40 min couvert, puis 15 min découvert pour gratiner. Laisser reposer 10 min avant de servir."
    ]
  },
  {
    id: "risotto-milanese",
    titre: "Risotto alla Milanese",
    categorie: "Italien",
    sousCategorie: null,
    descriptionCourte: "Riz crémeux au safran, spécialité dorée et parfumée de Milan.",
    descriptionLongue: "Le risotto alla Milanese est l'un des plats les plus célèbres d'Italie, symbole de la gastronomie lombarde. Sa couleur dorée caractéristique vient du safran, l'épice la plus précieuse du monde. La technique du risotto est unique : le riz arborio est nacré dans le beurre, puis mouillé progressivement de bouillon chaud tout en remuant constamment, développant un amidon qui crée la texture crémeuse caractéristique. Le mantecatura final — incorporation de beurre froid et parmesan hors du feu — donne ce brillant et cette onctuosité inimitables. C'est un plat qui récompense la patience.",
    image: "https://i.pinimg.com/1200x/d7/85/54/d78554ead5d7652e242f308ba2645644.jpg",
    difficulte: "moyen",
    tempsPreparation: "45 min",
    portions: 4,
    populaire: true,
    ingredients: [
      { nom: "Riz arborio", quantiteRecette: 320, unite: "g", type: "pack", formatVente: "500g", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 15, prixSupermarche: 22, icone: "rice" },
      { nom: "Bouillon de poulet", quantiteRecette: 1000, unite: "ml", type: "pack", formatVente: "1L", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 14, icone: "chicken-broth" },
      { nom: "Safran", quantiteRecette: 2, unite: "g", type: "pack", formatVente: "1 unité", quantitePanier: 2, unitePanier: "pack", prix: 15, prixBase: 15, prixSouk: 12, prixSupermarche: 18, icone: "saffron" },
      { nom: "Beurre", quantiteRecette: 80, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 14, prixBase: 14, prixSouk: 12, prixSupermarche: 16, icone: "butter" },
      { nom: "Oignons", quantiteRecette: 100, unite: "g", type: "flexible", formatVente: null, quantitePanier: 100, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "onion" },
      { nom: "Parmesan râpé", quantiteRecette: 80, unite: "g", type: "pack", formatVente: "100g", quantitePanier: 1, unitePanier: "pack", prix: 30, prixBase: 30, prixSouk: 25, prixSupermarche: 35, icone: "parmesan" },
      { nom: "Vin blanc sec", quantiteRecette: 150, unite: "ml", type: "pack", formatVente: "500ml", quantitePanier: 1, unitePanier: "pack", prix: 20, prixBase: 20, prixSouk: 18, prixSupermarche: 25, icone: "white-wine" }
    ],
    etapes: [
      "1. Faire infuser le safran dans 3 cuillères à soupe de bouillon chaud. Réserver.",
      "2. Faire fondre 40g de beurre dans une large casserole. Faire suer les oignons émincés.",
      "3. Ajouter le riz, nacrer 2 min en remuant. Verser le vin blanc et laisser évaporer.",
      "4. Ajouter le bouillon chaud louche par louche, en remuant constamment jusqu'à absorption.",
      "5. À mi-cuisson (10 min), ajouter le safran avec son liquide.",
      "6. Continuer d'ajouter le bouillon pendant 18-20 min au total (riz al dente).",
      "7. Hors du feu, incorporer beurre froid restant et parmesan. Mantecare vigoureusement. Servir immédiatement."
    ]
  },
  {
    id: "tiramisu",
    titre: "Tiramisu",
    categorie: "Italien",
    sousCategorie: null,
    descriptionCourte: "Dessert italien au café, crème mascarpone et biscuits imbibés, aérien et irrésistible.",
    descriptionLongue: "Le tiramisu, dont le nom signifie littéralement « tire-moi vers le haut » (remonte-moi le moral), est le dessert italien le plus célèbre dans le monde. Né dans la région de la Vénétie dans les années 1960, il allie la saveur intense du café expresso, la richesse du mascarpone, la légèreté de la crème fouettée et la douceur des biscuits savoiardi imbibés. Sa texture aérienne, obtenue en incorporant délicatement les blancs montés en neige, crée une expérience gustative qui oscille entre nuage et crème. Un grand classique qui ne se démode jamais.",
    image: "https://i.pinimg.com/1200x/27/3a/1c/273a1cba2505799c5ec72003e7fd18eb.jpg",
    difficulte: "facile",
    tempsPreparation: "30 min",
    portions: 6,
    populaire: true,
    ingredients: [
      { nom: "Biscuits savoiardi (boudoirs)", quantiteRecette: 300, unite: "g", type: "pack", formatVente: "300g", quantitePanier: 1, unitePanier: "pack", prix: 20, prixBase: 20, prixSouk: 17, prixSupermarche: 24, icone: "ladyfingers" },
      { nom: "Mascarpone", quantiteRecette: 500, unite: "g", type: "pack", formatVente: "500g", quantitePanier: 1, unitePanier: "pack", prix: 45, prixBase: 45, prixSouk: 40, prixSupermarche: 52, icone: "mascarpone" },
      { nom: "Œufs", quantiteRecette: 4, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 4, unitePanier: "pack", prix: 5, prixBase: 5, prixSouk: 4, prixSupermarche: 6, icone: "eggs" },
      { nom: "Sucre", quantiteRecette: 80, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 7, prixBase: 7, prixSouk: 5, prixSupermarche: 9, icone: "sugar" },
      { nom: "Café expresso fort", quantiteRecette: 300, unite: "ml", type: "pack", formatVente: "500g", quantitePanier: 1, unitePanier: "pack", prix: 25, prixBase: 25, prixSouk: 20, prixSupermarche: 30, icone: "coffee" },
      { nom: "Cacao en poudre", quantiteRecette: 20, unite: "g", type: "pack", formatVente: "100g", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 15, icone: "cocoa" }
    ],
    etapes: [
      "1. Séparer les blancs des jaunes. Battre les jaunes avec le sucre jusqu'à blanchiment et ruban.",
      "2. Incorporer le mascarpone aux jaunes en mélangeant délicatement.",
      "3. Monter les blancs en neige ferme. Les incorporer délicatement au mélange mascarpone.",
      "4. Préparer le café fort et le laisser refroidir.",
      "5. Tremper rapidement les biscuits dans le café (1-2 secondes chaque côté).",
      "6. Disposer une couche de biscuits imbibés dans un plat. Couvrir de crème mascarpone.",
      "7. Répéter l'opération (2 couches minimum). Saupoudrer généreusement de cacao.",
      "8. Réfrigérer au moins 4 heures (idéalement une nuit) avant de servir."
    ]
  },
  {
    id: "panna-cotta",
    titre: "Panna Cotta",
    categorie: "Italien",
    sousCategorie: null,
    descriptionCourte: "Crème vanillée gélifiée italienne, servie avec coulis de fruits rouges.",
    descriptionLongue: "La panna cotta (« crème cuite ») est un dessert piémontais d'une élégance remarquable dans sa simplicité. De la crème fraîche chauffée avec de la vanille, sucrée et gélifiée à la gélatine, coulée dans des moules puis refroidie — c'est tout. Mais la magie opère : cette crème ferme mais tremblante, au goût délicat de vanille, fondant sur la langue comme de la soie, est d'une justesse gustative rare. Accompagnée d'un coulis de fruits rouges acides qui tranche avec la douceur de la crème, c'est un dessert qui impressionne sans effort.",
    image: "https://i.pinimg.com/1200x/32/bd/3b/32bd3b9669f5769017727365b0f1b428.jpg",
    difficulte: "facile",
    tempsPreparation: "20 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Crème fraîche liquide", quantiteRecette: 500, unite: "ml", type: "pack", formatVente: "500ml", quantitePanier: 1, unitePanier: "pack", prix: 22, prixBase: 22, prixSouk: 18, prixSupermarche: 26, icone: "cream" },
      { nom: "Sucre", quantiteRecette: 60, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 7, prixBase: 7, prixSouk: 5, prixSupermarche: 9, icone: "sugar" },
      { nom: "Gélatine (feuilles)", quantiteRecette: 8, unite: "g", type: "pack", formatVente: "1 unité", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "gelatin" },
      { nom: "Gousse de vanille", quantiteRecette: 1, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 1, unitePanier: "pack", prix: 10, prixBase: 10, prixSouk: 8, prixSupermarche: 12, icone: "vanilla" },
      { nom: "Fruits rouges (coulis)", quantiteRecette: 200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 200, unitePanier: "g", prix: 20, prixBase: 20, prixSouk: 15, prixSupermarche: 25, icone: "red-fruits" }
    ],
    etapes: [
      "1. Faire tremper les feuilles de gélatine dans de l'eau froide 5 min.",
      "2. Chauffer la crème avec le sucre et la gousse de vanille fendue jusqu'au frémissement.",
      "3. Retirer du feu, ôter la vanille. Essorer la gélatine et la dissoudre dans la crème chaude.",
      "4. Couler dans 4 ramequins huilés. Laisser refroidir puis réfrigérer minimum 4h.",
      "5. Préparer le coulis : mixer les fruits rouges avec un peu de sucre.",
      "6. Démouler les panna cotta en passant un couteau sur le pourtour. Napper de coulis."
    ]
  },
  {
    id: "osso-buco",
    titre: "Osso Buco",
    categorie: "Italien",
    sousCategorie: null,
    descriptionCourte: "Jarret de veau mijoté à la milanaise avec légumes, vin blanc et gremolata citronnée.",
    descriptionLongue: "L'osso buco (littéralement « os à trou » en dialecte milanais) est un plat de viande braisée qui représente le summum de la cuisine milanaise. Les tranches de jarret de veau, avec leur os à moelle central, mijotent lentement dans un fond de légumes, vin blanc et bouillon jusqu'à devenir fondantes. La gremolata finale — zeste de citron, ail et persil ciselés — apportée en touche de fraîcheur à la dernière minute, illumine l'ensemble du plat. Traditionnellement servi avec un risotto alla Milanese, c'est un plat de fête élégant qui célèbre la richesse de la cuisine lombarde.",
    image: "https://i.pinimg.com/1200x/51/49/bc/5149bcb653235ec0feb656c7e315d753.jpg",
    difficulte: "difficile",
    tempsPreparation: "150 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Jarret de veau (tranches)", quantiteRecette: 800, unite: "g", type: "flexible", formatVente: null, quantitePanier: 800, unitePanier: "g", prix: 120, prixBase: 120, prixSouk: 100, prixSupermarche: 140, icone: "veal" },
      { nom: "Carottes", quantiteRecette: 150, unite: "g", type: "flexible", formatVente: null, quantitePanier: 150, unitePanier: "g", prix: 4, prixBase: 4, prixSouk: 2, prixSupermarche: 5, icone: "carrot" },
      { nom: "Céleri", quantiteRecette: 100, unite: "g", type: "flexible", formatVente: null, quantitePanier: 100, unitePanier: "g", prix: 4, prixBase: 4, prixSouk: 3, prixSupermarche: 5, icone: "celery" },
      { nom: "Oignons", quantiteRecette: 150, unite: "g", type: "flexible", formatVente: null, quantitePanier: 150, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "onion" },
      { nom: "Tomates pelées en conserve", quantiteRecette: 400, unite: "g", type: "pack", formatVente: "400g", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 15, icone: "canned-tomatoes" },
      { nom: "Vin blanc sec", quantiteRecette: 200, unite: "ml", type: "pack", formatVente: "500ml", quantitePanier: 1, unitePanier: "pack", prix: 20, prixBase: 20, prixSouk: 18, prixSupermarche: 25, icone: "white-wine" },
      { nom: "Citron (zeste)", quantiteRecette: 1, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 1, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "lemon" },
      { nom: "Persil frais", quantiteRecette: 20, unite: "g", type: "flexible", formatVente: null, quantitePanier: 20, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "parsley" }
    ],
    etapes: [
      "1. Fariner les tranches de jarret, les dorer dans l'huile d'olive des deux côtés. Réserver.",
      "2. Dans la même cocotte, faire suer carottes, céleri et oignons émincés.",
      "3. Ajouter le vin blanc, laisser réduire de moitié. Ajouter les tomates concassées.",
      "4. Remettre le jarret, couvrir de bouillon à mi-hauteur. Couvrir et mijoter 1h30 à feu doux.",
      "5. Préparer la gremolata : mélanger zeste de citron finement râpé, ail haché et persil ciselé.",
      "6. Vérifier la tendreté de la viande (doit se détacher facilement). Rectifier l'assaisonnement.",
      "7. Parsemer de gremolata au service. Accompagner de risotto alla Milanese."
    ]
  },
  {
    id: "arancini",
    titre: "Arancini",
    categorie: "Italien",
    sousCategorie: null,
    descriptionCourte: "Boulettes de riz siciliennes panées et frites, avec cœur de fromage fondant.",
    descriptionLongue: "Les arancini (petites oranges en sicilien) sont l'une des spécialités street food les plus aimées d'Italie, nées en Sicile au Xe siècle. Ces boules de riz doré au safran, farcies de fromage fondant ou de ragù, sont panées et frites jusqu'à obtenir une croûte dorée et croustillante qui renferme un intérieur crémeux et fondant. Dans les marchés de Catane et Palermo, on les mange chauds, brûlant les doigts avec délice. Ils sont l'incarnation de la générosité sicilienne et de l'art de transformer un reste de risotto en chef-d'œuvre culinaire.",
    image: "https://i.pinimg.com/1200x/36/76/ad/3676adc350ccf02a878494055d815dd3.jpg",
    difficulte: "moyen",
    tempsPreparation: "60 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Riz arborio", quantiteRecette: 300, unite: "g", type: "pack", formatVente: "500g", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 15, prixSupermarche: 22, icone: "rice" },
      { nom: "Mozzarella", quantiteRecette: 150, unite: "g", type: "pack", formatVente: "250g", quantitePanier: 1, unitePanier: "pack", prix: 30, prixBase: 30, prixSouk: 25, prixSupermarche: 35, icone: "mozzarella" },
      { nom: "Œufs", quantiteRecette: 2, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 2, unitePanier: "pack", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "eggs" },
      { nom: "Chapelure", quantiteRecette: 150, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 10, prixBase: 10, prixSouk: 8, prixSupermarche: 12, icone: "breadcrumbs" },
      { nom: "Parmesan râpé", quantiteRecette: 50, unite: "g", type: "pack", formatVente: "100g", quantitePanier: 1, unitePanier: "pack", prix: 30, prixBase: 30, prixSouk: 25, prixSupermarche: 35, icone: "parmesan" },
      { nom: "Safran", quantiteRecette: 1, unite: "g", type: "pack", formatVente: "1 unité", quantitePanier: 1, unitePanier: "pack", prix: 15, prixBase: 15, prixSouk: 12, prixSupermarche: 18, icone: "saffron" },
      { nom: "Huile de friture", quantiteRecette: 500, unite: "ml", type: "pack", formatVente: "1L", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 15, prixSupermarche: 22, icone: "frying-oil" }
    ],
    etapes: [
      "1. Cuire le riz avec le bouillon et safran comme un risotto. Incorporer parmesan et laisser refroidir.",
      "2. Couper la mozzarella en petits cubes.",
      "3. Prendre une poignée de riz froid, former un creux au centre, y placer un cube de mozzarella, refermer en boule.",
      "4. Passer chaque boulette dans la farine, puis dans l'œuf battu, puis dans la chapelure.",
      "5. Chauffer l'huile à 180°C.",
      "6. Frire les arancini 4-5 min jusqu'à dorure uniforme.",
      "7. Égoutter sur papier absorbant. Servir chaud immédiatement."
    ]
  },

  // ==================== MEXICAIN ====================
  {
    id: "tacos-al-pastor",
    titre: "Tacos Al Pastor",
    categorie: "Mexicain",
    sousCategorie: null,
    descriptionCourte: "Tacos mexicains authentiques avec viande marinée aux épices et ananas, garnis de coriandre et oignon.",
    descriptionLongue: "Les tacos al pastor sont une icône de la gastronomie de Mexico, inspirés par les immigrants libanais qui ont apporté la technique de la broche verticale (shawarma) au Mexique dans les années 1930. La viande de porc (ici agneau ou bœuf pour la version halal) est marinée dans un mélange de piments séchés, d'épices et d'ananas, puis rôtie lentement. La combinaison de la viande épicée, de l'ananas sucré caramélisé, de la coriandre fraîche et des oignons sur une tortilla de maïs chaude est explosive. C'est l'essence même de la street food mexicaine.",
    image: "https://i.pinimg.com/736x/52/76/0e/52760ede1dd7763ed538f22371cd10b5.jpg",
    difficulte: "moyen",
    tempsPreparation: "60 min",
    portions: 4,
    populaire: true,
    ingredients: [
      { nom: "Agneau haché (ou bœuf)", quantiteRecette: 500, unite: "g", type: "flexible", formatVente: null, quantitePanier: 500, unitePanier: "g", prix: 65, prixBase: 65, prixSouk: 55, prixSupermarche: 75, icone: "ground-lamb" },
      { nom: "Tortillas de maïs", quantiteRecette: 12, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 12, unitePanier: "pack", prix: 15, prixBase: 15, prixSouk: 12, prixSupermarche: 18, icone: "corn-tortilla" },
      { nom: "Ananas", quantiteRecette: 200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 200, unitePanier: "g", prix: 10, prixBase: 10, prixSouk: 7, prixSupermarche: 13, icone: "pineapple" },
      { nom: "Oignons", quantiteRecette: 100, unite: "g", type: "flexible", formatVente: null, quantitePanier: 100, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "onion" },
      { nom: "Coriandre fraîche", quantiteRecette: 30, unite: "g", type: "flexible", formatVente: null, quantitePanier: 30, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "coriander" },
      { nom: "Piment en poudre", quantiteRecette: 10, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "chili-powder" },
      { nom: "Cumin en poudre", quantiteRecette: 5, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "cumin" },
      { nom: "Citron vert", quantiteRecette: 3, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 3, unitePanier: "g", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "lime" }
    ],
    etapes: [
      "1. Préparer la marinade : mixer piment, cumin, ail, jus d'ananas, sel et poivre.",
      "2. Mariner la viande au moins 30 min (idéalement 2h au réfrigérateur).",
      "3. Faire cuire la viande marinée dans une poêle chaude en remuant. Caraméliser légèrement.",
      "4. Ajouter les morceaux d'ananas et faire dorer.",
      "5. Chauffer les tortillas de maïs directement sur la flamme ou dans une poêle sèche.",
      "6. Garnir chaque tortilla de viande, oignons ciselés, coriandre fraîche.",
      "7. Arroser d'un filet de jus de citron vert. Servir avec salsa mexicaine."
    ]
  },
  {
    id: "burrito-poulet",
    titre: "Burrito au Poulet Grillé",
    categorie: "Mexicain",
    sousCategorie: null,
    descriptionCourte: "Grande tortilla roulée généreuse avec poulet grillé épicé, riz mexicain et légumes frais.",
    descriptionLongue: "Le burrito est né dans les États frontaliers du Mexique et du Texas, dans cette cuisine tex-mex qui fusionne les traditions culinaires des deux pays. Une grande tortilla de farine chaude, bien garnie de poulet grillé aux épices, de riz mexicain, de haricots noirs mijotés, de guacamole onctueux, de crème et de fromage fondu — puis roulée et grillée pour que la tortilla soit légèrement croustillante à l'extérieur et que les garnitures se mélangent harmonieusement. C'est un repas complet en soi, nourrissant et savoureux.",
    image: "https://i.pinimg.com/736x/03/28/24/0328243c8dcc9d64c44103710917c876.jpg",
    difficulte: "facile",
    tempsPreparation: "40 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Tortillas de blé (grandes)", quantiteRecette: 4, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 4, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 15, prixSupermarche: 22, icone: "wheat-tortilla" },
      { nom: "Blanc de poulet", quantiteRecette: 500, unite: "g", type: "flexible", formatVente: null, quantitePanier: 500, unitePanier: "g", prix: 50, prixBase: 50, prixSouk: 42, prixSupermarche: 58, icone: "chicken-breast" },
      { nom: "Riz long", quantiteRecette: 200, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 10, prixBase: 10, prixSouk: 8, prixSupermarche: 12, icone: "rice" },
      { nom: "Haricots noirs en conserve", quantiteRecette: 240, unite: "g", type: "pack", formatVente: "400g", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 15, icone: "black-beans" },
      { nom: "Avocat", quantiteRecette: 2, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 2, unitePanier: "g", prix: 16, prixBase: 16, prixSouk: 12, prixSupermarche: 20, icone: "avocado" },
      { nom: "Fromage râpé", quantiteRecette: 100, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 22, prixBase: 22, prixSouk: 18, prixSupermarche: 26, icone: "cheese" },
      { nom: "Piment en poudre", quantiteRecette: 8, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "chili-powder" }
    ],
    etapes: [
      "1. Faire griller les blancs de poulet assaisonnés (piment, cumin, sel, huile) 6 min de chaque côté.",
      "2. Laisser reposer et couper en fines lamelles.",
      "3. Cuire le riz avec bouillon de poulet et piment. Émietter les haricots noirs à la fourchette.",
      "4. Préparer le guacamole : écraser les avocats avec citron vert, sel et coriandre.",
      "5. Réchauffer les tortillas. Disposer au centre : riz, haricots, poulet, guacamole, fromage.",
      "6. Replier les côtés de la tortilla, puis rouler fermement.",
      "7. Griller le burrito roulé dans une poêle chaude 1-2 min de chaque côté pour le sceller."
    ]
  },
  {
    id: "guacamole",
    titre: "Guacamole Traditionnel",
    categorie: "Mexicain",
    sousCategorie: null,
    descriptionCourte: "Purée d'avocat mexicaine fraîche et citronnée, avec tomate, oignon et coriandre.",
    descriptionLongue: "Le guacamole est l'un des condiments les plus anciens du monde, préparé par les Aztèques bien avant l'arrivée des Espagnols. Son nom vient de l'aztèque ahuacamolli (sauce d'avocat). Le vrai guacamole mexicain est simple et frais : avocats Hass mûrs écrasés au molcajete (mortier en pierre volcanique), avec tomates, oignons, piment jalapeño, coriandre fraîche et jus de citron vert. L'avocat doit rester légèrement grumeleux, pas en purée lisse. La clé est la qualité et la maturité des avocats et l'équilibre entre acidité, piquant et fraîcheur.",
    image: "https://i.pinimg.com/1200x/16/8f/a8/168fa83d9e00a0f3bb4519260bee43bd.jpg",
    difficulte: "facile",
    tempsPreparation: "15 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Avocats mûrs", quantiteRecette: 3, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 3, unitePanier: "g", prix: 24, prixBase: 24, prixSouk: 18, prixSupermarche: 30, icone: "avocado" },
      { nom: "Tomates", quantiteRecette: 150, unite: "g", type: "flexible", formatVente: null, quantitePanier: 150, unitePanier: "g", prix: 4, prixBase: 4, prixSouk: 2, prixSupermarche: 5, icone: "tomato" },
      { nom: "Oignons rouges", quantiteRecette: 80, unite: "g", type: "flexible", formatVente: null, quantitePanier: 80, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "red-onion" },
      { nom: "Citron vert", quantiteRecette: 2, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 2, unitePanier: "g", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 6, icone: "lime" },
      { nom: "Coriandre fraîche", quantiteRecette: 20, unite: "g", type: "flexible", formatVente: null, quantitePanier: 20, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "coriander" },
      { nom: "Piment vert (ou jalapeño)", quantiteRecette: 1, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 1, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "chili" }
    ],
    etapes: [
      "1. Couper les avocats en deux, retirer le noyau et récupérer la chair.",
      "2. Écraser grossièrement à la fourchette — ne pas mixer, la texture doit rester légèrement granuleuse.",
      "3. Arroser immédiatement de jus de citron vert pour éviter l'oxydation.",
      "4. Incorporer tomates épépinées et coupées en petits dés, oignons rouges finement ciselés.",
      "5. Ajouter coriandre ciselée, piment haché finement, sel.",
      "6. Goûter et ajuster citron/sel/piment. Servir immédiatement avec chips de tortilla."
    ]
  },
  {
    id: "enchiladas-poulet",
    titre: "Enchiladas Rouges au Poulet",
    categorie: "Mexicain",
    sousCategorie: null,
    descriptionCourte: "Tortillas farcies au poulet effiloché et nappées de sauce pimentée rouge maison.",
    descriptionLongue: "Les enchiladas sont un pilier de la cuisine mexicaine traditionnelle, dont l'histoire remonte aux civilisations précolombiennes. Le mot enchilada vient de « enchilar » (pimenter), car les tortillas de maïs sont littéralement trempées dans une sauce chile rouge. La farce de poulet effiloché au cumin, les tortillas ramollies dans la sauce et gratinées au four avec fromage fondu créent un plat réconfortant et savoureux. La sauce rouge maison, à base de piments séchés réhydratés, d'ail et de tomates, est l'âme de ce plat — son caractère fumé et légèrement piquant est inimitable.",
    image: "https://i.pinimg.com/1200x/35/2c/5a/352c5a96021f43b59e8123dac4d600ef.jpg",
    difficulte: "moyen",
    tempsPreparation: "60 min",
    portions: 4,
    populaire: true,
    ingredients: [
      { nom: "Tortillas de maïs", quantiteRecette: 8, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 8, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 15, icone: "corn-tortilla" },
      { nom: "Blanc de poulet", quantiteRecette: 400, unite: "g", type: "flexible", formatVente: null, quantitePanier: 400, unitePanier: "g", prix: 40, prixBase: 40, prixSouk: 33, prixSupermarche: 47, icone: "chicken-breast" },
      { nom: "Tomates pelées en conserve", quantiteRecette: 400, unite: "g", type: "pack", formatVente: "400g", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 15, icone: "canned-tomatoes" },
      { nom: "Fromage râpé", quantiteRecette: 150, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 22, prixBase: 22, prixSouk: 18, prixSupermarche: 26, icone: "cheese" },
      { nom: "Piment en poudre", quantiteRecette: 15, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "chili-powder" },
      { nom: "Cumin en poudre", quantiteRecette: 5, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "cumin" },
      { nom: "Coriandre fraîche", quantiteRecette: 20, unite: "g", type: "flexible", formatVente: null, quantitePanier: 20, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "coriander" }
    ],
    etapes: [
      "1. Cuire le poulet dans de l'eau bouillante salée 20 min. Effilocher et assaisonner de cumin.",
      "2. Préparer la sauce rouge : mixer tomates, piment, ail, oignon rôti. Cuire 10 min.",
      "3. Préchauffer le four à 180°C.",
      "4. Tremper brièvement chaque tortilla dans la sauce rouge chaude.",
      "5. Farcir de poulet effiloché, rouler et disposer dans un plat huilé.",
      "6. Napper du reste de sauce rouge, parsemer de fromage râpé.",
      "7. Cuire 20 min au four jusqu'à gratinage. Garnir de coriandre fraîche."
    ]
  },
  {
    id: "quesadillas-poulet",
    titre: "Quesadillas au Fromage et Poulet",
    categorie: "Mexicain",
    sousCategorie: null,
    descriptionCourte: "Tortillas grillées croustillantes avec poulet épicé et fromage fondant, servi avec guacamole.",
    descriptionLongue: "La quesadilla est l'un des plats les plus simples et les plus gourmands de la cuisine mexicaine. Son nom vient de « queso » (fromage) — c'est essentiellement une tortilla repliée sur une garniture de fromage fondant. La version au poulet grillé et épicé élève ce plat de snack en repas complet. L'essentiel est dans la technique : la tortilla doit être suffisamment croustillante sans être brûlée, et le fromage parfaitement fondu. Servie avec guacamole maison et salsa fraîche, la quesadilla est un classique de la cuisine familiale mexicaine quotidienne.",
    image: "https://i.pinimg.com/1200x/6d/68/3c/6d683ca402b3d06a509ab86932846ec3.jpg",
    difficulte: "facile",
    tempsPreparation: "30 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Tortillas de blé", quantiteRecette: 8, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 8, unitePanier: "pack", prix: 15, prixBase: 15, prixSouk: 12, prixSupermarche: 18, icone: "wheat-tortilla" },
      { nom: "Blanc de poulet", quantiteRecette: 400, unite: "g", type: "flexible", formatVente: null, quantitePanier: 400, unitePanier: "g", prix: 40, prixBase: 40, prixSouk: 33, prixSupermarche: 47, icone: "chicken-breast" },
      { nom: "Fromage cheddar ou mozzarella", quantiteRecette: 200, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 22, prixBase: 22, prixSouk: 18, prixSupermarche: 26, icone: "cheese" },
      { nom: "Poivrons", quantiteRecette: 200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 200, unitePanier: "g", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "bell-pepper" },
      { nom: "Oignons", quantiteRecette: 100, unite: "g", type: "flexible", formatVente: null, quantitePanier: 100, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "onion" },
      { nom: "Piment en poudre", quantiteRecette: 5, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "chili-powder" }
    ],
    etapes: [
      "1. Couper le poulet en lamelles, assaisonner de piment, cumin, sel. Faire sauter dans l'huile chaude.",
      "2. Ajouter oignons et poivrons émincés, cuire jusqu'à légère caramélisation.",
      "3. Chauffer une tortilla dans une grande poêle sèche.",
      "4. Couvrir la moitié de fromage râpé et de la garniture poulet-légumes.",
      "5. Replier la tortilla en demi-lune. Appuyer légèrement.",
      "6. Cuire 2-3 min de chaque côté jusqu'à dorure et fromage fondu.",
      "7. Couper en triangles. Servir chaud avec guacamole et crème fraîche."
    ]
  },
  {
    id: "nachos-boeuf",
    titre: "Nachos au Bœuf et Fromage",
    categorie: "Mexicain",
    sousCategorie: null,
    descriptionCourte: "Chips de maïs croustillantes gratinées au bœuf épicé, fromage fondu et garnitures fraîches.",
    descriptionLongue: "Les nachos sont une invention récente de la cuisine tex-mex, créés en 1943 par Ignacio Nacho Anaya à Piedras Negras au Mexique, pour nourrir des soldats américains avec ce qui était disponible en cuisine. Cette création improvise est devenue l'un des snacks les plus populaires du monde. Chips de maïs croustillantes chargées de bœuf épicé, de haricots frits, de fromage fondu qui grille au four, de jalapeños et de crème fraîche — les nachos sont le plat parfait pour partager, généreux et festif.",
    image: "https://i.pinimg.com/1200x/eb/d3/c4/ebd3c4a66238d5dd769650b9bbdc0c27.jpg",
    difficulte: "facile",
    tempsPreparation: "30 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Chips de maïs (tortilla chips)", quantiteRecette: 300, unite: "g", type: "pack", formatVente: "300g", quantitePanier: 1, unitePanier: "pack", prix: 20, prixBase: 20, prixSouk: 16, prixSupermarche: 24, icone: "tortilla-chips" },
      { nom: "Bœuf haché", quantiteRecette: 300, unite: "g", type: "flexible", formatVente: null, quantitePanier: 300, unitePanier: "g", prix: 33, prixBase: 33, prixSouk: 27, prixSupermarche: 39, icone: "ground-beef" },
      { nom: "Fromage cheddar râpé", quantiteRecette: 200, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 22, prixBase: 22, prixSouk: 18, prixSupermarche: 26, icone: "cheese" },
      { nom: "Haricots noirs en conserve", quantiteRecette: 200, unite: "g", type: "pack", formatVente: "400g", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 15, icone: "black-beans" },
      { nom: "Tomates", quantiteRecette: 150, unite: "g", type: "flexible", formatVente: null, quantitePanier: 150, unitePanier: "g", prix: 4, prixBase: 4, prixSouk: 2, prixSupermarche: 5, icone: "tomato" },
      { nom: "Piment en poudre", quantiteRecette: 8, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "chili-powder" }
    ],
    etapes: [
      "1. Faire dorer le bœuf haché avec piment, cumin, sel, oignon dans une poêle chaude.",
      "2. Préchauffer le four à 200°C.",
      "3. Étaler les chips en une seule couche sur une plaque de cuisson.",
      "4. Répartir les haricots égouttés, le bœuf épicé et le fromage râpé sur les chips.",
      "5. Enfourner 8-10 min jusqu'à ce que le fromage soit fondu et doré.",
      "6. Garnir de tomates en dés, coriandre, guacamole et crème fraîche avant de servir."
    ]
  },
  {
    id: "fajitas-poulet",
    titre: "Fajitas de Poulet aux Poivrons",
    categorie: "Mexicain",
    sousCategorie: null,
    descriptionCourte: "Poulet sauté aux poivrons colorés et épices, servi chaud dans des tortillas.",
    descriptionLongue: "Les fajitas sont originaires du Rio Grande, aux confins du Texas et du Mexique, où les cowboys mexicains (vaqueros) préparaient la bavette de bœuf marinée sur des grilles en plein air. La version au poulet est aujourd'hui la plus populaire. Le secret des fajitas est dans la marinade citronnée et épicée qui attendrit la viande, et dans la cuisson à très haute température pour caraméliser les bords tout en gardant le centre juteux. Servis à table avec des tortillas chaudes, fromage, guacamole et crème — chaque convive assemble sa propre fajita. C'est un plat convivial et festif.",
    image: "https://i.pinimg.com/1200x/f6/81/e2/f681e2c4e1f4ccb1fe60d919fe2b2dd7.jpg",
    difficulte: "facile",
    tempsPreparation: "40 min",
    portions: 4,
    populaire: true,
    ingredients: [
      { nom: "Blanc de poulet", quantiteRecette: 600, unite: "g", type: "flexible", formatVente: null, quantitePanier: 600, unitePanier: "g", prix: 60, prixBase: 60, prixSouk: 50, prixSupermarche: 70, icone: "chicken-breast" },
      { nom: "Poivrons tricolores", quantiteRecette: 400, unite: "g", type: "flexible", formatVente: null, quantitePanier: 400, unitePanier: "g", prix: 12, prixBase: 12, prixSouk: 8, prixSupermarche: 15, icone: "bell-pepper" },
      { nom: "Oignons", quantiteRecette: 200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 200, unitePanier: "g", prix: 4, prixBase: 4, prixSouk: 2, prixSupermarche: 5, icone: "onion" },
      { nom: "Tortillas de blé", quantiteRecette: 8, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 8, unitePanier: "pack", prix: 15, prixBase: 15, prixSouk: 12, prixSupermarche: 18, icone: "wheat-tortilla" },
      { nom: "Citron vert", quantiteRecette: 2, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 2, unitePanier: "g", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 6, icone: "lime" },
      { nom: "Piment en poudre", quantiteRecette: 10, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "chili-powder" },
      { nom: "Cumin en poudre", quantiteRecette: 5, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "cumin" }
    ],
    etapes: [
      "1. Couper le poulet en lanières. Mariner avec piment, cumin, jus de citron vert, ail, sel pendant 20 min.",
      "2. Émincer les poivrons et oignons en lanières.",
      "3. Faire chauffer une grande poêle ou plancha à feu très vif.",
      "4. Saisir le poulet mariné 3-4 min jusqu'à caramélisation. Réserver.",
      "5. Dans la même poêle, sauter les poivrons et oignons 4-5 min.",
      "6. Remettre le poulet, mélanger. Arroser de jus de citron vert.",
      "7. Servir immédiatement avec tortillas chaudes, guacamole et fromage râpé."
    ]
  },
  {
    id: "pico-de-gallo",
    titre: "Pico de Gallo (Salsa Fraîche)",
    categorie: "Mexicain",
    sousCategorie: null,
    descriptionCourte: "Salade mexicaine fraîche de tomates, oignon, coriandre et jalapeño, vive et croquante.",
    descriptionLongue: "Le pico de gallo (« bec de coq » en espagnol) est la salsa la plus fraîche et la plus simple du Mexique — aucune cuisson, juste des légumes de qualité finement coupés et assaisonnés. Contrairement aux salsas cuites, le pico de gallo préserve la croquant des légumes et la vivacité des saveurs. C'est un condiment polyvalent qui accompagne tacos, nachos, grillades et bien d'autres plats mexicains. La clé est de laisser reposer 15 minutes après préparation pour que les saveurs se mélangent et que les jus se libèrent.",
    image: "https://i.pinimg.com/1200x/4d/3f/51/4d3f518299594c9c3a12ad5b8b09639f.jpg",
    difficulte: "facile",
    tempsPreparation: "15 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Tomates mûres", quantiteRecette: 300, unite: "g", type: "flexible", formatVente: null, quantitePanier: 300, unitePanier: "g", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "tomato" },
      { nom: "Oignons blancs", quantiteRecette: 100, unite: "g", type: "flexible", formatVente: null, quantitePanier: 100, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "onion" },
      { nom: "Coriandre fraîche", quantiteRecette: 30, unite: "g", type: "flexible", formatVente: null, quantitePanier: 30, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "coriander" },
      { nom: "Citron vert", quantiteRecette: 2, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 2, unitePanier: "g", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 6, icone: "lime" },
      { nom: "Piment vert", quantiteRecette: 1, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 1, unitePanier: "g", prix: 2, prixBase: 2, prixSouk: 1, prixSupermarche: 3, icone: "chili" }
    ],
    etapes: [
      "1. Épépiner les tomates et les couper en petits dés réguliers.",
      "2. Émincer finement l'oignon blanc.",
      "3. Hacher finement la coriandre fraîche.",
      "4. Épépiner et hacher finement le piment vert.",
      "5. Mélanger tous les ingrédients dans un saladier.",
      "6. Assaisonner avec le jus de citron vert et du sel.",
      "7. Laisser reposer 15 min à température ambiante avant de servir."
    ]
  },

  // ==================== ESPAGNOL ====================
  {
    id: "paella-valenciana",
    titre: "Paella Valenciana",
    categorie: "Espagnol",
    sousCategorie: null,
    descriptionCourte: "Le riz safrané espagnol emblématique aux viandes, légumes et socarrat doré.",
    descriptionLongue: "La paella est le plat national espagnol par excellence, originaire de la région de Valence. Son nom vient du latin « patella » (poêle). La vraie paella valenciana se préparait historiquement avec du lapin, du poulet et des légumes frais des champs — pas de fruits de mer ! La clé est le socarrat, cette croûte de riz légèrement caramélisée au fond de la paellera, considérée comme la récompense du cuisinier patient. Le safran lui donne sa couleur dorée caractéristique. Préparée en plein air, sur feu de bois, partagée en famille — c'est un rituel convivial valencien.",
    image: "https://i.pinimg.com/1200x/fc/8e/09/fc8e092c1c22ed588e5e0f229b034073.jpg",
    difficulte: "difficile",
    tempsPreparation: "90 min",
    portions: 4,
    populaire: true,
    ingredients: [
      { nom: "Riz pour paella (bomba)", quantiteRecette: 400, unite: "g", type: "pack", formatVente: "500g", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 15, prixSupermarche: 22, icone: "rice" },
      { nom: "Poulet (morceaux)", quantiteRecette: 600, unite: "g", type: "flexible", formatVente: null, quantitePanier: 600, unitePanier: "g", prix: 45, prixBase: 45, prixSouk: 38, prixSupermarche: 52, icone: "chicken" },
      { nom: "Haricots verts plats", quantiteRecette: 200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 200, unitePanier: "g", prix: 8, prixBase: 8, prixSouk: 5, prixSupermarche: 10, icone: "green-beans" },
      { nom: "Tomates", quantiteRecette: 200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 200, unitePanier: "g", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "tomato" },
      { nom: "Safran", quantiteRecette: 2, unite: "g", type: "pack", formatVente: "1 unité", quantitePanier: 2, unitePanier: "pack", prix: 15, prixBase: 15, prixSouk: 12, prixSupermarche: 18, icone: "saffron" },
      { nom: "Paprika fumé", quantiteRecette: 8, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "smoked-paprika" },
      { nom: "Huile d'olive", quantiteRecette: 80, unite: "ml", type: "pack", formatVente: "500ml", quantitePanier: 1, unitePanier: "pack", prix: 35, prixBase: 35, prixSouk: 30, prixSupermarche: 40, icone: "olive-oil" },
      { nom: "Bouillon de poulet", quantiteRecette: 1200, unite: "ml", type: "pack", formatVente: "1L", quantitePanier: 2, unitePanier: "pack", prix: 24, prixBase: 24, prixSouk: 20, prixSupermarche: 28, icone: "chicken-broth" }
    ],
    etapes: [
      "1. Chauffer l'huile d'olive dans une grande paellera (ou grande poêle à rebords bas).",
      "2. Faire dorer les morceaux de poulet sur toutes les faces. Réserver.",
      "3. Faire sauter les haricots verts dans la même huile 3-4 min.",
      "4. Ajouter les tomates râpées et le paprika fumé. Cuire 5 min.",
      "5. Remettre le poulet, ajouter le riz et nacrer 2 min en remuant.",
      "6. Verser le bouillon chaud infusé au safran. Ne plus remuer.",
      "7. Cuire à feu vif 10 min, puis réduire 10 min. Chercher le socarrat : riz doré et légèrement collant au fond.",
      "8. Couvrir de papier aluminium 5 min avant de servir directement dans la paellera."
    ]
  },
  {
    id: "tortilla-patatas",
    titre: "Tortilla de Patatas",
    categorie: "Espagnol",
    sousCategorie: null,
    descriptionCourte: "L'omelette épaisse espagnole aux pommes de terre confites dans l'huile d'olive.",
    descriptionLongue: "La tortilla española est le plat national espagnol par excellence après la paella. Cette omelette épaisse de pommes de terre et d'œufs, inventée au XIXe siècle, est omniprésente dans tous les bars et toutes les cuisines d'Espagne. Le secret d'une bonne tortilla est dans les pommes de terre confites lentement dans l'huile d'olive — pas frites — jusqu'à devenir fondantes, puis mélangées aux œufs battus et cuites à feu doux des deux côtés. Elle doit être légèrement coulante au centre (jugosa) ou bien cuite (cuajada) selon les préférences. Servie chaude ou froide, en tapas ou en plat — la tortilla est intemporelle.",
    image: "https://i.pinimg.com/1200x/35/26/43/352643ad05266d8ff374105e1f636662.jpg",
    difficulte: "moyen",
    tempsPreparation: "60 min",
    portions: 4,
    populaire: true,
    ingredients: [
      { nom: "Pommes de terre", quantiteRecette: 600, unite: "g", type: "flexible", formatVente: null, quantitePanier: 600, unitePanier: "g", prix: 8, prixBase: 8, prixSouk: 5, prixSupermarche: 10, icone: "potato" },
      { nom: "Œufs", quantiteRecette: 6, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 6, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "eggs" },
      { nom: "Oignons", quantiteRecette: 150, unite: "g", type: "flexible", formatVente: null, quantitePanier: 150, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "onion" },
      { nom: "Huile d'olive", quantiteRecette: 200, unite: "ml", type: "pack", formatVente: "500ml", quantitePanier: 1, unitePanier: "pack", prix: 35, prixBase: 35, prixSouk: 30, prixSupermarche: 40, icone: "olive-oil" },
      { nom: "Sel", quantiteRecette: 8, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 6, icone: "salt" }
    ],
    etapes: [
      "1. Peler et couper les pommes de terre en fines lamelles (3mm). Émincer les oignons.",
      "2. Faire confire pommes de terre et oignons dans l'huile d'olive à feu doux 20 min — doucement, pas frire.",
      "3. Égoutter en conservant l'huile. Laisser tiédir.",
      "4. Battre les œufs avec sel. Incorporer les pommes de terre égouttées. Laisser reposer 5 min.",
      "5. Faire chauffer 2 cuillères d'huile récupérée dans une poêle de 22 cm.",
      "6. Verser le mélange œufs-pommes de terre. Cuire à feu doux-moyen 5-6 min jusqu'à prise du fond.",
      "7. Retourner avec une assiette d'un geste vif. Remettre dans la poêle 3-4 min.",
      "8. Servir chaude ou à température ambiante, coupée en parts ou en cubes pour tapas."
    ]
  },
  {
    id: "gazpacho-andaluz",
    titre: "Gazpacho Andaluz",
    categorie: "Espagnol",
    sousCategorie: null,
    descriptionCourte: "Soupe froide de tomates et légumes, fraîche et veloutée, emblème de l'Andalousie.",
    descriptionLongue: "Le gazpacho est l'un des plats les plus désaltérants de la gastronomie mondiale, né dans l'Andalousie torride où les étés brûlants appellent des plats froids et nourrissants. À l'origine une bouillie de pain, ail et huile des paysans andalous, il a évolué après l'introduction des tomates d'Amérique du Sud au XVIe siècle. La version moderne est un velouté de tomates mûres, concombres, poivrons, ail et pain, mixé avec de l'huile d'olive et du vinaigre de Xérès, puis servi glacé. En Espagne, on en boit comme un jus au quotidien en été — c'est à la fois une soupe, une boisson et un concentré de fraîcheur méditerranéenne.",
    image: "https://i.pinimg.com/736x/d0/0d/da/d00dda546ef2be6f71960b2a842ab39e.jpg",
    difficulte: "facile",
    tempsPreparation: "20 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Tomates mûres", quantiteRecette: 800, unite: "g", type: "flexible", formatVente: null, quantitePanier: 800, unitePanier: "g", prix: 16, prixBase: 16, prixSouk: 10, prixSupermarche: 20, icone: "tomato" },
      { nom: "Concombre", quantiteRecette: 200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 200, unitePanier: "g", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "cucumber" },
      { nom: "Poivrons rouges", quantiteRecette: 150, unite: "g", type: "flexible", formatVente: null, quantitePanier: 150, unitePanier: "g", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "bell-pepper" },
      { nom: "Ail", quantiteRecette: 2, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 10, unitePanier: "g", prix: 2, prixBase: 2, prixSouk: 1, prixSupermarche: 3, icone: "garlic" },
      { nom: "Pain rassis", quantiteRecette: 80, unite: "g", type: "pack", formatVente: "500g", quantitePanier: 1, unitePanier: "pack", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "bread" },
      { nom: "Huile d'olive", quantiteRecette: 80, unite: "ml", type: "pack", formatVente: "500ml", quantitePanier: 1, unitePanier: "pack", prix: 35, prixBase: 35, prixSouk: 30, prixSupermarche: 40, icone: "olive-oil" },
      { nom: "Vinaigre de vin rouge", quantiteRecette: 30, unite: "ml", type: "pack", formatVente: "250ml", quantitePanier: 1, unitePanier: "pack", prix: 10, prixBase: 10, prixSouk: 8, prixSupermarche: 12, icone: "vinegar" }
    ],
    etapes: [
      "1. Tremper le pain rassis dans de l'eau froide 5 min. Essorer.",
      "2. Couper grossièrement tomates, concombre (pelé, épépiné), poivron épépiné, ail.",
      "3. Mixer tous les légumes avec le pain essoré jusqu'à consistance lisse.",
      "4. Ajouter l'huile d'olive en filet en mixant, puis le vinaigre, sel et poivre.",
      "5. Passer au tamis fin pour une texture parfaitement veloutée.",
      "6. Réfrigérer au moins 2 heures. Goûter et rectifier l'assaisonnement froid.",
      "7. Servir glacé avec des garnitures (dés de tomate, concombre, poivron et croûtons)."
    ]
  },
  {
    id: "patatas-bravas",
    titre: "Patatas Bravas",
    categorie: "Espagnol",
    sousCategorie: null,
    descriptionCourte: "Pommes de terre frites croustillantes avec sauce tomate épicée et aïoli espagnols.",
    descriptionLongue: "Les patatas bravas sont sans doute la tapas la plus populaire de toute l'Espagne, présente dans pratiquement chaque bar de Madrid. Leur nom signifie « pommes de terre courageuses » — en référence à leur sauce piquante. Les pommes de terre coupées en cubes sont frites en deux étapes (blanchies puis frites à haute température) pour obtenir un intérieur fondant et un extérieur ultra-croustillant. La sauce bravas, à base de tomates et piment, est souvent accompagnée d'une mayonnaise à l'ail (aïoli). Chaque bar de Madrid a sa version secrète de la sauce, et les débats sur la meilleure patata brava de la ville sont passionnés.",
    image: "https://i.pinimg.com/1200x/d2/dc/ae/d2dcae061fb4e82db6220ccadedd56da.jpg",
    difficulte: "facile",
    tempsPreparation: "40 min",
    portions: 4,
    populaire: true,
    ingredients: [
      { nom: "Pommes de terre", quantiteRecette: 600, unite: "g", type: "flexible", formatVente: null, quantitePanier: 600, unitePanier: "g", prix: 8, prixBase: 8, prixSouk: 5, prixSupermarche: 10, icone: "potato" },
      { nom: "Tomates pelées en conserve", quantiteRecette: 200, unite: "g", type: "pack", formatVente: "400g", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 15, icone: "canned-tomatoes" },
      { nom: "Paprika fumé", quantiteRecette: 8, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "smoked-paprika" },
      { nom: "Piment de Cayenne", quantiteRecette: 2, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "cayenne" },
      { nom: "Huile de friture", quantiteRecette: 500, unite: "ml", type: "pack", formatVente: "1L", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 15, prixSupermarche: 22, icone: "frying-oil" },
      { nom: "Ail", quantiteRecette: 3, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 15, unitePanier: "g", prix: 2, prixBase: 2, prixSouk: 1, prixSupermarche: 3, icone: "garlic" }
    ],
    etapes: [
      "1. Couper les pommes de terre en cubes de 2-3 cm. Blanchir dans l'eau bouillante salée 5 min. Égoutter et sécher.",
      "2. Frire les cubes une première fois à 140°C pendant 5 min. Égoutter.",
      "3. Préparer la sauce bravas : faire revenir l'ail, ajouter tomates, paprika fumé, cayenne, sel. Mixer.",
      "4. Frire les pommes de terre une deuxième fois à 190°C jusqu'à dorure croustillante.",
      "5. Égoutter sur papier absorbant, saler immédiatement.",
      "6. Dresser dans un plat tapas, napper de sauce bravas chaude.",
      "7. Optionnel : accompagner d'aïoli (mayonnaise à l'ail)."
    ]
  },
  {
    id: "churros-chocolate",
    titre: "Churros con Chocolate",
    categorie: "Espagnol",
    sousCategorie: null,
    descriptionCourte: "Bâtonnets de pâte frits croustillants avec chocolat chaud épais pour tremper.",
    descriptionLongue: "Les churros sont l'un des petits-déjeuners et goûters les plus populaires d'Espagne et du monde hispanique. Ces longs bâtonnets de pâte cuite à l'eau, extrudés à travers une poche à douille cannelée et frits dans l'huile bouillante jusqu'à être croustillants et dorés, sont saupoudrés de sucre et de cannelle. Mais leur vraie raison d'être est le chocolate — un chocolat chaud épais, presque une crème, dans lequel on les trempe avec délice. Dans les churrerías madrilènes ouvertes à 3h du matin, on vient finir la nuit autour d'une tasse de chocolate con churros — c'est l'âme festive et réconfortante de l'Espagne.",
    image: "https://i.pinimg.com/1200x/31/52/b8/3152b8be11bd0cab7307059f0ce99d55.jpg",
    difficulte: "moyen",
    tempsPreparation: "45 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Farine", quantiteRecette: 250, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "flour" },
      { nom: "Chocolat noir à pâtisser", quantiteRecette: 200, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 20, prixBase: 20, prixSouk: 16, prixSupermarche: 24, icone: "dark-chocolate" },
      { nom: "Lait entier", quantiteRecette: 500, unite: "ml", type: "pack", formatVente: "1L", quantitePanier: 1, unitePanier: "pack", prix: 9, prixBase: 9, prixSouk: 8, prixSupermarche: 10, icone: "milk" },
      { nom: "Sucre", quantiteRecette: 50, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 7, prixBase: 7, prixSouk: 5, prixSupermarche: 9, icone: "sugar" },
      { nom: "Cannelle en poudre", quantiteRecette: 5, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "cinnamon" },
      { nom: "Huile de friture", quantiteRecette: 500, unite: "ml", type: "pack", formatVente: "1L", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 15, prixSupermarche: 22, icone: "frying-oil" }
    ],
    etapes: [
      "1. Porter à ébullition 250ml d'eau avec une pincée de sel. Verser d'un coup sur la farine. Mélanger vigoureusement jusqu'à pâte lisse.",
      "2. Laisser refroidir 5 min. Transférer dans une poche à douille cannelée (douille étoile).",
      "3. Chauffer l'huile à 180°C.",
      "4. Extruder des bâtonnets de 10-12 cm directement dans l'huile chaude. Couper avec des ciseaux.",
      "5. Frire 3-4 min en retournant jusqu'à dorure. Égoutter sur papier absorbant.",
      "6. Saupoudrer de sucre et cannelle immédiatement.",
      "7. Chocolat chaud : faire fondre le chocolat cassé dans le lait chaud. Ajouter sucre et épaissir avec 1 c.s. de maïzena si nécessaire. Servir avec les churros chauds."
    ]
  },
  {
    id: "gambas-ajillo",
    titre: "Gambas al Ajillo",
    categorie: "Espagnol",
    sousCategorie: null,
    descriptionCourte: "Crevettes sautées à l'ail, huile d'olive et piment, tapas espagnols explosifs.",
    descriptionLongue: "Les gambas al ajillo sont probablement la tapas la plus populaire de la péninsule ibérique — servies dans des cassolettes en terre cuite fumantes, l'huile d'olive bouillonnant autour de grosses crevettes parfumées à l'ail et au piment. La recette est d'une simplicité désarmante mais d'une efficacité absolue : des crevettes de qualité saisies à feu vif dans une huile d'olive généreusement parfumée à l'ail, avec juste une touche de piment et de persil. Le jus de cuisson est le trésor — on y trempe le pain avec autant de plaisir qu'on mange les crevettes.",
    image: "https://i.pinimg.com/736x/62/2b/5e/622b5e8f37b661563cd39bc14251da1a.jpg",
    difficulte: "facile",
    tempsPreparation: "15 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Grosses crevettes crues décortiquées", quantiteRecette: 400, unite: "g", type: "flexible", formatVente: null, quantitePanier: 400, unitePanier: "g", prix: 70, prixBase: 70, prixSouk: 60, prixSupermarche: 80, icone: "shrimp" },
      { nom: "Ail", quantiteRecette: 6, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 30, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "garlic" },
      { nom: "Huile d'olive", quantiteRecette: 100, unite: "ml", type: "pack", formatVente: "500ml", quantitePanier: 1, unitePanier: "pack", prix: 35, prixBase: 35, prixSouk: 30, prixSupermarche: 40, icone: "olive-oil" },
      { nom: "Piment de Cayenne", quantiteRecette: 2, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "cayenne" },
      { nom: "Persil frais", quantiteRecette: 20, unite: "g", type: "flexible", formatVente: null, quantitePanier: 20, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "parsley" },
      { nom: "Citron", quantiteRecette: 1, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 1, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "lemon" }
    ],
    etapes: [
      "1. Sécher les crevettes sur papier absorbant. Saler légèrement.",
      "2. Émincer finement l'ail.",
      "3. Dans une petite casserole en terre cuite ou poêle, chauffer l'huile d'olive à feu moyen.",
      "4. Ajouter l'ail et le piment de Cayenne. Faire revenir doucement 1-2 min sans colorer.",
      "5. Augmenter le feu à vif. Ajouter les crevettes et saisir 1 min de chaque côté.",
      "6. Parsemer de persil ciselé, arroser d'un filet de jus de citron.",
      "7. Servir immédiatement dans la casserole en terre cuite avec du pain croustillant."
    ]
  },

  // ==================== FRANÇAIS ====================
  {
    id: "ratatouille",
    titre: "Ratatouille Provençale",
    categorie: "Français",
    sousCategorie: null,
    descriptionCourte: "Mélange mijoté de légumes méditerranéens colorés, plat emblématique de la Provence.",
    descriptionLongue: "La ratatouille est le plat emblématique de la cuisine provençale, né à Nice et dans la région de la Méditerranée française. Son nom vient du mot « touiller » (remuer). Ce mélange de légumes estivaux — courgettes, aubergines, poivrons, tomates, oignons — cuits lentement dans l'huile d'olive avec ail et herbes de Provence est une ode aux saveurs du soleil méditerranéen. La clé d'une bonne ratatouille est de cuire chaque légume séparément pour préserver ses saveurs individuelles avant de les réunir en un mélange harmonieux. Chaude ou froide, elle accompagne aussi bien les viandes que le poisson ou se déguste seule avec du pain.",
    image: "https://i.pinimg.com/1200x/06/65/23/066523e3b07f1a6c4a107bd8516057c6.jpg",
    difficulte: "facile",
    tempsPreparation: "75 min",
    portions: 4,
    populaire: true,
    ingredients: [
      { nom: "Aubergines", quantiteRecette: 300, unite: "g", type: "flexible", formatVente: null, quantitePanier: 300, unitePanier: "g", prix: 8, prixBase: 8, prixSouk: 5, prixSupermarche: 10, icone: "eggplant" },
      { nom: "Courgettes", quantiteRecette: 300, unite: "g", type: "flexible", formatVente: null, quantitePanier: 300, unitePanier: "g", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "zucchini" },
      { nom: "Poivrons rouges", quantiteRecette: 200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 200, unitePanier: "g", prix: 8, prixBase: 8, prixSouk: 5, prixSupermarche: 10, icone: "bell-pepper" },
      { nom: "Tomates", quantiteRecette: 400, unite: "g", type: "flexible", formatVente: null, quantitePanier: 400, unitePanier: "g", prix: 8, prixBase: 8, prixSouk: 5, prixSupermarche: 10, icone: "tomato" },
      { nom: "Oignons", quantiteRecette: 200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 200, unitePanier: "g", prix: 4, prixBase: 4, prixSouk: 2, prixSupermarche: 5, icone: "onion" },
      { nom: "Ail", quantiteRecette: 4, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 20, unitePanier: "g", prix: 2, prixBase: 2, prixSouk: 1, prixSupermarche: 3, icone: "garlic" },
      { nom: "Huile d'olive", quantiteRecette: 80, unite: "ml", type: "pack", formatVente: "500ml", quantitePanier: 1, unitePanier: "pack", prix: 35, prixBase: 35, prixSouk: 30, prixSupermarche: 40, icone: "olive-oil" },
      { nom: "Herbes de Provence", quantiteRecette: 10, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "herbs" }
    ],
    etapes: [
      "1. Couper tous les légumes en cubes de 2 cm. Faire dégorger les aubergines avec du sel 15 min, rincer et sécher.",
      "2. Faire suer les oignons émincés dans l'huile d'olive 5 min.",
      "3. Ajouter les poivrons et cuire 5 min.",
      "4. Dans une poêle séparée, faire sauter les aubergines à l'huile jusqu'à dorure. Réserver.",
      "5. Faire de même avec les courgettes jusqu'à légère coloration. Réserver.",
      "6. Ajouter les tomates concassées aux oignons/poivrons, l'ail écrasé et les herbes. Cuire 10 min.",
      "7. Ajouter les aubergines et courgettes. Mélanger délicatement, cuire à feu doux 20 min.",
      "8. Rectifier l'assaisonnement. Servir chaud ou à température ambiante avec pain croustillant."
    ]
  },
  {
    id: "quiche-lorraine",
    titre: "Quiche Lorraine Halal",
    categorie: "Français",
    sousCategorie: null,
    descriptionCourte: "Tarte salée française aux œufs, crème fraîche et viande fumée halal, incontournable.",
    descriptionLongue: "La quiche Lorraine est l'une des préparations salées les plus célèbres de la gastronomie française, originaire de la région de Lorraine dans le nord-est de la France. Historiquement préparée avec du lard fumé et des œufs battus, elle est ici revisitée en version halal avec de la viande fumée de bœuf ou d'agneau. L'appareil — ce mélange de crème fraîche, d'œufs et d'assaisonnement — doit cuire lentement jusqu'à être pris mais encore légèrement tremblant au centre. La pâte brisée dorée, le remplissage onctueux et la légère gratification du dessus créent une harmonie qui a conquis le monde entier.",
    image: "https://i.pinimg.com/1200x/0c/75/e1/0c75e1232905d71e1776c3d0403ce14f.jpg",
    difficulte: "moyen",
    tempsPreparation: "75 min",
    portions: 6,
    populaire: false,
    ingredients: [
      { nom: "Pâte brisée", quantiteRecette: 250, unite: "g", type: "pack", formatVente: "250g", quantitePanier: 1, unitePanier: "pack", prix: 15, prixBase: 15, prixSouk: 12, prixSupermarche: 18, icone: "pastry-dough" },
      { nom: "Viande fumée halal en dés", quantiteRecette: 200, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 25, prixBase: 25, prixSouk: 20, prixSupermarche: 30, icone: "smoked-beef" },
      { nom: "Œufs", quantiteRecette: 3, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 3, unitePanier: "pack", prix: 4, prixBase: 4, prixSouk: 3, prixSupermarche: 5, icone: "eggs" },
      { nom: "Crème fraîche liquide", quantiteRecette: 300, unite: "ml", type: "pack", formatVente: "500ml", quantitePanier: 1, unitePanier: "pack", prix: 22, prixBase: 22, prixSouk: 18, prixSupermarche: 26, icone: "cream" },
      { nom: "Gruyère râpé", quantiteRecette: 80, unite: "g", type: "pack", formatVente: "150g", quantitePanier: 1, unitePanier: "pack", prix: 22, prixBase: 22, prixSouk: 18, prixSupermarche: 26, icone: "gruyere" },
      { nom: "Noix de muscade", quantiteRecette: 2, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 7, prixBase: 7, prixSouk: 5, prixSupermarche: 9, icone: "nutmeg" }
    ],
    etapes: [
      "1. Préchauffer le four à 180°C. Étaler la pâte brisée dans un moule à tarte de 26 cm.",
      "2. Piquer le fond avec une fourchette, couvrir de papier sulfurisé et légumes secs. Cuire à blanc 15 min.",
      "3. Faire dorer les dés de viande fumée à sec dans une poêle. Égoutter sur papier absorbant.",
      "4. Battre les œufs avec la crème fraîche, sel, poivre et noix de muscade râpée.",
      "5. Répartir la viande sur le fond de tarte. Parsemer de gruyère.",
      "6. Verser délicatement l'appareil crème-œufs.",
      "7. Cuire 35-40 min jusqu'à ce que l'appareil soit doré et légèrement tremblant au centre. Servir tiède."
    ]
  },
  {
    id: "gratin-dauphinois",
    titre: "Gratin Dauphinois",
    categorie: "Français",
    sousCategorie: null,
    descriptionCourte: "Pommes de terre fondantes à la crème et à l'ail, gratinées au four, réconfort absolu.",
    descriptionLongue: "Le gratin dauphinois est l'une des recettes régionales françaises les plus réussies et les plus imitées dans le monde, originaire du Dauphiné (région de Grenoble). La vraie recette ne contient pas de fromage — c'est la crème fraîche entière qui, en cuisant lentement avec les amidons de pommes de terre, crée une sauce onctueuse qui nappe chaque couche. L'ail frotté dans le plat donne un parfum délicat. Les tranches de pommes de terre doivent être suffisamment fines pour être fondantes mais pas translucides. C'est le plat d'hiver par excellence, gourmand et réconfortant.",
    image: "https://i.pinimg.com/736x/bf/d8/af/bfd8afefa3749e294acfca0944587db4.jpg",
    difficulte: "facile",
    tempsPreparation: "90 min",
    portions: 4,
    populaire: true,
    ingredients: [
      { nom: "Pommes de terre (Bintje)", quantiteRecette: 800, unite: "g", type: "flexible", formatVente: null, quantitePanier: 800, unitePanier: "g", prix: 10, prixBase: 10, prixSouk: 7, prixSupermarche: 13, icone: "potato" },
      { nom: "Crème fraîche liquide", quantiteRecette: 400, unite: "ml", type: "pack", formatVente: "500ml", quantitePanier: 1, unitePanier: "pack", prix: 22, prixBase: 22, prixSouk: 18, prixSupermarche: 26, icone: "cream" },
      { nom: "Lait entier", quantiteRecette: 200, unite: "ml", type: "pack", formatVente: "1L", quantitePanier: 1, unitePanier: "pack", prix: 9, prixBase: 9, prixSouk: 8, prixSupermarche: 10, icone: "milk" },
      { nom: "Ail", quantiteRecette: 3, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 15, unitePanier: "g", prix: 2, prixBase: 2, prixSouk: 1, prixSupermarche: 3, icone: "garlic" },
      { nom: "Beurre", quantiteRecette: 30, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 14, prixBase: 14, prixSouk: 12, prixSupermarche: 16, icone: "butter" },
      { nom: "Noix de muscade", quantiteRecette: 2, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 7, prixBase: 7, prixSouk: 5, prixSupermarche: 9, icone: "nutmeg" }
    ],
    etapes: [
      "1. Préchauffer le four à 160°C. Frotter le plat à gratin avec les gousses d'ail coupées en deux, puis beurrer.",
      "2. Éplucher et trancher finement les pommes de terre (2mm) — ne pas rincer pour garder l'amidon.",
      "3. Chauffer crème et lait avec l'ail écrasé, sel, poivre et muscade. Ne pas faire bouillir.",
      "4. Disposer les tranches de pommes de terre en couches régulières en versant le mélange crème-lait entre chaque couche.",
      "5. Terminer par la crème qui doit presque couvrir les pommes de terre.",
      "6. Couvrir de papier aluminium et cuire 45 min.",
      "7. Retirer l'aluminium, monter à 180°C et gratiner encore 20-25 min. Servir directement dans le plat."
    ]
  },
  {
    id: "poulet-roti-francais",
    titre: "Poulet Rôti à la Française",
    categorie: "Français",
    sousCategorie: null,
    descriptionCourte: "Poulet rôti doré et juteux aux herbes et beurre, plat familial français indétrônable.",
    descriptionLongue: "Le poulet rôti est le plat du dimanche français par excellence. Dans le célèbre guide Michelin, le test ultime pour évaluer un grand chef est souvent son poulet rôti — ce plat d'apparence simple qui révèle en réalité toute la maîtrise de la cuisson et de l'assaisonnement. Le secret : un bon poulet fermier Label Rouge, du beurre généreusement glissé sous la peau pour la nourrir, des herbes fraîches dans la cavité pour parfumer, et une cuisson lente et régulière pour obtenir une peau croustillante et une chair juteuse. Le jus de rôtissage déglacé forme une sauce simple mais incomparable.",
    image: "https://i.pinimg.com/736x/fb/5f/0e/fb5f0e5b5fb0d019f7b22d77912b7245.jpg",
    difficulte: "facile",
    tempsPreparation: "90 min",
    portions: 4,
    populaire: true,
    ingredients: [
      { nom: "Poulet fermier entier", quantiteRecette: 1400, unite: "g", type: "flexible", formatVente: null, quantitePanier: 1400, unitePanier: "g", prix: 80, prixBase: 80, prixSouk: 68, prixSupermarche: 92, icone: "poulet-fermier-entier" },
      { nom: "Beurre", quantiteRecette: 80, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 14, prixBase: 14, prixSouk: 12, prixSupermarche: 16, icone: "butter" },
      { nom: "Thym frais", quantiteRecette: 5, unite: "g", type: "flexible", formatVente: null, quantitePanier: 5, unitePanier: "g", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "thyme" },
      { nom: "Romarin frais", quantiteRecette: 5, unite: "g", type: "flexible", formatVente: null, quantitePanier: 5, unitePanier: "g", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "rosemary" },
      { nom: "Ail", quantiteRecette: 4, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 20, unitePanier: "g", prix: 2, prixBase: 2, prixSouk: 1, prixSupermarche: 3, icone: "garlic" },
      { nom: "Citron", quantiteRecette: 1, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 1, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "lemon" },
      { nom: "Huile d'olive", quantiteRecette: 30, unite: "ml", type: "pack", formatVente: "500ml", quantitePanier: 1, unitePanier: "pack", prix: 35, prixBase: 35, prixSouk: 30, prixSupermarche: 40, icone: "olive-oil" }
    ],
    etapes: [
      "1. Sortir le poulet du réfrigérateur 30 min avant de cuisiner. Préchauffer le four à 200°C.",
      "2. Malaxer le beurre avec l'ail haché, le thym effeuillit et sel/poivre.",
      "3. Glisser délicatement le beurre aux herbes sous la peau du poulet (poitrine et cuisses).",
      "4. Farcir la cavité avec citron coupé en deux, brins de romarin et gousses d'ail entières.",
      "5. Badigeonner l'extérieur d'huile d'olive, saler et poivrer généreusement.",
      "6. Placer sur une grille dans un plat. Rôtir 1h15 en arrosant toutes les 20 min.",
      "7. Vérifier la cuisson (jus clair à la cuisse). Laisser reposer 10 min sous aluminium avant de découper."
    ]
  },
  {
    id: "crepes-francaises",
    titre: "Crêpes Françaises",
    categorie: "Français",
    sousCategorie: null,
    descriptionCourte: "Fines crêpes bretonnes pour garnir de sucre, confiture, chocolat ou jambon fromage.",
    descriptionLongue: "Les crêpes sont au cœur de la tradition culinaire bretonne et française, célébrées chaque année le 2 février (la Chandeleur). La pâte à crêpe est l'une des préparations les plus simples de la cuisine française — farine, œufs, lait et beurre fondu — mais sa réalisation parfaite demande de la pratique. La crêpe doit être fine et dorée, avec une texture légèrement dentellée sur les bords. En version sucrée avec beurre-sucre, nutella ou confiture, ou en version salée avec jambon-fromage, les crêpes symbolisent la gourmandise quotidienne française et la convivialité des repas en famille.",
    image: "https://i.pinimg.com/736x/d9/34/0a/d9340a988439c3a94b5044c0c65a4d34.jpg",
    difficulte: "facile",
    tempsPreparation: "30 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Farine", quantiteRecette: 250, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "flour" },
      { nom: "Œufs", quantiteRecette: 3, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 3, unitePanier: "pack", prix: 4, prixBase: 4, prixSouk: 3, prixSupermarche: 5, icone: "eggs" },
      { nom: "Lait entier", quantiteRecette: 500, unite: "ml", type: "pack", formatVente: "1L", quantitePanier: 1, unitePanier: "pack", prix: 9, prixBase: 9, prixSouk: 8, prixSupermarche: 10, icone: "milk" },
      { nom: "Beurre", quantiteRecette: 50, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 14, prixBase: 14, prixSouk: 12, prixSupermarche: 16, icone: "butter" },
      { nom: "Sucre", quantiteRecette: 20, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 7, prixBase: 7, prixSouk: 5, prixSupermarche: 9, icone: "sugar" },
      { nom: "Sel", quantiteRecette: 2, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 6, icone: "salt" }
    ],
    etapes: [
      "1. Tamiser la farine dans un saladier. Creuser un puits au centre.",
      "2. Casser les œufs dans le puits. Fouetter en incorporant progressivement la farine.",
      "3. Ajouter le lait petit à petit en fouettant pour éviter les grumeaux.",
      "4. Incorporer le beurre fondu refroidi, sucre et sel. La pâte doit être fluide.",
      "5. Laisser reposer la pâte 30 min minimum.",
      "6. Chauffer une crêpière ou poêle antiadhésive légèrement beurrée à feu moyen-vif.",
      "7. Verser une louche de pâte et incliner rapidement la poêle pour étaler finement.",
      "8. Cuire 1-2 min jusqu'à bords dorés. Retourner et cuire 30 secondes de l'autre côté."
    ]
  },
  {
    id: "soupe-oignon",
    titre: "Soupe à l'Oignon",
    categorie: "Français",
    sousCategorie: null,
    descriptionCourte: "Soupe traditionnelle parisienne aux oignons caramélisés avec croûtons et fromage gratiné.",
    descriptionLongue: "La soupe à l'oignon gratinée est un classique absolu de la cuisine parisienne, emblème des bistros et brasseries de la capitale. Née dans les halles de Paris où les maraîchers la préparaient à l'aube pour se réchauffer, elle est devenue l'une des soupes les plus célèbres du monde. La longue caramélisation des oignons — 45 minutes minimum à feu doux en remuant — est la clé de sa saveur profonde et sucrée. Coulée bouillante dans des bols individuels, surmontée de tranches de pain gratiné sous le gruyère fondu, c'est une soupe qui réchauffe l'âme dans les froids hivers parisiens.",
    image: "https://i.pinimg.com/1200x/a5/09/92/a5099256baef4d6bf3054f0a56d72e35.jpg",
    difficulte: "facile",
    tempsPreparation: "75 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Oignons jaunes", quantiteRecette: 800, unite: "g", type: "flexible", formatVente: null, quantitePanier: 800, unitePanier: "g", prix: 12, prixBase: 12, prixSouk: 8, prixSupermarche: 15, icone: "onion" },
      { nom: "Beurre", quantiteRecette: 60, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 14, prixBase: 14, prixSouk: 12, prixSupermarche: 16, icone: "butter" },
      { nom: "Pain de campagne", quantiteRecette: 4, unite: "unité", type: "pack", formatVente: "500g", quantitePanier: 1, unitePanier: "pack", prix: 10, prixBase: 10, prixSouk: 8, prixSupermarche: 12, icone: "bread" },
      { nom: "Gruyère râpé", quantiteRecette: 120, unite: "g", type: "pack", formatVente: "150g", quantitePanier: 1, unitePanier: "pack", prix: 22, prixBase: 22, prixSouk: 18, prixSupermarche: 26, icone: "gruyere" },
      { nom: "Bouillon de bœuf", quantiteRecette: 1200, unite: "ml", type: "pack", formatVente: "1L", quantitePanier: 2, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 15, prixSupermarche: 22, icone: "beef-broth" },
      { nom: "Vin blanc sec", quantiteRecette: 100, unite: "ml", type: "pack", formatVente: "500ml", quantitePanier: 1, unitePanier: "pack", prix: 20, prixBase: 20, prixSouk: 18, prixSupermarche: 25, icone: "white-wine" }
    ],
    etapes: [
      "1. Émincer finement les oignons en demi-lunes.",
      "2. Faire fondre le beurre dans une grande casserole à feu moyen-doux. Ajouter les oignons, couvrir 10 min.",
      "3. Ôter le couvercle, augmenter légèrement le feu. Caraméliser les oignons en remuant régulièrement pendant 35-40 min jusqu'à couleur dorée-brune.",
      "4. Déglacer avec le vin blanc, gratter les sucs. Laisser réduire 2 min.",
      "5. Ajouter le bouillon chaud, saler, poivrer. Laisser mijoter 20 min.",
      "6. Préchauffer le four en grill. Faire griller les tranches de pain.",
      "7. Remplir des bols allant au four de soupe. Poser un croûton sur chaque bol, parsemer de gruyère.",
      "8. Gratiner sous le grill 3-5 min jusqu'à dorure. Servir immédiatement."
    ]
  },
  {
    id: "mousse-chocolat",
    titre: "Mousse au Chocolat",
    categorie: "Français",
    sousCategorie: null,
    descriptionCourte: "Dessert français aérien et intense en chocolat noir, léger comme un nuage.",
    descriptionLongue: "La mousse au chocolat est l'un des desserts les plus élégants et les plus simples de la pâtisserie française. Née au XVIIIe siècle dans les cours aristocratiques françaises (on l'appelait alors « mayonnaise de chocolat »), elle est devenue un classique des tables françaises. La magie de la mousse vient du mariage de deux textures opposées — le chocolat fondu lourd et les blancs montés en neige aériens — qui, incorporés délicatement, créent une texture légère et mousseuse qui fond en bouche tout en libérant une intensité chocolatée profonde. Un grand chocolat de couverture à 70% fait toute la différence.",
    image: "https://i.pinimg.com/1200x/11/34/d0/1134d0055cb7d812fe082721230366a6.jpg",
    difficulte: "facile",
    tempsPreparation: "25 min",
    portions: 4,
    populaire: true,
    ingredients: [
      { nom: "Chocolat noir 70%", quantiteRecette: 200, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 22, prixBase: 22, prixSouk: 18, prixSupermarche: 26, icone: "chocolat-noir-70%" },
      { nom: "Œufs", quantiteRecette: 4, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 4, unitePanier: "pack", prix: 5, prixBase: 5, prixSouk: 4, prixSupermarche: 6, icone: "eggs" },
      { nom: "Beurre", quantiteRecette: 30, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 14, prixBase: 14, prixSouk: 12, prixSupermarche: 16, icone: "butter" },
      { nom: "Sucre", quantiteRecette: 40, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 7, prixBase: 7, prixSouk: 5, prixSupermarche: 9, icone: "sugar" },
      { nom: "Sel", quantiteRecette: 1, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 6, icone: "salt" }
    ],
    etapes: [
      "1. Faire fondre le chocolat cassé avec le beurre au bain-marie. Laisser tiédir.",
      "2. Séparer les blancs des jaunes.",
      "3. Fouetter les jaunes avec le sucre jusqu'à blanchiment. Incorporer au chocolat tiède.",
      "4. Monter les blancs en neige ferme avec une pincée de sel.",
      "5. Incorporer 1/3 des blancs au chocolat en remuant vivement pour détendre.",
      "6. Incorporer délicatement le reste des blancs en 3 fois par mouvement de bas en haut pour garder l'air.",
      "7. Répartir dans des verrines ou ramequins. Réfrigérer minimum 3 heures avant de servir."
    ]
  },
  {
    id: "tarte-tatin",
    titre: "Tarte Tatin",
    categorie: "Français",
    sousCategorie: null,
    descriptionCourte: "Tarte aux pommes caramélisées renversée, accident délicieux devenu classique français.",
    descriptionLongue: "La tarte Tatin est née par accident en 1880 dans un hôtel de Lamotte-Beuvron, quand les sœurs Tatin, Stéphanie et Caroline, auraient oublié les pommes dans la poêle avant de poser la pâte dessus à la dernière minute, créant ainsi cette tarte à l'envers. Les pommes caramélisent dans le beurre et le sucre, la pâte cuit dessus au four, puis on retourne la tarte pour révéler les pommes luisantes et caramélisées. C'est l'un des desserts français les plus célèbres, emblème de la pâtisserie rustique et généreuse. Servie tiède avec une cuillère de crème fraîche, c'est un pur bonheur.",
    image: "https://content.joseedistasio.ca/app/uploads/2023/09/19200426/Tarte-Tatin-JDS_JANV_2021-124-web-999x1499.jpg",
    difficulte: "moyen",
    tempsPreparation: "75 min",
    portions: 6,
    populaire: false,
    ingredients: [
      { nom: "Pommes Golden", quantiteRecette: 1200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 1200, unitePanier: "g", prix: 20, prixBase: 20, prixSouk: 15, prixSupermarche: 25, icone: "apple" },
      { nom: "Pâte feuilletée", quantiteRecette: 250, unite: "g", type: "pack", formatVente: "250g", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 15, prixSupermarche: 22, icone: "puff-pastry" },
      { nom: "Sucre", quantiteRecette: 150, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 7, prixBase: 7, prixSouk: 5, prixSupermarche: 9, icone: "sugar" },
      { nom: "Beurre", quantiteRecette: 80, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 14, prixBase: 14, prixSouk: 12, prixSupermarche: 16, icone: "butter" },
      { nom: "Cannelle en poudre", quantiteRecette: 3, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "cinnamon" }
    ],
    etapes: [
      "1. Éplucher et couper les pommes en quartiers épais. Préchauffer le four à 190°C.",
      "2. Dans un moule à cake ou poêle allant au four (24cm), faire fondre le beurre et le sucre à feu moyen jusqu'à caramel doré.",
      "3. Ajouter les quartiers de pommes debout en cercles serrés. Cuire à feu moyen 15-20 min en retournant délicatement à mi-cuisson. Saupoudrer de cannelle.",
      "4. Laisser les pommes caraméliser et réduire. Le jus doit être épais et ambré.",
      "5. Étaler la pâte feuilletée en cercle légèrement plus grand que le moule.",
      "6. Poser la pâte sur les pommes en glissant les bords sous les fruits.",
      "7. Cuire au four 25-30 min jusqu'à pâte dorée et croustillante.",
      "8. Laisser reposer 5 min hors du four. Retourner d'un geste vif sur un plat. Servir tiède avec crème fraîche."
    ]
  },
  {
    id: "creme-brulee",
    titre: "Crème Brûlée",
    categorie: "Français",
    sousCategorie: null,
    descriptionCourte: "Crème vanillée onctueuse avec croûte caramel dorée craquante, délice de la pâtisserie française.",
    descriptionLongue: "La crème brûlée est l'un des desserts français les plus célèbres et les plus copiés dans le monde entier. Son nom vient du contraste délicieux entre la crème vanillée froide et soyeuse en dessous et la fine couche de caramel chaud et craquant au-dessus, créée avec un chalumeau de cuisine. Malgré sa réputation de dessert de grand restaurant, sa préparation est relativement simple — c'est un appareil à crème prise à base de jaunes d'œufs, de crème fraîche et de vanille, cuit doucement au bain-marie. Le plaisir de briser cette fine croûte caramélisée est un rituel gourmand inoubliable.",
    image: "https://i.pinimg.com/1200x/05/06/55/05065523b13d7f7f2bfe0d4af544e18b.jpg",
    difficulte: "moyen",
    tempsPreparation: "60 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Crème fraîche liquide entière", quantiteRecette: 500, unite: "ml", type: "pack", formatVente: "500ml", quantitePanier: 1, unitePanier: "pack", prix: 22, prixBase: 22, prixSouk: 18, prixSupermarche: 26, icone: "cream" },
      { nom: "Jaunes d'œufs", quantiteRecette: 5, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 5, unitePanier: "pack", prix: 6, prixBase: 6, prixSouk: 5, prixSupermarche: 7, icone: "egg-yolk" },
      { nom: "Sucre semoule", quantiteRecette: 80, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 7, prixBase: 7, prixSouk: 5, prixSupermarche: 9, icone: "sugar" },
      { nom: "Sucre cassonade (pour brûler)", quantiteRecette: 40, unite: "g", type: "pack", formatVente: "500g", quantitePanier: 1, unitePanier: "pack", prix: 10, prixBase: 10, prixSouk: 8, prixSupermarche: 12, icone: "brown-sugar" },
      { nom: "Gousse de vanille", quantiteRecette: 1, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 1, unitePanier: "pack", prix: 10, prixBase: 10, prixSouk: 8, prixSupermarche: 12, icone: "vanilla" }
    ],
    etapes: [
      "1. Préchauffer le four à 150°C. Préparer un bain-marie (plat rempli d'eau chaude).",
      "2. Faire chauffer la crème avec la gousse de vanille fendue jusqu'au frémissement. Laisser infuser 10 min.",
      "3. Fouetter les jaunes d'œufs avec le sucre semoule jusqu'à légère blancheur.",
      "4. Verser la crème chaude sur les jaunes en filet fin, en fouettant constamment.",
      "5. Passer au tamis. Répartir dans 4 ramequins.",
      "6. Cuire au bain-marie 40-45 min — la crème doit trembler légèrement au centre.",
      "7. Laisser refroidir puis réfrigérer au moins 3 heures.",
      "8. Saupoudrer de cassonade et brûler au chalumeau jusqu'à croûte dorée craquante. Servir immédiatement."
    ]
  },

  // ==================== ASIATIQUE - JAPONAIS ====================
  {
    id: "sushi-maison",
    titre: "Sushi Maison",
    categorie: "Asiatique",
    sousCategorie: "Japonais",
    descriptionCourte: "Sushis frais faits maison avec riz vinaigré et garnitures au choix, frais et économiques.",
    descriptionLongue: "Le sushi, né au Japon au VIIIe siècle comme méthode de conservation du poisson dans du riz fermenté, est devenu l'un des plats les plus appréciés et les plus imités dans le monde entier. Le sushi maison offre une fraîcheur et une personnalisation impossibles à obtenir en livraison. La technique du riz à sushi (shari) est la clé : le riz japonica cuit à la perfection, assaisonné d'un mélange vinaigre-sucre-sel, doit être brillant, légèrement collant et avoir une texture qui tient sans être compact. La version maison permet d'adapter les garnitures selon les goûts et les budgets.",
    image: "https://i.pinimg.com/736x/e0/6b/89/e06b893b9c01eb16fa69297d9dbf1f58.jpg",
    difficulte: "moyen",
    tempsPreparation: "60 min",
    portions: 4,
    populaire: true,
    ingredients: [
      { nom: "Riz japonais à sushi", quantiteRecette: 400, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 15, prixSupermarche: 22, icone: "sushi-rice" },
      { nom: "Feuilles de nori", quantiteRecette: 8, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 8, unitePanier: "pack", prix: 20, prixBase: 20, prixSouk: 17, prixSupermarche: 24, icone: "nori" },
      { nom: "Saumon frais (sashimi grade)", quantiteRecette: 200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 200, unitePanier: "g", prix: 60, prixBase: 60, prixSouk: 52, prixSupermarche: 70, icone: "salmon" },
      { nom: "Vinaigre de riz", quantiteRecette: 60, unite: "ml", type: "pack", formatVente: "500ml", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 15, prixSupermarche: 22, icone: "rice-vinegar" },
      { nom: "Sucre", quantiteRecette: 30, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 7, prixBase: 7, prixSouk: 5, prixSupermarche: 9, icone: "sugar" },
      { nom: "Sauce soja", quantiteRecette: 80, unite: "ml", type: "pack", formatVente: "200ml", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 14, icone: "soy-sauce" },
      { nom: "Wasabi", quantiteRecette: 10, unite: "g", type: "pack", formatVente: "50g", quantitePanier: 1, unitePanier: "pack", prix: 15, prixBase: 15, prixSouk: 12, prixSupermarche: 18, icone: "wasabi" },
      { nom: "Concombre", quantiteRecette: 100, unite: "g", type: "flexible", formatVente: null, quantitePanier: 100, unitePanier: "g", prix: 4, prixBase: 4, prixSouk: 2, prixSupermarche: 5, icone: "cucumber" }
    ],
    etapes: [
      "1. Rincer le riz jusqu'à eau claire. Cuire à la casserole avec 480ml d'eau (ratio 1:1.2). Laisser reposer 10 min couvert.",
      "2. Préparer le vinaigre à sushi : chauffer vinaigre de riz, sucre et sel jusqu'à dissolution. Laisser refroidir.",
      "3. Transférer le riz chaud dans un grand bol. Verser le vinaigre en filet en coupant le riz délicatement (ne pas écraser). Eventailler pour refroidir.",
      "4. Couper le saumon en tranches fines pour nigiri ou en bâtonnets pour maki.",
      "5. Pour les makis : poser le nori sur la natte de bambou, étaler une couche fine de riz en laissant 2 cm au bord supérieur.",
      "6. Disposer saumon et concombre en ligne sur le riz. Rouler fermement en serrant.",
      "7. Couper en 8 morceaux avec un couteau mouillé. Servir avec sauce soja et wasabi."
    ]
  },
  {
    id: "onigiri",
    titre: "Onigiri",
    categorie: "Asiatique",
    sousCategorie: "Japonais",
    descriptionCourte: "Triangles de riz japonais farcis, snack quotidien japonais facile à faire maison.",
    descriptionLongue: "L'onigiri est le snack ultime du Japon — vendu dans chaque konbini (supérette) du pays, emporté dans les boîtes bento d'écoliers, préparé pour les pique-niques au hanami (fête des cerisiers). Ces triangles ou boules de riz blanc légèrement salé, farcis et enveloppés de nori, sont à la fois simples et réconfortants. Les garnitures traditionnelles incluent umeboshi (prune marinée), thon mayo, saumon grillé ou teriyaki. L'onigiri représente la philosophie japonaise du washoku : la beauté dans la simplicité, le confort dans le quotidien.",
    image: "https://i.pinimg.com/1200x/1d/13/e8/1d13e8fa5a5c6a33d8aa356a49e45681.jpg",
    difficulte: "facile",
    tempsPreparation: "30 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Riz japonais à sushi", quantiteRecette: 400, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 15, prixSupermarche: 22, icone: "sushi-rice" },
      { nom: "Feuilles de nori", quantiteRecette: 4, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 4, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 15, icone: "nori" },
      { nom: "Thon en conserve", quantiteRecette: 100, unite: "g", type: "pack", formatVente: "160g", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 14, icone: "tuna" },
      { nom: "Mayonnaise", quantiteRecette: 30, unite: "g", type: "pack", formatVente: "400g", quantitePanier: 1, unitePanier: "pack", prix: 15, prixBase: 15, prixSouk: 12, prixSupermarche: 18, icone: "mayonnaise" },
      { nom: "Sel", quantiteRecette: 5, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 6, icone: "salt" },
      { nom: "Sauce soja", quantiteRecette: 30, unite: "ml", type: "pack", formatVente: "200ml", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 14, icone: "soy-sauce" }
    ],
    etapes: [
      "1. Cuire le riz japonais selon les instructions. Laisser tiédir légèrement.",
      "2. Préparer la farce : égoutter le thon, mélanger avec la mayonnaise.",
      "3. Humidifier les mains, saler légèrement les paumes.",
      "4. Prendre une généreuse poignée de riz tiède, creuser un puits au centre.",
      "5. Déposer une cuillère à café de farce thon-mayo dans le puits.",
      "6. Refermer le riz autour de la farce, mouler en forme de triangle en pressant fermement.",
      "7. Entourer d'une bande de nori. Servir immédiatement ou emballer dans du film pour le transport."
    ]
  },
  {
    id: "okonomiyaki",
    titre: "Okonomiyaki",
    categorie: "Asiatique",
    sousCategorie: "Japonais",
    descriptionCourte: "Pancake salé japonais au chou et aux œufs, street food familial d'Osaka.",
    descriptionLongue: "L'okonomiyaki est souvent décrit comme la pizza japonaise ou le pancake savoureux d'Osaka. Son nom signifie littéralement « grillez ce que vous aimez » — c'est un plat infiniment personnalisable où la pâte de base (farine, bouillon dashi, chou, œufs) accueille des garnitures variées : crevettes, poulpe, fromage, kimchi. La sauce okonomiyaki, épaisse et sucrée-salée, et la mayonnaise japonaise dessinent des motifs sur le dessus, garnies de flocons de bonite séchée (katsuobushi) qui dansent dans la chaleur. Cuisine de bistro populaire, l'okonomiyaki représente la convivialité de la culture culinaire d'Osaka.",
    image: "https://i.pinimg.com/1200x/f9/6b/a3/f96ba34bca343781a383007adabde2e5.jpg",
    difficulte: "facile",
    tempsPreparation: "35 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Farine", quantiteRecette: 200, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "flour" },
      { nom: "Chou vert (finement émincé)", quantiteRecette: 400, unite: "g", type: "flexible", formatVente: null, quantitePanier: 400, unitePanier: "g", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "cabbage" },
      { nom: "Œufs", quantiteRecette: 3, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 3, unitePanier: "pack", prix: 4, prixBase: 4, prixSouk: 3, prixSupermarche: 5, icone: "eggs" },
      { nom: "Sauce soja", quantiteRecette: 40, unite: "ml", type: "pack", formatVente: "200ml", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 14, icone: "soy-sauce" },
      { nom: "Mayonnaise", quantiteRecette: 50, unite: "g", type: "pack", formatVente: "400g", quantitePanier: 1, unitePanier: "pack", prix: 15, prixBase: 15, prixSouk: 12, prixSupermarche: 18, icone: "mayonnaise" },
      { nom: "Sauce Worcestershire (ou Hoisin)", quantiteRecette: 40, unite: "ml", type: "pack", formatVente: "200ml", quantitePanier: 1, unitePanier: "pack", prix: 14, prixBase: 14, prixSouk: 11, prixSupermarche: 17, icone: "worcestershire-sauce" },
      { nom: "Crevettes décortiquées", quantiteRecette: 150, unite: "g", type: "flexible", formatVente: null, quantitePanier: 150, unitePanier: "g", prix: 30, prixBase: 30, prixSouk: 25, prixSupermarche: 38, icone: "shrimp" }
    ],
    etapes: [
      "1. Mélanger farine, eau et une pincée de sel pour former une pâte lisse.",
      "2. Ajouter les œufs battus, le chou émincé finement et les crevettes. Bien mélanger.",
      "3. Chauffer un peu d'huile dans une grande poêle à feu moyen.",
      "4. Verser la pâte en galette épaisse de 2 cm. Cuire 5-6 min sans toucher.",
      "5. Retourner délicatement avec une spatule. Cuire encore 5-6 min.",
      "6. Préparer la sauce : mélanger sauce Worcestershire, ketchup, sauce soja et un peu de sucre.",
      "7. Garnir de sauce okonomiyaki et de mayonnaise en filets croisés. Servir immédiatement."
    ]
  },
  {
    id: "tempura-legumes",
    titre: "Tempura de Légumes",
    categorie: "Asiatique",
    sousCategorie: "Japonais",
    descriptionCourte: "Légumes en tempura japonaise croustillante et légère, irrésistibles quand frais faits maison.",
    descriptionLongue: "La tempura est une technique de friture japonaise inspirée par les missionnaires portugais au XVIe siècle, transformée par les Japonais en un art culinaire raffiné. La pâte à tempura est d'une légèreté incomparable — très froide, à peine mélangée (quelques grumeaux sont souhaitables), elle enrobe les légumes d'une croûte transparente et croustillante qui ne masque pas leur saveur. Le secret est dans la temperature : pâte glacée dans l'huile bouillante créent le choc thermique qui donne ce craquant unique. La tempura doit être consommée immédiatement — son croustillant dispara en quelques minutes.",
    image: "https://i.pinimg.com/1200x/f0/3a/c2/f03ac25fc5b2052d013fde80741c4a62.jpg",
    difficulte: "moyen",
    tempsPreparation: "30 min",
    portions: 4,
    populaire: true,
    ingredients: [
      { nom: "Aubergines", quantiteRecette: 200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 200, unitePanier: "g", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "eggplant" },
      { nom: "Courgettes", quantiteRecette: 200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 200, unitePanier: "g", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "zucchini" },
      { nom: "Poivrons", quantiteRecette: 150, unite: "g", type: "flexible", formatVente: null, quantitePanier: 150, unitePanier: "g", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "bell-pepper" },
      { nom: "Farine de blé", quantiteRecette: 120, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "flour" },
      { nom: "Maïzena", quantiteRecette: 30, unite: "g", type: "pack", formatVente: "400g", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 15, icone: "cornstarch" },
      { nom: "Sauce soja", quantiteRecette: 60, unite: "ml", type: "pack", formatVente: "200ml", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 14, icone: "soy-sauce" },
      { nom: "Huile de friture", quantiteRecette: 500, unite: "ml", type: "pack", formatVente: "1L", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 15, prixSupermarche: 22, icone: "frying-oil" }
    ],
    etapes: [
      "1. Couper les légumes en rondelles ou bâtonnets de taille similaire. Sécher parfaitement.",
      "2. Préparer la pâte tempura : mélanger rapidement farine froide, maïzena et eau glacée. Quelques grumeaux sont normaux — ne pas trop mélanger.",
      "3. Placer la pâte sur des glaçons pour qu'elle reste très froide.",
      "4. Chauffer l'huile à 180°C.",
      "5. Plonger chaque légume dans la pâte, laisser l'excès s'égoutter.",
      "6. Frire par petites quantités 2-3 min jusqu'à croustillant léger et dorure très pâle.",
      "7. Égoutter sur papier absorbant. Servir immédiatement avec sauce soja et gingembre râpé."
    ]
  },
  {
    id: "dorayaki",
    titre: "Dorayaki",
    categorie: "Asiatique",
    sousCategorie: "Japonais",
    descriptionCourte: "Pancakes japonais fourrés à la pâte de haricots rouges, dessert populaire du Japon.",
    descriptionLongue: "Le dorayaki est l'un des desserts japonais les plus populaires, mondialement connu grâce à Doraemon (le robot-chat de dessins animés dont c'est la friandise favorite). Ce sandwich de deux pancakes moelleux et légèrement mielés, fourrés de tsubuan (pâte de haricots rouges azuki) est un exemple parfait de la douceur caractéristique des wagashi (pâtisseries japonaises). La pâte à pancake, enrichie de miel et de sauce soja, donne une couleur brune caractéristique et une saveur subtile. Le contraste entre les pancakes chauds et la pâte d'haricots terreuse et sucrée est une expérience gustative délicate.",
    image: "https://i.pinimg.com/1200x/5c/a9/a6/5ca9a6c97478c5695591acafd63a7809.jpg",
    difficulte: "facile",
    tempsPreparation: "40 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Farine", quantiteRecette: 200, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "flour" },
      { nom: "Œufs", quantiteRecette: 3, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 3, unitePanier: "pack", prix: 4, prixBase: 4, prixSouk: 3, prixSupermarche: 5, icone: "eggs" },
      { nom: "Sucre", quantiteRecette: 80, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 7, prixBase: 7, prixSouk: 5, prixSupermarche: 9, icone: "sugar" },
      { nom: "Miel", quantiteRecette: 30, unite: "g", type: "pack", formatVente: "250g", quantitePanier: 1, unitePanier: "pack", prix: 25, prixBase: 25, prixSouk: 20, prixSupermarche: 30, icone: "honey" },
      { nom: "Pâte de haricots rouges (anko)", quantiteRecette: 300, unite: "g", type: "pack", formatVente: "300g", quantitePanier: 1, unitePanier: "pack", prix: 20, prixBase: 20, prixSouk: 16, prixSupermarche: 25, icone: "red-bean-paste" },
      { nom: "Levure chimique", quantiteRecette: 5, unite: "g", type: "pack", formatVente: "100g", quantitePanier: 1, unitePanier: "pack", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "baking-powder" }
    ],
    etapes: [
      "1. Battre les œufs avec sucre et miel jusqu'à mélange mousseux.",
      "2. Tamiser farine et levure, incorporer au mélange œufs. Ajouter 80ml d'eau, mélanger sans grumeaux.",
      "3. Laisser reposer la pâte 15 min.",
      "4. Chauffer une poêle antiadhésive à feu doux. Verser une louche de pâte pour former un cercle de 8-9 cm.",
      "5. Cuire jusqu'à apparition de bulles sur la surface (2 min). Retourner, cuire 1 min.",
      "6. Répéter pour obtenir des paires de pancakes.",
      "7. Assembler les dorayaki : déposer une généreuse cuillère d'anko sur la face plate d'un pancake, couvrir d'un second pancake face plate vers le bas. Presser légèrement les bords. Servir à température ambiante."
    ]
  },

  // ==================== ESPAGNOL (manquants) ====================
  {
    id: "fabada-asturiana",
    titre: "Fabada Asturiana",
    categorie: "Espagnol",
    sousCategorie: null,
    descriptionCourte: "Ragoût asturien de haricots blancs géants avec chorizos et morcilla, plat d'hiver emblématique.",
    descriptionLongue: "La fabada asturiana est le plat le plus célèbre des Asturies, cette région verdoyante du nord-ouest de l'Espagne baignée par l'Atlantique. Ce ragoût copieux de fabes (haricots blancs géants de la région), mijotés lentement avec le compango — le trio de viandes fumées composé de chorizo, morcilla (boudin noir) et lacon (épaule de porc salée) — est un monument de la cuisine paysanne espagnole. La version halal remplace les viandes de porc par des équivalents bovins fumés. Les haricots doivent être onctueux et fondants, absorbant toute la richesse des viandes. Plat de montagne réconfortant, la fabada se déguste l'hiver, accompagnée d'un verre de cidre asturien.",
    image: "https://i.pinimg.com/1200x/64/a6/f0/64a6f042d6b73e9e56bafb71db7bf7b7.jpg",
    difficulte: "moyen",
    tempsPreparation: "180 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Haricots blancs géants (fabes)", quantiteRecette: 400, unite: "g", type: "pack", formatVente: "500g", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 14, prixSupermarche: 22, icone: "white-beans" },
      { nom: "Chorizo halal (bœuf)", quantiteRecette: 200, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 28, prixBase: 28, prixSouk: 22, prixSupermarche: 34, icone: "sausage" },
      { nom: "Morcilla de bœuf (boudin noir halal)", quantiteRecette: 150, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 25, prixBase: 25, prixSouk: 20, prixSupermarche: 30, icone: "sausage" },
      { nom: "Viande fumée de bœuf (lacon halal)", quantiteRecette: 200, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 30, prixBase: 30, prixSouk: 24, prixSupermarche: 36, icone: "smoked-beef" },
      { nom: "Oignons", quantiteRecette: 100, unite: "g", type: "flexible", formatVente: null, quantitePanier: 100, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "onion" },
      { nom: "Ail", quantiteRecette: 4, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 20, unitePanier: "g", prix: 2, prixBase: 2, prixSouk: 1, prixSupermarche: 3, icone: "garlic" },
      { nom: "Paprika fumé", quantiteRecette: 8, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "smoked-paprika" },
      { nom: "Huile d'olive", quantiteRecette: 60, unite: "ml", type: "pack", formatVente: "500ml", quantitePanier: 1, unitePanier: "pack", prix: 35, prixBase: 35, prixSouk: 30, prixSupermarche: 40, icone: "olive-oil" },
      { nom: "Laurier", quantiteRecette: 2, unite: "unité", type: "pack", formatVente: "10g", quantitePanier: 1, unitePanier: "pack", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 6, icone: "bay-leaf" }
    ],
    etapes: [
      "1. La veille : faire tremper les haricots 12 heures dans de l'eau froide.",
      "2. Égoutter les haricots, placer dans une grande cocotte. Couvrir d'eau froide à hauteur de 5 cm au-dessus.",
      "3. Porter à ébullition, écumer, puis réduire à feu très doux.",
      "4. Ajouter oignons, ail, laurier, paprika fumé, huile d'olive. Mijoter 1h.",
      "5. Ajouter chorizo, morcilla et viande fumée entiers sans les piquer. Poursuivre la cuisson 1h30.",
      "6. Sortir les viandes, les couper en rondelles (chorizo, morcilla) et en morceaux. Remettre dans la cocotte.",
      "7. Rectifier l'assaisonnement. Les haricots doivent être fondants. Servir dans des assiettes creuses."
    ]
  },
  {
    id: "pulpo-a-la-gallega",
    titre: "Pulpo a la Gallega",
    categorie: "Espagnol",
    sousCategorie: null,
    descriptionCourte: "Poulpe tendre de Galice avec paprika fumé, huile d'olive et sel en cristaux.",
    descriptionLongue: "Le pulpo a la gallega (ou pulpo á feira) est la spécialité culinaire la plus identitaire de la Galice, cette région mystique du nord-ouest espagnol. Servi dans les feiras (foires) galiciennes depuis des siècles sur des plateaux en bois (táboas), ce plat d'une apparente simplicité cache une technique précise. Le poulpe est « effrayé » — plongé trois fois dans l'eau bouillante avant la cuisson définitive — pour obtenir une texture tendre sans être caoutchouteuse. Tranché en rondelles sur un lit de pommes de terre cuites, arrosé d'huile d'olive galicienne extra-vierge et saupoudré de paprika fumé et de gros sel de mer, c'est un plat qui célèbre la mer cantabrique avec une élégance minimaliste.",
    image: "https://i.pinimg.com/736x/e1/23/63/e12363ad64f37fac54b1effceeb8fc92.jpg",
    difficulte: "moyen",
    tempsPreparation: "90 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Poulpe (frais ou décongelé)", quantiteRecette: 1000, unite: "g", type: "flexible", formatVente: null, quantitePanier: 1000, unitePanier: "g", prix: 80, prixBase: 80, prixSouk: 68, prixSupermarche: 95, icone: "octopus" },
      { nom: "Pommes de terre", quantiteRecette: 400, unite: "g", type: "flexible", formatVente: null, quantitePanier: 400, unitePanier: "g", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "potato" },
      { nom: "Paprika fumé doux", quantiteRecette: 10, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "smoked-paprika" },
      { nom: "Paprika fumé piquant", quantiteRecette: 5, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "smoked-paprika" },
      { nom: "Huile d'olive extra-vierge", quantiteRecette: 80, unite: "ml", type: "pack", formatVente: "500ml", quantitePanier: 1, unitePanier: "pack", prix: 40, prixBase: 40, prixSouk: 35, prixSupermarche: 48, icone: "olive-oil" },
      { nom: "Gros sel de mer", quantiteRecette: 10, unite: "g", type: "pack", formatVente: "500g", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "sea-salt" },
      { nom: "Laurier", quantiteRecette: 2, unite: "unité", type: "pack", formatVente: "10g", quantitePanier: 1, unitePanier: "pack", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 6, icone: "bay-leaf" }
    ],
    etapes: [
      "1. Si poulpe frais : le congeler 48h puis décongeler pour attendrir. Rincer et retirer le bec.",
      "2. Porter à ébullition une grande marmite d'eau avec le laurier.",
      "3. Effrayage : tenir le poulpe par la tête, plonger les tentacules 3 fois 10 secondes avant cuisson complète.",
      "4. Plonger le poulpe entier et cuire à frémissement 45-60 min selon taille (tester avec une brochette — doit s'enfoncer facilement).",
      "5. Dans la même eau, cuire les pommes de terre pelées entières 20 min. Égoutter.",
      "6. Laisser reposer le poulpe 10 min hors de l'eau. Couper les tentacules en rondelles de 1 cm.",
      "7. Trancher les pommes de terre et les disposer sur un plateau en bois (ou assiette). Poser les rondelles de poulpe dessus. Arroser généreusement d'huile d'olive, saupoudrer de paprika (doux et piquant), terminer par le gros sel."
    ]
  },

  // ==================== FRANÇAIS (manquant) ====================
  {
    id: "tarte-aux-pommes",
    titre: "Tarte aux Pommes",
    categorie: "Français",
    sousCategorie: null,
    descriptionCourte: "Dessert classique français aux pommes fondantes sur fond de crème pâtissière.",
    descriptionLongue: "La tarte aux pommes est le dessert français le plus populaire et le plus universel — préparée dans chaque foyer depuis des générations, on la trouve dans tous les bistrots et boulangeries de France. Sa version classique consiste en une pâte brisée croustillante, une fine couche de crème pâtissière ou de compote, et des tranches de pommes disposées en rosace qui caramélisent légèrement à la cuisson. La touche finale — un nappage de gelée dorée qui fait briller les pommes — est le signe d'une tarte bien faite. Chaque boulanger français a sa recette secrète, mais la magie opère toujours avec de bonnes pommes de saison.",
    image: "https://i.pinimg.com/1200x/c5/fd/33/c5fd33f63b42a68438b2d1e8fb6ce59d.jpg",
    difficulte: "facile",
    tempsPreparation: "60 min",
    portions: 6,
    populaire: false,
    ingredients: [
      { nom: "Pâte brisée", quantiteRecette: 250, unite: "g", type: "pack", formatVente: "250g", quantitePanier: 1, unitePanier: "pack", prix: 15, prixBase: 15, prixSouk: 12, prixSupermarche: 18, icone: "pastry-dough" },
      { nom: "Pommes Golden", quantiteRecette: 800, unite: "g", type: "flexible", formatVente: null, quantitePanier: 800, unitePanier: "g", prix: 14, prixBase: 14, prixSouk: 10, prixSupermarche: 18, icone: "apple" },
      { nom: "Compote de pommes", quantiteRecette: 200, unite: "g", type: "pack", formatVente: "250g", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 9, prixSupermarche: 14, icone: "apple-sauce" },
      { nom: "Sucre", quantiteRecette: 50, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 7, prixBase: 7, prixSouk: 5, prixSupermarche: 9, icone: "sugar" },
      { nom: "Beurre", quantiteRecette: 30, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 14, prixBase: 14, prixSouk: 12, prixSupermarche: 16, icone: "butter" },
      { nom: "Cannelle en poudre", quantiteRecette: 3, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "cinnamon" },
      { nom: "Gelée d'abricot (nappage)", quantiteRecette: 60, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 15, prixBase: 15, prixSouk: 12, prixSupermarche: 18, icone: "jam" }
    ],
    etapes: [
      "1. Préchauffer le four à 180°C. Étaler la pâte brisée dans un moule à tarte de 28 cm. Piquer le fond à la fourchette.",
      "2. Étaler la compote de pommes en couche fine sur le fond de tarte.",
      "3. Éplucher et évider les pommes. Couper en deux, puis en fines lamelles (3mm).",
      "4. Disposer les lamelles en rosace serrée sur la compote, en commençant par l'extérieur.",
      "5. Saupoudrer de sucre et de cannelle. Parsemer de noisettes de beurre.",
      "6. Cuire 40-45 min jusqu'à pommes dorées et pâte croustillante.",
      "7. Faire fondre la gelée d'abricot avec 1 cuillère d'eau. Napper les pommes encore chaudes au pinceau. Laisser refroidir avant de servir."
    ]
  },

  // ==================== ASIATIQUE - CHINOIS ====================
  {
    id: "riz-saute-maison",
    titre: "Riz Sauté Maison (Chǎofàn)",
    categorie: "Asiatique",
    sousCategorie: "Chinois",
    descriptionCourte: "Riz sauté à la poêle avec légumes, œufs et sauce soja, meilleur que le restaurant.",
    descriptionLongue: "Le chǎofàn (炒饭) est le plat anti-gaspi par excellence de la cuisine chinoise — né de la nécessité de recycler le riz de la veille. En Chine, le riz froid du lendemain est considéré comme indispensable : ses grains séparés et légèrement secs sautent parfaitement dans le wok sans s'agglomérer. La technique du wok hei (气) — cette légère flamme qui parfume le riz au contact d'un wok très chaud — est le secret que les restaurants ont mais que peu de foyers maîtrisent. Pourtant, avec un wok bien chauffé et les bons gestes, le riz sauté maison surpasse souvent celui livré, qui ramollit dans la boîte.",
    image: "https://i.pinimg.com/736x/e6/12/a6/e612a60a069cad64f1b188450fdcf370.jpg",
    difficulte: "facile",
    tempsPreparation: "20 min",
    portions: 4,
    populaire: true,
    ingredients: [
      { nom: "Riz cuit froid (de la veille)", quantiteRecette: 600, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 10, prixBase: 10, prixSouk: 8, prixSupermarche: 12, icone: "rice" },
      { nom: "Œufs", quantiteRecette: 3, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 3, unitePanier: "pack", prix: 4, prixBase: 4, prixSouk: 3, prixSupermarche: 5, icone: "eggs" },
      { nom: "Carottes", quantiteRecette: 100, unite: "g", type: "flexible", formatVente: null, quantitePanier: 100, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "carrot" },
      { nom: "Petits pois surgelés", quantiteRecette: 100, unite: "g", type: "pack", formatVente: "400g", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "peas" },
      { nom: "Oignons verts (ciboule)", quantiteRecette: 50, unite: "g", type: "flexible", formatVente: null, quantitePanier: 50, unitePanier: "g", prix: 4, prixBase: 4, prixSouk: 2, prixSupermarche: 5, icone: "spring-onion" },
      { nom: "Sauce soja", quantiteRecette: 40, unite: "ml", type: "pack", formatVente: "200ml", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 14, icone: "soy-sauce" },
      { nom: "Huile de sésame", quantiteRecette: 15, unite: "ml", type: "pack", formatVente: "250ml", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 15, prixSupermarche: 22, icone: "sesame-oil" },
      { nom: "Huile végétale", quantiteRecette: 30, unite: "ml", type: "pack", formatVente: "1L", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 14, icone: "vegetable-oil" },
      { nom: "Ail", quantiteRecette: 3, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 15, unitePanier: "g", prix: 2, prixBase: 2, prixSouk: 1, prixSupermarche: 3, icone: "garlic" }
    ],
    etapes: [
      "1. Préparer tous les ingrédients à portée (le sauté va vite). Émietter le riz froid entre les doigts pour séparer les grains.",
      "2. Chauffer le wok ou grande poêle à feu vif jusqu'à légère fumée. Ajouter l'huile végétale.",
      "3. Saisir carottes en dés et petits pois 2 min. Ajouter l'ail haché, 30 secondes.",
      "4. Pousser les légumes sur le côté, casser les œufs au centre et brouiller rapidement.",
      "5. Ajouter le riz froid d'un coup, écraser et mélanger vigoureusement. Saisir à feu vif 3 min sans trop remuer pour que le riz croustille légèrement.",
      "6. Verser la sauce soja sur les bords du wok (pas sur le riz directement). Mélanger.",
      "7. Finir avec l'huile de sésame et les oignons verts ciselés. Servir immédiatement."
    ]
  },
  {
    id: "raviolis-chinois-jiaozi",
    titre: "Raviolis Chinois (Jiaozi)",
    categorie: "Asiatique",
    sousCategorie: "Chinois",
    descriptionCourte: "Raviolis maison farcis à la viande et au chou, cuits à la vapeur ou poêlés.",
    descriptionLongue: "Les jiaozi (饺子) sont au cœur de la culture familiale chinoise. La veille du Nouvel An lunaire, toute la famille se réunit pour plier des centaines de raviolis ensemble — un rituel de cohésion qui traverse les générations. La forme en croissant symbolise les lingots d'or anciens, porteurs de prospérité. Farcis d'un mélange de porc (ou bœuf halal), chou et gingembre, les jiaozi peuvent être cuits à la vapeur (zhēngjiǎo), bouillis (shuǐjiǎo) ou poêlés pour avoir un côté croustillant et un dessus moelleux (guōtiē). L'activité de plier les raviolis en famille est aussi importante que de les déguster.",
    image: "https://i.pinimg.com/736x/8c/c1/2f/8cc12fb3eca9c9ce4c9762ac3629b3a4.jpg",
    difficulte: "moyen",
    tempsPreparation: "90 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Farine", quantiteRecette: 300, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "flour" },
      { nom: "Bœuf haché (ou agneau)", quantiteRecette: 300, unite: "g", type: "flexible", formatVente: null, quantitePanier: 300, unitePanier: "g", prix: 33, prixBase: 33, prixSouk: 27, prixSupermarche: 39, icone: "ground-beef" },
      { nom: "Chou chinois (napa)", quantiteRecette: 200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 200, unitePanier: "g", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "cabbage" },
      { nom: "Gingembre frais", quantiteRecette: 20, unite: "g", type: "flexible", formatVente: null, quantitePanier: 20, unitePanier: "g", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "ginger" },
      { nom: "Oignons verts (ciboule)", quantiteRecette: 30, unite: "g", type: "flexible", formatVente: null, quantitePanier: 30, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "spring-onion" },
      { nom: "Sauce soja", quantiteRecette: 30, unite: "ml", type: "pack", formatVente: "200ml", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 14, icone: "soy-sauce" },
      { nom: "Huile de sésame", quantiteRecette: 15, unite: "ml", type: "pack", formatVente: "250ml", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 15, prixSupermarche: 22, icone: "sesame-oil" },
      { nom: "Vinaigre de riz", quantiteRecette: 30, unite: "ml", type: "pack", formatVente: "500ml", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 15, prixSupermarche: 22, icone: "rice-vinegar" }
    ],
    etapes: [
      "1. Pâte : mélanger farine et 150ml d'eau bouillante. Pétrir 5 min jusqu'à lisse. Couvrir et laisser reposer 30 min.",
      "2. Farce : hacher finement le chou, saler, presser pour extraire l'eau. Mélanger bœuf haché, chou pressé, gingembre râpé, ciboule ciselée, sauce soja, huile de sésame.",
      "3. Étaler la pâte finement. Découper des cercles de 8-9 cm.",
      "4. Déposer 1 c.c. de farce au centre. Humecter les bords. Plier en demi-lune en faisant des plis sur le dessus.",
      "5. Pour poêler (guōtiē) : cuire dans l'huile chaude 3 min côté plat jusqu'à dorure. Ajouter 80ml d'eau, couvrir 5 min à la vapeur. Découvrir pour évaporer.",
      "6. Pour à la vapeur (zhēngjiǎo) : cuire 10 min dans un panier vapeur tapissé de papier sulfurisé.",
      "7. Servir avec sauce soja-vinaigre de riz mélangés et huile de piment."
    ]
  },
  {
    id: "poulet-aigre-doux",
    titre: "Poulet Aigre-Doux",
    categorie: "Asiatique",
    sousCategorie: "Chinois",
    descriptionCourte: "Poulet croustillant en sauce aigre-douce maison, mieux que le restaurant.",
    descriptionLongue: "Le poulet aigre-doux (咕咾肉, gūlǎo ròu) est l'un des plats cantonais les plus connus dans le monde entier, popularisé dans les restaurants chinois des Amériques et d'Europe au XXe siècle. La sauce aigre-douce maison — vinaigre de riz, sucre, ketchup, sauce soja — est à mille lieues de la version industrielle des boîtes de livraison, souvent trop sucrée et trop colorée. Faite maison, elle est équilibrée, brillante et nappante à souhait. Les morceaux de poulet pané et frits, croustillants à l'extérieur, moelleux à l'intérieur, avec les poivrons et l'ananas sautés, créent un plat à la fois convivial et savoureux.",
    image: "https://i.pinimg.com/736x/c6/c1/8a/c6c18a99312664198cdc8e50ca501ef6.jpg",
    difficulte: "moyen",
    tempsPreparation: "45 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Blanc de poulet", quantiteRecette: 500, unite: "g", type: "flexible", formatVente: null, quantitePanier: 500, unitePanier: "g", prix: 50, prixBase: 50, prixSouk: 42, prixSupermarche: 58, icone: "chicken-breast" },
      { nom: "Poivrons tricolores", quantiteRecette: 200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 200, unitePanier: "g", prix: 8, prixBase: 8, prixSouk: 5, prixSupermarche: 10, icone: "bell-pepper" },
      { nom: "Ananas en morceaux", quantiteRecette: 150, unite: "g", type: "pack", formatVente: "400g", quantitePanier: 1, unitePanier: "pack", prix: 10, prixBase: 10, prixSouk: 8, prixSupermarche: 12, icone: "pineapple" },
      { nom: "Maïzena", quantiteRecette: 60, unite: "g", type: "pack", formatVente: "400g", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 15, icone: "cornstarch" },
      { nom: "Ketchup", quantiteRecette: 60, unite: "g", type: "pack", formatVente: "300g", quantitePanier: 1, unitePanier: "pack", prix: 10, prixBase: 10, prixSouk: 8, prixSupermarche: 12, icone: "ketchup" },
      { nom: "Vinaigre de riz", quantiteRecette: 40, unite: "ml", type: "pack", formatVente: "500ml", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 15, prixSupermarche: 22, icone: "rice-vinegar" },
      { nom: "Sucre", quantiteRecette: 40, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 7, prixBase: 7, prixSouk: 5, prixSupermarche: 9, icone: "sugar" },
      { nom: "Sauce soja", quantiteRecette: 20, unite: "ml", type: "pack", formatVente: "200ml", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 14, icone: "soy-sauce" },
      { nom: "Huile de friture", quantiteRecette: 500, unite: "ml", type: "pack", formatVente: "1L", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 15, prixSupermarche: 22, icone: "frying-oil" }
    ],
    etapes: [
      "1. Couper le poulet en cubes de 3 cm. Enrober de maïzena assaisonnée de sel.",
      "2. Préparer la sauce : mélanger ketchup, vinaigre de riz, sucre, sauce soja et 60ml d'eau dans un bol.",
      "3. Frire les cubes de poulet à 175°C pendant 4-5 min jusqu'à dorure. Égoutter.",
      "4. Dans un wok, sauter les poivrons en dés 2 min à feu vif.",
      "5. Ajouter l'ananas, puis verser la sauce. Porter à ébullition, la sauce doit épaissir et briller.",
      "6. Incorporer le poulet frit. Mélanger pour enrober.",
      "7. Servir immédiatement sur riz blanc pour que le poulet reste croustillant."
    ]
  },
  {
    id: "nouilles-sautees-legumes",
    titre: "Nouilles Sautées aux Légumes",
    categorie: "Asiatique",
    sousCategorie: "Chinois",
    descriptionCourte: "Nouilles chinoises sautées au wok avec légumes croquants et sauce umami.",
    descriptionLongue: "Les nouilles sautées (炒面, chǎomiàn) sont l'un des plats de rue les plus populaires de Chine, vendus à chaque coin de rue des grandes villes comme Shanghai ou Canton. Rapides, économiques et personnalisables, elles représentent le génie de la cuisine au wok : une chaleur extrême, des gestes rapides et quelques ingrédients de qualité transformés en repas savoureux en 10 minutes. La version aux légumes, sans viande, est légère et colorée. La technique clé est de ne pas surcharger le wok — cuire par petites quantités pour que tout saute et ne mijote pas.",
    image: "https://i.pinimg.com/1200x/b8/28/e3/b828e367c167051fa13d7aae6420c63d.jpg",
    difficulte: "facile",
    tempsPreparation: "25 min",
    portions: 4,
    populaire: true,
    ingredients: [
      { nom: "Nouilles chinoises aux œufs", quantiteRecette: 300, unite: "g", type: "pack", formatVente: "400g", quantitePanier: 1, unitePanier: "pack", prix: 15, prixBase: 15, prixSouk: 12, prixSupermarche: 18, icone: "noodles" },
      { nom: "Chou chinois", quantiteRecette: 200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 200, unitePanier: "g", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "cabbage" },
      { nom: "Carottes", quantiteRecette: 100, unite: "g", type: "flexible", formatVente: null, quantitePanier: 100, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "carrot" },
      { nom: "Champignons shiitake", quantiteRecette: 100, unite: "g", type: "flexible", formatVente: null, quantitePanier: 100, unitePanier: "g", prix: 20, prixBase: 20, prixSouk: 15, prixSupermarche: 25, icone: "mushroom" },
      { nom: "Pousses de soja", quantiteRecette: 100, unite: "g", type: "flexible", formatVente: null, quantitePanier: 100, unitePanier: "g", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "bean-sprouts" },
      { nom: "Sauce soja", quantiteRecette: 50, unite: "ml", type: "pack", formatVente: "200ml", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 14, icone: "soy-sauce" },
      { nom: "Sauce huître (ou sauce soja épaisse)", quantiteRecette: 30, unite: "ml", type: "pack", formatVente: "150ml", quantitePanier: 1, unitePanier: "pack", prix: 14, prixBase: 14, prixSouk: 11, prixSupermarche: 17, icone: "oyster-sauce" },
      { nom: "Huile de sésame", quantiteRecette: 15, unite: "ml", type: "pack", formatVente: "250ml", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 15, prixSupermarche: 22, icone: "sesame-oil" },
      { nom: "Ail", quantiteRecette: 3, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 15, unitePanier: "g", prix: 2, prixBase: 2, prixSouk: 1, prixSupermarche: 3, icone: "garlic" }
    ],
    etapes: [
      "1. Cuire les nouilles al dente selon les instructions. Rincer à l'eau froide, égoutter et mélanger avec un filet d'huile pour éviter qu'elles collent.",
      "2. Émincer tous les légumes en julienne fine.",
      "3. Chauffer le wok à feu très vif. Ajouter l'huile végétale.",
      "4. Saisir les carottes et champignons 2 min. Ajouter le chou 1 min.",
      "5. Ajouter l'ail haché, 30 secondes.",
      "6. Incorporer les nouilles, saisir en remuant 2 min.",
      "7. Verser sauce soja et sauce huître sur les bords du wok. Mélanger. Ajouter pousses de soja, huile de sésame. Servir immédiatement."
    ]
  },
  {
    id: "perles-coco-dessert",
    titre: "Perles de Coco (Tanguyuan au Coco)",
    categorie: "Asiatique",
    sousCategorie: "Chinois",
    descriptionCourte: "Billes de riz gluant farcies à la noix de coco sucrée, dessert traditionnel chinois.",
    descriptionLongue: "Les tangyuan (汤圆) sont des billes de pâte de riz gluant, traditionnellement préparées pour le Lantern Festival (Yuan Xiao Jie), quinzième jour du Nouvel An lunaire. Leur forme ronde symbolise la réunion familiale et la plénitude. Farcies de pâte sucrée à la noix de coco et au sésame, servies dans un bouillon de gingembre sucré chaud, elles créent un contraste délicat entre la pâte translucide et collante, la farce parfumée et le bouillon léger. C'est un dessert rare à commander en livraison — sa délicatesse et sa fragilité le rendent inimitable hors du foyer.",
    image: "https://i.pinimg.com/1200x/04/4e/6b/044e6b4b3d527bfb41248e7b1949f233.jpg",
    difficulte: "moyen",
    tempsPreparation: "60 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Farine de riz gluant (glutineux)", quantiteRecette: 200, unite: "g", type: "pack", formatVente: "400g", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 9, prixSupermarche: 15, icone: "rice-flour" },
      { nom: "Noix de coco râpée", quantiteRecette: 100, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 10, prixBase: 10, prixSouk: 8, prixSupermarche: 13, icone: "coconut" },
      { nom: "Sucre", quantiteRecette: 80, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 7, prixBase: 7, prixSouk: 5, prixSupermarche: 9, icone: "sugar" },
      { nom: "Beurre", quantiteRecette: 40, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 14, prixBase: 14, prixSouk: 12, prixSupermarche: 16, icone: "butter" },
      { nom: "Gingembre frais", quantiteRecette: 30, unite: "g", type: "flexible", formatVente: null, quantitePanier: 30, unitePanier: "g", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "ginger" },
      { nom: "Cassonade (bouillon sucré)", quantiteRecette: 60, unite: "g", type: "pack", formatVente: "500g", quantitePanier: 1, unitePanier: "pack", prix: 10, prixBase: 10, prixSouk: 8, prixSupermarche: 12, icone: "brown-sugar" }
    ],
    etapes: [
      "1. Préparer la farce : mélanger noix de coco râpée, sucre et beurre fondu. Former 16 petites boules et congeler 20 min.",
      "2. Préparer la pâte : mélanger farine de riz gluant avec 120ml d'eau tiède jusqu'à pâte souple non collante. Ajuster eau si besoin.",
      "3. Diviser la pâte en 16 portions. Aplatir chaque portion, y placer une boule de farce congelée, refermer en bille lisse.",
      "4. Préparer le bouillon : porter 800ml d'eau à ébullition avec gingembre tranché et cassonade. Mijoter 10 min.",
      "5. Cuire les tangyuan dans de l'eau bouillante jusqu'à ce qu'ils remontent à la surface + 2 min supplémentaires.",
      "6. Retirer avec une écumoire, placer dans des bols.",
      "7. Verser le bouillon de gingembre sucré chaud par-dessus. Servir immédiatement."
    ]
  },

  // ==================== ASIATIQUE - CORÉEN ====================
  {
    id: "bibimbap",
    titre: "Bibimbap",
    categorie: "Asiatique",
    sousCategorie: "Coréen",
    descriptionCourte: "Bol de riz coréen garni de légumes assaisonnés, œuf et sauce gochujang épicée.",
    descriptionLongue: "Le bibimbap (비빔밥 — littéralement « riz mélangé ») est l'un des plats les plus emblématiques de la cuisine coréenne. Servi dans un grand bol, il rassemble des namul (légumes sautés ou marinés individuellement assaisonnés), de la viande sautée, un œuf et la sauce gochujang (pâte de piment coréen). Avant de manger, on mélange tout vigoureusement — le geste fondateur qui donne son nom au plat. La version dolsot (서울식) est servie dans un bol en pierre brûlant qui fait croustiller le riz du fond. Plat de cuisine quotidienne en Corée, le bibimbap est à la fois nutritif, coloré et délicieux.",
    image: "https://i.pinimg.com/736x/65/34/c9/6534c94a9b0ec42e73b01dcc5d82ea9a.jpg",
    difficulte: "moyen",
    tempsPreparation: "50 min",
    portions: 4,
    populaire: true,
    ingredients: [
      { nom: "Riz à grain court (japonica)", quantiteRecette: 400, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 14, prixBase: 14, prixSouk: 11, prixSupermarche: 17, icone: "rice" },
      { nom: "Bœuf haché (ou émincé)", quantiteRecette: 200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 200, unitePanier: "g", prix: 22, prixBase: 22, prixSouk: 18, prixSupermarche: 26, icone: "ground-beef" },
      { nom: "Épinards frais", quantiteRecette: 150, unite: "g", type: "flexible", formatVente: null, quantitePanier: 150, unitePanier: "g", prix: 8, prixBase: 8, prixSouk: 5, prixSupermarche: 10, icone: "spinach" },
      { nom: "Carottes", quantiteRecette: 150, unite: "g", type: "flexible", formatVente: null, quantitePanier: 150, unitePanier: "g", prix: 4, prixBase: 4, prixSouk: 2, prixSupermarche: 5, icone: "carrot" },
      { nom: "Courgettes", quantiteRecette: 150, unite: "g", type: "flexible", formatVente: null, quantitePanier: 150, unitePanier: "g", prix: 4, prixBase: 4, prixSouk: 2, prixSupermarche: 5, icone: "zucchini" },
      { nom: "Champignons shiitake", quantiteRecette: 100, unite: "g", type: "flexible", formatVente: null, quantitePanier: 100, unitePanier: "g", prix: 20, prixBase: 20, prixSouk: 15, prixSupermarche: 25, icone: "mushroom" },
      { nom: "Œufs", quantiteRecette: 4, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 4, unitePanier: "pack", prix: 5, prixBase: 5, prixSouk: 4, prixSupermarche: 6, icone: "eggs" },
      { nom: "Pâte de piment gochujang", quantiteRecette: 60, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 14, prixSupermarche: 22, icone: "gochujang" },
      { nom: "Sauce soja", quantiteRecette: 30, unite: "ml", type: "pack", formatVente: "200ml", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 14, icone: "soy-sauce" },
      { nom: "Huile de sésame", quantiteRecette: 20, unite: "ml", type: "pack", formatVente: "250ml", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 15, prixSupermarche: 22, icone: "sesame-oil" },
      { nom: "Graines de sésame", quantiteRecette: 15, unite: "g", type: "pack", formatVente: "100g", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "sesame-seeds" }
    ],
    etapes: [
      "1. Cuire le riz. Mariner le bœuf émincé avec sauce soja, ail, huile de sésame, sucre pendant 15 min.",
      "2. Préparer chaque namul séparément : blanchir les épinards 1 min, assaisonner sauce soja + huile de sésame. Sauter carottes en julienne, courgettes en demi-lunes, champignons émincés — chacun séparément avec ail et sel.",
      "3. Cuire le bœuf mariné à feu vif 3 min.",
      "4. Faire des œufs au plat (jaune coulant).",
      "5. Assembler dans de grands bols : base de riz chaud, disposer chaque légume en quartiers autour du bol.",
      "6. Placer le bœuf au centre, l'œuf au plat par-dessus.",
      "7. Déposer une cuillère de gochujang, arroser d'huile de sésame, parsemer de sésame grillé. Mélanger vigoureusement avant de déguster."
    ]
  },
  {
    id: "japchae",
    titre: "Japchae (Nouilles de Patate Douce)",
    categorie: "Asiatique",
    sousCategorie: "Coréen",
    descriptionCourte: "Nouilles transparentes coréennes sautées aux légumes colorés, plat de fête familial.",
    descriptionLongue: "Le japchae (잡채 — littéralement « légumes mélangés ») est le plat de fête coréen par excellence, incontournable lors des anniversaires, mariages, Chuseok (fête des récoltes) et Seollal (Nouvel An coréen). Ses nouilles dangmyeon, faites de fécule de patate douce, sont translucides, légèrement élastiques et absorbent magnifiquement les saveurs. Sautées avec une variété de légumes colorés en julienne et de la viande marinée, assaisonnées d'huile de sésame et de sauce soja, le japchae est un plat qui exige de la patience — chaque ingrédient est cuisiné séparément pour préserver ses saveurs et couleurs avant l'assemblage final.",
    image: "https://i.pinimg.com/1200x/35/25/22/3525227c64a6ec8bdc5153d86a0ba309.jpg",
    difficulte: "moyen",
    tempsPreparation: "60 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Nouilles dangmyeon (fécule de patate douce)", quantiteRecette: 200, unite: "g", type: "pack", formatVente: "300g", quantitePanier: 1, unitePanier: "pack", prix: 14, prixBase: 14, prixSouk: 11, prixSupermarche: 17, icone: "glass-noodles" },
      { nom: "Bœuf émincé", quantiteRecette: 200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 200, unitePanier: "g", prix: 28, prixBase: 28, prixSouk: 22, prixSupermarche: 34, icone: "beef" },
      { nom: "Épinards frais", quantiteRecette: 100, unite: "g", type: "flexible", formatVente: null, quantitePanier: 100, unitePanier: "g", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "spinach" },
      { nom: "Carottes", quantiteRecette: 100, unite: "g", type: "flexible", formatVente: null, quantitePanier: 100, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "carrot" },
      { nom: "Oignons", quantiteRecette: 100, unite: "g", type: "flexible", formatVente: null, quantitePanier: 100, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "onion" },
      { nom: "Champignons shiitake", quantiteRecette: 80, unite: "g", type: "flexible", formatVente: null, quantitePanier: 80, unitePanier: "g", prix: 16, prixBase: 16, prixSouk: 12, prixSupermarche: 20, icone: "mushroom" },
      { nom: "Sauce soja", quantiteRecette: 60, unite: "ml", type: "pack", formatVente: "200ml", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 14, icone: "soy-sauce" },
      { nom: "Huile de sésame", quantiteRecette: 30, unite: "ml", type: "pack", formatVente: "250ml", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 15, prixSupermarche: 22, icone: "sesame-oil" },
      { nom: "Sucre", quantiteRecette: 20, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 7, prixBase: 7, prixSouk: 5, prixSupermarche: 9, icone: "sugar" },
      { nom: "Graines de sésame", quantiteRecette: 15, unite: "g", type: "pack", formatVente: "100g", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "sesame-seeds" }
    ],
    etapes: [
      "1. Tremper les nouilles dangmyeon 30 min dans l'eau froide. Cuire 5 min dans l'eau bouillante. Égoutter, couper en tronçons de 15 cm, assaisonner sauce soja + huile de sésame.",
      "2. Mariner le bœuf émincé : sauce soja, ail haché, sucre, huile de sésame. Cuire à feu vif 3 min.",
      "3. Blanchir les épinards 1 min, rincer à l'eau froide, assaisonner sauce soja + sésame.",
      "4. Sauter séparément : carottes en julienne, oignons émincés, champignons — chacun avec un peu de sel.",
      "5. Dans un grand bol, assembler nouilles, bœuf et tous les légumes. Assaisonner de sauce soja, huile de sésame, sucre.",
      "6. Mélanger délicatement à la main pour bien enrober sans casser les nouilles.",
      "7. Parsemer de sésame grillé. Servir à température ambiante ou légèrement chaud."
    ]
  },
  {
    id: "pajeon",
    titre: "Pajeon (Crêpe Coréenne aux Oignons Verts)",
    categorie: "Asiatique",
    sousCategorie: "Coréen",
    descriptionCourte: "Crêpe épaisse coréenne aux oignons verts et crevettes, croustillante et savoureuse.",
    descriptionLongue: "Le pajeon (파전) est la street food pluvieuse coréenne par excellence — les Coréens disent que le bruit de la pluie sur le toit ressemble au grésissement du pajeon dans la poêle, d'où la tradition de préparer ce plat les jours de pluie. Cette crêpe épaisse aux oignons verts (pa = oignons verts en coréen) est un emblème de la cuisine populaire et conviviale coréenne. Croustillante sur les bords, moelleuse au centre, garnie de crevettes ou de fruits de mer, servie avec une sauce dipping soja-vinaigre, le pajeon est parfait fait maison car il doit être consommé immédiatement pour garder son croustillant.",
    image: "https://i.pinimg.com/1200x/a2/2a/4f/a22a4f96c50efe33d27591d5f6fec03b.jpg",
    difficulte: "facile",
    tempsPreparation: "25 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Farine", quantiteRecette: 200, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "flour" },
      { nom: "Oignons verts (ciboule)", quantiteRecette: 200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 200, unitePanier: "g", prix: 8, prixBase: 8, prixSouk: 5, prixSupermarche: 10, icone: "spring-onion" },
      { nom: "Crevettes décortiquées", quantiteRecette: 150, unite: "g", type: "flexible", formatVente: null, quantitePanier: 150, unitePanier: "g", prix: 30, prixBase: 30, prixSouk: 25, prixSupermarche: 38, icone: "shrimp" },
      { nom: "Œufs", quantiteRecette: 2, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 2, unitePanier: "pack", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "eggs" },
      { nom: "Sauce soja", quantiteRecette: 40, unite: "ml", type: "pack", formatVente: "200ml", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 14, icone: "soy-sauce" },
      { nom: "Vinaigre de riz", quantiteRecette: 20, unite: "ml", type: "pack", formatVente: "500ml", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 15, prixSupermarche: 22, icone: "rice-vinegar" },
      { nom: "Huile végétale", quantiteRecette: 60, unite: "ml", type: "pack", formatVente: "1L", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 14, icone: "vegetable-oil" }
    ],
    etapes: [
      "1. Mélanger farine, 200ml d'eau froide et 1 œuf battu jusqu'à pâte lisse.",
      "2. Couper les oignons verts en tronçons de 10 cm. Couper grossièrement les crevettes.",
      "3. Incorporer oignons verts et crevettes à la pâte.",
      "4. Chauffer généreusement l'huile dans une grande poêle à feu moyen-vif.",
      "5. Verser la pâte pour former une grande crêpe de 1 cm d'épaisseur. Appuyer légèrement avec une spatule.",
      "6. Cuire 5-6 min jusqu'à fond doré et croustillant. Casser l'œuf restant sur le dessus. Retourner, cuire encore 3-4 min.",
      "7. Couper en carrés. Servir avec sauce dipping : sauce soja + vinaigre de riz + huile de sésame + piment."
    ]
  },
  {
    id: "bulgogi",
    titre: "Bulgogi",
    categorie: "Asiatique",
    sousCategorie: "Coréen",
    descriptionCourte: "Bœuf coréen mariné au soja et poire, grillé tendre et savoureux — la marinade fait tout.",
    descriptionLongue: "Le bulgogi (불고기 — « viande de feu ») est l'un des plats coréens les plus populaires dans le monde, symbole de la gastronomie coréenne. Des lamelles fines de bœuf (entrecôte ou faux-filet) sont marinées dans un mélange unique de sauce soja, poire asiatique râpée (l'enzyme de la poire attendrit la viande), ail, gingembre et huile de sésame. La poire est le secret qui distingue la marinade coréenne de toutes les autres. Grillé rapidement à feu vif, le bulgogi est légèrement sucré, profondément umami et fondant. Servi enroulé dans une feuille de laitue avec riz et kimchi, c'est l'expérience culinaire coréenne par excellence.",
    image: "https://i.pinimg.com/1200x/ec/f9/aa/ecf9aaf4aa9460400372d95dafc33394.jpg",
    difficulte: "facile",
    tempsPreparation: "40 min",
    portions: 4,
    populaire: true,
    ingredients: [
      { nom: "Entrecôte de bœuf émincée finement", quantiteRecette: 500, unite: "g", type: "flexible", formatVente: null, quantitePanier: 500, unitePanier: "g", prix: 75, prixBase: 75, prixSouk: 62, prixSupermarche: 88, icone: "beef" },
      { nom: "Poire asiatique (ou pomme)", quantiteRecette: 100, unite: "g", type: "flexible", formatVente: null, quantitePanier: 100, unitePanier: "g", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "pear" },
      { nom: "Sauce soja", quantiteRecette: 60, unite: "ml", type: "pack", formatVente: "200ml", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 14, icone: "soy-sauce" },
      { nom: "Sucre", quantiteRecette: 30, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 7, prixBase: 7, prixSouk: 5, prixSupermarche: 9, icone: "sugar" },
      { nom: "Ail", quantiteRecette: 5, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 25, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "garlic" },
      { nom: "Gingembre frais", quantiteRecette: 15, unite: "g", type: "flexible", formatVente: null, quantitePanier: 15, unitePanier: "g", prix: 4, prixBase: 4, prixSouk: 2, prixSupermarche: 5, icone: "ginger" },
      { nom: "Huile de sésame", quantiteRecette: 20, unite: "ml", type: "pack", formatVente: "250ml", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 15, prixSupermarche: 22, icone: "sesame-oil" },
      { nom: "Oignons verts (ciboule)", quantiteRecette: 40, unite: "g", type: "flexible", formatVente: null, quantitePanier: 40, unitePanier: "g", prix: 4, prixBase: 4, prixSouk: 2, prixSupermarche: 5, icone: "spring-onion" },
      { nom: "Graines de sésame", quantiteRecette: 10, unite: "g", type: "pack", formatVente: "100g", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "sesame-seeds" },
      { nom: "Feuilles de laitue (pour servir)", quantiteRecette: 8, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 8, unitePanier: "g", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "lettuce" }
    ],
    etapes: [
      "1. Râper finement la poire (ou pomme). Écraser l'ail, râper le gingembre.",
      "2. Mélanger sauce soja, poire râpée, ail, gingembre, sucre, huile de sésame pour la marinade.",
      "3. Émincer le bœuf très finement (plus facile si légèrement congelé). Mariner 30 min minimum (2h idéalement).",
      "4. Chauffer une poêle ou grill à feu très vif jusqu'à légère fumée.",
      "5. Cuire le bœuf mariné par petites quantités (ne pas surcharger) 1-2 min en remuant jusqu'à caramélisation.",
      "6. Parsemer de ciboule ciselée et sésame grillé.",
      "7. Servir enroulé dans des feuilles de laitue avec riz et kimchi (ou légumes marinés)."
    ]
  },
  {
    id: "hotteok",
    titre: "Hotteok (Pancake Sucré Coréen)",
    categorie: "Asiatique",
    sousCategorie: "Coréen",
    descriptionCourte: "Pancake coréen fourré à la cassonade, noix et cannelle — street food d'hiver irrésistible.",
    descriptionLongue: "Le hotteok (호떡) est la street food d'hiver coréenne par excellence, vendu dans les marchés nocturnes de Séoul et Busan quand les températures chutent. Cette pâte levée moelleuse renferme une farce de cassonade fondue, noix hachées et cannelle qui se transforme en caramel liquide brûlant à la cuisson. Le vendeur appuie sur le hotteok avec un ustensile spécial pendant la cuisson pour le dorer uniformément. Mordre dedans libère un flot de sirop chaud épicé — c'est une expérience sensorielle intense. Fait maison, le hotteok est aussi bon sinon meilleur que la version de rue, et bien plus frais.",
    image: "https://i.pinimg.com/1200x/6c/55/13/6c5513badf17d841d0379b786245e561.jpg",
    difficulte: "moyen",
    tempsPreparation: "70 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Farine", quantiteRecette: 250, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "flour" },
      { nom: "Levure boulangère", quantiteRecette: 5, unite: "g", type: "pack", formatVente: "1 unité", quantitePanier: 1, unitePanier: "pack", prix: 5, prixBase: 5, prixSouk: 4, prixSupermarche: 6, icone: "yeast" },
      { nom: "Cassonade (farce)", quantiteRecette: 80, unite: "g", type: "pack", formatVente: "500g", quantitePanier: 1, unitePanier: "pack", prix: 10, prixBase: 10, prixSouk: 8, prixSupermarche: 12, icone: "brown-sugar" },
      { nom: "Noix hachées", quantiteRecette: 60, unite: "g", type: "pack", formatVente: "150g", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 14, prixSupermarche: 22, icone: "walnuts" },
      { nom: "Cannelle en poudre", quantiteRecette: 5, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "cinnamon" },
      { nom: "Sucre", quantiteRecette: 15, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 7, prixBase: 7, prixSouk: 5, prixSupermarche: 9, icone: "sugar" },
      { nom: "Huile végétale", quantiteRecette: 60, unite: "ml", type: "pack", formatVente: "1L", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 14, icone: "vegetable-oil" }
    ],
    etapes: [
      "1. Mélanger farine, levure, sucre et 150ml d'eau tiède. Pétrir 5 min. Laisser lever 1h à couvert.",
      "2. Préparer la farce : mélanger cassonade, noix hachées et cannelle.",
      "3. Diviser la pâte en 8 portions. Aplatir chaque portion en disque.",
      "4. Déposer 1 cuillère à soupe de farce au centre. Refermer la pâte autour en pinçant les bords.",
      "5. Chauffer l'huile dans une poêle à feu moyen. Placer les hotteok côté fermeture vers le bas.",
      "6. Appuyer avec une spatule plate pour aplatir à 1 cm d'épaisseur. Cuire 3 min.",
      "7. Retourner, appuyer à nouveau. Cuire encore 2-3 min jusqu'à dorure. Servir immédiatement — la farce est brûlante."
    ]
  },

  // ==================== ASIATIQUE - VIETNAMIEN ====================
  {
    id: "pho-poulet",
    titre: "Pho au Poulet",
    categorie: "Asiatique",
    sousCategorie: "Vietnamien",
    descriptionCourte: "Soupe vietnamienne traditionnelle, bouillon parfumé aux épices avec nouilles et poulet.",
    descriptionLongue: "Le pho (phở) est la soupe nationale du Vietnam, née au début du XXe siècle dans les provinces du Nord avant de conquérir le monde. Son bouillon, mijoté des heures avec des os de poulet (ou de bœuf), des épices grillées — cannelle, anis étoilé, clous de girofle, badiane — et du gingembre brûlé, développe une complexité aromatique incomparable. Les nouilles de riz plates (bánh phở), le poulet effiloché et les garnitures fraîches — pousses de soja, basilic thaï, citron vert, piment — que chaque convive ajoute selon ses goûts, font du pho un plat personnalisable et profondément réconfortant. Un pho maison, contrairement au restaurant, bénéficie d'un bouillon réellement mijoté.",
    image: "https://i.pinimg.com/1200x/09/ca/64/09ca64539bf5c150a76fc5c10085388d.jpg",
    difficulte: "moyen",
    tempsPreparation: "180 min",
    portions: 4,
    populaire: true,
    ingredients: [
      { nom: "Carcasse et morceaux de poulet", quantiteRecette: 1200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 1200, unitePanier: "g", prix: 50, prixBase: 50, prixSouk: 42, prixSupermarche: 60, icone: "whole-chicken" },
      { nom: "Nouilles de riz plates (bánh phở)", quantiteRecette: 300, unite: "g", type: "pack", formatVente: "400g", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 9, prixSupermarche: 15, icone: "rice-noodles" },
      { nom: "Gingembre frais", quantiteRecette: 80, unite: "g", type: "flexible", formatVente: null, quantitePanier: 80, unitePanier: "g", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "ginger" },
      { nom: "Anis étoilé (badiane)", quantiteRecette: 4, unite: "unité", type: "pack", formatVente: "20g", quantitePanier: 1, unitePanier: "pack", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "star-anise" },
      { nom: "Cannelle en bâton", quantiteRecette: 2, unite: "unité", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "cinnamon-stick" },
      { nom: "Oignons", quantiteRecette: 200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 200, unitePanier: "g", prix: 4, prixBase: 4, prixSouk: 2, prixSupermarche: 5, icone: "onion" },
      { nom: "Pousses de soja", quantiteRecette: 150, unite: "g", type: "flexible", formatVente: null, quantitePanier: 150, unitePanier: "g", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "bean-sprouts" },
      { nom: "Basilic thaï frais", quantiteRecette: 30, unite: "g", type: "flexible", formatVente: null, quantitePanier: 30, unitePanier: "g", prix: 8, prixBase: 8, prixSouk: 5, prixSupermarche: 10, icone: "basil" },
      { nom: "Citron vert", quantiteRecette: 2, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 2, unitePanier: "g", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 6, icone: "lime" },
      { nom: "Sauce nuoc-mâm (sauce poisson)", quantiteRecette: 40, unite: "ml", type: "pack", formatVente: "200ml", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 9, prixSupermarche: 15, icone: "fish-sauce" }
    ],
    etapes: [
      "1. Faire griller l'oignon coupé en deux et le gingembre tranché directement sur flamme ou sous le grill jusqu'à légère carbonisation.",
      "2. Faire griller l'anis étoilé et la cannelle à sec dans une poêle 1 min.",
      "3. Placer poulet dans une grande marmite, couvrir d'eau froide. Porter à ébullition, écumer soigneusement.",
      "4. Ajouter oignon grillé, gingembre grillé, épices grillées, nuoc-mâm, sel. Mijoter à frémissement 1h30.",
      "5. Retirer le poulet, effilocher la chair. Filtrer le bouillon et le clarifier.",
      "6. Tremper les nouilles de riz 30 min dans l'eau froide. Les blanchir 1 min dans l'eau bouillante.",
      "7. Assembler : nouilles dans les bols, poulet effiloché. Verser le bouillon bouillant. Servir avec plateau garnitures : pousses de soja, basilic thaï, citron vert, piment."
    ]
  },
  {
    id: "rouleaux-printemps-frais",
    titre: "Rouleaux de Printemps Frais (Gỏi Cuốn)",
    categorie: "Asiatique",
    sousCategorie: "Vietnamien",
    descriptionCourte: "Rouleaux de riz frais farcis de crevettes, vermicelles et herbes, avec sauce arachide.",
    descriptionLongue: "Les gỏi cuốn (rouleaux de printemps frais) sont à la vietnamienne ce que le sushi est au japonais : une expression de la légèreté, de la fraîcheur et du respect des ingrédients. Contrairement aux rouleaux frits, ces rouleaux de papier de riz transparent révèlent leurs garnitures colorées — crevettes roses, vermicelles blancs, feuilles de laitue vert vif, carottes oranges et herbes fraîches — comme un tableau comestible. La sauce d'accompagnement (nuoc mâm citronné ou sauce arachides crémeuse) est aussi importante que le rouleau lui-même. Super frais, légers et nutritifs, ces rouleaux sont le repas d'été parfait.",
    image: "https://i.pinimg.com/1200x/91/55/f0/9155f0cc7639019a21def2868f05ea89.jpg",
    difficulte: "facile",
    tempsPreparation: "40 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Galettes de riz (papier de riz)", quantiteRecette: 12, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 12, unitePanier: "pack", prix: 10, prixBase: 10, prixSouk: 8, prixSupermarche: 13, icone: "rice-paper" },
      { nom: "Crevettes cuites décortiquées", quantiteRecette: 200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 200, unitePanier: "g", prix: 35, prixBase: 35, prixSouk: 28, prixSupermarche: 42, icone: "shrimp" },
      { nom: "Vermicelles de riz", quantiteRecette: 100, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "rice-vermicelli" },
      { nom: "Feuilles de laitue", quantiteRecette: 8, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 8, unitePanier: "g", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "lettuce" },
      { nom: "Carottes", quantiteRecette: 100, unite: "g", type: "flexible", formatVente: null, quantitePanier: 100, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "carrot" },
      { nom: "Menthe fraîche", quantiteRecette: 20, unite: "g", type: "flexible", formatVente: null, quantitePanier: 20, unitePanier: "g", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "mint" },
      { nom: "Coriandre fraîche", quantiteRecette: 20, unite: "g", type: "flexible", formatVente: null, quantitePanier: 20, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "coriander" },
      { nom: "Beurre de cacahuètes", quantiteRecette: 60, unite: "g", type: "pack", formatVente: "250g", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 14, prixSupermarche: 22, icone: "peanut-butter" },
      { nom: "Sauce nuoc-mâm", quantiteRecette: 40, unite: "ml", type: "pack", formatVente: "200ml", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 9, prixSupermarche: 15, icone: "fish-sauce" }
    ],
    etapes: [
      "1. Cuire les vermicelles de riz selon les instructions. Rincer à l'eau froide. Tailler les carottes en julienne.",
      "2. Couper les crevettes en deux dans la longueur.",
      "3. Préparer la sauce arachides : mélanger beurre de cacahuètes, nuoc-mâm, jus de citron vert, sucre, eau chaude, ail haché.",
      "4. Tremper une galette de riz dans de l'eau tiède 15-20 secondes jusqu'à souple mais non molle.",
      "5. Poser sur un torchon humide. Disposer : laitue, quelques vermicelles, carotte, crevettes (côté rose vers le bas pour les voir à travers la galette), menthe, coriandre.",
      "6. Replier les côtés, puis rouler fermement mais sans déchirer.",
      "7. Servir immédiatement avec la sauce arachides. Ne pas préparer à l'avance — les galettes collent."
    ]
  },
  {
    id: "banh-mi-maison",
    titre: "Bánh Mì Maison",
    categorie: "Asiatique",
    sousCategorie: "Vietnamien",
    descriptionCourte: "Sandwich vietnamien fusion avec baguette croustillante, viande marinée et légumes pickles.",
    descriptionLongue: "Le bánh mì est l'un des héritages culinaires les plus réussis de la colonisation française au Vietnam — la baguette française, allégée et adaptée au goût vietnamien, farcie d'une combinaison improbable et délicieuse. Viande marinée (poulet, bœuf, pâté de foie), pickles de carottes et daïkon légèrement sucrés-acidulés, coriandre fraîche, piment, mayonnaise et sauce soja créent un équilibre de saveurs — sucré, acide, épicé, umami — en une seule bouchée. Incroyablement économique et rapide à préparer maison, le bánh mì illustre comment la cuisine de rue peut devenir haute gastronomie.",
    image: "https://i.pinimg.com/1200x/21/1e/28/211e282b39534907a144b71632fcd549.jpg",
    difficulte: "facile",
    tempsPreparation: "30 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Baguettes de pain", quantiteRecette: 4, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 4, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 5, prixSupermarche: 10, icone: "baguette" },
      { nom: "Blanc de poulet", quantiteRecette: 400, unite: "g", type: "flexible", formatVente: null, quantitePanier: 400, unitePanier: "g", prix: 40, prixBase: 40, prixSouk: 33, prixSupermarche: 47, icone: "chicken-breast" },
      { nom: "Carottes", quantiteRecette: 150, unite: "g", type: "flexible", formatVente: null, quantitePanier: 150, unitePanier: "g", prix: 4, prixBase: 4, prixSouk: 2, prixSupermarche: 5, icone: "carrot" },
      { nom: "Concombre", quantiteRecette: 150, unite: "g", type: "flexible", formatVente: null, quantitePanier: 150, unitePanier: "g", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "cucumber" },
      { nom: "Sauce nuoc-mâm", quantiteRecette: 30, unite: "ml", type: "pack", formatVente: "200ml", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 9, prixSupermarche: 15, icone: "fish-sauce" },
      { nom: "Vinaigre de riz", quantiteRecette: 40, unite: "ml", type: "pack", formatVente: "500ml", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 15, prixSupermarche: 22, icone: "rice-vinegar" },
      { nom: "Sucre", quantiteRecette: 20, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 7, prixBase: 7, prixSouk: 5, prixSupermarche: 9, icone: "sugar" },
      { nom: "Mayonnaise", quantiteRecette: 60, unite: "g", type: "pack", formatVente: "400g", quantitePanier: 1, unitePanier: "pack", prix: 15, prixBase: 15, prixSouk: 12, prixSupermarche: 18, icone: "mayonnaise" },
      { nom: "Coriandre fraîche", quantiteRecette: 20, unite: "g", type: "flexible", formatVente: null, quantitePanier: 20, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "coriander" },
      { nom: "Piment frais", quantiteRecette: 1, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 1, unitePanier: "g", prix: 2, prixBase: 2, prixSouk: 1, prixSupermarche: 3, icone: "chili" }
    ],
    etapes: [
      "1. Pickles : couper carottes en julienne. Mélanger vinaigre de riz, sucre, sel. Mariner les carottes 20 min.",
      "2. Marinade poulet : sauce nuoc-mâm, ail, sucre, poivre. Mariner 15 min.",
      "3. Faire griller le poulet mariné dans une poêle chaude 5-6 min de chaque côté. Trancher.",
      "4. Couper les baguettes en deux sans séparer complètement. Passer 3 min au four à 200°C pour les rendre croustillantes.",
      "5. Étaler la mayonnaise sur les deux faces intérieures.",
      "6. Garnir : tranches de poulet, pickles de carottes bien égouttées, rondelles de concombre, coriandre fraîche, rondelles de piment.",
      "7. Servir immédiatement — la baguette croustillante est l'âme du bánh mì."
    ]
  },
  {
    id: "bo-bun",
    titre: "Bo Bun",
    categorie: "Asiatique",
    sousCategorie: "Vietnamien",
    descriptionCourte: "Salade vietnamienne fraîche de vermicelles, bœuf grillé, herbes et sauce nuoc-mâm.",
    descriptionLongue: "Le bò bún (bún bò xào) est un plat d'été vietnamien qui représente la philosophie de la cuisine du centre du Vietnam — l'équilibre parfait entre fraîcheur et chaleur, entre légèreté et saveur. Des vermicelles de riz servent de base à une salade composée de légumes frais (salade, menthe, coriandre, concombre), de carottes et daïkon en pickles acidulés, de cacahuètes grillées croquantes, et de bœuf sauté à la citronnelle et sauce nuoc-mâm. La sauce d'assaisonnement — nuoc chấm dilué de jus de citron, sucre, ail et piment — est versée sur l'ensemble au moment de servir et parfume magnifiquement le plat.",
    image: "https://i.pinimg.com/1200x/a5/2a/6c/a52a6c215ccb388a2d74f38e8b46b9d5.jpg",
    difficulte: "facile",
    tempsPreparation: "40 min",
    portions: 4,
    populaire: true,
    ingredients: [
      { nom: "Vermicelles de riz", quantiteRecette: 250, unite: "g", type: "pack", formatVente: "400g", quantitePanier: 1, unitePanier: "pack", prix: 10, prixBase: 10, prixSouk: 8, prixSupermarche: 12, icone: "rice-vermicelli" },
      { nom: "Bœuf émincé", quantiteRecette: 400, unite: "g", type: "flexible", formatVente: null, quantitePanier: 400, unitePanier: "g", prix: 56, prixBase: 56, prixSouk: 46, prixSupermarche: 66, icone: "beef" },
      { nom: "Citronnelle", quantiteRecette: 2, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 2, unitePanier: "g", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "lemongrass" },
      { nom: "Salade verte", quantiteRecette: 100, unite: "g", type: "flexible", formatVente: null, quantitePanier: 100, unitePanier: "g", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "lettuce" },
      { nom: "Carottes (pickles)", quantiteRecette: 100, unite: "g", type: "flexible", formatVente: null, quantitePanier: 100, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "carrot" },
      { nom: "Concombre", quantiteRecette: 100, unite: "g", type: "flexible", formatVente: null, quantitePanier: 100, unitePanier: "g", prix: 4, prixBase: 4, prixSouk: 2, prixSupermarche: 5, icone: "cucumber" },
      { nom: "Menthe fraîche", quantiteRecette: 20, unite: "g", type: "flexible", formatVente: null, quantitePanier: 20, unitePanier: "g", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "mint" },
      { nom: "Cacahuètes grillées", quantiteRecette: 60, unite: "g", type: "pack", formatVente: "150g", quantitePanier: 1, unitePanier: "pack", prix: 10, prixBase: 10, prixSouk: 8, prixSupermarche: 13, icone: "peanuts" },
      { nom: "Sauce nuoc-mâm", quantiteRecette: 60, unite: "ml", type: "pack", formatVente: "200ml", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 9, prixSupermarche: 15, icone: "fish-sauce" },
      { nom: "Citron vert", quantiteRecette: 3, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 3, unitePanier: "g", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "lime" }
    ],
    etapes: [
      "1. Cuire les vermicelles selon les instructions. Rincer à l'eau froide, égoutter.",
      "2. Pickles : tailler carottes en julienne. Mariner dans vinaigre + sucre + sel 15 min.",
      "3. Sauce nuoc chấm : mélanger nuoc-mâm, jus de citron vert, sucre, eau, ail et piment haché.",
      "4. Marinade bœuf : citronnelle finement hachée, ail, nuoc-mâm, sucre, poivre.",
      "5. Saisir le bœuf mariné à feu très vif en petites quantités pour caraméliser. Réserver.",
      "6. Assembler les bols : salade en base, vermicelles, légumes frais et pickles autour.",
      "7. Placer le bœuf chaud au centre. Parsemer de cacahuètes concassées et menthe fraîche. Arroser de sauce nuoc chấm au moment de servir."
    ]
  },
  {
    id: "che-coco-tapioca",
    titre: "Chè Coco-Tapioca",
    categorie: "Asiatique",
    sousCategorie: "Vietnamien",
    descriptionCourte: "Dessert vietnamien au lait de coco et tapioca, frais et parfumé à la pandan.",
    descriptionLongue: "Le chè (chè) est la catégorie de desserts vietnamiens sucrés liquides — une vaste famille qui comprend des centaines de recettes à base de haricots, tapioca, fruits et lait de coco. Le chè chuối (banane) ou chè coco avec tapioca est l'une des variantes les plus populaires. Les perles de tapioca translucides, cuites dans du lait de coco sucré et parfumé à la feuille de pandan (la « vanille de l'Asie du Sud-Est »), créent une texture unique — moelleuse, légèrement élastique — dans un bouillon crémeux et doux. Ce dessert simple est profondément attaché aux souvenirs d'enfance au Vietnam et dans la diaspora vietnamienne.",
    image: "https://i.pinimg.com/1200x/96/a8/da/96a8da48bb6caa8b19e59595a9361810.jpg",
    difficulte: "facile",
    tempsPreparation: "35 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Tapioca (perles)", quantiteRecette: 100, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "tapioca" },
      { nom: "Lait de coco", quantiteRecette: 400, unite: "ml", type: "pack", formatVente: "400ml", quantitePanier: 1, unitePanier: "pack", prix: 14, prixBase: 14, prixSouk: 11, prixSupermarche: 17, icone: "coconut-milk" },
      { nom: "Sucre", quantiteRecette: 80, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 7, prixBase: 7, prixSouk: 5, prixSupermarche: 9, icone: "sugar" },
      { nom: "Feuilles de pandan (ou arôme pandan)", quantiteRecette: 3, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 3, unitePanier: "pack", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 8, icone: "pandan" },
      { nom: "Haricots rouges azuki en conserve", quantiteRecette: 200, unite: "g", type: "pack", formatVente: "400g", quantitePanier: 1, unitePanier: "pack", prix: 10, prixBase: 10, prixSouk: 8, prixSupermarche: 13, icone: "red-beans" },
      { nom: "Bananes (optionnel)", quantiteRecette: 2, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 2, unitePanier: "g", prix: 4, prixBase: 4, prixSouk: 2, prixSupermarche: 5, icone: "banana" }
    ],
    etapes: [
      "1. Rincer le tapioca. Faire tremper 30 min dans l'eau froide.",
      "2. Porter 600ml d'eau à ébullition avec les feuilles de pandan nouées. Retirer le pandan.",
      "3. Cuire le tapioca dans l'eau parfumée jusqu'à perles translucides (10-15 min). Égoutter et rincer.",
      "4. Dans une casserole, chauffer lait de coco avec sucre et sel en remuant (ne pas faire bouillir pour ne pas séparer le lait).",
      "5. Ajouter les perles de tapioca cuites et les haricots rouges égouttés.",
      "6. Facultatif : couper les bananes en rondelles et les ajouter hors du feu.",
      "7. Servir tiède ou réfrigérer et servir frais. Goûter et ajuster le sucre."
    ]
  },

  // ==================== ASIATIQUE - INDIEN ====================
  {
    id: "butter-chicken",
    titre: "Butter Chicken",
    categorie: "Asiatique",
    sousCategorie: "Indien",
    descriptionCourte: "Poulet indien tendre dans une sauce tomate au beurre crémeuse et parfumée aux épices.",
    descriptionLongue: "Le butter chicken (murgh makhani) est l'un des plats indiens les plus connus et les plus appréciés dans le monde, né à Delhi dans les années 1950 dans le restaurant Moti Mahal. Le poulet mariné dans du yaourt et des épices, grillé au tandoor (ou au four), est ensuite plongé dans une sauce veloutée à base de tomates, de crème, de beurre et d'épices douces (cardamome, cannelle, coriandre). Cette sauce makhani (au beurre) est celle qui a révélé l'Inde au monde. Bien meilleur fait maison — moins lourd, plus frais, avec un équilibre d'épices qu'on peut ajuster — le butter chicken reste un plat de réconfort universel.",
    image: "https://i.pinimg.com/1200x/1e/11/5e/1e115eb17da8de8eb278df6548da461f.jpg",
    difficulte: "moyen",
    tempsPreparation: "60 min",
    portions: 4,
    populaire: true,
    ingredients: [
      { nom: "Blanc de poulet", quantiteRecette: 600, unite: "g", type: "flexible", formatVente: null, quantitePanier: 600, unitePanier: "g", prix: 60, prixBase: 60, prixSouk: 50, prixSupermarche: 70, icone: "chicken-breast" },
      { nom: "Yaourt nature", quantiteRecette: 150, unite: "g", type: "pack", formatVente: "400g", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "yogurt" },
      { nom: "Tomates pelées en conserve", quantiteRecette: 400, unite: "g", type: "pack", formatVente: "400g", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 15, icone: "canned-tomatoes" },
      { nom: "Crème fraîche liquide", quantiteRecette: 150, unite: "ml", type: "pack", formatVente: "500ml", quantitePanier: 1, unitePanier: "pack", prix: 22, prixBase: 22, prixSouk: 18, prixSupermarche: 26, icone: "cream" },
      { nom: "Beurre", quantiteRecette: 60, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 14, prixBase: 14, prixSouk: 12, prixSupermarche: 16, icone: "butter" },
      { nom: "Oignons", quantiteRecette: 200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 200, unitePanier: "g", prix: 4, prixBase: 4, prixSouk: 2, prixSupermarche: 5, icone: "onion" },
      { nom: "Ail", quantiteRecette: 5, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 25, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "garlic" },
      { nom: "Gingembre frais", quantiteRecette: 20, unite: "g", type: "flexible", formatVente: null, quantitePanier: 20, unitePanier: "g", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "ginger" },
      { nom: "Garam masala", quantiteRecette: 10, unite: "g", type: "pack", formatVente: "50g", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "garam-masala" },
      { nom: "Curcuma", quantiteRecette: 5, unite: "g", type: "pack", formatVente: "50g", quantitePanier: 1, unitePanier: "pack", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "turmeric" },
      { nom: "Paprika", quantiteRecette: 8, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "paprika" }
    ],
    etapes: [
      "1. Marinade : mélanger yaourt, ail haché, gingembre râpé, garam masala, curcuma, paprika, sel. Enrober le poulet coupé en cubes. Mariner 2h minimum.",
      "2. Saisir le poulet mariné dans du beurre à feu vif jusqu'à légère carbonisation. Réserver.",
      "3. Dans la même poêle, faire fondre beurre restant. Faire suer les oignons émincés jusqu'à dorure.",
      "4. Ajouter ail et gingembre hachés, cuire 1 min. Ajouter garam masala, curcuma, paprika, cuire 1 min.",
      "5. Incorporer les tomates. Mijoter 15 min. Mixer la sauce jusqu'à lisse.",
      "6. Remettre sur feu doux, ajouter la crème. Laisser réduire 5 min.",
      "7. Ajouter le poulet dans la sauce. Mijoter 10 min. Servir avec naan ou riz basmati, parsemer de coriandre fraîche."
    ]
  },
  {
    id: "dal-lentilles",
    titre: "Dal de Lentilles",
    categorie: "Asiatique",
    sousCategorie: "Indien",
    descriptionCourte: "Soupe de lentilles indiennes aux épices, plat quotidien fondamental de la cuisine indienne.",
    descriptionLongue: "Le dal (dal, dhal ou dahl) est le plat le plus quotidien de l'Inde — consommé à chaque repas dans presque chaque foyer du pays depuis des millénaires. Préparé avec des lentilles ou autres légumineuses (moong, masoor, chana, toor) mijotées jusqu'à fondantes, puis tempérées d'un tarka (sauté d'épices aromatiques — graines de moutarde, cumin, curry, ail, piment) versé bouillant sur le dal, il est à la fois simple et profond. Chaque région de l'Inde a sa version — crémeux au nord, liquide au sud, avec coconut à l'est. Le dal nourrissant est la protéine du pauvre et du riche, symbole de l'égalité devant la nourriture.",
    image: "https://i.pinimg.com/1200x/55/eb/b4/55ebb429bdea8e728078d35f7e6593ce.jpg",
    difficulte: "facile",
    tempsPreparation: "45 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Lentilles corail (masoor dal)", quantiteRecette: 300, unite: "g", type: "pack", formatVente: "500g", quantitePanier: 1, unitePanier: "pack", prix: 10, prixBase: 10, prixSouk: 8, prixSupermarche: 12, icone: "red-lentils" },
      { nom: "Tomates", quantiteRecette: 200, unite: "g", type: "flexible", formatVente: null, quantitePanier: 200, unitePanier: "g", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "tomato" },
      { nom: "Oignons", quantiteRecette: 150, unite: "g", type: "flexible", formatVente: null, quantitePanier: 150, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "onion" },
      { nom: "Ail", quantiteRecette: 4, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 20, unitePanier: "g", prix: 2, prixBase: 2, prixSouk: 1, prixSupermarche: 3, icone: "garlic" },
      { nom: "Gingembre frais", quantiteRecette: 15, unite: "g", type: "flexible", formatVente: null, quantitePanier: 15, unitePanier: "g", prix: 4, prixBase: 4, prixSouk: 2, prixSupermarche: 5, icone: "ginger" },
      { nom: "Curcuma", quantiteRecette: 5, unite: "g", type: "pack", formatVente: "50g", quantitePanier: 1, unitePanier: "pack", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "turmeric" },
      { nom: "Cumin en graines", quantiteRecette: 5, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "cumin-seeds" },
      { nom: "Garam masala", quantiteRecette: 5, unite: "g", type: "pack", formatVente: "50g", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "garam-masala" },
      { nom: "Huile de tournesol", quantiteRecette: 40, unite: "ml", type: "pack", formatVente: "1L", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 14, icone: "vegetable-oil" },
      { nom: "Coriandre fraîche", quantiteRecette: 20, unite: "g", type: "flexible", formatVente: null, quantitePanier: 20, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "coriander" }
    ],
    etapes: [
      "1. Rincer les lentilles jusqu'à eau claire. Cuire dans 800ml d'eau avec curcuma et sel jusqu'à fondantes (20 min). Écraser partiellement.",
      "2. Préparer le tarka : chauffer l'huile à feu vif. Faire grésiller les graines de cumin 30 secondes.",
      "3. Ajouter oignons émincés, faire dorer 5 min.",
      "4. Ajouter ail haché et gingembre râpé, cuire 1 min.",
      "5. Ajouter tomates concassées, garam masala, cuire 5 min jusqu'à sauce épaisse.",
      "6. Verser le tarka bouillant sur les lentilles cuites. Bien mélanger. Goûter et rectifier.",
      "7. Parsemer de coriandre fraîche. Servir avec riz basmati ou pain naan."
    ]
  },
  {
    id: "biryani-poulet",
    titre: "Biryani au Poulet",
    categorie: "Asiatique",
    sousCategorie: "Indien",
    descriptionCourte: "Riz basmati parfumé aux épices moghole, intercalé de poulet mariné et safran.",
    descriptionLongue: "Le biryani est l'un des plats les plus élaborés et les plus festifs de la gastronomie indienne, héritage de la cuisine moghole apportée par les empereurs mogols perso-turcs qui régnèrent sur l'Inde du XVIe au XIXe siècle. Ce plat de riz à deux couches — riz basmati long et parfumé aux épices entières, intercalé avec du poulet mariné dans du yaourt et des épices — est cuit en dum pukht (cuisson à l'étouffée), permettant aux vapeurs aromatiques de circuler entre les couches. Le safran dilué donne ses touches or caractéristiques. Chaque région de l'Inde a son biryani — Hyderabad, Lucknow, Kolkata — chacun revendiquant le meilleur.",
    image: "https://i.pinimg.com/736x/87/90/92/879092970fe224f734b11609174f6b95.jpg",
    difficulte: "difficile",
    tempsPreparation: "120 min",
    portions: 4,
    populaire: true,
    ingredients: [
      { nom: "Riz basmati", quantiteRecette: 400, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 14, prixSupermarche: 22, icone: "basmati-rice" },
      { nom: "Blanc de poulet", quantiteRecette: 600, unite: "g", type: "flexible", formatVente: null, quantitePanier: 600, unitePanier: "g", prix: 60, prixBase: 60, prixSouk: 50, prixSupermarche: 70, icone: "chicken-breast" },
      { nom: "Yaourt nature", quantiteRecette: 200, unite: "g", type: "pack", formatVente: "400g", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "yogurt" },
      { nom: "Oignons", quantiteRecette: 300, unite: "g", type: "flexible", formatVente: null, quantitePanier: 300, unitePanier: "g", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "onion" },
      { nom: "Safran", quantiteRecette: 1, unite: "g", type: "pack", formatVente: "1 unité", quantitePanier: 1, unitePanier: "pack", prix: 15, prixBase: 15, prixSouk: 12, prixSupermarche: 18, icone: "saffron" },
      { nom: "Lait chaud (pour safran)", quantiteRecette: 50, unite: "ml", type: "pack", formatVente: "1L", quantitePanier: 1, unitePanier: "pack", prix: 9, prixBase: 9, prixSouk: 8, prixSupermarche: 10, icone: "milk" },
      { nom: "Garam masala", quantiteRecette: 12, unite: "g", type: "pack", formatVente: "50g", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "garam-masala" },
      { nom: "Curcuma", quantiteRecette: 5, unite: "g", type: "pack", formatVente: "50g", quantitePanier: 1, unitePanier: "pack", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "turmeric" },
      { nom: "Menthe fraîche", quantiteRecette: 20, unite: "g", type: "flexible", formatVente: null, quantitePanier: 20, unitePanier: "g", prix: 5, prixBase: 5, prixSouk: 3, prixSupermarche: 7, icone: "mint" },
      { nom: "Huile de tournesol", quantiteRecette: 80, unite: "ml", type: "pack", formatVente: "1L", quantitePanier: 1, unitePanier: "pack", prix: 12, prixBase: 12, prixSouk: 10, prixSupermarche: 14, icone: "vegetable-oil" }
    ],
    etapes: [
      "1. Mariner le poulet 2h : yaourt, garam masala, curcuma, ail-gingembre, sel.",
      "2. Faire dorer les oignons émincés dans l'huile jusqu'à brun doré (barista onions). Réserver la moitié.",
      "3. Cuire le poulet mariné avec les oignons restants à feu moyen 20 min. Réserver.",
      "4. Cuire le riz basmati rincé dans de l'eau bouillante épicée (cannelle, clous, cardamome, laurier) jusqu'à 70% cuit (al dente). Égoutter.",
      "5. Infuser le safran dans le lait chaud 10 min.",
      "6. Dans une grande cocotte huilée, alterner : couche de riz, couche de poulet, menthe, oignons dorés. Répéter. Arroser de lait safrané.",
      "7. Couvrir hermétiquement (sceller avec de la pâte ou papier aluminium serré). Cuire à feu très doux 30 min en dum. Servir sans mélanger pour révéler les couleurs."
    ]
  },
  {
    id: "samosas-maison",
    titre: "Samosas Maison",
    categorie: "Asiatique",
    sousCategorie: "Indien",
    descriptionCourte: "Triangles feuilletés indiens farcis aux pommes de terre épicées, frits croustillants.",
    descriptionLongue: "Le samosa est l'une des spécialités culinaires les plus répandues d'Asie du Sud, du Moyen-Orient et d'Afrique de l'Est — testament des routes commerciales qui ont diffusé ce chausson frit aux quatre coins du monde. En Inde, il est vendu dans chaque chaï (maison de thé), chaque coin de rue, chaque gare. Sa pâte fine et croustillante renferme une farce épicée de pommes de terre, petits pois et herbes. La version maison avec feuilles de brick (plus facile que la pâte samosa traditionnelle) est aussi délicieuse. Servi avec chutney à la coriandre et au tamarin, le samosa représente le snack indien par excellence.",
    image: "https://i.pinimg.com/736x/1c/68/fc/1c68fc95d5e356e843e97679b519959f.jpg",
    difficulte: "moyen",
    tempsPreparation: "60 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Feuilles de brick", quantiteRecette: 8, unite: "unité", type: "pack", formatVente: "1 unité", quantitePanier: 8, unitePanier: "pack", prix: 10, prixBase: 10, prixSouk: 8, prixSupermarche: 12, icone: "pastry-sheets" },
      { nom: "Pommes de terre", quantiteRecette: 400, unite: "g", type: "flexible", formatVente: null, quantitePanier: 400, unitePanier: "g", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "potato" },
      { nom: "Petits pois surgelés", quantiteRecette: 100, unite: "g", type: "pack", formatVente: "400g", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "peas" },
      { nom: "Oignons", quantiteRecette: 100, unite: "g", type: "flexible", formatVente: null, quantitePanier: 100, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "onion" },
      { nom: "Ail", quantiteRecette: 3, unite: "unité", type: "flexible", formatVente: null, quantitePanier: 15, unitePanier: "g", prix: 2, prixBase: 2, prixSouk: 1, prixSupermarche: 3, icone: "garlic" },
      { nom: "Garam masala", quantiteRecette: 8, unite: "g", type: "pack", formatVente: "50g", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "garam-masala" },
      { nom: "Curcuma", quantiteRecette: 3, unite: "g", type: "pack", formatVente: "50g", quantitePanier: 1, unitePanier: "pack", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "turmeric" },
      { nom: "Coriandre fraîche", quantiteRecette: 20, unite: "g", type: "flexible", formatVente: null, quantitePanier: 20, unitePanier: "g", prix: 3, prixBase: 3, prixSouk: 2, prixSupermarche: 4, icone: "coriander" },
      { nom: "Huile de friture", quantiteRecette: 500, unite: "ml", type: "pack", formatVente: "1L", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 15, prixSupermarche: 22, icone: "frying-oil" }
    ],
    etapes: [
      "1. Cuire les pommes de terre dans l'eau salée jusqu'à tendres. Écraser grossièrement.",
      "2. Dans une poêle, faire revenir l'oignon dans un peu d'huile. Ajouter ail, garam masala, curcuma. Cuire 1 min.",
      "3. Incorporer les pommes de terre écrasées, petits pois, coriandre fraîche, sel. Mélanger et laisser refroidir.",
      "4. Couper les feuilles de brick en deux. Former un cône avec chaque demi-feuille.",
      "5. Farcir généreusement le cône de farce. Replier et sceller avec un peu d'eau pour former un triangle.",
      "6. Chauffer l'huile à 170°C. Frire les samosas par lots 4-5 min jusqu'à dorure uniforme.",
      "7. Égoutter sur papier absorbant. Servir chaud avec chutney à la coriandre ou sauce tamarind."
    ]
  },
  {
    id: "gulab-jamun",
    titre: "Gulab Jamun",
    categorie: "Asiatique",
    sousCategorie: "Indien",
    descriptionCourte: "Boulettes de lait réduites frites et trempées dans sirop de rose, dessert indien célèbre.",
    descriptionLongue: "Le gulab jamun est l'un des desserts indiens les plus populaires et les plus appréciés — présent à chaque fête, mariage et célébration de l'Inde. Son nom vient de l'hindi gul (fleur de rose) et jamun (baie noire) — allusion à la couleur et à la forme de ces boulettes. Préparées à base de khoa (lait réduit en poudre), frites jusqu'à une belle couleur acajou, puis trempées dans un sirop parfumé à l'eau de rose, à la cardamome et au safran, elles absorbent le sirop et deviennent moelleuses, juteuses et sucrées à l'extrême. Servis chauds avec une cuillère de kulfi (glace indienne) ou de crème fraîche, les gulab jamun sont un voyage sensoriel vers la douceur indienne.",
    image: "https://i.pinimg.com/736x/6e/70/70/6e7070259c6464363f9181b0c93ebfb3.jpg",
    difficulte: "moyen",
    tempsPreparation: "50 min",
    portions: 4,
    populaire: false,
    ingredients: [
      { nom: "Lait en poudre entier", quantiteRecette: 200, unite: "g", type: "pack", formatVente: "400g", quantitePanier: 1, unitePanier: "pack", prix: 22, prixBase: 22, prixSouk: 18, prixSupermarche: 26, icone: "milk-powder" },
      { nom: "Farine", quantiteRecette: 40, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "flour" },
      { nom: "Beurre", quantiteRecette: 30, unite: "g", type: "pack", formatVente: "200g", quantitePanier: 1, unitePanier: "pack", prix: 14, prixBase: 14, prixSouk: 12, prixSupermarche: 16, icone: "butter" },
      { nom: "Sucre (sirop)", quantiteRecette: 300, unite: "g", type: "pack", formatVente: "1kg", quantitePanier: 1, unitePanier: "pack", prix: 7, prixBase: 7, prixSouk: 5, prixSupermarche: 9, icone: "sugar" },
      { nom: "Eau de rose", quantiteRecette: 20, unite: "ml", type: "pack", formatVente: "100ml", quantitePanier: 1, unitePanier: "pack", prix: 10, prixBase: 10, prixSouk: 7, prixSupermarche: 13, icone: "rose-water" },
      { nom: "Cardamome en poudre", quantiteRecette: 3, unite: "g", type: "pack", formatVente: "30g", quantitePanier: 1, unitePanier: "pack", prix: 8, prixBase: 8, prixSouk: 6, prixSupermarche: 10, icone: "cardamom" },
      { nom: "Safran", quantiteRecette: 1, unite: "g", type: "pack", formatVente: "1 unité", quantitePanier: 1, unitePanier: "pack", prix: 15, prixBase: 15, prixSouk: 12, prixSupermarche: 18, icone: "saffron" },
      { nom: "Levure chimique", quantiteRecette: 3, unite: "g", type: "pack", formatVente: "100g", quantitePanier: 1, unitePanier: "pack", prix: 6, prixBase: 6, prixSouk: 4, prixSupermarche: 8, icone: "baking-powder" },
      { nom: "Huile de friture", quantiteRecette: 500, unite: "ml", type: "pack", formatVente: "1L", quantitePanier: 1, unitePanier: "pack", prix: 18, prixBase: 18, prixSouk: 15, prixSupermarche: 22, icone: "frying-oil" }
    ],
    etapes: [
      "1. Préparer le sirop : dissoudre le sucre dans 300ml d'eau. Porter à ébullition, mijoter 10 min. Ajouter eau de rose, cardamome et safran. Garder chaud.",
      "2. Préparer les boulettes : mélanger lait en poudre, farine et levure. Incorporer le beurre fondu. Ajouter 50-60ml de lait progressivement pour former une pâte souple non collante.",
      "3. Former 16-20 petites boulettes lisses (sans fissures — sinon elles éclateront à la friture).",
      "4. Chauffer l'huile à 150°C (basse température — crucial pour une cuisson uniforme).",
      "5. Frire les boulettes en les faisant rouler constamment 8-10 min jusqu'à brun acajou profond.",
      "6. Plonger immédiatement les boulettes chaudes dans le sirop chaud. Laisser tremper au moins 30 min (2h idéalement).",
      "7. Servir tiède ou à température ambiante avec le sirop. Garnir de pistaches concassées."
    ]
  }
];

if (typeof module !== 'undefined') module.exports = RECETTES;
