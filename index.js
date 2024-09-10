import { eventHandler } from './eventHandler.js'

// const monthNames = [
//     ['Ιανουαρίου', 31], ['Φεβρουαρίου', 29], ['Μαρτίου', 31], ['Απριλίου', 30], ['Μαΐου', 31], ['Ιουνίου', 30],
//     ['Ιουλίου', 31], ['Αυγούστου', 31], ['Σεπτεμβρίου', 30], ['Οκτωβρίου', 31], ['Νοεμβρίου', 30], ['Δεκεμβρίου', 31]
// ];

// Asynchronous loop function
// async function runEventHandlers() {
//   for (let month = 0; month < 2; month++) {
//     for (let day = 1; day <= 2; day++) {
//       // Await the eventHandler function in each iteration
//       let date = `https://el.wikipedia.org/wiki/${day}_${monthNames[month][0]}`;
//       let dateId = `${day}_${monthNames[month]+1}`;
//       eventHandler(date, dateId)
//       console.log(date, "+", dateId);
//     }
//   }
// }

// Call the asynchronous function
// runEventHandlers();

eventHandler("https://el.wikipedia.org/wiki/2_Ιανουαρίου", "0000");