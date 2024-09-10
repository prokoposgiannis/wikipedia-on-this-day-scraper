import puppeteer from 'puppeteer';

export const imageGetter = async (url) => {
    // console.log("IMAGE GETTER--->", url)
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const secondImgSrc = await page.evaluate(() => {
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
          "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Icono_de_traducci%C3%B3n.svg/38px-Icono_de_traducci%C3%B3n.svg.png"
        ]

        let imageIndex = 3;
        
        while (notUsableImageLinks.includes(allImgs[imageIndex].src)) {
          imageIndex++;
        }

        return allImgs.length >= imageIndex ? allImgs[imageIndex].src : null;
    });

    await page.close(); 
    return secondImgSrc || "No ImageUrl"; 
  };
