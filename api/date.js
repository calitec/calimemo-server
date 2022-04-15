const express = require("express");
const db = require("../models");
const router = express.Router();
const { isLoggedIn } = require("./middlewares");
// puppeteer을 가져온다.
const puppeteer = require("puppeteer");
// cheerio를 가져온다.
const cheerio = require("cheerio");

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    const UserId = req.user.id;
    let { selectedDate, emotion, content } = req.body;
    if (!emotion) res.status(400).end("no emotion");
    if (!content || "") res.status(400).end("no content");
    const date = db.Date.create({ selectedDate, emotion, content, UserId });
    res.status(201).json(date);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const UserId = req.user.id;
    const date = await db.Date.findAll({
      where: {
        UserId,
      },
    });
    res.json(date);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    const UserId = req.user.id;
    where = {
      selectedDate: id,
      UserId,
    };
    if (!id) return res.status(400).json({ error: "no id" });
    const date = await db.Date.findOne({
      where,
    });

    res.json(date);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.put("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    let body = req.body;
    if (!id) return res.status(400).json({ error: "no id" });
    const date = await db.Date.findOne({
      where: { selectedDate: id },
    });
    if (!date) return res.status(404).json({ error: "no date" });
    Object.keys(body).forEach((key) => {
      let value = body[key];
      if (typeof value === "string") value = value.trim();
      if (key === "content" || key === "emotion" || value) {
        date[key] = value;
      }
    });
    await date.save();
    res.json(date);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete("/:id", isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.Date.destroy({ where: { selectedDate: id } });
    res.status(204).end();
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
