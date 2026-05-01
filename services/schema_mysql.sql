-- Utilisateurs (users) table matching Firebase structure
CREATE TABLE IF NOT EXISTS utilisateurs (
    uid VARCHAR(64) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    emailVerifie BOOLEAN DEFAULT FALSE,
    nomComplet VARCHAR(255),
    telephone VARCHAR(50),
    budgetMax BIGINT,
    preferencesDefinies BOOLEAN DEFAULT FALSE,
    priorite VARCHAR(50),
    role VARCHAR(50),
    sourcePreferee VARCHAR(50),
    favoris JSON,
    adresseLivraison JSON,
    creeLe TIMESTAMP,
    ville VARCHAR(100),
    adresse VARCHAR(255)
);

-- Commandes table matching Firebase structure
CREATE TABLE IF NOT EXISTS commandes (
    id VARCHAR(32) PRIMARY KEY,
    clientId VARCHAR(64),
    archivee BOOLEAN DEFAULT FALSE,
    dateCreation VARCHAR(50),
    fraisLivraison BIGINT,
    livreurId VARCHAR(64),
    livreurNom VARCHAR(255),
    livreurTelephone VARCHAR(50),
    modePaiement VARCHAR(50),
    nbIngredients INT,
    panier JSON,
    pointsCollecte JSON,
    prixTotal BIGINT,
    sourcePreferee VARCHAR(50),
    sousTotal BIGINT,
    statut VARCHAR(50),
    tempsEstime INT,
    updatedAt TIMESTAMP,
    FOREIGN KEY (clientId) REFERENCES utilisateurs(uid)
);
