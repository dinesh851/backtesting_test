
var optionMenu = document.getElementById("option-menu");
var optionMenu1 = document.getElementById("option-menu1");

function populate(year) {
    var jsonFile = "src/fill_date/" + year + ".json";

    // Fetch the JSON file using the fetch API
    fetch(jsonFile)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            var options = "";
            data.forEach(date => {
                options += "<option value='" + date + "'>" + date + "</option>";
               
            });
            optionMenu1.innerHTML = options;
        })
        .catch(error => {
            console.error("Failed to fetch JSON file:", error);
        });
        
}

// Display JSON data for the default year (2018) on page load
var defaultYear = "2018";
populate(defaultYear);

optionMenu.addEventListener("change", function() {
    var selectedYear = optionMenu.value;
    populate(selectedYear);
});
   

 

function changeOption(offset) {
    var currentIndex = optionMenu1.selectedIndex;
    var newIndex = currentIndex + offset;
  
    // Prevent going below zero (minimum index)
    newIndex = Math.max(0, newIndex);
  
    optionMenu1.selectedIndex = newIndex;
  }
  
  
  