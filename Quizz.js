/****************************************************************
 *  DECLARATION DE CONSTANTES ET VARIABLES ET DE FONCTION
 ***************************************************************/


class Quizz{
	/**
	 *Cree un element Html
	 *@param --tag--{string} -le type d'element qu'on souhaite cree(tag=div)
	 *@param --selector--{string} -le selecteur a attribue a l'element(selector=.)
	 *@return {HTMLelement} -le selecteur a attribue a l'element
	 *
	 */
	createElementWithSelector(/**String*/ tag ,/**String*/ selector ){
		let element = document.createElement(tag)
		if(selector){
			if (selector[0] === "#") {
				selector = selector.slice(1)
				element.id = selector
			} 
			else {
				selector = selector.slice(1)
				element.classList.add(selector)
			}
		}

		return element
	}

	/**

		recuperer le(s) reponse du quizz actuel
		recuperer l'option clické par l'utilisateur et retire l'ecouteur d'evenement
		verifier si le choix de l'utilisateur est exact
		si oui
			retirer les events listener de tous les autres options
			ajouter a cette option la classe de succès
		si non
			ajouter a cette option la classe de error
			retire l'eventListener sur cette option uniquement			
	*/
	checkUserClickedOption(answer,e){

		let option = e.target
		let find = false
		let quizz = option.parentNode.parentNode
		console.log(quizz)
		let optionText = option.textContent
		if (quizz.dataset.hasUserChooseOption==="true") {
			
			return
		}

		quizz.dataset.hasUserChooseOption ="true"

		answer.forEach((answerText)=>{
			this.level++
			if (optionText.toLowerCase()===answerText.toLowerCase()) {
				option.classList.add("quizz__option__success")
				find = true
				this.score++
			} 
			else {
	
				option.classList.add("quizz__option__error")
			}
			
			quizz.parentNode.parentNode.querySelector(".quizz__score").textContent = `${(this.score/this.data.length*100).toFixed(2)}%`
			quizz.parentNode.parentNode.querySelector(".quizz__level").textContent = `Question ${this.level}/${this.data.length}`
		})
		if (find==false) {
					answer.forEach((answerText)=>{
										Array.from(quizz.querySelector(".quizz__options__group").children).forEach((i)=>{
						if (i.textContent.toLowerCase()===answerText.toLowerCase()) {
							i.classList.add("quizz__option__success")
						}
				})
			
		})
		}
		//	
	}

	/*
		*	1er etape
			Verifier si un quizz est deja present dans {destination} en recherchant 
			la classe "active__quizz"
			si un quizz est deja present parcourir
				les options de ces quizz en leurs 
				retirant les event listener
			Ensuite retirer la class Active De ce quizz
			Enfin retirer ce quizz de la {destination}
		*	2er etape
				ajouter la classe Active au nouveau Quizz {quizz}
				parcourir les options de ce nouveau quizz et leur
				ajouter des event listener
				et l'inserer dans la {destination}
		*3eme etape
		inserer le nouveau quizz dans {destination}
	*/
	insertQuizz( quizz , destination ){
		let prevQuizz = destination.querySelector(".quizz__actual");
		let nextQuizz = quizz;
		let prevOptions = prevQuizz?.querySelector(".quizz__options__group").children
		let nextOptions = nextQuizz.querySelector(".quizz__options__group").children
			//1er etape
		if ( (prevQuizz) && (prevOptions)) {
			prevQuizz.classList.remove("quizz__actual")
			destination.removeChild(prevQuizz)
		}
			//2eme etape
		nextQuizz.classList.add("quizz__actual")
		if (nextQuizz.dataset.hasUserChooseOption==="false") {
			Array.from(nextOptions).forEach( (child)=>{
				  child.addEventListener("click" , this.checkUserClickedOption.bind(this,this.data[this.QuizzPos].answer))
		    })
		}

			//3eme etape
		destination.appendChild(nextQuizz)
	}

	gotoNextQuizz(){
		this.QuizzPos++
		if (this.QuizzPos>this.quizzes.length-1) {
			  this.QuizzPos=0
		}
		this.insertQuizz(this.quizzes[this.QuizzPos], this.root.querySelector(".quizz__body"))
	}

	gotoPrevQuizz(){
		this.QuizzPos--
		if (this.QuizzPos<0) {
			  this.QuizzPos=this.quizzes.length-1
		}
		this.insertQuizz(this.quizzes[this.QuizzPos], this.root.querySelector(".quizz__body"))
	}
	quizzes=null
	QuizzPos = 0
	data = null
	score = 0
	level = 0

 	constructor(el,data,options){
 		//Creatin Html Srtucture For each Quizz
 		this.data = data
 		this.root = this.createElementWithSelector("div",".root")
 		
 		if (options.title) {
 			let header = this.createElementWithSelector("div", ".quizz__header")
 			let title = this.createElementWithSelector("div", ".quizz__title")
 			title.textContent = options.title
 			header.appendChild(title)	

 			this.root.appendChild(header)
 		}
 		let body = this.createElementWithSelector("div", ".quizz__body")
 		let footer = this.createElementWithSelector("div", ".quizz__footer")
 		footer.innerHTML = 	
 		`		
 		  <div class="quizz__footer">
				<div class="btn-group">
					<div>
					  <span class="next">Next</span>
					  <span class="prev">prev</span> 
					</div>
					<div>
					  <span class="quizz__level">Question :${this.score}/${this.data.length}</span> 
					</div>
					<div>
					Score
					  <span class="quizz__score">0%</span> 
					</div>	
					

				</div>
			</div>
		`

	
 		this.root.appendChild(body)	
 		this.root.appendChild(footer)	


		this.quizzes = data.map((item)=>{
				let quizz = this.createElementWithSelector("div", ".quizz")
				quizz.dataset.hasUserChooseOption = "false"
				let question = this.createElementWithSelector("div", ".quizz__question")
				question.textContent = item.question
				let options = this.createElementWithSelector("div", ".quizz__options__group")
				item.options.forEach( (txt)=>{
					let opt = this.createElementWithSelector("div", ".quizz__option")
					opt.textContent = txt
					options.appendChild(opt)
				})
				quizz.appendChild(question)
				quizz.appendChild(options)
				return quizz
		})
		this.insertQuizz(this.quizzes[this.QuizzPos], this.root.querySelector(".quizz__body"))
		document.getElementById(el).appendChild(this.root)

	

		this.root.querySelector(".next").addEventListener("click",(e)=>{
			e.preventDefault()
			this.gotoNextQuizz()
		})
		this.root.querySelector(".prev").addEventListener("click",(e)=>{
			e.preventDefault()
			this.gotoPrevQuizz()
		})
 	}

}




