# Cosmical

A carefully crafted Obsidian theme that balances visual appeal with functional clarity. Born from a VSCode theme of the same name, Cosmical brings a neutral, GNOME-inspired aesthetic with vibrant colors and balanced contrasts designed to be eye-catching without being distracting.

## Philosophy

Cosmical is built on three core principles:

- **Neutral Foundation**: A clean, neutral background free from blue tints, providing a calm canvas for your thoughts
- **Vibrant Accents**: Rich, carefully selected colors that bring life to your notes while maintaining excellent readability
- **Work-Focused Design**: Beautiful enough to enjoy, subtle enough to fade into the background when you're deep in focus

## Features

### Dynamic Subtheme System

Choose from five distinct color schemes that adapt intelligently to both light and dark modes:

- **Ocean** (default): Classic maritime palette with deep blue and warm gold accents
- **Forest**: Natural emerald green paired with copper tones
- **Twilight**: Inspired by Obsidian's signature purple with complementary cyan
- **Sunset**: Warm coral and deep violet combination
- **Monochrome**: Uses your Obsidian accent color with neutral grays

All subthemes use the OKLCH color space for perceptually uniform luminosity adjustments, ensuring perfect readability in any mode.

### Extensive Customization

Powered by the [Style Settings](https://github.com/mgmeyers/obsidian-style-settings) plugin, Cosmical offers granular control over:

#### Theme Colors
- Subtheme selection
- Colored headings option
- Colored tags with optional hollow style
- Custom caret color matching your subtheme

#### Editor
- Custom font family for headings
- Optional heading underlines
- File title customization (default style or hidden)

#### Sidebars
- Sidebar toggle button visibility controls

#### Properties (Metadata)
- Alternative container styles (dashed separator, outline)
- Bold property labels toggle
- Property header visibility
- Icon visibility control
- Improved multi-select list UX

### Modern CSS Architecture

Built with a modular PostCSS workflow:

- Automatic light/dark mode adaptation
- OKLCH color space for perceptual uniformity
- Clean, maintainable source structure
- CSS nesting support
- Snippet-ready features (build individual features as standalone CSS snippets)

### Bilingual Support

All Style Settings options include English and Spanish (Español) translations.

## Installation

### From Obsidian Community Themes (Coming Soon)

1. Open Obsidian Settings
2. Navigate to **Appearance** → **Themes**
3. Click **Browse** and search for "Cosmical"
4. Click **Install and use**

## Recommended Setup

For the best experience, install these community plugins:

- **[Style Settings](https://github.com/mgmeyers/obsidian-style-settings)**: Unlock all customization options
- **Notebook Navigator** (optional): Additional theme compatibility included

## Screenshots

_Screenshots coming soon_

## Development

Cosmical uses Vite + PostCSS for a modern development workflow.

### Setup

```bash
npm install
```

### Development Mode

```bash
npm run dev
```

Watches for changes and automatically rebuilds the theme.

### Build for Production

```bash
npm run build
```

Creates a minified `theme.css` ready for distribution.

### Build CSS Snippets

```bash
npm run build:snippets
```

Generates individual CSS snippets from features in `src/features/`.

## Roadmap

Cosmical is designed to grow organically. Planned improvements include:

- Expanded plugin compatibility
- Additional subthemes
- More customization options
- Enhanced UI refinements

Future projects may include custom Obsidian plugins that complement the Cosmical aesthetic, though these are in early conceptual stages.

## Contributing

Found a bug or have a suggestion? Feel free to [open an issue](https://github.com/M-Torrus/cosmical-obsidian/issues).

## Credits

**Author**: Torrus
**Inspired by**: The Cosmical VSCode theme

## License

This theme is released under the MIT License. See [LICENSE](LICENSE) for details.

---

<p align="center">
  <i>Made with ☕ for focused, beautiful note-taking</i>
</p>
