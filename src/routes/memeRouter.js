const googleTrends = require("google-trends-api");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200);
  res.send("Welcome to the Meme Route!");
});

router.get("/month", async (req, res) => {
  const memes = [
    "batman slapping robin meme",
    "distracted boyfriend meme",
    "drake hotline bling meme",
    "expanding brain meme",
    "left exit 12 off ramp meme",
    "mocking spongebob meme",
    "suprised pikachu meme",
    "two buttons meme"
  ];

  const ourDate = new Date();
  const pastDate = ourDate.getDate() - 30;
  ourDate.setDate(pastDate);

  const results = memes.map(async meme => {
    const result = await googleTrends.interestOverTime({
      keyword: meme,
      startTime: ourDate
    });

    let formatted = [];

    JSON.parse(result).default.timelineData.map(data => {
      formatted.push(data.value[0]);
    });

    return {
      formatted,
      meme: meme.substring(0, meme.length - 4),
      value: (formatted.reduce((a, b) => a + b, 0) / formatted.length).toFixed(
        2
      )
    };
  });

  const formattedResults = await Promise.all(results);
  return res.status(200).json(formattedResults);
});

module.exports = router;
