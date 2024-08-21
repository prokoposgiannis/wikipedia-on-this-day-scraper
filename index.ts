'use strict'

import puppeteer, {Browser, Page} from 'puppeteer';

const main = async (url:string): Promise<void> => {
  const browser: Browser = await puppeteer.launch();
  const page: Page = await browser.newPage();
  await page.goto(url);

  const allLists : string[][] = await page.evaluate(()=> {
    const lists = document.querySelectorAll("ul");

    return Array.from(lists).map((list)=> {
      const listItems = Array.from(list.querySelectorAll("li"));
      return listItems.map((item)=> item.textContent || "");
    })
  })
  console.log(allLists.slice(24,25)[0]);
  await browser.close();
}

const url:string = `https://el.wikipedia.org/wiki/${url}`

if (process.argv[2]) {
  main(`https://el.wikipedia.org/wiki/${process.argv[2]}`)
} else {
  console.warn("Δεν καταχώρησες ημερομηνία. Προχωράω με την default: 20/08.")
  main('https://el.wikipedia.org/wiki/20_Αυγούστου')
}

