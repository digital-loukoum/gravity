HappyPal a besoin d'exprimer un type union avec GraphQL et s'est cassé la tête parce que cela demandait de créer plein de resolvers, des interfaces de classes abstraites, des `...on Type` côté front graphQL.

Conclusion de Lancelot après avoir enfin trouvé comment résoudre ce problème après un brainwashing bien violent pour trouver la solution:

"Vous allez acheter des actions chez Doliprane, parce que les prochains jours je sens que les prix vont monter"

Avec Gravity ce serait tout bête, il suffit d'avoir une fonction qui retourne plusieurs types :

`findUserOrProduct(): User | Product`

Pas besoin de doliprane !