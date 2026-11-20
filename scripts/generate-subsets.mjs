#!/usr/bin/env node
// Generates the versioned family from public compact JSON, using Node built-ins only.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const config = JSON.parse(fs.readFileSync(path.join(root, 'release-config.json')));
const data = JSON.parse(fs.readFileSync(path.join(root, 'formeln.json')));
const baseSchema = JSON.parse(fs.readFileSync(path.join(root, 'schema.json')));
const helpers = fs.readFileSync(path.join(root, 'index.js'), 'utf8');
const license = fs.readFileSync(path.join(root, 'LICENSE'), 'utf8');
const subjects = ['physik', 'chemie', 'mathematik', 'biologie', 'astronomie', 'informatik', 'ingenieurwesen'];
const levels = ['sek1', 'sek2', 'hochschulbruecke', 'bachelor', 'fachvertiefung'];
const keys = ['slug', 'name', 'latex', 'symbol', 'kategorie', 'kapitel', 'unterkategorie', 'bildungsniveaus', 'schwierigkeit', 'abiturRelevant', 'variablen', 'quellen', 'quellenLinks', 'url'];
const family = [
  ['quanta-mint-formeln', null], ['quanta-physik-formeln', 'physik'],
  ['quanta-chemie-formeln', 'chemie'], ['quanta-mathe-formeln', 'mathematik'],
  ['quanta-bio-formeln', 'biologie'], ['quanta-astronomie-formeln', 'astronomie'],
  ['quanta-informatik-formeln', 'informatik'], ['quanta-ingenieurwesen-formeln', 'ingenieurwesen'],
];
const j = value => `${JSON.stringify(value, null, 2)}\n`;
const hash = value => createHash('sha256').update(value).digest('hex');
const assert = (value, message) => {if (!value) throw Error(message);};
assert(hash(license) === config.licenseSha256, 'LICENSE must match the recorded official CC BY 4.0 text');
assert(data.length === 770 && new Set(data.map(item => item.slug)).size === 770, 'Review catalogue scope before changing the 770-reference release');
for (const item of data) {
  assert(JSON.stringify(Object.keys(item)) === JSON.stringify(keys), `Unexpected record keys: ${item.slug}`);
  assert(subjects.includes(item.kategorie), `Unknown subject: ${item.slug}`);
  assert(item.url === `https://quanta-study.de/tafelwerk/${item.slug}`, `Canonical URL mismatch: ${item.slug}`);
  for (const variable of item.variablen) assert(JSON.stringify(Object.keys(variable)) === '["symbol","bedeutung","einheit"]', `Unexpected variable keys: ${item.slug}`);
}

const union = values => values.map(value => JSON.stringify(value)).join(' | ');
function types(records, categories) {
  return `/** Compact German formula references; schema ${config.schemaVersion}. */
export type FormelFach = ${union(categories)};
export type FormelKapitel = ${union([...new Set(records.map(item => item.kapitel))].sort())};
export type FormelBildungsniveau = ${union(levels)};
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
`;
}

function readme(name, subject, records, version, githubOnly) {
  const example = records[0];
  const repo = `https://github.com/ammmcreativetech-dot/${name}`;
  const scope = subject ? `${records.length} ${subject} references` : `${records.length} references across seven STEM subjects`;
  return `# ${name}

**${scope}**, maintained by [Quanta Study](https://quanta-study.de/), a product of **${config.publisher}**. Version **${version}** describes the files in this repository; npm publication is a separate action.${githubOnly ? ' This update provides a GitHub dataset; npm publication is disabled with private:true.' : ''}

## What can I use this for?

Look up compact formula records in a website, teaching tool or local script. Each record includes notation, subject and chapter metadata, education levels, short variable labels and units, bibliographic references and a canonical Quanta reference URL. Formula text is **German**; the developer documentation is English. No English formula overlay is included.

Read [formeln.json](./formeln.json) directly or use the zero-dependency CommonJS helpers and [TypeScript declarations](./index.d.ts). This is reference data, not a copy of the interactive learning platform.

## Use the GitHub checkout or JSON

\`\`\`sh
git clone ${repo}.git
cd ${name}
node -e "console.log(require('./').formeln.length)"
\`\`\`

Verify the checkout's package version and [manifest](./manifest.json) when reproducibility matters. No npm installation command is required for this workflow.

\`\`\`js
const {getFormelBySlug, getAbiturFormeln} = require('./');
const formula = getFormelBySlug('${example.slug}');
console.log({slug: formula.slug, latex: formula.latex, url: formula.url});
const abiturReferences = getAbiturFormeln();
const raw = require('./formeln.json');
\`\`\`

Selected fields from that actual record:

\`\`\`json
${JSON.stringify({slug: example.slug, name: example.name, latex: example.latex, kategorie: example.kategorie, url: example.url}, null, 2)}
\`\`\`

Explore [${example.name}](${example.url}) in context, or browse the public [Quanta Tafelwerk](https://quanta-study.de/tafelwerk). The online explanations and learning features remain separate from this dataset.

## API

- \`formeln\` and \`getAllFormeln()\`: all records in this package.
- \`getFormelBySlug(slug)\`: one matching record, or \`undefined\`.
- \`getFormelByKategorie(subject)\`: exact subject filter.
- \`getFormelByUnterkategorie(label)\`: original short-label filter.
- \`getFormelByKapitel(chapter)\`: stable chapter-ID filter.
- \`getFormelByBildungsniveau(level)\`: education-level filter.
- \`getAbiturFormeln()\`: records whose original \`abiturRelevant\` flag is true. It does not assert permission to use a resource during an exam.

${subject ? `Every record and the category type in this package remain narrowed to \`${subject}\`.` : 'The core category type covers physik, chemie, mathematik, biologie, astronomie, informatik and ingenieurwesen.'} Historical core helpers keep their meanings; the subcategory helper, originally available in the subject packages, is also available in the core. Direct JSON access and CommonJS remain supported. Existing helper names in the four older subject packages are preserved.

## Compatibility

${githubOnly ? 'This is the first standalone version of this subject dataset.' : '**Version 3 is a major change:** rich historical fields are removed. Consumers using descriptions, derivations, worked examples or other removed fields must migrate. The core result domain expands from four subjects to seven; exhaustive category handling needs review.'} The compact field contract is documented in [schema.json](./schema.json). Scientific values are not silently truncated. References identify sources; their presence does not certify correctness or license the referenced works.

## Questions

### Does this include full articles or worked solutions?

No. It includes compact reference metadata and notation. Article text, descriptions, derivations, solutions, FAQs, calculator implementations and learning blueprints are excluded.

### Which language is the data in?

Formula records are German. English is used for documentation.${subject ? '' : ' The separate references/ index contains bilingual table metadata, not translated formula records or table values.'}

### Where can I go deeper?

Use a record's canonical \`url\` or the [Tafelwerk hub](https://quanta-study.de/tafelwerk) for online context. This repository offers reusable reference data; it makes no learning-gain, search-ranking or AI-citation promise.

${subject ? '' : '## Reference-table index\n\n[references/](./references/README.md) separately indexes **33 tables**: 19 main tables and 14 supplements. **Zero rows or cell values** are included. These entries do not increase the 770-formula count.\n\n## Reproduce the family\n\nThe built-in Node-only generator uses this public compact JSON and schema, not application source or article modules:\n\n```sh\nnode scripts/generate-subsets.mjs --out-root /path/to/formula-repositories\nnode scripts/generate-subsets.mjs --out-root /path/to/formula-repositories --check\n```\n\nIt deterministically derives the seven subject subsets, declarations, metadata and documentation from the same 770-record core. It does not install, publish, push or edit workflows.\n\n'}## Provenance, citation and license

Source dataset revision: \`${config.sourceCommit}\`; public source: [Quanta Tafelwerk](${config.sourceUrl}). [manifest.json](./manifest.json) records schema, counts and SHA-256 checksums. [CITATION.cff](./CITATION.cff) supplies dataset attribution without inventing a DOI or release date.

The included dataset, small wrappers and repository files continue under **[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)**; see the full [LICENSE](./LICENSE) and [scope notice](./LICENSE-SCOPE.md). Attribute **Quanta Study — ${config.publisher}**, retain the license notice and indicate changes as required by the license. Earlier public CC BY 4.0 grants remain unchanged. The full application, online articles and other materials not included here are not licensed by this repository.

## Check locally

\`\`\`sh
npm test
npm pack --dry-run --ignore-scripts
\`\`\`

No dependency installation is needed. Publication is never triggered by an ordinary data push.${githubOnly ? ' This repository has no npm-publish workflow.' : ' The existing npm workflow accepts manual workflow_dispatch only.'}
`;
}

function contractTest(name) {
  return `'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {createHash} = require('node:crypto');
const root = path.resolve(__dirname, '..');
const data = require('../formeln.json');
const api = require('../index.js');
const manifest = require('../manifest.json');
const metadata = require('../package.json');
test('exact count, unique identities, narrow keys and source URLs', () => {
  assert.equal(data.length, manifest.count);
  assert.equal(new Set(data.map(item => item.slug)).size, data.length);
  for (const item of data) {
    assert.deepEqual(Object.keys(item), manifest.fieldAllowlist);
    assert.ok(manifest.subjects.includes(item.kategorie));
    assert.equal(item.url, 'https://quanta-study.de/tafelwerk/' + item.slug);
    assert.equal(typeof item.abiturRelevant, 'boolean');
    for (const variable of item.variablen) {
      assert.deepEqual(Object.keys(variable), ['symbol', 'bedeutung', 'einheit']);
      assert.equal(typeof variable.symbol, 'string');
      assert.ok(typeof variable.bedeutung === 'string' && variable.bedeutung.length <= 200);
      assert.ok(typeof variable.einheit === 'string' && variable.einheit.length <= 128);
    }
    assert.ok(item.quellen.every(value => typeof value === 'string' && value.length <= 512));
  }
});
test('real CommonJS helpers and raw JSON agree', () => {
  assert.equal(api.formeln, data); assert.equal(api.getAllFormeln(), data);
  const first = data[0];
  assert.equal(api.getFormelBySlug(first.slug), first);
  assert.equal(api.getFormelBySlug('missing-reference'), undefined);
  assert.deepEqual(api.getFormelByKategorie(first.kategorie), data.filter(item => item.kategorie === first.kategorie));
  assert.deepEqual(api.getFormelByUnterkategorie(first.unterkategorie), data.filter(item => item.unterkategorie === first.unterkategorie));
  assert.deepEqual(api.getFormelByKapitel(first.kapitel), data.filter(item => item.kapitel === first.kapitel));
  assert.deepEqual(api.getFormelByBildungsniveau('sek2'), data.filter(item => item.bildungsniveaus.includes('sek2')));
  assert.deepEqual(api.getAbiturFormeln(), data.filter(item => item.abiturRelevant));
});
test('declared files, license, citation and checksums agree with actual artifacts', () => {
  assert.equal(metadata.name, '${name}'); assert.equal(metadata.version, manifest.version);
  assert.equal(metadata.license, 'CC-BY-4.0');
  assert.ok(fs.existsSync(path.join(root, metadata.main)));
  assert.ok(fs.existsSync(path.join(root, metadata.types)));
  for (const [filename, expected] of Object.entries(manifest.files)) {
    const actual = fs.readFileSync(path.join(root, filename));
    assert.equal(createHash('sha256').update(actual).digest('hex'), expected.sha256, filename);
    assert.equal(actual.length, expected.bytes, filename);
  }
  assert.match(fs.readFileSync(path.join(root, 'LICENSE'), 'utf8'), /^Attribution 4.0 International/);
  const citation = fs.readFileSync(path.join(root, 'CITATION.cff'), 'utf8');
  assert.match(citation, /^type: dataset$/m);
  assert.doesNotMatch(citation, /^(doi|date-released):/m);
  assert.equal(Object.hasOwn(metadata, 'dependencies'), false);
});
`;
}

function scopeNotice() {
  return `# License scope and attribution\n\nThe files included in this repository, including the compact dataset and small lookup wrappers, continue under Creative Commons Attribution 4.0 International (CC BY 4.0), unless an individual file explicitly identifies another applicable right or notice. The full official text is in LICENSE.\n\nPublisher and attribution party: Quanta Study — ${config.publisher}. Public material source: ${config.sourceUrl}. Identify changes and preserve attribution/license notices in accordance with CC BY 4.0. This notice adds no further restrictions to the licensed material.\n\nThis repository does not contain the full Quanta application, online articles, derivations, worked solutions, FAQs, calculator implementations or learning blueprints. It grants no rights in those absent materials. Bibliographic references and source links do not relicense third-party works.\n\nEarlier publicly distributed material remains available under the licenses already granted. Removing rich fields from a later version does not revoke earlier CC BY 4.0 permissions or erase Git history.\n\nOfficial legal text: ${config.licenseSource}\nOfficial Creative Commons source mirror: ${config.licenseSourceMirror}\nRecorded legal-text SHA-256: ${config.licenseSha256}\n`;
}

function citation(name, version, records) {
  return `cff-version: 1.2.0\nmessage: "If you use this dataset, cite the exact repository version and preserve its source references. Version metadata describes these files, not npm publication."\ntype: dataset\ntitle: ${JSON.stringify(`Quanta Study compact German formula references — ${name}`)}\nauthors:\n  - name: ${JSON.stringify(config.publisher)}\n    website: "https://quanta-study.de/"\nversion: ${JSON.stringify(version)}\nlicense: CC-BY-4.0\nurl: "https://quanta-study.de/tafelwerk"\nrepository-code: "https://github.com/ammmcreativetech-dot/${name}"\nabstract: ${JSON.stringify(`${records.length} compact German formula reference records with notation, variable metadata and source references. Full articles and worked solutions are excluded.`)}\n`;
}

function referenceArtifacts() {
  const index = JSON.parse(fs.readFileSync(path.join(root, 'references/reference-index.json')));
  const schema = fs.readFileSync(path.join(root, 'references/reference-index.schema.json'), 'utf8');
  assert(index.entries.length === 33, 'Expected 33 table metadata entries');
  const readme = '# Quanta Study reference-table metadata index\n\nPart of the Quanta Study compact-reference dataset by ' + config.publisher + '. This index contains 19 main tables and 14 supplements: **33 metadata entries, zero table rows or cell values**. It is counted separately from formulas.\n\nUse [reference-index.json](./reference-index.json) with its [schema](./reference-index.schema.json). It supplies IDs, bilingual DE/EN titles and groups, source/edition metadata, columns, source row counts and canonical/navigation URLs. A rowCount is only a count; it supplies no cell values. Supplement dates/editions come from their parent table and are not a separate supplementary review.\n\nURLs follow the source routing contract; no live HTTP availability check is claimed by this export. No table descriptions, source notes, articles, worked examples, FAQs, blueprints, images, downloads or calculators are included. Follow the canonical links or [Tafelwerk hub](https://quanta-study.de/tafelwerk) to read online.\n\nThe included metadata follows the repository CC BY 4.0 license; third-party source works and absent online content are not relicensed. Source-declared dates are preserved, not replaced by an export/release date. See the parent [scope notice](../LICENSE-SCOPE.md).\n';
  const files = new Map([['reference-index.json', j(index)], ['reference-index.schema.json', schema], ['README.md', readme]]);
  const manifest = {schemaVersion: '1.0.0', artifactKind: 'reference-table-index-only', packageVersion: config.versions['quanta-mint-formeln'], sourceCommit: config.sourceCommit, sourceUrl: config.sourceUrl, mainTableCount: 19, supplementCount: 14, indexEntryCount: 33, exportedRowCount: 0, formulaCountContribution: 0, locales: ['de', 'en'], license: 'CC-BY-4.0', files: Object.fromEntries([...files].map(([name, value]) => [name, {sha256: hash(value), bytes: Buffer.byteLength(value)}]))};
  files.set('manifest.json', j(manifest));
  return files;
}

function build(name, subject) {
  const records = subject ? data.filter(item => item.kategorie === subject) : data;
  const categories = subject ? [subject] : subjects;
  const version = config.versions[name];
  const githubOnly = !Object.hasOwn(config.previousGitHubCounts, name);
  const schema = structuredClone(baseSchema);
  schema.$id = `urn:quanta:compact-formula-references:schema:3:${subject ?? 'all'}`;
  schema.items.properties.kategorie.enum = categories;
  schema.items.properties.kapitel.enum = [...new Set(records.map(item => item.kapitel))].sort();
  const packageFiles = ['formeln.json', 'index.js', 'index.d.ts', 'schema.json', 'README.md', 'CITATION.cff', 'LICENSE', 'LICENSE-SCOPE.md', 'CHANGELOG.md', 'manifest.json', 'test'];
  if (!subject) packageFiles.push('references', 'release-config.json', 'scripts/generate-subsets.mjs');
  const metadata = {name, version, description: `Compact German ${subject ?? 'STEM'} formula reference data with LaTeX, variable metadata, source references and TypeScript helpers.`, private: githubOnly, type: 'commonjs', main: 'index.js', types: 'index.d.ts', files: packageFiles, scripts: {test: 'node --test test/contract.test.cjs'}, keywords: ['dataset', 'formula', 'latex', subject ?? 'stem', 'typescript', 'quanta-study'], author: {name: `Quanta Study / ${config.publisher}`, url: 'https://quanta-study.de/'}, license: 'CC-BY-4.0', homepage: 'https://quanta-study.de/tafelwerk', repository: {type: 'git', url: `git+https://github.com/ammmcreativetech-dot/${name}.git`}, bugs: {url: `https://github.com/ammmcreativetech-dot/${name}/issues`}};
  const files = new Map([
    ['formeln.json', j(records)], ['index.js', helpers], ['index.d.ts', types(records, categories)],
    ['schema.json', j(schema)], ['package.json', j(metadata)], ['README.md', readme(name, subject, records, version, githubOnly)],
    ['CITATION.cff', citation(name, version, records)], ['LICENSE', license], ['LICENSE-SCOPE.md', scopeNotice()],
    ['CHANGELOG.md', `# Changelog\n\n## ${version}\n\n${githubOnly ? 'First standalone subject dataset.' : `Major compact-schema update from the ${config.previousGitHubCounts[name]}-record GitHub 2.0 snapshot.`}\n\n- ${records.length} compact German references; ${subject ? `category narrowed to ${subject}` : 'seven subject categories'}.\n- Keep notation, variable/unit metadata, source references, educational metadata and canonical URLs.\n- Exclude rich historical article/derivation/example fields. Existing historical CC BY 4.0 grants remain unchanged.\n- Preserve applicable CommonJS helpers and direct JSON access; add consistent chapter/education helpers.\n- Include exact JSON Schema, narrowed TypeScript declarations, source revision, checksums and citation metadata.\n- No publication date is assigned here; npm publication is separate from the versioned repository files.\n`],
    ['test/contract.test.cjs', contractTest(name)],
  ]);
  if (!subject) {
    files.set('release-config.json', j(config));
    files.set('scripts/generate-subsets.mjs', fs.readFileSync(fileURLToPath(import.meta.url), 'utf8'));
    for (const [filename, value] of referenceArtifacts()) files.set(`references/${filename}`, value);
  }
  const sorted = [...files].sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0);
  files.set('manifest.json', j({format: 'quanta-compact-formula-references', version, schemaVersion: config.schemaVersion, sourceCommit: config.sourceCommit, sourceUrl: config.sourceUrl, publisher: config.publisher, license: 'CC-BY-4.0', dataLanguage: 'de', englishFormulaDataIncluded: false, count: records.length, uniqueSlugs: new Set(records.map(item => item.slug)).size, subjects: categories, counts: Object.fromEntries(categories.map(category => [category, records.filter(item => item.kategorie === category).length])), fieldAllowlist: keys, generatedFrom: {repository: 'https://github.com/ammmcreativetech-dot/quanta-mint-formeln', coreDataSha256: hash(j(data))}, referenceIndex: subject ? null : {entries: 33, exportedRows: 0, formulaCountContribution: 0}, checksumScope: 'All declared repository artifacts except this manifest itself; workflows and Git metadata excluded', files: Object.fromEntries(sorted.map(([filename, value]) => [filename, {sha256: hash(value), bytes: Buffer.byteLength(value)}]))}));
  return files;
}

let output;
let check = false;
for (let i = 2; i < process.argv.length; i++) {
  if (process.argv[i] === '--check') check = true;
  else if (process.argv[i] === '--out-root' && process.argv[i + 1]) output = path.resolve(process.argv[++i]);
  else throw Error(`Unknown argument: ${process.argv[i]}`);
}
assert(output && output !== path.parse(output).root, 'Pass an explicit non-root --out-root; no installation or publication is performed');
let differences = 0;
for (const [name, subject] of family) {
  const directory = path.join(output, name);
  const files = build(name, subject);
  for (const [filename, content] of files) {
    const target = path.join(directory, filename);
    let cursor = output;
    for (const segment of path.relative(output, target).split(path.sep)) {
      cursor = path.join(cursor, segment);
      if (fs.existsSync(cursor)) assert(!fs.lstatSync(cursor).isSymbolicLink(), `Refusing symlink: ${cursor}`);
    }
    if (check) {
      if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== content) {console.error(`Different: ${name}/${filename}`); differences++;}
    } else {
      fs.mkdirSync(path.dirname(target), {recursive: true});
      fs.writeFileSync(target, content);
    }
  }
  console.log(`${check ? 'Checked' : 'Generated'} ${name}: ${subject ? data.filter(item => item.kategorie === subject).length : data.length} references`);
}
assert(differences === 0, `${differences} generated artifact(s) differ`);
