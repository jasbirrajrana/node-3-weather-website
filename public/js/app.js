// console.log("my name is jasbir")



const WeatherForm = document.querySelector('form')
const srchElement = document.querySelector('input')


const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')





WeatherForm.addEventListener('submit', (e) => {

    messageOne.textContent = 'Fetching.....'
    messageTwo.textContent = ''

    e.preventDefault()
    const Location = srchElement.value
    // console.log(Location)
    //fetching data//
    fetch('http://localhost:3000/weather?address=' + Location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })

})