// Metadata routes work in dev, but this Vinext export does not emit their files.
// Generate ordinary static assets from the same content records before each build.
import {readFile,writeFile} from 'node:fs/promises';
import {transpileModule,ModuleKind,ScriptTarget} from 'typescript';
async function source(path) {
 const code=transpileModule(await readFile(path,'utf8'),{compilerOptions:{module:ModuleKind.ESNext,target:ScriptTarget.ES2022}}).outputText;
 return import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
}
const [{projects,films},{independentProjects,notes},{SITE_URL}]=await Promise.all([source('lib/portfolio.ts'),source('lib/editorial.ts'),source('lib/seo.ts')]);
const paths=['/','/local-ai','/studio','/notes',...projects.map(p=>`/work/${p.slug}`),...films.map(f=>`/studio/${f.slug}`),...independentProjects.map(p=>`/projects/${p.slug}`),...notes.map(n=>`/notes/${n.slug}`)];
if(new Set(paths).size!==paths.length)throw new Error('Duplicate sitemap route');
const escape=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;');
await writeFile('public/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(p=>`  <url><loc>${escape(SITE_URL+p)}</loc></url>`).join('\n')}\n</urlset>\n`);
await writeFile('public/robots.txt',`# Allow crawling so page-level noindex can be read on previews.\n# Indexing is enabled only in an explicitly approved production build.\nUser-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
console.log(`Prepared sitemap for ${paths.length} routes; preview indexing remains controlled by page metadata.`);
