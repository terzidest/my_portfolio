import { readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const projectDirectory = path.resolve('public/assets/images/projects');
const profilePath = path.resolve('public/assets/images/profile.jpg');

const createVariants = async (input, requestedWidths) => {
  const widths = [...new Set(requestedWidths)];
  const extension = path.extname(input);
  const stem = input.slice(0, -extension.length);

  await Promise.all(
    widths.map((width) =>
      sharp(input)
        .rotate()
        .resize({ width })
        .webp({ quality: 82, effort: 5 })
        .toFile(`${stem}-${width}.webp`),
    ),
  );
};

await createVariants(profilePath, [320, 640]);

const projectFiles = (await readdir(projectDirectory))
  .filter((file) => file.endsWith('.png'))
  .sort();

for (const file of projectFiles) {
  const input = path.join(projectDirectory, file);
  const metadata = await sharp(input).metadata();
  const portrait = (metadata.height ?? 0) > (metadata.width ?? 0);
  // Wide originals (e.g. desktop screenshots) also get a 1280w variant so
  // the project detail hero stays sharp.
  const landscape = (metadata.width ?? 0) >= 1280 ? [320, 640, 1280] : [320, 640];
  await createVariants(input, portrait ? [480, 960] : landscape);
}
