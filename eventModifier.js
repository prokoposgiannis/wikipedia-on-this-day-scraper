import { imageGetter } from "./imageGetter.js";
export async function eventModifier(element, browser) {
    let idCounter = 0;

    if (!element) {
      return null;  
    }

    let eventData = {
      anchor: "No href",
      imageUrl: "No ImageUrl",
      year: "No year",
      id: 0,
      tags: [],
      text: "no text"
    };

    let dateGranted = false;
    let anchorGranted = false;
    const eventAllTexts = [];
    eventData.tags = element;

    element.forEach((el) => {

      if (el && el.type) {  
        if (eventData.tags.length === 1 && el.type === "text") {
          eventData.year = el.text.slice(0,4)
          eventData.text = el.text.slice(7);
        }

        else if (el.type === "anchor") {
          if (!dateGranted) {
            dateGranted = true;
            eventData.year = el.text;
          } else if (dateGranted && !anchorGranted) {
            anchorGranted = true;
            eventData.anchor = el.href ?? "https://el.wikipedia.org/wiki/Βικιπαίδεια";
            eventAllTexts.push(el.text);
          } else if (dateGranted && anchorGranted) {
            eventAllTexts.push(el.text);
          }
        } else if (el.type === "text") {
          eventAllTexts.push(el.text);
        }
      }
    });
    
    eventData.id = idCounter++; 
    eventData.imageUrl = await imageGetter(eventData.anchor, browser);


    return eventData;
  }

  