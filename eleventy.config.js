import { feedPlugin } from "@11ty/eleventy-plugin-rss";
import CleanCSS from "clean-css";
import { DateTime } from "luxon";

export default function(eleventyConfig) {
    // Return your Object options:

    eleventyConfig.addPlugin(feedPlugin, {
      type: "atom",
      outputPath: "/feed.xml",
      collection: {
        name: "posts",
        limit: 0,
      },
      metadata: {
        language: "en",
        title: "tedmehl.me",
        subtitle: "Playground of half-baked ideas.",
        base: "https://tedmehl.me",
        author: {
          name: "Ted",
        }
      }
    })


    eleventyConfig.addFilter("cssmin", function(code) {
        return new CleanCSS({}).minify(code).styles;
    });

    eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		  // Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		  return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "LLLL dd, yyyy");
	  });

    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    eleventyConfig.addPassthroughCopy("./src/fonts");
    eleventyConfig.addPassthroughCopy('./favicon.png');
    eleventyConfig.addPassthroughCopy('./CNAME');
    eleventyConfig.addPassthroughCopy('./src/sw.js');
    eleventyConfig.addPassthroughCopy('./src/images');

    // Only process pages that don't have a draft variable set to true or are after today's date.
    eleventyConfig.addPreprocessor("drafts", "md", (data) => {
      // Account for central time adjustment in date comparison. Otherwise, dates act as midnight UTC which is 6 p.m. CT the previous day.
      let adjustedDate = Date.parse(data.page.date) + 18000000;
      if((data.draft && process.env.ELEVENTY_RUN_MODE === "build") || (adjustedDate > Date.now() && process.env.ELEVENTY_RUN_MODE === "build")) {
        return false;
      }
    });

    return {
      dir: {
        input: "src",
        output: "public",
        includes: "../_includes"
      }
    }
  };