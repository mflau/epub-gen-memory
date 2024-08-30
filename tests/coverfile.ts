import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import epub from '../lib';

(async () => {
  const f = await readFile(resolve(__dirname, '../../demo_preview.png'));
  const file = new File([f], 'cover.png');
  const content = await epub({ title: 'EPub Gen', cover: file, description: 'Epub with cover via <code>File</code> (<i>test</i>)' }, [{ content: `<p>Generate EPUB books from HTML with a simple API in Node.js or the browser.</p>` }]);
  await writeFile(`${__filename.slice(0, -3)}.epub`, Buffer.from(content));
})();