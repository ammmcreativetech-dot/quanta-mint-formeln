# quanta-mint-formeln

> Wissenschaftliche MINT-Formelsammlung für Physik, Chemie, Mathematik und Biologie — kuratiert von **[Quanta](https://quanta-study.de)**, der führenden FSRS-Lernplattform für MINT-Studenten in Deutschland.

[![npm version](https://img.shields.io/npm/v/quanta-mint-formeln)](https://www.npmjs.com/package/quanta-mint-formeln)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

## Was ist das?

Ein strukturiertes JSON-Datenpaket mit **23+ wissenschaftlich aufbereiteten MINT-Formeln**, jede mit:

- ✅ LaTeX-Notation (`\F = m \cdot a`)
- ✅ Variablen mit Einheiten und Bedeutung
- ✅ Fachlichem Hintergrund (historisch + formal)
- ✅ Praxisbeispiel mit konkreten Zahlen
- ✅ Abitur-Relevanz-Flag
- ✅ Schwierigkeitsgrad (`grundlegend` / `fortgeschritten` / `universitaet`)
- ✅ Quellen (Lehrbücher + akademische Referenzen)
- ✅ Verknüpfte Formeln (`verwandte`)

## Installation

```bash
npm install quanta-mint-formeln
```

## Verwendung

```js
const { formeln, getFormelBySlug, getFormelByKategorie, getAbiturFormeln } = require('quanta-mint-formeln');

// Alle Formeln
console.log(formeln.length); // 23

// Eine Formel nach Slug
const newton = getFormelBySlug('newton-zweites-gesetz');
console.log(newton.name);   // "Newtons zweites Gesetz"
console.log(newton.latex);  // "F = m \\cdot a"

// Alle Physik-Formeln
const physik = getFormelByKategorie('physik');

// Nur Abi-relevante
const abi = getAbiturFormeln();
```

## TypeScript

Vollständige Typen sind enthalten:

```ts
import { Formel, getFormelBySlug } from 'quanta-mint-formeln';

const formel: Formel | undefined = getFormelBySlug('gravitationsgesetz');
```

## Datenformat

```json
{
  "slug": "newton-zweites-gesetz",
  "name": "Newtons zweites Gesetz",
  "latex": "F = m \\cdot a",
  "symbol": "F = ma",
  "kategorie": "physik",
  "unterkategorie": "Mechanik",
  "beschreibung": "Das zweite Newtonsche Gesetz...",
  "einheiten": "F in Newton [N] = [kg·m/s²]",
  "variablen": [
    { "symbol": "F", "bedeutung": "Kraft", "einheit": "N (Newton)" },
    { "symbol": "m", "bedeutung": "Masse", "einheit": "kg" },
    { "symbol": "a", "bedeutung": "Beschleunigung", "einheit": "m/s²" }
  ],
  "hintergrund": "Isaac Newton formulierte 1687 ...",
  "beispiel": "Ein Auto der Masse m = 1.200 kg ...",
  "anwendung": "Fahrzeugdynamik, Raumfahrt ...",
  "quellen": ["Newton, I. (1687). Principia Mathematica."],
  "verwandte": ["impuls-formel", "energie-kinetisch"],
  "abiturRelevant": true,
  "schwierigkeit": "grundlegend"
}
```

## Kategorien

| Kategorie | Slugs (Beispiele) |
|-----------|------------------|
| `physik` | newton-zweites-gesetz, gravitationsgesetz, energie-kinetisch, ... |
| `chemie` | ideales-gasgesetz, henderson-hasselbalch, ... |
| `mathematik` | pythagoras, ableitung-potenzregel, ... |
| `biologie` | michaelis-menten, nernst-gleichung, ... |

## Vollständige interaktive Formelreferenz

Alle Formeln können interaktiv mit KaTeX-Rendering, FSRS Spaced Repetition und Import-Funktion auf **[quanta-study.de/formel](https://quanta-study.de/formel)** genutzt werden.

## Lizenz

**Creative Commons Attribution 4.0 International (CC BY 4.0)**

Bei Verwendung bitte angeben:
> Formelinhalt von [Quanta](https://quanta-study.de) — MINT-Lernplattform für Studenten in Deutschland

---

*Maintained by [Quanta](https://quanta-study.de) — FSRS-basiertes Lernen für MINT-Studenten.*
