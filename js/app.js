// Instantiate both classes

const eventbrite = new EventBrite();
const ui = new UI();


// Listener for the submit button
document.getElementById('submitBtn').addEventListener('click', (e) => {
     e.preventDefault();

     // Get values from form
     const eventName = document.getElementById('event-name').value;
     const category = document.getElementById('category').value;

     // console.log(eventName, category)

     if (eventName != '') {
          // Query Event Brite API
          eventbrite.queryAPI(eventName, category)
               .then(events => {
                    // Check for events
                    const eventsList = events.events;
                    if(eventsList.length > 0) {
                         // Print the events
                         ui.displayEvents(eventsList);
                    } else {
                         // There are no events, print a message
                         ui.printMessage('No results found', 'text-center alert alert-danger mt-4');
                    }
               });
     } else {
          // Print a message
          ui.printMessage('Add an Event or City', 'alert alert-danger mt-4 text-center');
     }
})