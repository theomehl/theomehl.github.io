import CleanCSS from "clean-css";
import { DateTime } from "luxon";

export default function(eleventyConfig) {
    // Return your Object options:

    eleventyConfig.addFilter("cssmin", function(code) {
        return new CleanCSS({}).minify(code).styles;
    });

    eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(dateObj, { zone: zone || "utc" }).toFormat(format || "LLLL dd, yyyy");
	});

    eleventyConfig.addPassthroughCopy("./src/fonts");
    eleventyConfig.addPassthroughCopy('./favicon.png');
    eleventyConfig.addPassthroughCopy('./CNAME');

    // Only process pages that don't have a draft variable set to true or are after today's date.
    eleventyConfig.addPreprocessor("drafts", "*", (data) => {
      // Account for central time adjustment in date comparison. Otherwise, dates act as midnight UTC which is 6 p.m. CT the previous day.  
      let adjustedDate = DateTime.fromJSDate(data.page.date, {zone: "utc"}).toFormat("yyyy-LL-dd 00:00");      
      if((data.draft && process.env.ELEVENTY_RUN_MODE === "build") || (Date.parse(adjustedDate) > Date.now() && process.env.ELEVENTY_RUN_MODE === "build")) {
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