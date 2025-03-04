# APE La Cagnotte des Mômes - Spécifications

## Description du Projet
Application web permettant à l'Association des Parents d'Élèves (APE) de lever des fonds via HelloAsso pour financer des projets spécifiques pour l'école.

## Fonctionnalités Principales

### Landing Page (Public)
- Affichage des projets en cours de financement
- État d'avancement des financements
- Intégration avec HelloAsso pour les dons
- Présentation de l'APE et de sa mission

### Back Office (Administrateurs)
- Gestion des projets (CRUD)
- Suivi des financements
- Upload d'images pour les projets
- Gestion des utilisateurs administrateurs

## Structure des Données

### Project (Projet)
- id: Identifiant unique
- title: Titre du projet
- description: Description détaillée
- imageUrl: URL de l'image du projet
- targetAmount: Montant cible à atteindre
- raisedAmount: Montant déjà collecté
- createdAt: Date de création
- updatedAt: Date de mise à jour
- isActive: État du projet (actif/inactif)

### User (Administrateur)
- id: Identifiant unique
- username: Nom d'utilisateur
- password_hash: Hash du mot de passe
- created_at: Date de création

## Intégrations
- HelloAsso API pour la gestion des paiements
- Stockage d'images (à définir : S3, Cloudinary, etc.)
- Authentification administrateurs
