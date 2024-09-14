import puppeteer from 'puppeteer';
import { eventHandler } from './eventHandler.js'
const browser = await puppeteer.launch();

const monthNames = [
    ['Ιανουαρίου', 31], ['Φεβρουαρίου', 29], ['Μαρτίου', 31], ['Απριλίου', 30], ['Μαΐου', 31], ['Ιουνίου', 30],
    ['Ιουλίου', 31], ['Αυγούστου', 31], ['Σεπτεμβρίου', 30], ['Οκτωβρίου', 31], ['Νοεμβρίου', 30], ['Δεκεμβρίου', 31]
];

async function runEventHandlers(fromMonth, toMonth) {
  for (let month = fromMonth-1; month < toMonth-1; month++) {
    for (let day = 1; day <= monthNames[month][1]; day++) {
      let date = `https://el.wikipedia.org/api/rest_v1/page/html/${day}_${monthNames[month][0]}`;
      let dateId = `${day > 9 ? day : `0${day}`}${month > 8 ? month+1 : `0${month+1}`}`;
      console.log("Initiating date:", dateId);
      // await eventHandler(date, dateId, browser)
      console.log("Done with date:", dateId);
    }
  }
}

// await runEventHandlers(2,3);

await eventHandler("https://el.wikipedia.org/api/rest_v1/page/html/13_Σεπτεμβρίου", "1309", browser)

await browser.close();
// console.log('Months have been uploaded');
// process.exit(0);












