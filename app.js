const { log } = console

const info = document.querySelector('.info')
let API

let isCelsius = true

getLocation()
setInterval(() => {
  getLocation()
}, 60000)

const fetchData = async (api) => {
  const res = await fetch(api)
  const data = await res.json()
  log(data)
  log(res)
  renderInfo(data)
}

const renderInfo = (data) => {
  const celsius = data.main.temp
  const weather = data.weather[0].main.toLowerCase()
  log(weather)
  renderWeather(weather)

  info.innerHTML = `<p class="place">${`${data.name}, ${data.sys.country}`}</p>
<p class="temp">${
    isCelsius ? Math.round(celsius) : Math.round(celsiusToFahrenheit(celsius))
  } °<span>${isCelsius ? 'C' : 'F'}<span></p>
<img class="icon" src=${data.weather[0].icon}></img>`

  const span = document.querySelector('span')

  span.addEventListener('click', () => {
    isCelsius = !isCelsius
    renderInfo(data)
  })
}

function celsiusToFahrenheit(c) {
  const f = c * 1.8 + 32
  return f
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      API = `https://weather-proxy.freecodecamp.rocks/api/current?lat=${latitude}&lon=${longitude}`
      fetchData(API)
    }, showError)
  } else {
    log('geolocation is not supported by this browser')
  }
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      log('User denied the request for Geolocation.')
      break
    case error.POSITION_UNAVAILABLE:
      log('Location information is unavailable.')
      break
    case error.TIMEOUT:
      log('The request to get user location timed out.')
      break
    case error.UNKNOWN_ERROR:
      log('An unknown error occurred.')
      break
  }
}

function renderWeather(weather) {
  const body = document.querySelector('body')
  switch (weather) {
    case 'rain':
      body.style.backgroundImage =
        "url('https://images.pexels.com/photos/459451/pexels-photo-459451.jpeg?auto=compress&cs=tinysrgb&h=650&w=940')"
      break
    case 'clouds':
      body.style.backgroundImage =
        "url('https://images.pexels.com/photos/6825703/pexels-photo-6825703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
      break
    case 'snow':
      body.style.backgroundImage =
        "url('https://images.pexels.com/photos/10797267/pexels-photo-10797267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
      break
    case 'clear':
      body.style.backgroundImage =
        "url('https://images.pexels.com/photos/417063/pexels-photo-417063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
      break
    case 'thunderstorm':
      body.style.backgroundImage =
        "url('https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
      break
    case 'drizzle':
      body.style.backgroundImage =
        "url('https://images.pexels.com/photos/5733744/pexels-photo-5733744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
      break
  }
}
