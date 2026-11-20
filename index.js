'use strict';
// Generated compact reference helpers; no application, article or provider dependency.
const formeln = require('./formeln.json');
const getAllFormeln = () => formeln;
const getFormelBySlug = slug => formeln.find(formel => formel.slug === slug);
const getFormelByKategorie = kategorie => formeln.filter(formel => formel.kategorie === kategorie);
const getFormelByKapitel = chapterId => formeln.filter(formel => formel.kapitel === chapterId);
const getFormelByUnterkategorie = unterkategorie => formeln.filter(formel => formel.unterkategorie === unterkategorie);
const getFormelByBildungsniveau = level => formeln.filter(formel => formel.bildungsniveaus.includes(level));
const getAbiturFormeln = () => formeln.filter(formel => formel.abiturRelevant);
module.exports = {formeln, getAllFormeln, getFormelBySlug, getFormelByKategorie, getFormelByUnterkategorie, getFormelByKapitel, getFormelByBildungsniveau, getAbiturFormeln};
