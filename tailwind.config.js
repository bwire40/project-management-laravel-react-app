import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
 //  darkMode: "class",
 content: [
  "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
  "./storage/framework/views/*.php",
  "./resources/views/**/*.blade.php",
  "./resources/js/**/*.jsx",
  "./resources/js/**/*.js",
  "./node_modules/flowbite/**/*.js",
  flowbite.content(),
 ],

 theme: {
  extend: {
   fontFamily: {
    sans: ["Figtree", ...defaultTheme.fontFamily.sans],
   },
  },
 },

 plugins: [forms, require("flowbite/plugin"), flowbite.plugin()],
};
