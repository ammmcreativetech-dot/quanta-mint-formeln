'use strict';
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
  assert.equal(metadata.name, 'quanta-mint-formeln'); assert.equal(metadata.version, manifest.version);
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
