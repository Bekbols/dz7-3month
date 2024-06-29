
const people = document.querySelector('#people');

const request = async () => {
    try {
        const response = await fetch(' https://jsonplaceholder.typicode.com/posts')
        const data = await response.json()
        data.map(data => {
            const card = document.createElement('div')
            card.classList.add('person_card')
            card.innerHTML = `
          <p>${data.title}</p>
          <img src="data:image/jpeg;base64,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" alt="cars" 
          class="person_photo">
          <p>Body: ${data.body}</p>
        `;
            people.appendChild(card);
        })
    }catch (e){
        console.log(e)
    }

}

request()



// dz 7.1

// 1

// async function CardSwitcherAsync(cardNumber) {
//     try {
//         const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${cardNumber}`);
//         const data = await response.json();
//         cardBlock.innerHTML = `
//             <p>${data.title}</p>
//             <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
//             <span>${data.id}</span>
//         `;
//     } catch (e) {
//         console.log(e)
//     }
// }
//
// CardSwitcherAsync()


// 2

// const urlAddres = 'https://jsonplaceholder.typicode.com/todos'
//
// const getMaxCardNumberAsync = async () => {
//     try {
//         const response = await fetch(urlAddres);
//         const data = await response.json();
//         return data.length
//
//     } catch (e) {
//         console.log(e)
//     }
// }
//
// getMaxCardNumberAsync()

// 3

// const justRequest = async () => {
//     try {
//         const response = await fetch(`https://jsonplaceholder.typicode.com/posts`)
//             const data = await response.json()
//             console.log(data)
//     }catch (e) {
//         console.log(e)
//     }
// }
//
// justRequest()

// 4

// const citySearchAsync = () => {
//     searchInput.oninput = async () => {
//         try {
//             const response = await fetch(`${URL}?q=${event.target.value}&appid=${API_KEY}`)
//             const data = await response.json()
//             city.innerHTML = data.name ? data.name : 'Город не найден...';
//             temp.innerHTML = data.main?.temp ? Math.round(data.main?.temp - 273) + '&deg;C' : '///'
//         } catch (e) {
//             console.log(e)
//         }
//     }
// }
//
// citySearchAsync()
