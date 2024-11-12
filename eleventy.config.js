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

    eleventyConfig.addPreprocessor("drafts", "*", (data) => {
      // Only process pages who don't have a draft variable set to true or are after today's date.
      if((data.draft && process.env.ELEVENTY_RUN_MODE === "build") || (Date.parse(data.page.date) > Date.now() && process.env.ELEVENTY_RUN_MODE === "build")) {
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