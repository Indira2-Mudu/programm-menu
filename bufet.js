
getProducts();

let update_btn  = document.querySelector("#update_btn")
let addBtn = document.querySelector('#add-btn');

function getProducts() {
	const url = 'https://app.megacom.kg:9090/test-app/api/v1/product/all';
	fetch(url)
		.then(response => response.json())
		.then(data => showProducts(data))
}

function showProducts(data) {
	let elems = '';
	const notFoundImage = 'https://cdn.browshot.com/static/images/not-found.png'
	data.forEach(item => {
		if (item.active && item.picture !== null && item.picture !== "unknown") {
			elems += `<div class="bakery d-flex  border border-secondary row color justify-content-evenly">
						<div class="close">
							<button type="button" class="btn-close" aria-label="Close"></button>
						</div>
						<img src="${item.picture === 'www' ? notFoundImage : item.picture}" class="te-size image" alt="">
						<div class="d-flex justify-content-center align-items-center">
							<p class="te-size p-1">${item.name}</p>
							<p class="te-size p-1">${item.price}</p>
							<p class="te-size p-1">сом</p>
						</div>
						<button type="button"  data-name="${item.name}"  data-price="${item.price}" 
							 data-picture="${item.picture}" data-id="${item.id}" id="btnred"
							  class="btn btn-secondary btn-sm update align-self-start" 
							 data-bs-toggle="modal" data-bs-target="#update-products-modal">Редактировать</button>
					</div>`;
		}
	})
	document.querySelector('#content').innerHTML = elems;

	let updateBtns = document.querySelectorAll('#btnred');

	updateBtns.forEach(item => {
		item.onclick = getProduct;
	})
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
	const url = 'https://app.megacom.kg:9090/test-app/api/v1/product/save';

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

function getProduct(e) {
	let target = e.target;
	let name = target.dataset.name;
	let price = target.dataset.price;
	let picture = target.dataset.picture;
	let id = target.dataset.id;

	document.querySelector('#upd-name').value = name;
	document.querySelector('#upd-price').value = price;
	document.querySelector('#upd-picture').value = picture;
	document.querySelector('#upd-id').value = id;
}

update_btn.onclick = function (){
	let redak = document.querySelectorAll("#update-form input");
	let id = document.querySelector("#upd-id");
	let obj = {};

	redak.forEach(item => {
			obj[item.name] = item.value;
	})

	obj.id = id.value;
	obj.active = true;

	updateProducts(obj);
}

function  updateProducts(data){
	const url = "https://app.megacom.kg:9090/test-app/api/v1/product/update";

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
				getProducts();
				alert('успешно сохранилось');
			} else {
				alert('Ошибочка произошла. Статутс ошибки :' + response.status);
			}
		})
}



