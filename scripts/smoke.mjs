import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const must=['index.html','src/main.js','src/style.css','netlify/functions/cms.mjs','netlify.toml','vite.config.js','seed.json'];
for(const f of must){if(!fs.existsSync(path.join(root,f)))throw new Error('Missing '+f)}
const seed=JSON.parse(fs.readFileSync(path.join(root,'seed.json'),'utf8'));
for(const k of ['site','news','docs','procedures','schedule','stats','settings','navigation','quickLinks','banners'])if(!(k in seed))throw new Error('Missing seed key '+k);
const main=fs.readFileSync(path.join(root,'src/main.js'),'utf8');
for(const route of ['/gioi-thieu','/tin-tuc','/van-ban','/thu-tuc','/lich-cong-tac','/tra-cuu','/lien-he','/quan-tri'])if(!main.includes(route))throw new Error('Missing route '+route);
for(const asset of ['/hero.svg','/news-1.svg','/news-2.svg','/news-3.svg','/news-4.svg'])if(!fs.existsSync(path.join(root,'public',asset.slice(1))))throw new Error('Missing asset '+asset);
const cms=fs.readFileSync(path.join(root,'netlify/functions/cms.mjs'),'utf8');
for(const endpoint of ['/login','/session','/content','/admin-data','/feedback','/lookup','/accounts','/backup','/media'])if(!cms.includes(endpoint))throw new Error('Missing API '+endpoint);
console.log('SMOKE PASS: structure, seed, routes, assets and API endpoints');
