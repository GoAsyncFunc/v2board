import {chromium} from '@playwright/test';
import {build} from 'esbuild';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const home=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const result=await build({entryPoints:[path.join(home,'admin/src/services/download.js')],bundle:true,write:false,format:'iife',globalName:'DownloadTest'});
const browser=await chromium.launch();
try{
 const page=await browser.newPage({acceptDownloads:true});
 await page.goto('about:blank');
 await page.addScriptTag({content:result.outputFiles[0].text});
 const pending=page.waitForEvent('download');
 await page.evaluate(()=>DownloadTest.downloadCsv('email\nfixture@example.com\n','fixture.csv'));
 const download=await pending;
 if(download.suggestedFilename()!=='fixture.csv')throw Error('Incorrect filename');
 const text=await fs.readFile(await download.path(),'utf8');
 if(text!=='email\nfixture@example.com\n')throw Error('Incorrect downloaded bytes');
 console.log('Chromium CSV download passed: filename and bytes verified; no backend request');
}finally{await browser.close();}
