import AbortController from "abort-controller";
import * as fs from 'fs/promises';
import fetch from 'node-fetch';
import { URL } from 'url';

export const type = 'nodebuffer';

const fetchable = async (url: string, timeout: number) => {
  const controller = new AbortController();
  const out = setTimeout(() => controller.abort(), timeout);

  try {
    if (url.startsWith('file://'))
      return fs.readFile(new URL(url), { signal: controller.signal });
    
    const option = { signal: controller.signal };
    if (url.indexOf('readpai.com') > 0)
      option['headers'] = { 'referer':'https://tw.linovelib.com/'};
    const res = await fetch(url, option);
    
    if (!res.ok)
      throw new Error(`Got error ${res.status} (${res.statusText}) while fetching ${url}`);
    return res.buffer();
  } finally {
    clearTimeout(out);
  }
};
export default fetchable;