/*
 * author : AWO CARLOS
 * site web : https://awo-carlos.dev/
 * addresse mail : awocarlos55@gmail.com
*/
let session = []

let quizz__html = 
`		<div class="quizz__input">
			<div class="input--group input--group-1">
				<label for="" class="input--group--label">Entrer le tire du Quizz</label>
				<input type="text" placeholder="title" class="title">
			</div>
			<hr>
			<div>
				<div class="quizz">
					<div class="input--group input--group-1">
						<label for="" class="input--group--label">Saisissez La Question </label>
						<input type="text" placeholder="question" class="question">
					</div>
					<div class="options">
						<div class="input--group">
							<label for=""class="input--group--label">Saisissez une Option pour la question </label>
							<input type="text" placeholder="option"class="option">
						</div>
						<button class="another--option btn">Add another option</button>
					</div>
					<hr>
					<div class="input--group">
						<label for="">Entrer le ou les reponses corectes parmis les options ci-dessus séparé par des virgules</label>
					    <input type="text" placeholder="correct option" class="answer">
					</div>

				</div>
			</div>

			<div>
				<button class="another--question btn">Add question</button>
			</div>		
		</div>
`
let option__html=
`
	<div class="input--group">
		<label for=""class="input--group--label">Saisissez une Option pour la question </label>
		<input type="text" placeholder="option"class="option">
	</div>
`
let quizz__question=
`
	<div class="quizz">
					<div class="input--group input--group-1">
						<label for="" class="input--group--label">Saisissez La Question </label>
						<input type="text" placeholder="question" class="question">
					</div>
					<div class="options">
						<div class="input--group">
							<label for=""class="input--group--label">Saisissez une Option pour la question </label>
							<input type="text" placeholder="option"class="option">
						</div>
						<button class="another--option btn">Add another option</button>
					</div>
					<hr>
					<div class="input--group">
						<label for="">Entrer le ou les reponses corectes parmis les options ci-dessus séparé par des virgules</label>
					    <input type="text" placeholder="correct option" class="answer">
					</div>

	</div>
`

function getNodeElement(string){
	let parser = new DOMParser()
	let doc = parser.parseFromString(string,"text/html")
	return doc.body.children[0]
}
function insertQuizzInput(dest){

	let quizz__input = getNodeElement(quizz__html)
	dest.insertBefore(quizz__input,dest.firstChild)
	attachEventToOption()
    attachEventToCreateQuestion()
}
function addOption(e){
	e.preventDefault()
	let input = getNodeElement(option__html)
	let i = 0
	let quizz = null
	let last = this.parentNode
	while(true){

		quizz = last
		if (quizz.classList.contains("quizz")) {
			break;
		}

		last = last.parentNode

		i++

	}

	quizz.querySelector(".options").insertBefore(input , quizz.querySelector(".options").firstChild)
	//quizz.querySelector(".options").appendChild(input)
}
function addQuestion(e){
	e.preventDefault()
	let question = getNodeElement(quizz__question)


	document.querySelector(".form--quizz").querySelector(".quizz").parentNode.appendChild( question)
	attachEventToOption()
}
function createQuizz(e){
	e.preventDefault()
	let form = (this.parentNode)

	let res = form?.querySelector(".quizz__input")
	if (res ===null) {
		
		insertQuizzInput(form)

					attachEventToOption()
        attachEventToCreateQuestion()
		

	}
	else{
		
		let id = 0
		let index = 0
		if (checkInputZone((document.querySelector(".quizz__input")))==false) {
			alert("Veuillez remplir tous les champs ded données")
			return 0
		}


		let quizz__input = form.removeChild(document.querySelector(".quizz__input"))

		let data = Array.from(quizz__input.querySelectorAll(".quizz")) 
		let title = quizz__input.querySelector(".title") 


		data = data.map((item,i)=>{
			let AllOptions = []
			Array.from(item.querySelectorAll(".option")).forEach((i)=>{
				if(i.value!=""){AllOptions.push(i.value)}
			})	
			
			let answer = []
			item.querySelector(".answer").value.trim().split(",").forEach((i)=>{
				
					if(i!=""){answer.push(i)}
			})


			return {
				id:i,
				question : item.querySelector(".question").value,
				options:AllOptions,
				answer:answer
	        }

		})
		if (session.length === 0) {
			index = 0;
		}
		else{
			index = session.length
		}
		id = "quizz-"+index
		let element = document.createElement("div")
		element.setAttribute("id", id)
		document.body.querySelector("#root").insertAdjacentElement('afterend',element)
		

		session[index] = new Quizz(id,data,{title:title.value})

		

	}


}


function attachEventToOption(){
	Array.from(document.querySelector(".form--quizz")
		.querySelectorAll(".another--option"))
	    .forEach((item)=>{
		item.addEventListener("click",addOption )	
	})
}
function attachEventToCreateQuestion(){
	
	Array.from(document.querySelector(".form--quizz").querySelectorAll(".another--question")).forEach((item)=>{
		item.addEventListener("click",addQuestion )	
		
	})
}

function checkInputZone(el){
	let result = true
	let all = Array.from(el.querySelectorAll("input[type='text']"))
	

	for(let i = 0; i < all.length; i++){
		if (all[i].value =="") {
			result = false
			break
		}
	}

	return result

}


attachEventToOption()
attachEventToCreateQuestion()



document.querySelector(".create--quizz").addEventListener("click", createQuizz)



