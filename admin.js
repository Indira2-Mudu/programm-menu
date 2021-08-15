//*********************************** admin ****************************************************
let addBtn = document.querySelector('#add-btn');
let updateForm  = document.querySelector("#update-form");
var myModal = new bootstrap.Modal(document.getElementById('update-user-modal'))

getUsers();

updateForm.onsubmit = function (e){
	e.preventDefault()
	let obj = {};
	let elems = document.querySelectorAll('#update-form input');
	elems.forEach(i =>{
		obj[i.name]=i.value;
	})
	obj.active = true;

	updateUser(obj)
}

function updateUser(data){
	let url = 'https://app.megacom.kg:9090/test-app/api/v1/user/update';
	let options = {
		method: "PUT",
		headers: {
			"Content-Type": 'application/json'
		},
		body: JSON.stringify(data)
	}
	fetch(url, options)
		.then(response => {
			if (response.ok) {
				alert('успешно сохранилось');
				getUsers();
				myModal.hide();
			} else {
				alert('Ошибочка произошла. Статутс ошибки :' + response.status);
			}
		})
}

function getUsers() {
	const url = 'https://app.megacom.kg:9090/test-app/api/v1/user/all';
	fetch(url)
		.then(response => response.json())
		.then(data => showUsers(data))
}

function showUsers(data) {
	let elems = '';
	data.forEach(item => {
		if(item.active){
		elems += `<div class="rounded color d-flex align-items-stretch p-2 m-2 flex-wrap">
                <div class="col flex">
					<p class="t-size dline"><strong>Админ :</strong>${item.name}</p>
					<p class="t-size dline"><strong>Курс  </strong> ----</p>
					<p class="t-size dline"><strong>Номер телефона :</strong>${item.phone}</p>
					<p class="t-size dline"><strong>Пин код :</strong>${item.pin}</p>
				</div>
				<div class="d-flex flex-column align-items-stretch">
					<div class="d-flex flex-column justify-content-end">
						<button type="button"  data-name="${item.name}" data-phone="${item.phone}" 
							 data-pin="${item.pin}" data-id="${item.id}" data-code="${item.code}"
							 class="btn btn-secondary btn-sm update align-self-end edit" id=""
							 data-bs-toggle="modal" data-bs-target="#update-user-modal" data-bs-dismiss="modal">Редактировать</button>
						<button type="button"  data-name="${item.name}" data-phone="${item.phone}" 
							 data-pin="${item.pin}" id="btnred"
							  class="btn btn-secondary btn-sm update align-self-end" 
							 data-bs-toggle="modal" data-bs-target="#delete-user-modal">Удалить</button>
					</div>
					<div class="d-flex flex-column justify-content-start mt-4 me-5">
						<p class="t-size dline"><strong>Логин :</strong>${item.code}</p>
						<p class="t-size dline"><strong>id :</strong>${item.id}</p>
					</div>
				</div>
			</div>`;
		}
	})

	document.querySelector('#content').innerHTML = elems;

	let editBtns = document.querySelectorAll('.edit');
	editBtns.forEach(i=>{
		i.onclick = setElems;
	})
}

function setElems(event){


	let name  =  event.target.dataset.name;
	let phone  =  event.target.dataset.phone;
	let pin  =  event.target.dataset.pin;
	let code = event.target.dataset.code
	let id  =  event.target.dataset.id;


	document.querySelector("#upd-name").value = name
	document.querySelector("#upd-phone").value = event.target.dataset.phone;
	document.querySelector("#upd-pin").value = event.target.dataset.pin;
	document.querySelector("#upd-code").value = event.target.dataset.code;
	document.querySelector("#upd-id").value = id;
}

addBtn.onclick = function () {
	let elems = document.querySelectorAll('#add-form input');
	let obj = {};
	elems.forEach(item => {
		obj[item.name] = item.value;
	})
	obj.active = true;
	save(obj);
}

function save(data) {
	const url = 'https://app.megacom.kg:9090/test-app/api/v1/user/save';

	let options = {
		method: "POST",
		headers: {
			"Content-Type": 'application/json'
		},
		body: JSON.stringify(data)
	}
	fetch(url, options)
		.then(response => {
			if (response.ok) {
				alert('успешно сохранилось');
			} else {
				alert('Ошибочка произошла. Статутс ошибки :' + response.status);
			}
		})
}
