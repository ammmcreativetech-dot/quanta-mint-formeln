/** Compact German formula references; schema 3.0.0. */
export type FormelFach = "physik" | "chemie" | "mathematik" | "biologie" | "astronomie" | "informatik" | "ingenieurwesen";
export type FormelKapitel = "astro-bahnen-gravitation" | "astro-entfernung-kosmologie" | "astro-sterne-strahlung" | "bio-biochemie-molekularbiologie" | "bio-biostatistik" | "bio-genetik-evolution" | "bio-oekologie-population" | "bio-physiologie" | "che-analytik-spektroskopie" | "che-elektrochemie" | "che-gase-energetik" | "che-gleichgewicht" | "che-kinetik" | "che-saeure-base" | "che-stoechiometrie" | "info-algorithmen-darstellung" | "info-digitale-signale" | "info-information-codierung" | "info-information-datenanalyse" | "info-rechnerleistung" | "ing-elektrotechnik-regelung" | "ing-fluidtechnik" | "ing-maschinenelemente" | "ing-mechanik-werkstoffe" | "ing-thermodynamik-transport" | "mat-algebra" | "mat-analysis" | "mat-analytische-geometrie" | "mat-funktionen-folgen" | "mat-geometrie-trigonometrie" | "mat-stochastik" | "phy-atom-kernphysik" | "phy-elektrizitaet" | "phy-mechanik" | "phy-optik" | "phy-schwingungen-wellen" | "phy-waermelehre";
export type FormelBildungsniveau = "sek1" | "sek2" | "hochschulbruecke" | "bachelor" | "fachvertiefung";
export interface FormelVariable { symbol: string; bedeutung: string; einheit: string; }
export interface Formel {
  slug: string; name: string; latex: string; symbol: string;
  kategorie: FormelFach; kapitel: FormelKapitel; unterkategorie: string;
  bildungsniveaus: FormelBildungsniveau[];
  schwierigkeit: 'grundlegend' | 'fortgeschritten' | 'universitaet';
  abiturRelevant: boolean; variablen: FormelVariable[];
  quellen: string[]; quellenLinks: string[]; url: string;
}
export const formeln: Formel[];
export function getAllFormeln(): Formel[];
export function getFormelBySlug(slug: string): Formel | undefined;
export function getFormelByKategorie(subject: FormelFach): Formel[];
export function getFormelByUnterkategorie(label: string): Formel[];
export function getFormelByKapitel(chapter: FormelKapitel): Formel[];
export function getFormelByBildungsniveau(level: FormelBildungsniveau): Formel[];
export function getAbiturFormeln(): Formel[];
