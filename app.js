/**
 * SmartBroker – App Entry Point
 * Orquesta Model → View → Controller.
 * Este es el único archivo que los une.
 */

import AppModel      from "./models.js";
import Views         from "./views.js";
import Controllers   from "./controllers.js";

const App = {
  init() {
    const { brand, nav, hero, services, about, contact, sitemap, spiderMenu } = AppModel;

    this._applyBrandColors(brand.colors);

    const root = document.getElementById("app");
    if (!root) { console.error("Missing #app mount point"); return; }

    root.innerHTML = [
      Views.renderHeader(brand, nav),
      '<main id="main-content">',
        Views.renderHero(hero),
        Views.renderServices(services),
        Views.renderAbout(about),
        Views.renderAseguradoras(),
        Views.renderContact(contact),
        Views.renderSitemap(brand, sitemap),
      '</main>',
      Views.renderFooter(brand, sitemap, contact),
      Views.renderDataModal(),
      Views.renderServiceModal(),
    ].join("");

    Controllers.init();
    Controllers.initSpiderMenu(spiderMenu);

    document.getElementById("skip-link")?.addEventListener("click", (e) => {
      e.preventDefault();
      document.getElementById("main-content")?.focus();
    });
  },

  _applyBrandColors(colors) {
    const root = document.documentElement;
    root.style.setProperty("--primary",       colors.primary);
    root.style.setProperty("--accent",        colors.accent);
    root.style.setProperty("--accent-alt",    colors.accentAlt);
    root.style.setProperty("--accent-light",  colors.accentLight);
    root.style.setProperty("--light",         colors.light);
    root.style.setProperty("--color-text",    colors.text);
    root.style.setProperty("--color-muted",   colors.muted);
  },
};

document.addEventListener("DOMContentLoaded", () => {
  try {
    App.init();
  } catch (error) {
    console.error("App init falló:", error);
  }
});
