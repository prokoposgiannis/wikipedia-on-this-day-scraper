'use strict';

import puppeteer from 'puppeteer';
import { setDoc, doc, db } from './firebase.js'

const main = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const allEvents = await page.evaluate(() => {
    const lists = document.querySelectorAll("ul");

    return Array.from(lists).map((list) => {
      const listItems = Array.from(list.querySelectorAll("li"));
      return listItems.map((item) => {
        const content = [];

        item.childNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.tagName.toLowerCase() === 'a') {
              content.push({
                type: 'anchor',
                href: node.href,
                text: node.innerText,
              });
            } else if (node.tagName.toLowerCase() === 'i') {
              const firstChild = node.firstChild;
              const type = firstChild && firstChild.tagName && firstChild.tagName.toLowerCase() === 'a' ? "i-anchor" : "i-text";
              if (type === "i-anchor") {
                content.push({
                  type: 'i-anchor',
                  href: firstChild.href,
                  text: firstChild.innerText,
                });
              } else if (type === "i-text")  {
                content.push({
                type: type,
                text: node.innerText,
              });
            }
            }
          } else if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            if (text.length > 0) {
              content.push({
                type: 'text',
                text: text,
              });
            }
          }
        });

        return content;
      });
    });
  });

  const imageGetter = async (url) => {
    const page = await browser.newPage();
    await page.goto(url);

    const secondImgSrc = await page.evaluate(() => {
        const allImgs = document.querySelectorAll('img');
        const mapImg  = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/WMA_button2b.png/17px-WMA_button2b.png"
        const mapImg2 = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Question_book-new.svg/50px-Question_book-new.svg.png"
        const mapImg3 = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Commons-logo.svg/12px-Commons-logo.svg.png"
        const mapImg4 = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Commons-logo.svg/40px-Commons-logo.svg.png"
        if (allImgs[3].src !== mapImg) {
          return allImgs.length >= 5 ? allImgs[4].src : null;
        } else if (allImgs[3].src !== mapImg2) {
          return allImgs.length >= 5 ? allImgs[4].src : null;
        } else if (allImgs[3].src !== mapImg3) {
          return allImgs.length >= 5 ? allImgs[4].src : null;
        } else if (allImgs[3].src !== mapImg4) {
          return allImgs.length >= 5 ? allImgs[4].src : null;
        } else {
          return allImgs.length >= 4 ? allImgs[3].src : null;
        }
    });

    await page.close(); 
    return secondImgSrc || "No ImageUrl"; 
  };

  let idCounter = 0;

  async function eventModifier(element) {
    if (!element) {
      return null;  
    }

    let eventData = {
      anchor: "No href",
      imageUrl: "No ImageUrl",
      year: "No year",
      text: "No text",
      id: 0,
      tags: []
    };

    let dateGranted = false;
    let anchorGranted = false;
    const eventAllTexts = [];
    eventData.tags = element;

    element.forEach((el) => {
      if (el && el.type) {  
        if (el.type === "anchor") {
          if (!dateGranted) {
            dateGranted = true;
            eventData.year = el.text;
          } else if (dateGranted && !anchorGranted) {
            anchorGranted = true;
            eventData.anchor = el.href ?? "No href";
            eventAllTexts.push(el.text);
          } else if (dateGranted && anchorGranted) {
            eventAllTexts.push(el.text);
          }
        } else if (el.type === "text") {
          eventAllTexts.push(el.text);
        }
        eventData.text = eventAllTexts.join("").slice(2);
      }
    });
    
    eventData.id = idCounter++; 
    eventData.imageUrl = await imageGetter(eventData.anchor);
    return eventData;
  }

  const eventsCompleted = await Promise.all(allEvents.slice(24, 25)[0].map(el => eventModifier(el)));

  async function eventUploader(day, list) {
    let eventNumber = 1;
    for (const event of list) {
      await setDoc(doc(db, "events", `${day}${eventNumber > 9 ? "":"0"}${eventNumber}`), {
        day,
        anchor: event.anchor,
        imageUrl: event.imageUrl,
        year: event.year,
        text: event.text,
        id: event.id,
        tags: event.tags,
      });
      eventNumber++;
    }
  }

  eventUploader("2008", eventsCompleted)

  await browser.close();
};

if (process.argv[2]) {
  main(`https://el.wikipedia.org/wiki/${process.argv[2]}`);
} else {
  console.warn("Δεν καταχώρησες ημερομηνία. Προχωράω με την default: 20/08.");
  main('https://el.wikipedia.org/wiki/20_Αυγούστου');
}