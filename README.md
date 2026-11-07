# Fron Militan Progresis (FMP) — Circonscription No. 7
Site régional d'information pour Piton et Rivière du Rempart.
Site statique indépendant d'Inside Mauritius.

## Pages
- index.html : accueil
- actualites.html : actualités
- congres-fondateur.html : article sourcé
- evenements.html : événements (rien de confirmé)
- apropos.html : à propos
- contact.html : contact (aucune adresse officielle configurée)

## Publication
GitHub Pages → Settings → Pages → Deploy from a branch → main → /(root).

## Engagement
Les J'aime et les commentaires ne sont stockés que localement sur le navigateur du visiteur. Ils ne sont ni publics ni partagés. Le partage utilise l'API de partage ou le presse-papiers. Pour un compteur public, une base de données et une modération seront nécessaires.

## Identité visuelle
assets/fmp-logo.jpg et assets/fmp-banner.jpg sont les images originales fournies, sans modification graphique.
Le bandeau de l’accueil présente les drapeaux et le nom de la circonscription. Les six pages partagent la même charte responsive, avec menu mobile et lien d’évitement clavier.

## Date et heure (Maurice)
L'en-tête affiche une horloge MUT (UTC+4) en direct, actualisée chaque seconde. Les heures de mise en ligne des articles se basent sur l'attribut `data-published-at` (horodatage ISO 8601 avec fuseau ou Z) et s'affichent automatiquement en heure de Maurice. Le temps relatif « il y a... » se met à jour chaque minute. Le 9 mai 2026 reste la date du congrès et de la source, et ne change pas. Pour chaque nouvel article, définir son véritable horodatage de publication dans `datetime` et `data-published-at`; ne jamais générer un faux horodatage « maintenant » lors de chaque affichage. Ce site statique ne crée pas de nouveaux articles automatiquement.
