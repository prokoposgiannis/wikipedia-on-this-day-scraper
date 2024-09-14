export const imageGetter = async (url, browser) => {
    const page = await browser.newPage();

    try {
      await page.goto(url);      
    } catch (error) {
      return "https://el.wikipedia.org/static/images/footer/wikimedia-button.svg"
    } 


    const imgSrc = await page.evaluate(() => {
        const allImgs = document.querySelectorAll('img');
        const notUsableImageLinks = [
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/WMA_button2b.png/17px-WMA_button2b.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Question_book-new.svg/50px-Question_book-new.svg.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Commons-logo.svg/12px-Commons-logo.svg.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Commons-logo.svg/40px-Commons-logo.svg.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/WMA_button2b.png/17px-WMA_button2b.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Semi-protection-shackle.svg/20px-Semi-protection-shackle.svg.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Symbol_support_vote.svg/19px-Symbol_support_vote.svg.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Ambox_wikify.svg/40px-Ambox_wikify.svg.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Tango-nosources.svg/40px-Tango-nosources.svg.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Icono_de_traducci%C3%B3n.svg/38px-Icono_de_traducci%C3%B3n.svg.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Ambox_scales.svg/40px-Ambox_scales.svg.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Sound-icon.svg/20px-Sound-icon.svg.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Wiki_letter_w.svg/30px-Wiki_letter_w.svg.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Edit-clear.svg/40px-Edit-clear.svg.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Wiktionary-logo-el-without-text.svg/16px-Wiktionary-logo-el-without-text.svg.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Wiktionary-logo.svg/40px-Wiktionary-logo.svg.png"
        ]

        let imageIndex = 3;
        
        while (notUsableImageLinks.includes(allImgs[imageIndex].src)) {
          imageIndex++;
        }

        return allImgs.length >= imageIndex ? allImgs[imageIndex].src : null;
    });

    await page.close(); 
    return imgSrc || "https://el.wikipedia.org/static/images/footer/wikimedia-button.svg"; 
  };
