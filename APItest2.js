//testing the event API with fetch.
"use strict"
//const token = `8lCUPhaUzrG6-nCVIk9NyUlwqpXxWXSJvkq_fDA5`;
const userLocation = document.getElementById("userLocation");
//going to make the commented out variable below the user inputed date. it will be a text field just like city is?
const userSubmit = document.getElementById("userSubmit");

//This function creates a 'p' element and then appends the text of the event title.
//It then also creates an 'a' element and assigns the url of the event to the href.
//then the link is appended to the paragraph and the paragraph is appended to the body.
const createEventParagraph = (event, index) => {
    let paragraph = document.createElement("p");
    let link = document.createElement("a");
    const linkText = document.createTextNode("Event Info");
    link.appendChild(linkText);
    link.title = "Event Info";
    link.href = event.url;
    paragraph.innerHTML = `${event.title} : `;
    paragraph.appendChild(link);
    document.body.appendChild(paragraph);
}


const fetchEvent = (eventType) => {
    //the eventType argument is a event category. it throws it on the end of the URL inside the curly braces. the userLocation 
    //braces are using the input elements value as it's source.
    //We need to add another argument either here or the event handler that takes the date info as well. baby steps. 
    fetch(`https://api.eventful.com/json/events/search?c=${eventType}&t=today&l=${userLocation.value}&within=20sory_order=popularity&page_size=60&app_key=QfJVpR8FLcNsHKLG`)
    .then(response => {
          console.log(response);
          return response.json();
      })
    .then(data => {
        data.events.event.map(item => createEventParagraph(item));
      })
      .catch(err => console.error(err));
        
}
//below is the event listener. I called the fetchEvent function a few times with various events as arguments.
//the argument it takes goes to the end of the URL inside the fetch function.
//so the fetchEvent("sports") callback for example throws the ${sports} at the end of the URl to designate a category.
//
userSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    if (userLocation.value !== "") {
        console.log('clicked')
        fetchEvent("music");
        fetchEvent("sports");
        fetchEvent("comedy");
        //fetchEvent("performing arts");

    } else {
        alert("enter a location");
    }

})
// (fetchEvent)();