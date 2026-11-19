# Site de Maître Bertille Toudic — version 1 (page d'accueil)

Site statique en HTML, CSS et JavaScript natif. Aucun framework, aucune dépendance, aucune publication automatique.
Il se dépose tel quel sur un hébergement OVH (offre mutualisée comprise).

## Prévisualiser sur le Mac

**Le plus simple :** double-cliquez sur `index.html`. Le site s'ouvre dans le navigateur.

**Version la plus fidèle (serveur local) :** dans le Terminal, placez-vous dans ce dossier puis lancez :

```
python3 -m http.server 8000
```

Ouvrez ensuite http://localhost:8000 dans Safari ou Chrome. `Ctrl + C` pour arrêter.

## Organisation

```
index.html                 Page d'accueil
mentions-legales.html      Mentions légales et politique de confidentialité
assets/css/style.css       Styles (couleurs et typographies définies en tête de fichier)
assets/js/main.js          Animations, menu mobile, formulaire (envoi désactivé)
assets/fonts/              Polices hébergées localement (Instrument Serif, Geist)
assets/img/                Portrait optimisé (WebP + JPEG, deux tailles)
```

## Avant toute mise en ligne

1. Compléter les éléments surlignés en jaune (adresse du cabinet, SIRET, assurance, médiateur, durée de conservation).
2. Retirer la balise `<meta name="robots" content="noindex, nofollow">` des deux pages.
3. Remplacer l'URL canonique par le nom de domaine définitif.
4. Brancher le formulaire sur un script d'envoi chez OVH (voir le commentaire dans `assets/js/main.js`).
5. Faire relire et valider l'ensemble des textes par Maître Toudic.

Rien n'est publié tant que ces fichiers ne sont pas copiés manuellement sur l'hébergement.
