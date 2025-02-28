import { getTemplate } from './template.js';

var count = 1;

function addButton() {
    count++;
    getTemplate(count);
}


function formSubmit(event) {
    event.preventDefault();
    //alert('We captured the event');
    var fee = feeCalculator();
    //var name = document.querySelectorAll("adult_name").value;
    var name = document.getElementById("adult_name").value;
    //alert(name + " " + fee);
    var s = "";
    if (count > 1) {
        s = "s";
    }
    var message = `Thank you ${name} for registering. You have registered ${count} participant${s} and owe $${fee} in Fees.`;
    document.getElementById("regForm").style.display = "none";
    document.getElementById("summaryLabel").innerHTML = message;
    document.getElementById("summary").style.display = "block";
}

window.onload = function() {
    var form = document.querySelector("form");
    form.onsubmit = formSubmit.bind(form);
    document.getElementById("add").addEventListener("click", addButton);
}

function feeCalculator() {
    let feeElements = document.querySelectorAll("[id^=fee]");
    feeElements = [...feeElements];
    var total = 0;
    for (let i = 0; i < feeElements.length; i++) {
        total += Number(feeElements[i].value);
    }
    return total;
}