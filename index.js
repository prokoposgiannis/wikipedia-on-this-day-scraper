import puppeteer from 'puppeteer';
import { eventHandler } from './eventHandler.js'
const browser = await puppeteer.launch();
// import { test } from "./test.js"

const monthNames = [
    ['Ιανουαρίου', 31], ['Φεβρουαρίου', 29], ['Μαρτίου', 31], ['Απριλίου', 30], ['Μαΐου', 31], ['Ιουνίου', 30],
    ['Ιουλίου', 31], ['Αυγούστου', 31], ['Σεπτεμβρίου', 30], ['Οκτωβρίου', 31], ['Νοεμβρίου', 30], ['Δεκεμβρίου', 31]
];

async function runEventHandlers(fromMonth, toMonth) {
  for (let month = fromMonth; month < toMonth; month++) {
    for (let day = 1; day <= 5; day++) {
      let date = `https://el.wikipedia.org/api/rest_v1/page/html/${day}_${monthNames[month][0]}`;
      let dateId = `${day > 9 ? day : `0${day}`}${month > 8 ? month+1 : `0${month+1}`}`;
      eventHandler(date, dateId, browser)
    }
  }
}

runEventHandlers(0,1);











