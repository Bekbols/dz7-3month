
const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneSpan = document.querySelector('#phone_result');

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/;

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneSpan.innerHTML = 'OK'
        phoneSpan.style.color = 'green'
    }else {
        phoneSpan.innerHTML = 'NOT OK'
        phoneSpan.style.color = 'red'
    }
}

// Tab slider

const tabContentBlocks = document.querySelectorAll('.tab_content_block')
const tabContentItems = document.querySelectorAll('.tab_content_item')
const tabParent = document.querySelector('.tab_content_items')
let index = 0

const hideTabContent = () => {
    tabContentBlocks.forEach((item) => {
        item.style.display = 'none'
    })
    tabContentItems.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (index = 0) => {
    tabContentBlocks[index].style.display = 'block'
    tabContentItems[index].classList.add('tab_content_item_active')
}

hideTabContent()
showTabContent()

tabParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
       tabContentItems.forEach((item, tabIndex) => {
           if (event.target === item) {
               hideTabContent()
               index = tabIndex
               showTabContent(index)
           }
       })
    }
}


const autoSlider  = () => {
    hideTabContent()
    index = (index + 1) % tabContentItems.length
    showTabContent(index)
}

setInterval(autoSlider, 3000)



// CONVERTER

const usdInput = document.querySelector('#usd');
const somInput = document.querySelector('#som');
const eurInput = document.querySelector('#eur');


const converter = (element, targetElement, targetElementTwo) => {
    element.oninput = () => {
        const request = new XMLHttpRequest()
        request.open('GET','../data/converter.json')
        request.setRequestHeader('Content-type', 'application/json')
        request.send()


        request.onload = () => {
            const data = JSON.parse(request.response)
            switch (element.id) {
                case 'som':
                    targetElement.value = (element.value / data.usd).toFixed(2)
                    targetElementTwo.value = (element.value / data.eur).toFixed(2)
                    break
                case 'usd':
                    targetElement.value = (element.value * data.usd).toFixed(2)
                    targetElementTwo.value = (element.value * data.usd / data.eur).toFixed(2)
                    break
                case 'eur':
                    targetElement.value = (element.value * data.eur).toFixed(2)
                    targetElementTwo.value = (element.value * data.eur / data.usd).toFixed(2)
                    break
                default:
                    break
            }
            element.value === '' && (targetElement.value = '', targetElementTwo.value = '')
        }
    }
}

converter(somInput, usdInput, eurInput);
converter(usdInput, somInput, eurInput);
converter(eurInput, somInput, usdInput);


// CARD SWITCHER

const cardBlock = document.querySelector('.card')
const btnNext = document.querySelector('#btn-next')
const btnPrev = document.querySelector('#btn-prev')
let cardNumber = 1
let maxCardNumber = 0

function CardSwitcher(cardNumber) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${cardNumber}`)
        .then(response => response.json())
        .then(data => {
            cardBlock.innerHTML = `
                <p>${data.title}</p>
                <p style="color: ${data.completed ? 'green' : 'red'}">${data.completed}</p>
                <span>${data.id}</span>
            `;
        });
}

function getMaxCardNumber() {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(data => {
            maxCardNumber = data.length
        })
}


getMaxCardNumber()
CardSwitcher(cardNumber)

btnNext.onclick = () => {
    cardNumber++
    if (cardNumber > maxCardNumber) {
        cardNumber = 1
    }
    CardSwitcher(cardNumber)
}

btnPrev.onclick = () => {
    cardNumber--
    if (cardNumber < 1) {
        cardNumber = maxCardNumber
    }
    CardSwitcher(cardNumber)
}



fetch(`https://jsonplaceholder.typicode.com/posts`)
    .then(response => response.json())
     .then(data => {
        console.log(data)
     })



// WEATHER

const searchInput = document.querySelector('.cityName')
const temp = document.querySelector('.temp')
const city = document.querySelector('.city')
const URL = 'http://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'e417df62e04d3b1b111abeab19cea714'

const citySearch = () => {
    searchInput.oninput = () => {
    fetch(`${URL}?q=${event.target.value}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            city.innerHTML = data.name ? data.name : 'Город не найден...'
            temp.innerHTML = data.main?.temp ? Math.round(data.main?.temp - 273) + '&deg;C' : '///'
        })
    }
}

citySearch()

// optional chaining - опциогальная цепочка - ?.





