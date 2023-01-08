import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";
import remarkFigureCaption from '@microflash/remark-figure-caption'
import remarkObsidian from 'remark-obsidian';

import { getContentMdFileList, helperDirsAndFile, generatePathSlug } from './src/garden.ts'

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  markdown: {
    remarkPlugins: [
      remarkFigureCaption,
      () => {
        const mdFileList = getContentMdFileList();
        return remarkObsidian({
          titleToUrl: (title) => {            
            const index = mdFileList.findIndex(mdPath => mdPath.includes(title));
            if (index !== -1) {
              const { dir, filename } = helperDirsAndFile(mdFileList[index]);
              return `/${generatePathSlug(dir, filename)}`;
            }
            return `/${generatePathSlug('', title)}`;
          }
        })
      }
    ],
    extendDefaultPlugins: true,
  },
});