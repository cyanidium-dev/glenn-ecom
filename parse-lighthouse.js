const fs = require('fs');
const html = fs.readFileSync('lighthouse-report.html', 'utf8');
const match = html.match(/window\.__LIGHTHOUSE_JSON__\s*=\s*(\{[\s\S]*?\});?\s*</);
if (!match) {
  console.log('No JSON found');
  process.exit(1);
}
const data = JSON.parse(match[1]);

console.log('=== CATEGORY SCORES (0-100) ===');
const cats = data.categories || {};
for (const [id, c] of Object.entries(cats)) {
  console.log('  ' + id + ': ' + Math.round((c.score || 0) * 100));
}

console.log('\n=== ENVIRONMENT (affects scores) ===');
const env = data.environment || {};
console.log('  Device simulated: ' + (env.networkUserAgent || '').split('(')[1]?.split(')')[0] || 'N/A');
console.log('  Benchmark index (CPU): ' + env.benchmarkIndex + ' (higher = slower device)');
console.log('  URL: ' + data.requestedUrl);

console.log('\n=== KEY PERFORMANCE METRICS ===');
const audits = data.audits || {};
const perfKeys = ['first-contentful-paint', 'largest-contentful-paint', 'total-blocking-time', 'cumulative-layout-shift', 'speed-index', 'interactive'];
for (const k of perfKeys) {
  const a = audits[k];
  if (a) console.log('  ' + k + ': ' + (a.displayValue || a.numericValue) + ' | score: ' + a.score);
}

console.log('\n=== FAILED / WARNING AUDITS (score < 1) ===');
let count = 0;
for (const [id, a] of Object.entries(audits)) {
  if (a.score !== null && a.score !== undefined && a.score < 1) {
    console.log('  [' + id + '] ' + a.title + ' (score: ' + a.score + ')');
    count++;
  }
}
if (count === 0) console.log('  (none)');
