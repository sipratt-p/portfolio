"""Inspect exported HTML, not a browser. Default is the protected preview build."""
import json, sys, re
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
from xml.etree import ElementTree
ROOT=Path('dist/client')
ORIGIN='https://www.sethpratt.com'
PUBLIC='--public' in sys.argv
class Page(HTMLParser):
    def __init__(self,text):
        super().__init__(convert_charrefs=True)
        self.meta={}; self.canon=[]; self.ids=set(); self.links=[]; self.h1=0; self.title=''; self.json=[];self.script=None;self.in_title=False;self.a_depth=0;self.nested=False;self.videos=0;self.bodytext=[]
        self.feed(text)
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if a.get('id'): self.ids.add(a['id'])
        if tag=='meta': self.meta.setdefault(a.get('name',a.get('property','')),[]).append(a.get('content',''))
        if tag=='link' and a.get('rel')=='canonical': self.canon.append(a['href'])
        if tag=='h1': self.h1+=1
        if tag=='video': self.videos+=1
        if tag=='title': self.in_title=True
        if tag=='script': self.script={'type':a.get('type'),'body':''}
        if tag=='a':
            self.nested|=self.a_depth>0; self.a_depth+=1
            if a.get('href'): self.links.append(a['href'])
    def handle_endtag(self,tag):
        if tag=='title': self.in_title=False
        if tag=='a': self.a_depth-=1
        if tag=='script' and self.script:
            if self.script['type']=='application/ld+json': self.json.append(json.loads(self.script['body']))
            self.script=None
    def handle_data(self,d):
        if self.in_title:self.title+=d
        if self.script:self.script['body']+=d
        else:self.bodytext.append(d)

def route(file):
    p='/'+file.relative_to(ROOT).as_posix()
    return '/' if p=='/index.html' else p[:-5]
pages={route(p):Page(p.read_text()) for p in ROOT.rglob('*.html') if p.name!='404.html' and 'experiences' not in p.relative_to(ROOT).parts}
assert len(pages)==29,len(pages)
assert len({p.title for p in pages.values()})==len(pages),'Duplicate titles'
assert len({p.meta['description'][0] for p in pages.values()})==len(pages),'Duplicate descriptions'
for path,p in pages.items():
    assert p.h1==1,(path,'H1 count',p.h1)
    assert not p.nested,(path,'Nested anchors')
    assert len(p.canon)==1 and p.canon[0] in ([ORIGIN,ORIGIN+'/'] if path=='/' else [ORIGIN+path]),(path,p.canon)
    assert p.meta.get('og:url') in ([[ORIGIN],[ORIGIN+'/']] if path=='/' else [[ORIGIN+path]]),(path,'OG URL')
    assert p.meta.get('og:title')==[p.title],(path,'OG title')
    assert p.meta.get('og:description')==p.meta.get('description'),(path,'OG description')
    robots=','.join(p.meta.get('robots',[]))
    assert ('noindex' not in robots) if PUBLIC else ('noindex' in robots),(path,robots)
    person=[x for graph in p.json for x in graph.get('@graph',[]) if x.get('@type')=='Person']
    assert len(person)==1,(path,'Person schema')
    if path.startswith(('/projects/','/notes/')):
        assert any(g.get('@type')=='BreadcrumbList' for g in p.json),(path,'Breadcrumb schema')
        assert 'source-note' in p.ids and 'source-title' in p.ids
    public_text=' '.join(p.bodytext)
    assert not re.search(r'/home/|100\.83\.|192\.168\.|BROWSER_USE_API_KEY|HF_TOKEN|sk-[A-Za-z0-9]{20,}',public_text),path
    for href in p.links:
        if not href.startswith(('/', '#')) or href.startswith('//'): continue
        u=urlsplit(href); dest=u.path or path
        if dest in pages:
            if u.fragment:assert unquote(u.fragment) in pages[dest].ids,(path,href,'Missing fragment')
        else: assert (ROOT/dest.lstrip('/')).is_file(),(path,href,'Missing target')
assert pages['/'].videos==0
sitemap=ElementTree.parse(ROOT/'sitemap.xml')
urls=[e.text for e in sitemap.iter() if e.tag.endswith('}loc')]
assert set(urls)=={ORIGIN+p for p in pages},'Sitemap mismatch'
assert len(urls)==len(set(urls))
assert f'Sitemap: {ORIGIN}/sitemap.xml' in (ROOT/'robots.txt').read_text()
redirects=json.loads(Path('vercel.json').read_text())['redirects']
assert len(redirects)==9
for rule in redirects:
    assert rule['permanent']; u=urlsplit(rule['destination']); assert u.path in pages
    if u.fragment: assert u.fragment in pages[u.path].ids
assert all(rule['destination']!='/' for rule in redirects)
result={'pages':len(pages),'sitemap_urls':len(urls),'redirect_mappings':len(redirects),'mode':'public' if PUBLIC else 'noindex preview','checks':['unique titles/descriptions','self canonicals','OG metadata','H1','JSON-LD parse','Person relationships','breadcrumbs','internal links/fragments','no nested anchors','privacy patterns','sitemap coverage','legacy targets','no homepage video']}
print(json.dumps(result,indent=2))
