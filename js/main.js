const API_KEY = "9d990f102a27ec63fcf581cf90a28e95";

const button = document.getElementById('sendButton');
const search = document.getElementById('search');
const body = document.getElementById('body');
const main = document.getElementById('main');
const container = document.getElementById('container');
const valorCiudad = JSON.parse(localStorage.getItem('response'));

if (valorCiudad != null){
    madeGrid(valorCiudad);
}
button.addEventListener('click', () => {
    


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search.value}&appid=${API_KEY}&lang=es&units=metric`
    ).then(function(response){
        console.log(response);
        return response.json();
    }).then(function(responseJSON) {
        console.log('imprimo json', responseJSON);
        madeGrid(responseJSON);
        saveResults(responseJSON);
    }).catch(function(error) {
        console.log('Fallo!', error)
    });
 
})
function saveResults (data){
    localStorage.setItem('response', JSON.stringify(data));
}

function madeGrid(data) {
    
    
    backClima(data);

    console.log(data.name);
    let h2title = document.getElementById('title');
    h2title.innerHTML = "Ciudad: " + data.name;

    console.log(data.weather[0].icon);
    let listTemp = document.getElementById('list');
    let divIcon = document.getElementById('dIcon');
    let temp = document.createElement('li');
    let tMax = document.createElement('li');
    let tMin = document.createElement('li');
    let hum = document.createElement('li');
    let st = document.createElement('li');
    let pa = document.createElement('li');
    let vdv = document.createElement('li');
    let icon = document.createElement("img");
    let desc = document.createElement("p")
    
    listTemp.innerHTML = "";
    divIcon.innerHTML = "";

  

    
    desc.innerHTML = data.weather[0].description;
    icon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
    temp.innerHTML = "Temperatura: " + data.main.temp + "°";
    tMax.innerHTML = "Temperatura Maxima: " + data.main.temp_max + "°";
    tMin.innerHTML = "Temperatura Maxima: " + data.main.temp_min + "°"; 
    hum.innerHTML = "Humedad: " + data.main.humidity + "%";
    st.innerHTML = "Sensacion termina: " + data.main.feels_like + "°";
    pa.innerHTML = "Presion: " + data.main.pressure + " hPa";
    vdv.innerHTML = "Velocidad del viento: " + data.wind.speed + " km/h";

    listTemp.appendChild(temp);
    listTemp.appendChild(tMax);
    listTemp.appendChild(tMin);
    listTemp.appendChild(hum);
    listTemp.appendChild(st);
    listTemp.appendChild(pa);
    listTemp.appendChild(vdv);
    divIcon.appendChild(icon);
    divIcon.appendChild(desc);
    
}


function backClima(data){
    console.log(data.weather[0].id);

    if(data.weather[0].id >= 200 && data.weather[0].id <= 232){
        body.style.backgroundImage = "url(https://source.unsplash.com/1600x900/?thunderstorm)"
    } else if(data.weather[0].id >= 300 && data.weather[0].id <= 321){
        body.style.backgroundImage = "url(https://source.unsplash.com/1600x900/?drizzle)"
    } else if(data.weather[0].id >= 500 && data.weather[0].id <= 531){
        body.style.backgroundImage = "url(https://source.unsplash.com/1600x900/?rain)"
    } else if(data.weather[0].id >= 600 && data.weather[0].id <= 622){
        body.style.backgroundImage = "url(https://source.unsplash.com/1600x900/?snow)"
    } else if(data.weather[0].id >= 701 && data.weather[0].id <= 781){
        body.style.backgroundImage = "url(https://source.unsplash.com/1600x900/?atmosphere)" 
    }else if(data.weather[0].id == 800){
        body.style.backgroundImage = "url(https://source.unsplash.com/1600x900/?sunny)"
    }else if(data.weather[0].id >= 801 && data.weather[0].id <= 804){
        body.style.backgroundImage = "url(https://source.unsplash.com/1600x900/?clouds)"
    } 

}



