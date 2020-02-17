
"use strict"//; import "isomorphic-fetch";

const userLocation = document.getElementById("userLocation");

const userSubmit = document.getElementById("userSubmit");



//This function creates a 'li' element and then appends the text of the event title.
//It then also creates an 'a' element and assigns the url of the event to the href.
//then the link is appended to the list and the list is appended to the section it belongs.
const createEventParagraph = ((event, eventTitle) => {
    const unOrderedList = document.getElementById(`${eventTitle}List`);
    let listItems = document.createElement("li");
    let link = document.createElement("a");
    const linkText = document.createTextNode(`${event.title}`);
    listItems.setAttribute("class", "listItemClass")
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
    const cultureSection = document.getElementById("cultureList");
    let cultureListItem = document.createElement("li");
    cultureListItem.innerHTML = name;
    cultureSection.appendChild(cultureListItem);
    
}

//This function is passed the weather fetch data and creates elements. The text elements are paragraphs
//and an 'img' one that displays the current weather icon. 
const createWeatherBox = (data) => {
    const weatherSection = document.getElementById("weather");
    const location = `${data.location.name}, ${data.location.region}`;
    const weatherBox = document.createElement("div");
    const locationParagraph = document.createElement("p")
    const weatherImage = document.createElement("img");
    weatherBox.setAttribute("class", "weatherBoxClass");
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

//This function creates a title over the section. perhaps defunct now but i'm leaving it in just in case...
const sectionTitle = (id) => {
    const section = document.getElementById(id);
    const sectionTitle = document.createElement("h1");
    sectionTitle.innerHTML = id.toUpperCase();
    section.appendChild(sectionTitle);
}

//fetching wiki data for the culture tab. taking the data and creating links for the drop down items.
//This could use some refactoring but it works for now...
const fetchCultureLink = (culturalPlace) => {
    fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${culturalPlace}&prop=info&inprop=url|talkid`)
    .then(response => response.json())
    .then(data => {
        let firstEntry = () => {
            for (var a in data.query.pages) return a;
        }

        let zero = firstEntry();
        const cultureSection = document.getElementById("cultureList");
        let cultureListItem = document.createElement("li");
        let cultureLink = document.createElement("a");
        cultureListItem.setAttribute("class", "cultureItemClass")
        const cultureLinkText = document.createTextNode(`${culturalPlace}`);
        cultureLink.appendChild(cultureLinkText);
        cultureLink.href = data.query.pages[`${zero}`].fullurl;
        cultureLink.target = "_blank";
        cultureListItem.appendChild(cultureLink);
        cultureSection.appendChild(cultureListItem);

    })
}

//this function creates a list of cultural items based on the categories selected ( we could add more or less).
//It calls the fetchCultureLink which prints the items and their wiki links into the culture dropdown menu.

const fetchCulture = () => {
    fetch(`https://api.foursquare.com/v2/venues/explore?categoryId=4deefb944765f83613cdba6e,4bf58dd8d48988d181941735,4bf58dd8d48988d165941735,4bf58dd8d48988d1f2931735,52e81612bcbc57f1066b7a22,52e81612bcbc57f1066b7a21,&radius=50000&client_id=UHSURV0TYLWFUWARGODQIIPUA40RB5GOYPYWL0NAUV43NKNN&client_secret=L1NWKEN3PN2KFWWCRP0BHXS0CEO1QW4W21SZIYREVA4CY5JE&near=${userLocation.value}&v=20200313`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        let linkArray = []
        data.response.groups[0].items.map(item => {
        fetchCultureLink(`${item.venue.name}`);

        })
        
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
          return response.json();
      })
    .then(data => {
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
        fetchCulture();
        fetchEvent("music");
        fetchEvent("film");
        fetchEvent("sports");
        fetchEvent("comedy");

    } else {
        alert("enter a location");
    }

})

// Jquery to kept events hidden till search button is clicked
$("#userSubmit").one("click", function() {
    $("#hidden").toggle();
});

// Jquery to replace the Weatherbox..etc w/ the new search option
$("#userSubmit").click(function (){
    $("div.weatherBoxClass").replaceWith();
});

$("#userSubmit").click(function (){
    $("li.listItemClass").replaceWith();
});

$("#userSubmit").click(function (){
    $("li.cultureItemClass").replaceWith();
});

