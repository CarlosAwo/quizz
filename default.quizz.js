
let data = [
	{
		id:0,
		question : "Quelle est la capitale du niger ?",
		options:["niamey" , "gana","Canada", "congo", "libreville", "lome"],
		answer:["niamey"]
	},

	{
		id:1,
		question : "Le continent Africain compte combien de pays ?",
		options:["26" , "37", "54", "47", "80"],
		answer:["54"]
	},

	{
		id:2,
		question : "H2O est :",
		options:["la formule chimique de l'eau" , "je sais pas", "HOO"],
		answer:["la formule chimique de l'eau"]
	},

	{
		id:3,
		question : "Que signifie l'expression figuré 'Jeter L'eponge' ?",
		options:["Abandonner" , "Etre malade", "perdre la tete","laisser tomber","perdre une éponge"],
		answer:["Abandonner","laisser tomber"]
	},
	{
		id:4,
		question : "la racine carré de 16 multiplié par 5 est ",
		options:["14" , "16", "16*5","21","80","aucune de ses reponses"],
		answer:["aucune de ses reponses"]
	},
	{
		id:5,
		question : " La vitesse de la lumiere est estimé a ",
		options:["300 000 km/s" , "300 000 m/s", "310 km","100km","400m"],
		answer:["300 000 km/s"]
	},
	{
		id:6,
		question : " Le site https://www.awo-carlos.dev a été developpé par ?",
		options:["awo" ,"clementine", "carlos", "Tigbey","Djibril","Tassiou","awo carlos"],
		answer:["awo" , "carlos", "awo carlos"]
	}
]

let app = new Quizz("root",data,{title:"Carlos Quizz"})