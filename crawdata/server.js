const cheerio = require("cheerio");
const request = require("request-promise");
const fs = require("fs");

request(
  "https://ananas.vn/product-list/?gender=men",
  (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      let product = [];

      $(".col-xs-6 ").each((index, el) => {
        const name = $(el).find(".caption .name").text();
        const type = $(el).find(".caption .type").text();
        const color = $(el).find(".caption .color").text();
        const price = $(el).find(".caption .price").text();
        const slitPrice = price.replace(/[^0-9]/g, "");
        const images = $(el)
          .find(".cont-item a img")
          .map((i, img) => $(img).attr("src"))
          .get();

        const a = $(el)
          .find(".cont-item a")
          .map((i, link) => $(link).attr("href"))
          .get();

        const descriptionPromises = a.map((url) =>
          request(url).then((html) => {
            const $ = cheerio.load(html);
            return $(".panel-body .TypographyPresentation")
              .map((i, el) => $(el).text())
              .get();
          })
        );

        Promise.all(descriptionPromises).then((descriptions) => {
          const productItem = {
            name,
            type,
            color,
            price: slitPrice,
            images,
            description: descriptions,
          };
          product.push(productItem);
          let jsonData = JSON.stringify(product, null, 2);

          fs.writeFile("product.json", jsonData, (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Data written to file");
            }
          });
        });
      });
    } else {
      console.log(error);
    }
  }
);
