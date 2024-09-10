import { imageGetter } from "./imageGetter.js";
export async function eventModifier(element) {
    let idCounter = 0;

    // console.log(element)
    if (!element) {
      return null;  
    }

    let eventData = {
      anchor: "No href",
      imageUrl: "No ImageUrl",
      year: "No year",
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

  