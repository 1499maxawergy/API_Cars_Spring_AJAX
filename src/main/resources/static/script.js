let table = document.querySelector('#table')
let tbody = document.querySelector('#tbody')
let add_btn = document.querySelector('#add-btn')
let add_form = document.querySelector('#add-form')
console.log(tbody)

function getAllCars(){
    var settings = {
        "url": "http://localhost:8080/api",
        "method": "GET",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        console.log(response)
        for (let i = 0; i < response.length; i++) {
            createCar(response[i])
        }
    });
}

function createCar(response){
    var car = document.createElement('tr')
    car.innerHTML = "            <td scope=\"row\">"+response.id+"</td>\n" +
        "            <td>"+response.brand+"</td>\n" +
        "            <td>"+response.model+"</td>\n" +
        "            <td>"+response.price+"</td>\n" +
        "            <td>"+response.color+"</td>\n" +
        "            <td>\n" +
        "                <a" +
        "                    <button class=\"btn btn-outline-primary btn-sm\">Edit</button>\n" +
        "                </a>\n" +
        "                <button class=\"btn btn-sm btn-danger\">Delete</button>\n" +
        "            </td>"
    var buttonEdit = car.querySelector('.btn-outline-primary')
    var buttonDelete = car.querySelector('.btn-danger')
    buttonEdit.addEventListener('click', function (){
        showUpdateForm(car, response)
    })
    buttonDelete.addEventListener('click', function (){
        deleteCar(car, response.id)
    })
    tbody.appendChild(car)
}

function deleteCar(car, id){
    var settings = {
        "url": "http://localhost:8080/api/" + id,
        "method": "DELETE",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        car.parentNode.removeChild(car);
        console.log(response);
    });
}

function addFormCar(){
    let inputs = add_form.getElementsByTagName('input')
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === '')
            return
    }
    const car = {
        brand: inputs[0].value,
        model: inputs[1].value,
        price: Number(inputs[2].value),
        color: inputs[3].value
    };

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }

    var settings = {
        "url": "http://localhost:8080/api",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(car)
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        createCar(response)
    });
}

function showUpdateForm(car, response){
    car.style.display = "none";
    var tr = document.createElement('tr')
    tr.innerHTML = "        <td scope=\"col\">"+response.id+"</td>\n" +
        "        <td scope=\"col\"><input type=\"text\" value='"+response.brand+"' placeholder=\"Brand\"></td>\n" +
        "        <td scope=\"col\"><input type=\"text\" value='"+response.model+"' placeholder=\"Model\"></td>\n" +
        "        <td scope=\"col\"><input type=\"number\" value='"+response.price+"' placeholder=\"Price\"></td>\n" +
        "        <td scope=\"col\"><input type=\"text\" value='"+response.color+"' placeholder=\"Color\"></td>\n" +
        "        <td scope=\"col\">\n" +
        "            <button class=\"btn btn-sm btn-success\" id=\"add-btn\">Edit</button>\n" +
        "            <button class=\"btn btn-sm btn-danger\" id=\"add-btn\">Cancel</button>\n" +
        "        </td>"

    var buttons = tr.getElementsByTagName('button')
    buttons[0].addEventListener('click', function (){
        updateCar(car, response)
    })
    buttons[1].addEventListener('click', function (){
        closeEditFormCar(car)
    })
    car.parentNode.insertBefore(tr, car.nextSibling)
}

function updateCar(car, response){
    const editCar = car.nextSibling;
    const inputs = editCar.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === '')
            return
    }
    var newCar = {
        id: response.id,
        brand: inputs[0].value,
        model: inputs[1].value,
        price: Number(inputs[2].value),
        color: inputs[3].value
    }
    var settings = {
        "url": "http://localhost:8080/api/" + response.id,
        "method": "PATCH",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(newCar)
    };

    $.ajax(settings).done(function (response) {
        var newValues = car.getElementsByTagName('td')
        if (response !== null){
            newValues[0].innerHTML = response.id
            newValues[1].innerHTML = response.brand
            newValues[2].innerHTML = response.model
            newValues[3].innerHTML = response.price
            newValues[4].innerHTML = response.color
        }
        console.log(response);
    });
    closeEditFormCar(car)
}

function closeEditFormCar(car){
    var editCar = car.nextSibling
    editCar.parentNode.removeChild(editCar)
    car.style.display = "table-row"
}

add_btn.addEventListener('click', addFormCar)
getAllCars()