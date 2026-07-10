# quanta-mint-formeln

> Wissenschaftliche MINT-Formelsammlung für Physik, Chemie, Mathematik und Biologie, kuratiert von **[Quanta](https://quanta-study.de)**, der führenden FSRS-Lernplattform für MINT in Deutschland.

[![npm version](https://img.shields.io/npm/v/quanta-mint-formeln)](https://www.npmjs.com/package/quanta-mint-formeln)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

## Was ist das?

Ein strukturiertes JSON-Datenpaket mit **133 wissenschaftlich aufbereiteten MINT-Formeln** (alle Fächer aggregiert), jede mit:

- LaTeX-Notation (`F = m \cdot a`)
- Variablen mit Einheiten und Bedeutung
- Fachlichem Hintergrund (historisch + formal)
- Praxisbeispiel mit konkreten Zahlen
- Herleitung mit Gültigkeitsbereich und Schritten (`herleitung`)
- Umstellungen nach jeder relevanten Größe (`umstellungen`)
- Typischen Fehlern samt Korrektur (`typischeFehler`)
- Abitur-Relevanz-Flag, Suchbegriffen und Quellenlinks
- Verknüpften Formeln (`verwandte`) und `url` auf die interaktive Formelseite

## Was ist neu in 2.0

- **133 Formeln** über alle vier MINT-Fächer, von 52 Physik über 49 Mathematik und 24 Chemie bis 8 Biologie.
- **Herleitungen, Umstellungen und typische Fehler** sind jetzt im Datensatz enthalten (Felder `herleitung`, `umstellungen`, `typischeFehler`).
- **Abitur-Fokus**: `abiturRelevant`, Suchbegriffe und Quellenlinks für die Prüfungsvorbereitung.
- Jede Formel trägt ein `url`-Feld auf ihre interaktive Formelseite.

Die interaktive Herleitung, Klausur-Aufgaben und die kuratierte FAQ leben auf der jeweils verlinkten Formelseite unter `quanta-study.de/tafelwerk/{slug}`.

## Installation

```bash
npm install quanta-mint-formeln
```

## Verwendung

```js
const { formeln, getFormelBySlug, getFormelByKategorie, getAbiturFormeln } = require('quanta-mint-formeln');

// Alle Formeln
console.log(formeln.length); // 133

// Eine Formel nach Slug
const newton = getFormelBySlug('newton-zweites-gesetz');
console.log(newton.name);                    // "Newtons zweites Gesetz"
console.log(newton.herleitung.gueltigkeit);  // Gültigkeitsbereich
console.log(newton.umstellungen.length);     // Anzahl Umstellungen
console.log(newton.typischeFehler[0].fehler);// erster typischer Fehler

// Alle Physik-Formeln
const physik = getFormelByKategorie('physik');

// Nur Abitur-relevante
const abi = getAbiturFormeln();
```

## TypeScript

Vollständige Typen sind enthalten:

```ts
import { Formel, getFormelBySlug } from 'quanta-mint-formeln';
const formel: Formel | undefined = getFormelBySlug('gravitationsgesetz');
```

## Enthaltene Formeln (133)

### Physik (52)

| Formel | Symbol | Bereich | Formelseite |
|---|---|---|---|
| Newtons zweites Gesetz | F = ma | Mechanik | [newton-zweites-gesetz](https://quanta-study.de/tafelwerk/newton-zweites-gesetz) |
| Newtonsches Gravitationsgesetz | F = G·m₁m₂/r² | Gravitation | [gravitationsgesetz](https://quanta-study.de/tafelwerk/gravitationsgesetz) |
| Kinetische Energie | Ekin = ½mv² | Energielehre | [energie-kinetisch](https://quanta-study.de/tafelwerk/energie-kinetisch) |
| Potentielle Energie (Lagehöhe) | Epot = mgh | Energielehre | [energie-potentiell](https://quanta-study.de/tafelwerk/energie-potentiell) |
| Coulombsches Gesetz | F = ke·q₁q₂/r² | Elektrodynamik | [coulomb-gesetz](https://quanta-study.de/tafelwerk/coulomb-gesetz) |
| Lorentzkraft | F = q(v × B) | Elektrodynamik | [lorentzkraft](https://quanta-study.de/tafelwerk/lorentzkraft) |
| Carnot-Wirkungsgrad | η = 1 − T_k/T_w | Thermodynamik | [wirkungsgrad-carnot](https://quanta-study.de/tafelwerk/wirkungsgrad-carnot) |
| De-Broglie-Wellenlänge | λ = h/p | Quantenphysik | [de-broglie-wellenlaenge](https://quanta-study.de/tafelwerk/de-broglie-wellenlaenge) |
| Photoeffekt (Einstein) | Ekin = hf − WA | Quantenphysik | [photoeffekt-einstein](https://quanta-study.de/tafelwerk/photoeffekt-einstein) |
| Faradayssches Induktionsgesetz | U = −N·dΦ/dt | Elektrodynamik | [induktion-faraday](https://quanta-study.de/tafelwerk/induktion-faraday) |
| Hookesches Gesetz (Federkraft) | F = k·x | Mechanik | [hookes-gesetz](https://quanta-study.de/tafelwerk/hookes-gesetz) |
| Wärmekapazität — Q = m·c·ΔT | Q = m·c·ΔT | Thermodynamik | [waermekapazitaet](https://quanta-study.de/tafelwerk/waermekapazitaet) |
| Snelliussches Brechungsgesetz | n₁·sin(α₁) = n₂·sin(α₂) | Optik | [brechungsgesetz-snellius](https://quanta-study.de/tafelwerk/brechungsgesetz-snellius) |
| Heisenbergsche Unschärferelation | Δx · Δp ≥ ℏ/2 | Quantenmechanik | [heisenberg-unschaerfe](https://quanta-study.de/tafelwerk/heisenberg-unschaerfe) |
| Ohmsches Gesetz | U = R·I | Elektrizitätslehre | [ohmsches-gesetz](https://quanta-study.de/tafelwerk/ohmsches-gesetz) |
| Elektrische Leistung | P = U·I | Elektrizitätslehre | [elektrische-leistung](https://quanta-study.de/tafelwerk/elektrische-leistung) |
| Reihen- und Parallelschaltung von Widerständen | Rges = R₁+R₂ ; 1/Rges = 1/R₁+1/R₂ | Elektrizitätslehre | [widerstand-reihen-parallel](https://quanta-study.de/tafelwerk/widerstand-reihen-parallel) |
| Gleichmäßig beschleunigte Bewegung (Weg-Zeit-Gesetz) | s = ½at² + v₀t | Kinematik | [gleichmaessig-beschleunigte-bewegung](https://quanta-study.de/tafelwerk/gleichmaessig-beschleunigte-bewegung) |
| Geschwindigkeit-Zeit-Gesetz | v = a·t + v₀ | Kinematik | [geschwindigkeit-beschleunigung](https://quanta-study.de/tafelwerk/geschwindigkeit-beschleunigung) |
| Freier Fall | h = ½gt² | Kinematik | [freier-fall](https://quanta-study.de/tafelwerk/freier-fall) |
| Impuls | p = m·v | Mechanik | [impuls](https://quanta-study.de/tafelwerk/impuls) |
| Impulserhaltungssatz | p_vor = p_nach | Mechanik | [impulserhaltung](https://quanta-study.de/tafelwerk/impulserhaltung) |
| Mechanische Arbeit | W = F·s·cos(α) | Mechanik | [arbeit-mechanisch](https://quanta-study.de/tafelwerk/arbeit-mechanisch) |
| Mechanische Leistung | P = W/t | Mechanik | [leistung-mechanisch](https://quanta-study.de/tafelwerk/leistung-mechanisch) |
| Zentripetalkraft (Kreisbewegung) | Fz = m·v²/r | Mechanik | [zentripetalkraft-kreisbewegung](https://quanta-study.de/tafelwerk/zentripetalkraft-kreisbewegung) |
| Federpendel (Schwingungsdauer) | T = 2π·√(m/k) | Schwingungen und Wellen | [harmonische-schwingung-federpendel](https://quanta-study.de/tafelwerk/harmonische-schwingung-federpendel) |
| Wellengleichung (c = λ·f) | c = λ·f | Schwingungen und Wellen | [wellengleichung](https://quanta-study.de/tafelwerk/wellengleichung) |
| Dichte | ρ = m/V | Mechanik | [dichte](https://quanta-study.de/tafelwerk/dichte) |
| Druck | p = F/A | Mechanik | [druck](https://quanta-study.de/tafelwerk/druck) |
| Radioaktives Zerfallsgesetz | N(t) = N₀·e^(−λt) | Kernphysik | [zerfallsgesetz](https://quanta-study.de/tafelwerk/zerfallsgesetz) |
| Masse-Energie-Äquivalenz (E = mc²) | E = mc² | Relativitätstheorie | [masse-energie-aequivalenz](https://quanta-study.de/tafelwerk/masse-energie-aequivalenz) |
| Kapazität eines Kondensators | C = Q/U | Elektrizitätslehre | [kondensator-kapazitaet](https://quanta-study.de/tafelwerk/kondensator-kapazitaet) |
| Energie im Kondensator | E = ½CU² | Elektrizitätslehre | [kondensator-energie](https://quanta-study.de/tafelwerk/kondensator-energie) |
| Linsengleichung (Abbildungsgleichung) | 1/f = 1/g + 1/b | Optik | [linsengleichung](https://quanta-study.de/tafelwerk/linsengleichung) |
| Schiefer Wurf (Wurfparabel) | x = v₀·cosα·t; y = v₀·sinα·t − ½gt² | Kinematik | [schiefer-wurf](https://quanta-study.de/tafelwerk/schiefer-wurf) |
| Auftriebskraft (Archimedes) | F_A = ρ·V·g | Mechanik | [auftrieb-archimedes](https://quanta-study.de/tafelwerk/auftrieb-archimedes) |
| Dopplereffekt (Akustik) | f_B = f_Q·(c ± v_B)/(c ∓ v_Q) | Schwingungen und Wellen | [dopplereffekt](https://quanta-study.de/tafelwerk/dopplereffekt) |
| Fadenpendel (Schwingungsdauer) | T = 2π·√(l/g) | Schwingungen und Wellen | [fadenpendel](https://quanta-study.de/tafelwerk/fadenpendel) |
| Gleitreibungskraft | F_R = μ·F_N | Mechanik | [reibungskraft](https://quanta-study.de/tafelwerk/reibungskraft) |
| Transformator (Übersetzung) | U₁/U₂ = n₁/n₂ = I₂/I₁ | Elektrodynamik | [transformator](https://quanta-study.de/tafelwerk/transformator) |
| Thomsonsche Schwingungsgleichung | T = 2π·√(L·C) | Elektrodynamik | [schwingkreis-thomson](https://quanta-study.de/tafelwerk/schwingkreis-thomson) |
| Drittes Keplersches Gesetz | T²/a³ = 4π²/(G·M) | Gravitation | [kepler-drittes-gesetz](https://quanta-study.de/tafelwerk/kepler-drittes-gesetz) |
| Drehmoment | M = F·r·sin(θ) | Mechanik | [drehmoment](https://quanta-study.de/tafelwerk/drehmoment) |
| Bernoulli-Gleichung | p + ½ρv² + ρgh = const. | Mechanik | [bernoulli-gleichung](https://quanta-study.de/tafelwerk/bernoulli-gleichung) |
| Doppelspalt-Interferenz | d·sin(α_k) = k·λ | Optik | [doppelspalt-interferenz](https://quanta-study.de/tafelwerk/doppelspalt-interferenz) |
| Elektrische Feldstärke | E = F/q = U/d | Elektrodynamik | [elektrisches-feld](https://quanta-study.de/tafelwerk/elektrisches-feld) |
| Spezifischer Widerstand (Leiterwiderstand) | R = ρ·l/A | Elektrizitätslehre | [spezifischer-widerstand](https://quanta-study.de/tafelwerk/spezifischer-widerstand) |
| Winkelgeschwindigkeit und Kreisfrequenz | ω = 2πf; v = ω·r | Kinematik | [winkelgeschwindigkeit-kreisfrequenz](https://quanta-study.de/tafelwerk/winkelgeschwindigkeit-kreisfrequenz) |
| Stefan-Boltzmann-Gesetz | P = σ·A·T⁴ | Thermodynamik | [stefan-boltzmann-strahlung](https://quanta-study.de/tafelwerk/stefan-boltzmann-strahlung) |
| Magnetfeld einer langen Spule | B = μ₀·(N/l)·I | Elektrodynamik | [magnetfeld-spule](https://quanta-study.de/tafelwerk/magnetfeld-spule) |
| Spannenergie einer Feder | E = ½·D·s² | Energielehre | [spannenergie-feder](https://quanta-study.de/tafelwerk/spannenergie-feder) |
| Selbstinduktion einer Spule | U_ind = −L·(dI/dt) | Elektrodynamik | [selbstinduktion-spule](https://quanta-study.de/tafelwerk/selbstinduktion-spule) |

### Chemie (24)

| Formel | Symbol | Bereich | Formelseite |
|---|---|---|---|
| Ideales Gasgesetz | pV = nRT | Thermodynamik / Gase | [ideales-gasgesetz](https://quanta-study.de/tafelwerk/ideales-gasgesetz) |
| Arrhenius-Gleichung | k = A·e^(−EA/RT) | Reaktionskinetik | [arrhenius-gleichung](https://quanta-study.de/tafelwerk/arrhenius-gleichung) |
| Henderson-Hasselbalch-Gleichung | pH = pKa + log([A⁻]/[HA]) | Säure-Base-Chemie | [henderson-hasselbalch](https://quanta-study.de/tafelwerk/henderson-hasselbalch) |
| Nernst-Gleichung | E = E° − (RT/zF)·ln Q | Elektrochemie | [nernst-gleichung](https://quanta-study.de/tafelwerk/nernst-gleichung) |
| Gibbs-Energie (Freie Enthalpie) | ΔG = ΔH − TΔS | Thermodynamik | [gibbs-energie](https://quanta-study.de/tafelwerk/gibbs-energie) |
| Massenwirkungsgesetz (Gleichgewichtskonstante) | Kc = [C]ᶜ·[D]ᵈ / ([A]ᵃ·[B]ᵇ) | Reaktionskinetik | [massenwirkungsgesetz](https://quanta-study.de/tafelwerk/massenwirkungsgesetz) |
| pH-Wert-Definition | pH = −lg[H₃O⁺] | Säure-Base | [ph-definition](https://quanta-study.de/tafelwerk/ph-definition) |
| Lambert-Beersches Gesetz (Photometrie) | A = ε·c·d | Spektroskopie | [lambert-beer-gesetz](https://quanta-study.de/tafelwerk/lambert-beer-gesetz) |
| Stoffmenge (Mol) | n = m/M | Stöchiometrie | [stoffmenge-mol](https://quanta-study.de/tafelwerk/stoffmenge-mol) |
| Molare Masse | M = m/n | Stöchiometrie | [molare-masse](https://quanta-study.de/tafelwerk/molare-masse) |
| Stoffmengenkonzentration | c = n/V | Lösungen / Stöchiometrie | [stoffmengenkonzentration](https://quanta-study.de/tafelwerk/stoffmengenkonzentration) |
| Avogadro-Konstante (Teilchenzahl) | N = n·N_A | Stöchiometrie / Teilchenmodell | [avogadro-teilchenzahl](https://quanta-study.de/tafelwerk/avogadro-teilchenzahl) |
| pKs-Wert (Säurekonstante) | pKs = −lg(Ks) | Säure-Base | [pks-wert-saeurekonstante](https://quanta-study.de/tafelwerk/pks-wert-saeurekonstante) |
| Ionenprodukt des Wassers | Kw = [H₃O⁺]·[OH⁻] | Säure-Base | [ionenprodukt-wasser](https://quanta-study.de/tafelwerk/ionenprodukt-wasser) |
| Reaktionsenthalpie (Satz von Hess) | ΔH°R = ΣΔH°f(P) − ΣΔH°f(E) | Thermodynamik | [reaktionsenthalpie-hess](https://quanta-study.de/tafelwerk/reaktionsenthalpie-hess) |
| Faraday-Gesetz der Elektrolyse | m = M·I·t/(z·F) | Elektrochemie | [faraday-elektrolyse](https://quanta-study.de/tafelwerk/faraday-elektrolyse) |
| Löslichkeitsprodukt | K_L = [A]ᵃ·[B]ᵇ | Chemisches Gleichgewicht | [loeslichkeitsprodukt](https://quanta-study.de/tafelwerk/loeslichkeitsprodukt) |
| Verdünnungsgleichung | c₁·V₁ = c₂·V₂ | Lösungen / Stöchiometrie | [verduennungsgleichung](https://quanta-study.de/tafelwerk/verduennungsgleichung) |
| Geschwindigkeitsgesetz (Reaktionsordnung) | v = k·[A]^m·[B]^n | Reaktionskinetik | [geschwindigkeitsgesetz-reaktionsordnung](https://quanta-study.de/tafelwerk/geschwindigkeitsgesetz-reaktionsordnung) |
| RGT-Regel | v₂ = v₁·Q₁₀^(ΔT/10 K) | Reaktionskinetik | [rgt-regel](https://quanta-study.de/tafelwerk/rgt-regel) |
| Massenanteil (Massenprozent) | w = m_Stoff/m_Lösung | Lösungen / Gehaltsgrößen | [massenanteil-gehaltsgroessen](https://quanta-study.de/tafelwerk/massenanteil-gehaltsgroessen) |
| Gitterenergie (Born-Haber-Kreisprozess) | ΔH_Gitter = ΔH°f − ΔH_Sub − I − ½D − EA | Thermodynamik | [gitterenergie-born-haber](https://quanta-study.de/tafelwerk/gitterenergie-born-haber) |
| pKb-Wert (Basenkonstante) | pKb = −lg(Kb) | Säure-Base | [kb-pkb-basenkonstante](https://quanta-study.de/tafelwerk/kb-pkb-basenkonstante) |
| Van-'t-Hoff-Gleichung (Reaktionsisobare) | ln(K₂/K₁) = −ΔH°/R·(1/T₂ − 1/T₁) | Thermodynamik / Gleichgewicht | [van-t-hoff-reaktionsisobare](https://quanta-study.de/tafelwerk/van-t-hoff-reaktionsisobare) |

### Mathematik (49)

| Formel | Symbol | Bereich | Formelseite |
|---|---|---|---|
| Satz des Pythagoras | a² + b² = c² | Geometrie | [pythagorean-theorem](https://quanta-study.de/tafelwerk/pythagorean-theorem) |
| Quadratische Formel (ABC-Formel) | x = (−b ± √D) / 2a | Algebra | [quadratische-formel](https://quanta-study.de/tafelwerk/quadratische-formel) |
| Eulersche Formel | e^(iφ) = cos φ + i·sin φ | Analysis / Komplexe Zahlen | [eulersche-formel](https://quanta-study.de/tafelwerk/eulersche-formel) |
| Produktregel der Differentiation | (fg)' = f'g + fg' | Analysis | [produktregel-ableitung](https://quanta-study.de/tafelwerk/produktregel-ableitung) |
| Kettenregel der Differentiation | (f∘g)' = f'(g(x))·g'(x) | Analysis | [kettenregel-ableitung](https://quanta-study.de/tafelwerk/kettenregel-ableitung) |
| Taylor-Reihe | f(x) = Σ f⁽ⁿ⁾(a)/n! · (x−a)ⁿ | Analysis | [taylor-reihe](https://quanta-study.de/tafelwerk/taylor-reihe) |
| Satz von Bayes | P(A\|B) = P(B\|A)·P(A) / P(B) | Stochastik / Wahrscheinlichkeitsrechnung | [bayes-theorem](https://quanta-study.de/tafelwerk/bayes-theorem) |
| Normalverteilung (Gaußsche Glockenkurve) | f(x) = 1/(σ√2π) · e^(−(x−μ)²/2σ²) | Stochastik | [normalverteilung](https://quanta-study.de/tafelwerk/normalverteilung) |
| Potenzregel der Differentiation | d/dx(xⁿ) = n·xⁿ⁻¹ | Analysis | [potenzregel](https://quanta-study.de/tafelwerk/potenzregel) |
| pq-Formel | x₁,₂ = −p/2 ± √((p/2)² − q) | Algebra | [pq-formel](https://quanta-study.de/tafelwerk/pq-formel) |
| Binomische Formeln | (a ± b)² = a² ± 2ab + b² | Algebra | [binomische-formeln](https://quanta-study.de/tafelwerk/binomische-formeln) |
| Ableitung der e-Funktion | (eˣ)' = eˣ | Analysis | [ableitung-e-funktion](https://quanta-study.de/tafelwerk/ableitung-e-funktion) |
| Ableitung des natürlichen Logarithmus | (ln x)' = 1/x | Analysis | [ableitung-ln](https://quanta-study.de/tafelwerk/ableitung-ln) |
| Ableitung von Sinus und Kosinus | (sin x)' = cos x, (cos x)' = −sin x | Analysis | [ableitung-sinus-cosinus](https://quanta-study.de/tafelwerk/ableitung-sinus-cosinus) |
| Quotientenregel der Differentiation | (f/g)' = (f'g − fg')/g² | Analysis | [quotientenregel-ableitung](https://quanta-study.de/tafelwerk/quotientenregel-ableitung) |
| Stammfunktion und Grundintegrale | ∫xⁿ dx = xⁿ⁺¹/(n+1) + C | Analysis / Integralrechnung | [grundintegrale-stammfunktion](https://quanta-study.de/tafelwerk/grundintegrale-stammfunktion) |
| Hauptsatz der Differential- und Integralrechnung | ∫ₐᵇ f(x) dx = F(b) − F(a) | Analysis / Integralrechnung | [hauptsatz-integralrechnung](https://quanta-study.de/tafelwerk/hauptsatz-integralrechnung) |
| Fläche unter einer Kurve (bestimmtes Integral) | A = ∫ₐᵇ f(x) dx | Analysis / Integralrechnung | [bestimmtes-integral-flaeche](https://quanta-study.de/tafelwerk/bestimmtes-integral-flaeche) |
| Partielle Integration | ∫u·v' dx = u·v − ∫u'·v dx | Analysis / Integralrechnung | [partielle-integration](https://quanta-study.de/tafelwerk/partielle-integration) |
| Binomialverteilung | P(X=k) = (n über k)·pᵏ·(1−p)ⁿ⁻ᵏ | Stochastik | [binomialverteilung](https://quanta-study.de/tafelwerk/binomialverteilung) |
| Erwartungswert | E(X) = Σ xᵢ·pᵢ | Stochastik | [erwartungswert](https://quanta-study.de/tafelwerk/erwartungswert) |
| Bedingte Wahrscheinlichkeit | P(A\|B) = P(A∩B)/P(B) | Stochastik | [bedingte-wahrscheinlichkeit](https://quanta-study.de/tafelwerk/bedingte-wahrscheinlichkeit) |
| Standardabweichung | σ = √Var(X) | Stochastik | [standardabweichung](https://quanta-study.de/tafelwerk/standardabweichung) |
| Skalarprodukt | a⃗·b⃗ = a₁b₁ + a₂b₂ + a₃b₃ | Analytische Geometrie / Vektoren | [skalarprodukt](https://quanta-study.de/tafelwerk/skalarprodukt) |
| Kreuzprodukt (Vektorprodukt) | a⃗×b⃗ = (a₂b₃−a₃b₂ \| a₃b₁−a₁b₃ \| a₁b₂−a₂b₁) | Analytische Geometrie / Vektoren | [kreuzprodukt](https://quanta-study.de/tafelwerk/kreuzprodukt) |
| Logarithmengesetze | log(x·y) = log x + log y | Algebra | [logarithmengesetze](https://quanta-study.de/tafelwerk/logarithmengesetze) |
| Kosinussatz | c² = a² + b² − 2ab·cos γ | Trigonometrie | [kosinussatz](https://quanta-study.de/tafelwerk/kosinussatz) |
| Sinussatz | a/sin α = b/sin β = c/sin γ | Trigonometrie | [sinussatz](https://quanta-study.de/tafelwerk/sinussatz) |
| Kreisfläche und Kreisumfang | A = πr², U = 2πr | Geometrie | [kreisflaeche-umfang](https://quanta-study.de/tafelwerk/kreisflaeche-umfang) |
| Kugel: Volumen und Oberfläche | V = 4/3·πr³, O = 4πr² | Geometrie / Körper | [kugel-volumen-oberflaeche](https://quanta-study.de/tafelwerk/kugel-volumen-oberflaeche) |
| Zylinder: Volumen und Oberfläche | V = πr²h, O = 2πr(r+h) | Geometrie / Körper | [zylinder-volumen-oberflaeche](https://quanta-study.de/tafelwerk/zylinder-volumen-oberflaeche) |
| Kegel: Volumen und Oberfläche | V = ⅓·πr²h, M = πrs | Geometrie / Körper | [kegel-volumen-oberflaeche](https://quanta-study.de/tafelwerk/kegel-volumen-oberflaeche) |
| Pyramide: Volumen | V = ⅓·G·h | Geometrie / Körper | [pyramide-volumen](https://quanta-study.de/tafelwerk/pyramide-volumen) |
| Trigonometrie im rechtwinkligen Dreieck | sin α = GK/Hyp, cos α = AK/Hyp, tan α = GK/AK | Trigonometrie | [trigonometrie-rechtwinkliges-dreieck](https://quanta-study.de/tafelwerk/trigonometrie-rechtwinkliges-dreieck) |
| Geradengleichung und Steigung | m = Δy/Δx, y = mx + b | Funktionen | [geradengleichung-steigung](https://quanta-study.de/tafelwerk/geradengleichung-steigung) |
| Hessesche Normalform (Abstand Punkt-Ebene) | d(P;E) = \|n⃗·p⃗ − d\| / \|n⃗\| | Analytische Geometrie / Vektoren | [hesse-normalform-abstand-ebene](https://quanta-study.de/tafelwerk/hesse-normalform-abstand-ebene) |
| Ebenengleichung in Normalenform | E: (x⃗ − p⃗)·n⃗ = 0 | Analytische Geometrie / Vektoren | [ebenengleichung-normalenform](https://quanta-study.de/tafelwerk/ebenengleichung-normalenform) |
| Abstand Punkt-Gerade | d(Q;g) = \|(q⃗−p⃗)×u⃗\| / \|u⃗\| | Analytische Geometrie / Vektoren | [abstand-punkt-gerade](https://quanta-study.de/tafelwerk/abstand-punkt-gerade) |
| Betrag eines Vektors (Länge) | \|v⃗\| = √(v₁² + v₂² + v₃²) | Analytische Geometrie / Vektoren | [vektor-betrag-laenge](https://quanta-study.de/tafelwerk/vektor-betrag-laenge) |
| Differenzenquotient und h-Methode | f'(x₀) = lim (f(x₀+h)−f(x₀))/h | Analysis | [differenzenquotient-h-methode](https://quanta-study.de/tafelwerk/differenzenquotient-h-methode) |
| Scheitelpunktform der Parabel | y = a(x − d)² + e | Funktionen | [scheitelpunktform-parabel](https://quanta-study.de/tafelwerk/scheitelpunktform-parabel) |
| Lineare Regression (Ausgleichsgerade) | ŷ = a + b·x | Stochastik / Statistik | [lineare-regression](https://quanta-study.de/tafelwerk/lineare-regression) |
| Binomialkoeffizient (n über k) | (n über k) = n!/(k!·(n−k)!) | Stochastik / Kombinatorik | [binomialkoeffizient-kombinatorik](https://quanta-study.de/tafelwerk/binomialkoeffizient-kombinatorik) |
| Geometrische Reihe | sₙ = a₁·(qⁿ−1)/(q−1) | Folgen und Reihen | [geometrische-reihe](https://quanta-study.de/tafelwerk/geometrische-reihe) |
| Arithmetische Reihe (Gaußsche Summenformel) | sₙ = n·(a₁ + aₙ)/2 | Folgen und Reihen | [arithmetische-reihe-gauss](https://quanta-study.de/tafelwerk/arithmetische-reihe-gauss) |
| Rotationsvolumen | V = π·∫ f(x)² dx | Analysis / Integralrechnung | [rotationsvolumen](https://quanta-study.de/tafelwerk/rotationsvolumen) |
| Dreiecksfläche mit Sinus | A = ½·a·b·sin γ | Trigonometrie | [dreiecksflaeche-sinus](https://quanta-study.de/tafelwerk/dreiecksflaeche-sinus) |
| Poisson-Verteilung | P(X=k) = λᵏ·e^(−λ)/k! | Stochastik | [poisson-verteilung](https://quanta-study.de/tafelwerk/poisson-verteilung) |
| Sigma-Regeln (Sigma-Umgebungen) | μ±σ: 68,3 %, μ±2σ: 95,4 %, μ±3σ: 99,7 % | Stochastik | [sigma-regeln-umgebung](https://quanta-study.de/tafelwerk/sigma-regeln-umgebung) |

### Biologie (8)

| Formel | Symbol | Bereich | Formelseite |
|---|---|---|---|
| Michaelis-Menten-Kinetik (Enzymkinetik) | v = Vmax·[S] / (Km + [S]) | Biochemie | [michaelis-menten](https://quanta-study.de/tafelwerk/michaelis-menten) |
| Logistisches Wachstum | dN/dt = r·N·(1 − N/K) | Populationsbiologie | [logistisches-wachstum](https://quanta-study.de/tafelwerk/logistisches-wachstum) |
| Hardy-Weinberg-Gleichgewicht | p² + 2pq + q² = 1 | Genetik | [hardy-weinberg](https://quanta-study.de/tafelwerk/hardy-weinberg) |
| Exponentielles Wachstum | N(t) = N₀·e^(r·t) | Populationsbiologie | [exponentielles-wachstum](https://quanta-study.de/tafelwerk/exponentielles-wachstum) |
| Chi-Quadrat-Test (Anpassungstest) | χ² = Σ (B − E)² / E | Genetik | [chi-quadrat-test](https://quanta-study.de/tafelwerk/chi-quadrat-test) |
| Shannon-Index (Biodiversität) | H' = −Σ pᵢ·ln(pᵢ) | Ökologie | [shannon-index](https://quanta-study.de/tafelwerk/shannon-index) |
| Simpson-Index (Dominanz und Diversität) | D = Σ pᵢ² | Ökologie | [simpson-index](https://quanta-study.de/tafelwerk/simpson-index) |
| Lincoln-Index (Fang-Wiederfang-Methode) | N = (M·C) / R | Ökologie | [lincoln-index](https://quanta-study.de/tafelwerk/lincoln-index) |

## Vollständige interaktive Formelreferenz

Herleitung interaktiv, Klausur-Aufgaben & FAQ auf der jeweiligen Formelseite. Alle Formeln mit KaTeX-Rendering, FSRS Spaced Repetition und Import-Funktion auf **[quanta-study.de/tafelwerk](https://quanta-study.de/tafelwerk)**.

Fach-Pakete:
- [`quanta-physik-formeln`](https://www.npmjs.com/package/quanta-physik-formeln) · 52 Physik-Formeln
- [`quanta-chemie-formeln`](https://www.npmjs.com/package/quanta-chemie-formeln) · 24 Chemie-Formeln
- [`quanta-mathe-formeln`](https://www.npmjs.com/package/quanta-mathe-formeln) · 49 Mathe-Formeln
- [`quanta-bio-formeln`](https://www.npmjs.com/package/quanta-bio-formeln) · 8 Biologie-Formeln

## Lizenz

**Creative Commons Attribution 4.0 International (CC BY 4.0)**

Bei Verwendung bitte angeben:
> Formelinhalt von [Quanta](https://quanta-study.de), MINT-Lernplattform für Schüler und Studenten in Deutschland

---
*Maintained by [Quanta](https://quanta-study.de), FSRS-basiertes Lernen für MINT.*
