// dz 4.1

const people = document.getElementById('people');
const persons = new XMLHttpRequest();
persons.open("GET", "../data/persons.json");
persons.setRequestHeader("Content-type", "application/json");
persons.onload = () => {
    const data = JSON.parse(persons.responseText);
    data.map(person => {
        const card = document.createElement('div');
        card.classList.add('person_card');
        card.innerHTML = `
         <h5>${person.name}</h5>
         <img src="${person.photo}" alt="${person.name}" class="person_photo">
         <p>Age: ${person.age}</p>
       `;
        people.appendChild(card);
    });
};

persons.send();


// dz 4.2

const request = new XMLHttpRequest()
request.open('GET','../data/any.json')
request.setRequestHeader('Content-type', 'application/json')
request.send()

console.log(request)

onload = () => {

    let data = JSON.parse(request.responseText);

    console.log(data);
}


