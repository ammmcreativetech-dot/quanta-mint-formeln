export interface FormelVariable {
  symbol: string;
  bedeutung: string;
  einheit: string;
}

export interface FormelHerleitung {
  /** Gültigkeitsbereich / Annahmen der Formel. */
  gueltigkeit: string;
  /** Herleitungsschritte in Reihenfolge. */
  schritte: string[];
}

export interface FormelUmstellung {
  /** Nach welcher Größe umgestellt wird. */
  ziel: string;
  /** LaTeX der umgestellten Form. */
  latex: string;
  /** Hinweis zur Umstellung (Definitionsbereich, Vorzeichen, ...). */
  hinweis: string;
}

export interface FormelTypischerFehler {
  /** Häufiger Fehler. */
  fehler: string;
  /** Korrektur / richtige Deutung. */
  korrektur: string;
}

export interface Formel {
  slug: string;
  name: string;
  latex: string;
  symbol: string;
  kategorie: 'physik' | 'chemie' | 'mathematik' | 'biologie';
  unterkategorie: string;
  beschreibung: string;
  einheiten: string;
  variablen: FormelVariable[];
  hintergrund: string;
  beispiel: string;
  anwendung: string;
  quellen: string[];
  verwandte: string[];
  abiturRelevant: boolean;
  schwierigkeit: 'grundlegend' | 'fortgeschritten' | 'universitaet';
  quellenLinks?: string[];
  dateUpdated?: string;
  suchbegriffe?: string[];
  /** Interaktive Formelseite (Herleitung interaktiv, Klausur-Aufgaben & FAQ). */
  url?: string;
  /** Herleitung mit Gültigkeitsbereich und Schritten (aus dem Abitur-Blueprint). */
  herleitung?: FormelHerleitung;
  /** Umstellungen der Formel nach anderen Größen. */
  umstellungen?: FormelUmstellung[];
  /** Typische Fehler und ihre Korrektur. */
  typischeFehler?: FormelTypischerFehler[];
}

export const formeln: Formel[];
export function getAllFormeln(): Formel[];
export function getFormelBySlug(slug: string): Formel | undefined;
export function getFormelByKategorie(kategorie: Formel['kategorie']): Formel[];
export function getAbiturFormeln(): Formel[];
