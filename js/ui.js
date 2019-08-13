class UI {
     constructor() {
          // App initialization
          this.init();
     }
     init() {
          //display categories in <select>
          this.printCategories();

          // Select the results
          this.result = document.getElementById('result');
     }
     // Display events from the API
     displayEvents(events) {
          console.log(events)
          // Build the template
          let HTMLTemplate = '';

          // Loop events and print the result
          events.forEach(eventInfo => {
               let str = new String(eventInfo.description.text);
               HTMLTemplate += `
                    <div class="col-md-4 mt-4 border">
                         <div class="card-body">
                              <img class="img-fluid mb-2" src="${eventInfo.logo !== null ? eventInfo.logo.url : ''}">
                         </div>
                         <div class="card-body">
                              <div class="card-text">
                                   <h4 class="text-center card-title">${eventInfo.name.text}</h4>
                                   <p class="lead text-info">Event Information: </p>
                                   <p>${str.length >= 200 ? str.substring(0, 200) : str}...</p>
                                   <span class="badge badge-primary">Capacity: ${eventInfo.capacity == 'null' ? eventInfo.capacity : 'No data ' }</span>
                                   <span class="badge badge-secondary">Date & Time: ${eventInfo.start.local}</span>

                                   <a href="${eventInfo.url}" target="_blank" class="btn btn-primary btn-block mt-4">Get Tickets</a>
                              </div>
                         </div>
                    </div>
               `;

          });
          this.result.innerHTML = HTMLTemplate;

     }

     // Print the categories
     printCategories() {
          const categoriesList = eventbrite.getCategoriesAPI()
               .then(categories => {
                    // console.log(categories.categories);
                    const categoriesList = categories.categories;
                    const categoriesSelect = document.getElementById('category');
                    // Inserts categories into select element
                    categoriesList.forEach(category => {
                         // Create the option
                         const option = document.createElement('option');
                         option.value = category.id;
                         option.appendChild(document.createTextNode(category.name));
                         categoriesSelect.appendChild(option);
                    })
               })
               .catch(error => {
                    console.log(error);
               })
     }
     printMessage(message, className) {
          // Create a div
          const div = document.createElement('div');
          div.className = className;
          // add the text
          div.appendChild(document.createTextNode(message));

          // Insert into the HTML
          const searchDiv = document.querySelector('#search-events');
          searchDiv.appendChild(div);

          // Remove the alert after 3 seconds
          setTimeout(() => {
               this.removeMessage();
          }, 3000);
     }
     // Remove the message
     removeMessage() {
          const alert = document.querySelector('.alert');
          if (alert) {
               alert.remove();
          }
     }
}