// Get UI

var getform = document.getElementById('form');
var gettextbox = document.getElementById('textbox');
var getul = document.getElementById('list-group');

var todos = JSON.parse(localStorage.getItem('todos'));
// console.log(todos);
if(todos){
	todos.forEach(todo=>addnew(todo));
}

getform.addEventListener('submit',(e)=>{
	addnew();
	e.preventDefault();
});

function addnew(todo){

	// came from input text
	let todotext = gettextbox.value;
	console.log(todotext);

	// // came from local storage
	if(todo){
		todotext = todo.text
	}

	if(todotext){
		const li = document.createElement('li');

		if(todo && todo.done){
			li.classList.add('completed');
		}

		li.appendChild(document.createTextNode(todotext));
		getul.appendChild(li);
		gettextbox.value = '';
		gettextbox.focus();

		updatelocalstorage();

		li.addEventListener('click',function(){
			li.classList.toggle('completed');
			updatelocalstorage();
		});

		li.addEventListener('contextmenu',(e)=>{
			li.remove();
			updatelocalstorage();
			e.preventDefault();
		});
	}
}

function updatelocalstorage(){

	var getalllis = document.querySelectorAll('li');

	const todos = [];

	getalllis.forEach(getallli=>{

		todos.push({
			text:getallli.textContent,
			done:getallli.classList.contains('completed')
		});
	});

	console.log(todos);
	localStorage.setItem('todos',JSON.stringify(todos));
}