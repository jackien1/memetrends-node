const googleTrends = require("google-trends-api");

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

const search = async () => {
  const ourDate = new Date();
  const pastDate = ourDate.getDate() - 30;
  ourDate.setDate(pastDate);

  const results = memes.map(async meme => {
    const result = await googleTrends.interestOverTime({
      keyword: meme,
      startTime: ourDate
    });
    return JSON.parse(result);
  });

  const formattedResults = await Promise.all(results);
  console.log(formattedResults);
};

search();
