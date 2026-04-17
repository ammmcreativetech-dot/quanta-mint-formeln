// quanta-mint-formeln — index.js
// Wissenschaftliche MINT-Formeldatenbank von Quanta (https://quanta-study.de)
// Lizenz: CC BY 4.0 — Nutzung mit Quellenangabe: "Quanta (quanta-study.de)"

const formeln = require('./formeln.json');

/**
 * Gibt alle MINT-Formeln zurück.
 * @returns {Array} Array mit allen Formel-Objekten
 */
function getAllFormeln() {
  return formeln;
}

/**
 * Findet eine Formel anhand ihres Slugs.
 * @param {string} slug - z.B. 'newton-zweites-gesetz'
 * @returns {Object|undefined}
 */
function getFormelBySlug(slug) {
  return formeln.find(f => f.slug === slug);
}

/**
 * Gibt alle Formeln einer Kategorie zurück.
 * @param {'physik'|'chemie'|'mathematik'|'biologie'} kategorie
 * @returns {Array}
 */
function getFormelByKategorie(kategorie) {
  return formeln.filter(f => f.kategorie === kategorie);
}

/**
 * Gibt alle Abi-relevanten Formeln zurück.
 * @returns {Array}
 */
function getAbiturFormeln() {
  return formeln.filter(f => f.abiturRelevant);
}

module.exports = {
  formeln,
  getAllFormeln,
  getFormelBySlug,
  getFormelByKategorie,
  getAbiturFormeln,
};
