export interface FormelVariable {
  symbol: string;
  bedeutung: string;
  einheit: string;
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
}

export const formeln: Formel[];
export function getAllFormeln(): Formel[];
export function getFormelBySlug(slug: string): Formel | undefined;
export function getFormelByKategorie(kategorie: Formel['kategorie']): Formel[];
export function getAbiturFormeln(): Formel[];
