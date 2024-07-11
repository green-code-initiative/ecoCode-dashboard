import fs from 'node:fs/promises'

// config
const PROJECT_ROOT = new URL('../', import.meta.url);
const STORYBOOK_DIR = new URL('./storybook-static/', PROJECT_ROOT);

/** Load Storybook story for Playwright testing */
export async function loadStory(page, storyID) {
  // load stories.json
  const storiesManifestLoc = new URL('stories.json', STORYBOOK_DIR);
  if (!await fs.access(storiesManifestLoc, fs.constants.R_OK)) {
    console.error('✘ Could not find storybook-static/stories.json. Try rebuilding with `pnpm build:sb`');
    process.exit(1);
  }
  const storiesManifest = JSON.parse(await fs.readFile(storiesManifestLoc, 'utf8'));

  // load specific story
  const storyMeta = storiesManifest.stories[storyID];
  if (!storyMeta) {
    console.error(`✘ Could not find story ID "${storyID}". Try rebuilding with \`pnpm build:sb\``);
    process.exit(1);
  }
  const search = new URLSearchParams({ viewMode: 'story', id: storyMeta.id });
  await page.goto(`iframe.html?${search.toString()}`, { waitUntil: 'networkidle' });

  // wait for page to finish rendering before starting test
  await page.waitForSelector('#root');
}