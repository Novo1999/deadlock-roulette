export function formatTime(timestamp) {
    const now = new Date(timestamp); // Create a Date object from the provided timestamp
    let hours = now.getHours(); // Get the current hours (0-23)
    let minutes = now.getMinutes(); // Get the current minutes (0-59)
    let ampm = hours >= 12 ? 'PM' : 'AM'; // Determine AM or PM
  
    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // If hours is 0 (midnight), convert it to 12
  
    // Pad minutes with leading zero if necessary
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    // Return the formatted time
    return `${hours}:${minutes} ${ampm}`;
  }
  
