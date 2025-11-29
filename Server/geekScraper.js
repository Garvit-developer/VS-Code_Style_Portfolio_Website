import axios from "axios";
import * as cheerio from "cheerio";


const PAGES_TO_SCRAPE = [
  "https://geektheo.com/",

];

async function scrapeGeekTheo() {
  const results = [];
  for (const url of PAGES_TO_SCRAPE) {
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);
      const text = $("p").map((i, el) => $(el).text()).get().join(" ");
      results.push(text);
    } catch (err) {
      console.error(`❌ Error scraping ${url}:`, err.message);
      results.push(""); // fallback to empty if fail
    }
  }
  return results;
}


export { scrapeGeekTheo };
