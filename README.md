<p align="center">
  <img src="images/Cosmical-logo.svg" alt="Cosmical Logo" width="160">
</p>

<h1 align="center">Cosmical</h1>

<p align="center">
An Obsidian theme created to enchance the note taking experience. It balances color use inspired by coding editors and a neutral background to keep things balanced
</p>

<p align="center">
  <img src="images/obsidian-properties%20light.png" alt="Cosmical Properties Light" width="49%">
  <img src="images/forest-properties%20dark.png" alt="Cosmical Properties Dark" width="49%">
</p>

![Cosmical Dark Theme](images/Cosmical%20theme%20Base%20dark.png)

![Cosmical Light Theme](images/Cosmical%20theme%20Base%20light.png)

---

## Theme

Cosmical is my personal take on how Obsidian should look. My main goal is to make Obsidian look more atractive while maintaining focus and not adding distractions.

Two main features:
- A neutral background inspired by Gnome
- Rich accents and vibrant colors inspired by coding editors

The plugin [Style Settings](https://github.com/mgmeyers/obsidian-style-settings) is needed to pick a differente subtheme.

## Features

### Main Features

-   **Five color schemes**: Ocean (default), Forest, Twilight, Sunset, and Monochrome. Each one adapts automatically to light and dark mode
-   **Better properties/metadata**: Alternative container styles (dashed, outline), bold labels, improved multi-select lists, and more control over what shows
-   **Neutral color palette**: Clean backgrounds without blue tints, vibrant accent colors that actually help readability
-   **Lots of customization**: Powered by [Style Settings](https://github.com/mgmeyers/obsidian-style-settings) plugin. Change subthemes, colors, fonts, and UI elements
-   **Automatic light/dark adaptation**: Uses OKLCH color space so everything looks good in both modes
-   **Custom typography**: Set your own font family for headings
-   **Plugin compatibility**: Works with Notebook Navigator and more

### Snippet Goodies

Small features you can toggle on/off:

-   Colored headings (with optional underlines)
-   Colored tags
-   Hide or customize file titles
-   Control sidebar toggle button visibility
-   Improved multi-select list UX

Style Settings options available in English and Spanish.

## Installation

### Comunity Plugins (soon)

1. Open Obsidian Settings
2. Navigate to **Appearance** → **Themes**
3. Click **Browse** and search for "Cosmical"
4. Click **Install**

### Manual (not recommended)

1. Open your system File explorer
2. Navigate to the root folder of your vault
3. Open ".obsidian/themes"
4. Create new folder "Cosmical" and open it
5. Copy manifest.json and theme.css
6. Cosmical should now appear as an installed theme

## Recommended Setup

These community plugins work well with Cosmical:

-   **[Style Settings](https://github.com/mgmeyers/obsidian-style-settings)**: Required for customization options
-   **Notebook Navigator** (optional): Additional theme compatibility included

## Development + Contributing

I used Vite + PostCss to help with the development workflow. I created this based on a legacy theme I had and divided it into diferent files to help with the caos.

### Commands

The `theme.css` is minified automatically

Setup

```bash
npm install
```

Automatic rebuilds

```bash
npm run dev
```

Build

```bash
npm run build
```

## Future improvements:

I want refine the UI, fix bugs and inconsistent styles.

The plugin should be compatible with plugins, but some may need for specific css variables

Improve and add additional subthemes based on feedback

Subtheme affect more parts of the UI, without being to much

More customization options and cool/useful snippets

## Contributing

You can send suggestion using [open an issue](https://github.com/M-Torrus/cosmical-obsidian/issues).

## License

This theme is released under the MIT License. See [LICENSE](LICENSE) for details.

## Other

Checkout my other theme for Visual Studio Code [VSCode-Cosmical](https://marketplace.visualstudio.com/items?itemName=jorgemrtr.cosmical)
