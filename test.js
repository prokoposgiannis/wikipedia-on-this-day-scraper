'use strict';
import puppeteer from 'puppeteer';

// const url = 'https://el.wikipedia.org/api/rest_v1/page/html/20_Αυγούστου'
// const tagId = "Γεγονότα"

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Go to the page you want to scrape
  await page.goto("https://el.wikipedia.org/wiki/20_Αυγούστου");

  // Specify the ID of the element where you want to start
  const specificId = '#Γεγονότα'; 

  // Traverse up the DOM tree and collect all sibling, ancestor, and ancestor-sibling elements
  const allTags = await page.evaluate((specificId) => {
    // Find the element with the specified ID
    const startElement = document.querySelector(specificId);
    let currentElement = startElement;
    let tags = [];

    // Walk up the DOM tree until reaching the root (html element)
    while (currentElement) {
      // Get all sibling elements of the current element
      const siblings = Array.from(currentElement.parentElement?.children || []).filter(el => el !== currentElement);

      // Add the tag names of the current element's siblings
      siblings.forEach(sibling => {
        tags.push(sibling.tagName);
        // Optionally, you could push the entire sibling element here for further inspection
      });

      // Move up to the parent element and repeat the process
      currentElement = currentElement.parentElement;

      if (currentElement) {
        tags.push(currentElement.tagName); // Add the parent tag itself
      }
    }

    // Return the collected tags
    return tags;
  })

  console.log(allTags);

  await browser.close();
})();



