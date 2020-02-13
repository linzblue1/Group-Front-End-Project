//testing the event API with fetch.
"use strict"
const token = `8lCUPhaUzrG6-nCVIk9NyUlwqpXxWXSJvkq_fDA5`;
const userLocation = document.getElementById("userLocation");
//going to make the commented out variable below the user inputed date. it will be a text field just like city is?
const userSubmit = document.getElementById("userSubmit");

const fetchEvent = (eventType) => {
    //the eventType argument is a event category. it throws it on the end of the URL inside the curly braces. the userLocation 
    //braces are using the input elements value as it's source.
    //We need to add another argument either here or the event handler that takes the date info as well. baby steps. 
    fetch(`https://api.eventful.com/json/events/search?c=${eventType}&t=today&l=${userLocation.value}&within=20page_size=30&app_key=QfJVpR8FLcNsHKLG`)
    .then(response => {
          console.log(response);
          return response.json();
      })
    .then(data => {
        console.log(data.events);
        const dataArray = [];
        //since the data is returned as an object, you can use a for...of loop to iterate over it and push it to an actual array.
        for (let item of data.events.event) {
            dataArray.push(`${item.title}`);

        }
        //data.events.event.map((item, index) => dataArray.push(item));
        //data.results.map(item => dataArray.push(item))
        //creating an 'p' element and populating it with text from the array
          let paragraph = document.createElement("p");
          paragraph.innerHTML = dataArray;
          document.body.appendChild(paragraph);
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
        //fetchEvent("music");
        //fetchEvent("concerts");
        fetchEvent("comedy");
        //fetchEvent("performing arts");

    } else {
        alert("enter a location");
    }

})
// (fetchEvent)();