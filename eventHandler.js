'use strict';
import { eventModifier } from './eventModifier.js';
import { eventUploader } from './eventUploader.js';

export const eventHandler = async (url, dateId, browser) => {
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

  const eventsCompleted = await Promise.all(allEvents.slice(0,1)[0].map(el => eventModifier(el, browser)));

  // console.log(eventsCompleted)

  // console.log(allEvents.slice(0,1)[0])

  eventUploader(dateId, eventsCompleted)

  await browser.close();
};
