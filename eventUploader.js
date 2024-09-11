import { setDoc, doc, db } from './firebase.js'

export async function eventUploader(day, list) {
    let eventNumber = 1;
    for (const event of list) {
      await setDoc(doc(db, "events", `${day}${eventNumber > 9 ? "":"0"}${eventNumber}`), {
        day,
        anchor: event.anchor,
        imageUrl: event.imageUrl,
        year: event.year,
        id: event.id,
        tags: event.tags.slice(1),
      });
      eventNumber++;
    }
  }