# Image sources

The images in `public/images/sections/` are licensed stock photographs from
Unsplash. They were downloaded as JPEGs, cropped to 1600×900, and committed to
the repository so the static export has no runtime dependency on Unsplash.

Unsplash images are used under the [Unsplash License](https://unsplash.com/license),
which permits commercial use without asking permission. Attribution is not
required, but the source URLs are recorded here for provenance. The files were
cropped to 16:9 and sized below the repository's 300 KB asset warning threshold.

| Local file | Purpose | Source |
| --- | --- | --- |
| `leadership-strategy.jpg` | Home program preview — senior professionals collaborating | `https://images.unsplash.com/photo-1521737711867-e3b97375f902` |
| `executive-coaching.jpg` | Program and Contact hero imagery — one-to-one conversation | `https://images.unsplash.com/photo-1556761175-b413da4baf72` |
| `leadership-team.jpg` | Projects hero — team walking through a modern office | `https://images.unsplash.com/photo-1522071820081-009f0129c71c` |

`npm run images:optimize` generates the WebP and AVIF variants consumed by
`EditorialImage`. The photographs depict generic professional settings and are
not presented as photographs of Matthew Ogieva or client case-study subjects.
