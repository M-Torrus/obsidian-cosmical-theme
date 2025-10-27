# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Cosmical is an Obsidian theme that uses a modular CSS architecture with PostCSS build tools. The theme features a dynamic subtheme system with OKLCH color spaces for automatic light/dark mode adaptation, and integrates with Obsidian's Style Settings plugin for user customization.

## Build Commands

### Development
```bash
npm run dev
```
Runs Vite in watch mode with development settings. Automatically rebuilds `theme.css` in the root directory when source files change. PostCSS plugins run without minification.

### Production Build
```bash
npm run build
```
Creates minified production `theme.css` with cssnano compression. Preserves `@settings` comments for Style Settings plugin compatibility.

### Snippets Build
```bash
npm run build:snippets
```
Builds individual CSS feature files from `src/features/` into separate snippet files in `dist/snippets/`. Each feature becomes a standalone CSS snippet.

### Version Management
```bash
npm run version
```
Automatically updates `manifest.json` and `versions.json` with the current package version from `package.json`. Run before creating GitHub releases.

## Architecture

### Build System

The theme uses Vite + PostCSS with three key plugins:

1. **postcss-import**: Processes `@import` statements to combine CSS modules
2. **postcss-nested**: Enables SCSS-like nesting syntax
3. **postcss-custom-media**: Allows reusable media query definitions
4. **cssnano** (production only): Minifies CSS while preserving `@settings` comments

The build outputs `theme.css` to the repository root (where Obsidian expects it), not to `dist/`.

### Source Structure

Entry point: [src/theme.css](src/theme.css) - imports all modules in dependency order:

```
src/
├── settings/           # Style Settings plugin configuration
│   └── style-settings.css  # @settings block with user-facing options
├── base/              # Core variables and foundation
│   └── variables.css      # Color palettes, base vars for light/dark themes
├── subthemes/         # Dynamic color scheme system
│   ├── theme-schema.css   # OKLCH color logic and light/dark adapters
│   └── definitions.css    # Subtheme palette definitions (Ocean, Forest, etc.)
├── ui/                # Main interface components
│   ├── main-ui.css        # Primary UI elements
│   ├── secondary-ui.css   # Secondary interface elements
│   └── settings-window.css # Settings modal styling
├── editor/            # Content editing styles
│   ├── content-blocks.css # Block-level content
│   ├── lists.css          # List formatting
│   ├── tables.css         # Table styles
│   ├── math.css           # Math/LaTeX rendering
│   └── headings.css       # Heading styles (h1-h6)
├── panels/            # Sidebar and panel components
│   └── sidebars.css       # Left/right sidebar styling
├── plugins/           # Third-party plugin compatibility
│   └── notebook-navigator.css
└── features/          # Modular feature toggles
    ├── css-classes.css    # Custom CSS class utilities
    ├── properties.css     # Metadata/properties styling
    ├── tags.css           # Tag appearance
    └── editor.css         # Editor-specific features
```

### Subtheme System (Key Architecture)

The most complex part of the theme is the **subtheme system** in `src/subthemes/`, which provides theme-wide color schemes:

**How it works:**

1. **Definitions** ([src/subthemes/definitions.css](src/subthemes/definitions.css)): Each subtheme (Ocean, Forest, Twilight, Sunset, Monochrome) defines 2 base colors using OKLCH components:
   - `--subtheme-1-l`, `--subtheme-1-c`, `--subtheme-1-h` (primary color)
   - `--subtheme-2-l`, `--subtheme-2-c`, `--subtheme-2-h` (accent color)

2. **Schema** ([src/subthemes/theme-schema.css](src/subthemes/theme-schema.css)): Calculates luminosity variants automatically:
   - Dark mode: Uses base luminosity values with small adjustments (±0.1)
   - Light mode: Darkens colors significantly (-0.45) for readability
   - Generates 3 variants per color: `normal`, `alt`, `high`

3. **Output**: Creates 6 final color variables per subtheme:
   - `--subtheme-color-1-normal`, `--subtheme-color-1-alt`, `--subtheme-color-1-high`
   - `--subtheme-color-2-normal`, `--subtheme-color-2-alt`, `--subtheme-color-2-high`

4. **Usage**: Features like properties, headings, and tags reference these subtheme color variables, automatically adapting when users switch subthemes or light/dark mode.

**Why this matters:** When adding new features that should support subthemes, use the `--subtheme-color-*` variables instead of hardcoded colors. The system handles light/dark mode adaptation automatically.

### Style Settings Integration

[src/settings/style-settings.css](src/settings/style-settings.css) contains the `@settings` comment block that defines user-facing customization options. The format follows the [Style Settings plugin specification](https://github.com/mgmeyers/obsidian-style-settings).

**Important:** The `@settings` comments must be preserved during minification. The PostCSS config handles this by filtering comments in cssnano.

Available settings include:
- Subtheme selection (class-select)
- Feature toggles (class-toggle) for colored headings, tags, hollow tags, custom caret, etc.
- Font family overrides (variable-text)
- Container style variants (class-select with allowEmpty)

Settings use either:
- **class-toggle**: Adds/removes a CSS class on `body` element
- **class-select**: Switches between predefined CSS classes
- **variable-text**: Modifies a CSS custom property value

## Common Tasks

### Adding a New Subtheme

1. Add definition in [src/subthemes/definitions.css](src/subthemes/definitions.css):
   ```css
   .subtheme-yourname {
       --subtheme-1-l: 0.85;  /* Luminosity (0-1) */
       --subtheme-1-c: 0.10;  /* Chroma (saturation) */
       --subtheme-1-h: 200;   /* Hue (0-360) */

       --subtheme-2-l: 0.88;
       --subtheme-2-c: 0.08;
       --subtheme-2-h: 45;
   }
   ```

2. Add option in [src/settings/style-settings.css](src/settings/style-settings.css) under the `subtheme` setting's options array:
   ```yaml
   -
     label: Your Name
     value: subtheme-yourname
   ```

3. Test in both light and dark modes to ensure readability.

### Adding a New Feature

1. Create CSS file in `src/features/your-feature.css`
2. Add import to [src/theme.css](src/theme.css) in the Features section
3. If user-configurable, add a setting in [src/settings/style-settings.css](src/settings/style-settings.css)
4. Use `--subtheme-color-*` variables if the feature should adapt to subtheme selection

### Modifying UI Components

- Main interface: [src/ui/main-ui.css](src/ui/main-ui.css)
- Secondary elements: [src/ui/secondary-ui.css](src/ui/secondary-ui.css)
- Settings modal: [src/ui/settings-window.css](src/ui/settings-window.css)

Use CSS nesting and reference existing color variables from [src/base/variables.css](src/base/variables.css) or the subtheme system.

### Testing Changes

After making changes:

1. Run `npm run dev` to watch for changes
2. Open Obsidian and enable the theme (Settings > Appearance > Themes)
3. Reload Obsidian (Ctrl/Cmd + R) to see updates
4. Test in both light and dark modes
5. If Style Settings options were added, verify they appear correctly

### Preparing a Release

1. Update version in [package.json](package.json)
2. Run `npm run version` to sync manifest and versions files
3. Run `npm run build` to create production build
4. Commit changes including `manifest.json`, `versions.json`, and `theme.css`
5. Create GitHub release with the version tag, attaching `manifest.json` and `theme.css`

## Color System Reference

### Base Colors (All Themes)
Defined in [src/base/variables.css](src/base/variables.css):
- RGB color system: `--color-{red,orange,yellow,green,cyan,blue,purple,pink}-rgb`
- Named colors: `--color-{red,orange,yellow,green,cyan,blue,purple,pink}`

### Theme-Specific Colors
- Dark: `--color-base-{00,05,10,20,30,40,50,60,70,100}` using OKLCH
- Light: Same variable names with inverted luminosity scale
- Background layers: `--background-{primary,primary-alt,secondary,secondary-alt}`
- Text hierarchy: `--text-{normal,muted,faint}`

### Subtheme Colors
Six dynamically generated colors per active subtheme:
- `--subtheme-color-1-{normal,alt,high}`: Primary color variants
- `--subtheme-color-2-{normal,alt,high}`: Accent color variants

Use these for features that should adapt to user's subtheme selection.

## File Conventions

- Use lowercase with hyphens for file names: `my-feature.css`
- Group related styles in single files by component/feature
- Use CSS nesting sparingly - prefer flat selectors for maintainability
- Add comments for complex color calculations or non-obvious selectors
- Preserve the import order in [src/theme.css](src/theme.css) (base → subthemes → UI → editor → features)
