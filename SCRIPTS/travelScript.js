
"use strict"

const userLocation = document.getElementById("userLocation");

const userSubmit = document.getElementById("userSubmit");

//This function creates a 'p' element and then appends the text of the event title.
//It then also creates an 'a' element and assigns the url of the event to the href.
//then the link is appended to the paragraph and the paragraph is appended to the body.
const createEventParagraph = ((event, eventTitle) => {
    const unOrderedList = document.getElementById(`${eventTitle}List`);
    let listItems = document.createElement("li");
    let link = document.createElement("a");
    const linkText = document.createTextNode(`${event.title}`);
    link.appendChild(linkText);
    link.title = "Event Info";
    link.href = event.url;
    link.target = "_blank";

    listItems.appendChild(link);
    unOrderedList.appendChild(listItems);
    listItems.appendChild(link);
    unOrderedList.appendChild(listItems);

});

const culturePrint = (name) => {
    const cultureSection = document.getElementById("culture");
    let paragraph = document.createElement("p");
    paragraph.innerHTML = name;
    cultureSection.appendChild(paragraph);
    
}

//This function is passed the weather fetch data and creates elements. The text elements are paragraphs
//and an 'img' one that displays the current weather icon. 
const createWeatherBox = (data) => {
    const weatherSection = document.getElementById("weather");
    const location = `${data.location.name}, ${data.location.region}`;
    const weatherBox = document.createElement("div");
    const locationParagraph = document.createElement("p")
    const weatherImage = document.createElement("img");
    weatherImage.src = `https:${data.current.condition.icon}`;
    locationParagraph.innerHTML = location;
    weatherBox.appendChild(weatherImage);
    weatherBox.appendChild(locationParagraph);
    weatherSection.appendChild(weatherBox);
    const currentWeatherParagraph = document.createElement("p");
    currentWeatherParagraph.innerHTML = `Currently: ${data.current.condition.text}<br>`;
    currentWeatherParagraph.innerHTML += `Temperature: ${data.current.temp_f}°F<br>`
    currentWeatherParagraph.innerHTML += `Wind: ${data.current.wind_mph} MPH<br>`
    currentWeatherParagraph.innerHTML += `Humidity: ${data.current.humidity}%`
    weatherBox.appendChild(currentWeatherParagraph);
    
}

//This function creates a title over the section. 
const sectionTitle = (id) => {
    const section = document.getElementById(id);
    const sectionTitle = document.createElement("h1");
    console.log(id);
    sectionTitle.innerHTML = id.toUpperCase();
    section.appendChild(sectionTitle);
}

const fetchCulture = () => {
    fetch(`https://api.foursquare.com/v2/venues/explore?categoryId=4deefb944765f83613cdba6e,4bf58dd8d48988d181941735,4bf58dd8d48988d1f2931735,52e81612bcbc57f1066b7a22,52e81612bcbc57f1066b7a21,&radius=50000&client_id=UHSURV0TYLWFUWARGODQIIPUA40RB5GOYPYWL0NAUV43NKNN&client_secret=L1NWKEN3PN2KFWWCRP0BHXS0CEO1QW4W21SZIYREVA4CY5JE&near=30305&v=20200313`)
    .then(response => {
        //console.log(response);
        return response.json();
    })
    .then(data => {
        console.log(data.response.groups[0].items);
        data.response.groups[0].items.map(item => culturePrint(item.venue.name));

    })
    .catch( err => console.log(err));
}


const fetchEvent = (eventType) => {
    //the eventType argument is a event category. it throws it on the end of the URL inside the curly braces. the userLocation 
    //braces are using the input elements value as it's source.
    //We need to add another argument either here or the event handler that takes the date info as well. baby steps. 
    fetch(`https://api.eventful.com/json/events/search?q=${eventType}&c=${eventType}&t=today&l=
    ${userLocation.value}&within=25&sort_direction=descending&sort_order=popularity&page_size=20&app_key=QfJVpR8FLcNsHKLG`)
    .then(response => {
          console.log(response);
          return response.json();
      })
    .then(data => {
        console.log(data);
        //sectionTitle(eventType);
        data.events.event.map(item => createEventParagraph(item, `${eventType}`));
      })
      .catch(err => console.error(err));
        
}
const fetchWeather = () => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=95929b78acb549bd9bc151519201302&q=${userLocation.value}`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        //console.log(data);
        createWeatherBox(data);
    })
    .catch(err => console.log(err));
}
//below is the event listener. I called the fetchEvent function a few times with various events as arguments.
//the argument it takes goes to the end of the URL inside the fetch function.
//so the fetchEvent("sports") callback for example throws the ${sports} at the end of the URl to designate a category.
//
userSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    fetchWeather();
    if (userLocation.value !== "") {
        //fetchCulture();
        //console.log('clicked');
        fetchEvent("music");
        //fetchEvent("concerts");
        fetchEvent("film");
        //fetchEvent("attractions")
        fetchEvent("sports");
        fetchEvent("comedy");

    } else {
        alert("enter a location");
    }

})

