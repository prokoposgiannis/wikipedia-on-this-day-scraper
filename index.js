'use strict';

import puppeteer from 'puppeteer';

const main = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const allLists = await page.evaluate(() => {
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

  console.log(allLists.slice(24, 25)[0]);
  await browser.close();
};

if (process.argv[2]) {
  main(`https://el.wikipedia.org/wiki/${process.argv[2]}`);
} else {
  console.warn("Δεν καταχώρησες ημερομηνία. Προχωράω με την default: 20/08.");
  main('https://el.wikipedia.org/wiki/20_Αυγούστου');
}