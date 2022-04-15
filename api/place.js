const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("./middlewares");
const db = require("../models");

// puppeteer을 가져온다.
const puppeteer = require("puppeteer");
// cheerio를 가져온다.
const cheerio = require("cheerio");

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });

    const page = await browser.newPage();
    const url =
      "https://www.google.com/travel/things-to-do/see-all?g2lb=4597339%2C4667459%2C4644488%2C4596364%2C4605861%2C4419364%2C4641139%2C2502548%2C2503781%2C4624411%2C4518326%2C2503771%2C4401769%2C4306835%2C4640247%2C4258168%2C4371335%2C4317915%2C4270442%2C4679298%2C4284970%2C4291517%2C4270859&hl=ko-KR&gl=kr&ssta=1&dest_mid=%2Fm%2F06qd3&dest_state_type=sattd&dest_src=ts&q=%ED%95%9C%EA%B5%AD%20%EA%B4%80%EA%B4%91%20%EB%AA%85%EC%86%8C%20top%2010&sa=X&ved=2ahUKEwiK9Pm1hdn0AhXcr1YBHTKMBBMQuL0BegQIAxA-&rf=EhQKCC9tLzBiM3lyEgbtlbTrs4AoAQ#ttdm=37.523965_127.473897_8&ttdmf=%252Fm%252F043pdws";

    await page.goto(url);
    const content = await page.content();
    const $ = cheerio.load(content);
    const lists = $(
      "#yDmH0d > c-wiz.zQTmif.SSPGKf > div > div.lteUWc > div > c-wiz > div > div > div.zpbwad.mNY2uf > div:nth-child(3) > c-wiz > div > div > div > div.kQb6Eb > div"
    );

    let result = [];

    lists.each((index, list) => {
      const img = $(list)
        .find("div > div > div.Ld2paf > div.kXlUEb > easy-img > img")
        .attr("data-src");

      const name = $(list)
        .find("div > div > div.Ld2paf > div.GwjAi > div.rbj0Ud.AdWm1c > div")
        .text();
      const description = $(list)
        .find("div > div > div.Ld2paf > div.GwjAi > div.nFoFM")
        .text();
      const crawled = {
        index,
        img,
        name,
        description,
      };
      result = [...result, crawled];
    });
    browser.close();

    // function recursion(index) {
    //   if (result[index].img !== undefined) {
    //     result = result[index];
    //     return res.status(200).json(result);
    //   }
    //   return recursion(Math.floor(Math.random() * result.length));
    // }
    // recursion(Math.floor(Math.random() * result.length));

    const filtered = result.filter((item) => {
      if (item.img) {
        return item;
      }
    });

    res.status(200).json(filtered[Math.floor(Math.random() * filtered.length)]);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
