
$(document).ready(function() {
  // Add this function to dynamically populate the dropdowns
  function populateDropdowns() {
    // Define station values
    const stationsFrom = ["depot", "parichowk", "sector147"];
    const stationsTo = ["sector76", "sector51", "sector18"];

    // Populate "From Station" dropdown
    const fromDropdown = $('#fromStation');
    stationsFrom.forEach(station => {
      fromDropdown.append($('<option>', {
        value: station,
        text: station.charAt(0).toUpperCase() + station.slice(1) // Capitalize first letter
      }));
    });

    // Populate "To Station" dropdown
    const toDropdown = $('#toStation');
    stationsTo.forEach(station => {
      toDropdown.append($('<option>', {
        value: station,
        text: station.charAt(0).toUpperCase() + station.slice(1) // Capitalize first letter
      }));
    });
  }

  // Call the function to populate dropdowns when the script is loaded
  populateDropdowns();

  // Counter logic
  $('#plusBtn').click(function() {
    if (counterValue < 100) {
      counterValue++;
      updateCounter();
      updateFare();
    }
  });

  $('#minusBtn').click(function() {
    if (counterValue > 0) {
      counterValue--;
      updateCounter();
      updateFare();
    }
  });

  function updateCounter() {
    $('#counter').text(counterValue);
  }


  $('#resetBtn').click(function() {
    counterValue = 0;
    updateCounter();
    resetFare();
    resetDropdowns();
  });

  
  $('#calculateFareBtn').click(function() {
    updateFare();
  });

  function updateFare() {
    const fare = calculateFare();
    $('#ticketPriceBox').text(`Calculated Fare: ${fare} Rupees`);
  }

  function calculateFare() {
    const baseFare = 10;
    const fareIncrement = 40;
    return baseFare + counterValue * fareIncrement;
  }

  // Reset fare to initial value
  function resetFare() {
    $('#ticketPriceBox').text('');
  }

  // Confirm Booking button
  $('#bookingForm').submit(function(event) {
    event.preventDefault(); // Prevent the form from submitting
    const startingStation = $('#fromStation').val();
    const destinationStation = $('#toStation').val();
    alert(`Booking Confirmed from ${startingStation} to ${destinationStation}`);
  });

  // Reset dropdowns to default values
  function resetDropdowns() {
    $('#fromStation').val('depot');
    $('#toStation').val('sector76');
  }
});
  // Function to show notifications
function showNotification(message) {
  // Get the notification container
  var notificationContainer = document.getElementById("notificationContainer");

  // Create a new notification element
  var notificationElement = document.createElement("div");
  notificationElement.className = "notification";
  notificationElement.innerHTML = `<p>${getCurrentDateTime()}: ${message}</p>`;

  // Add the new notification to the container
  notificationContainer.appendChild(notificationElement);

  // Display only the top 3 notifications
  if (notificationContainer.children.length > 3) {
    notificationContainer.removeChild(notificationContainer.children[0]);
  }
}

  // Function to get the current date and time in a formatted string
  function getCurrentDateTime() {
    var currentDate = new Date();
    return currentDate.toLocaleString();
  }

  // Example usage (you can customize this based on your logic)
  // Call showNotification function when a certain event occurs
  // For example, when the form is submitted:
  document.getElementById("bookingForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting (for demonstration purposes)

    // Show a sample notification when the form is submitted
    showNotification("Route confirmed successfully!");
  });




