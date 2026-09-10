import fs from 'node:fs/promises';
import { watch } from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildTarget } from './build.mjs';
const home=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const target=process.argv[2]||'user';
if(!['user','admin'].includes(target))throw Error('Expected user or admin');
await buildTarget(target);
const base=path.join(home,'dist',target);
let building=false,pending=false,timer;
async function rebuild(){if(building){pending=true;return;}building=true;try{await buildTarget(target);console.log('Ready. Refresh browser to see changes.');}catch(e){console.error(e);}finally{building=false;if(pending){pending=false;rebuild();}}}
for (const folder of ['src', 'public']) watch(path.join(home,target,folder),{recursive:true},()=>{clearTimeout(timer);timer=setTimeout(rebuild,250);});
const types={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.json':'application/json','.woff':'font/woff','.woff2':'font/woff2'};
const backend=process.env.API_PROXY?new URL(process.env.API_PROXY):null;
if(backend&&!['http:','https:'].includes(backend.protocol))throw Error('API_PROXY must use HTTP(S)');
const port=Number(process.env.PORT||(target==='user'?3200:3201));
http.createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost');
  if(url.pathname.startsWith('/api/')){
   if(!backend){res.writeHead(503,{'Content-Type':'application/json'});res.end(JSON.stringify({message:'Set API_PROXY to a test backend, then restart dev server.'}));return;}
   const headers=new Headers();
   for(const name of ['content-type','authorization','cookie','accept','accept-language'])if(req.headers[name])headers.set(name,req.headers[name]);
   const chunks=[];let bytes=0;
   for await(const chunk of req){bytes+=chunk.length;if(bytes>10*1024*1024){res.writeHead(413);res.end();return;}chunks.push(chunk);}
   const response=await fetch(new URL(url.pathname+url.search,backend),{method:req.method,headers,body:['GET','HEAD'].includes(req.method)?undefined:Buffer.concat(chunks),redirect:'manual',signal:AbortSignal.timeout(30000)});
   const outHeaders={'Content-Type':response.headers.get('content-type')||'application/json','Cache-Control':'no-store'};
   const cookies=response.headers.getSetCookie();if(cookies.length)outHeaders['Set-Cookie']=cookies;
   if(response.headers.has('location'))outHeaders.Location=response.headers.get('location');
   res.writeHead(response.status,outHeaders);res.end(Buffer.from(await response.arrayBuffer()));return;
  }
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
  const file=path.resolve(base,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));
  if(!file.startsWith(base+path.sep)){res.writeHead(403);res.end();return;}
  const data=await fs.readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(req.method==='HEAD'?undefined:data);
 }catch(e){res.writeHead(e.code==='ENOENT'?404:502);res.end('Request failed');}
}).listen(port,'127.0.0.1',()=>console.log(`http://127.0.0.1:${port} — ${backend?'API proxy enabled (real test data)':'no backend configured'}`));
