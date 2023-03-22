let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = 'create';
let imp;
// get total 

function getTotal() {
    if (price.value !== "") {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = "green"
    } else {
        total.innerHTML = '';
        total.style.background = "#f71353"
    }
}

// create product

let dataPro;

if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
} else {
    dataPro = [];
}

submit.onclick = function () {
    let newpro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    if (title.value != '' && price.value != '' && category.value != '' && newpro.count <= 100) {
        if (mood === 'create') {
            if (newpro.count > 1) {
                for (let i = 0; i < newpro.count; i++) {
                    dataPro.push(newpro);
                }
            } else {
                dataPro.push(newpro);
            }

        } else {
            dataPro[imp] = newpro;
            mood = 'create';
            submit.innerHTML = "CREATE";
            submit.style.background = " #0099ff";
            count.style.display = "block"
        }
        clearData();

    }



    localStorage.setItem('product', JSON.stringify(dataPro))
    showData();
}

// save localstorage
// clear inputs

function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// read

function showData() {

    getTotal()
    let tabel = '';
    for (let i = 0; i < dataPro.length; i++) {
        tabel += `
        <tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td>${dataPro[i].count}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="delateData(${i})" id="delate">Delate</button></td>
    </tr>
        `
    }
    document.getElementById("tbody").innerHTML = tabel;

    let delateAll = document.getElementById("delateAll");

    if (dataPro.length > 0) {
        delateAll.innerHTML = `
        <button onclick="delateAll()">Delate All (${dataPro.length})</button>
        `
    } else {
        delateAll.innerHTML = "";
    }
}
showData();
// count



// delate

function delateData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData();

}

function delateAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

// update

function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = "none";
    category.value = dataPro[i].category;
    count.value = dataPro[i].count;
    submit.innerHTML = "UPDATE";
    submit.style.background = "#ffae00";
    mood = 'update';
    imp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}

// search
let search = 'title';

function searchMood(id) {
    let searchinput = document.getElementById("search");
    if (id === 'searchTitle') {
        search = 'title';
    } else {
        search = 'category';
    }
    searchinput.placeholder = 'Search By ' + search;

    searchinput.focus();
    searchinput.value = '';
    showData()
}

function searchData(value) {
    let tabel = '';
    if (search == 'title') {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value)) {
                tabel += `
        <tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td>${dataPro[i].count}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="delateData(${i})" id="delate">Delate</button></td>
    </tr>
        `
            }
        }
    } else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value)) {
                tabel += `
        <tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td>${dataPro[i].count}</td>
        <td><button onclick="updateData(${i})" id="update">Update</button></td>
        <td><button onclick="delateData(${i})" id="delate">Delate</button></td>
    </tr>
        `
            }
        }
    }
    document.getElementById("tbody").innerHTML = tabel;
}

// clean data

