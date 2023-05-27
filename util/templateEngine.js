import fs from "fs";

function readPage(pagePath) {
  return fs.readFileSync(pagePath).toString();
}

function renderPage(page, config = {}) {
  const navbar = fs
    .readFileSync("./public/components/navbar.html")
    .toString()
    .replace("$TAB_TITLE", config.tabTitle || "Friendsbook")
    .replace("$CSS_LINK", config.cssLink || "")
    .replace("$SCRIPT_LINK", config.scriptLink || "");
  const footer = fs
    .readFileSync("./public/components/footer.html")
    .toString()
    .replace("$FOOTER_YEAR", `© ${new Date().getFullYear()}`);

  return navbar + page + footer;
}

function renderHomePage(page, config = {}) {
  const navbar = fs
    .readFileSync("./public/components/navbar.html")
    .toString()
    .replace("$TAB_TITLE", config.tabTitle || "Friendsbook")
    .replace("$CSS_LINK", config.cssLink || "")
    .replace("$SCRIPT_LINK", config.scriptLink || "");

  return navbar + page;
}

export default {
  renderPage,
  renderHomePage,
  readPage,
};
