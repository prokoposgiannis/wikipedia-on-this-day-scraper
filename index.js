'use strict';

import puppeteer from 'puppeteer';

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

        return content.slice(24, 25)[0];
      });
    });
  });

  async function imageGetter (url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate to the desired webpage
    await page.goto(`"${url}"`);

    // Extract the src attribute of the first <img> tag
    const firstImgSrc = await page.evaluate(() => {
        const firstImg = document.querySelector('img');
        if (firstImg) {
            console.log(firstImg.src)
            return firstImg.src;
        }
        return null;
    });

    // Output the src of the first <img> tag
    console.log(firstImgSrc ? `First image src: ${firstImgSrc}` : 'No <img> tag found');

    // Close the browser
    await browser.close();
  }

  async function eventModifier (element) {
    let eventData = {
      anchor: "No href",
      year: "No year",
      text: "No text",
      id: 0,
    };
    let dateGranted = false;
    let anchorGranted = false;
    let idCounter = 0;
    const eventAllTexts= [];
    
    element.forEach((el) => {
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
      }
      else if (el.type === "text") {
        eventAllTexts.push(el.text);
      }
      eventData.text = eventAllTexts.join("").slice(2);
      eventData.id = idCounter++;
    })
    return eventData;
  }
  

  const eventsCompleted = allEvents.forEach(el => {
    eventModifier(el)
  })

  // console.log(allEvents.slice(24, 25)[0]);
  await browser.close();
};

if (process.argv[2]) {
  main(`https://el.wikipedia.org/wiki/${process.argv[2]}`);
} else {
  console.warn("Δεν καταχώρησες ημερομηνία. Προχωράω με την default: 20/08.");
  main('https://el.wikipedia.org/wiki/20_Αυγούστου');
}