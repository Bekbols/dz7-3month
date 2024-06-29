// MODAL

const modalTriggerButton = document.querySelector("#btn-get");
const modal = document.querySelector(".modal");
const modalCloseButton = document.querySelector(".modal_close");

const openModal = () => {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}
const closeModal = () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
}
modalTriggerButton.onclick = () => {
    openModal()
}
modalCloseButton.onclick = () => {
    closeModal()
}
modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal()
    }
}


// SCROLL MODAL

const scrollModal = () => {
    if ((window.innerHeight + window.scrollY+10) >= document.body.offsetHeight) {
        openModal()
        window.removeEventListener('scroll', scrollModal)
    }
}

window.addEventListener('scroll', scrollModal)



setTimeout(() => {
    openModal()
}, 10000)



// POST DATA TELEGRAM BOT

const form = document.querySelector('form')
const token = '6759115283:AAEW2G1m7-IXKQ9AQezPZK5Em-YOGBXhAdo'
const chat_id = '@Bekbolsun_lesson7'
const API = `https://api.telegram.org/bot${token}/sendMessage`



form.onsubmit = async (event) => {
    event.preventDefault()

    const {name, phone} = (Object.fromEntries(new FormData(event.target).entries()))
    const text = `Имя: ${name}\nНомер телефона: ${phone}`
    console.log(text)

    await fetch(API, {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify( {
            chat_id: chat_id, text
        })
    })
}

