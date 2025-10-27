# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Cosmical is an Obsidian theme built with a modular CSS architecture using Vite, PostCSS, and modern CSS features. The theme provides a customizable color system with subthemes, extensive Style Settings plugin integration, and supports both light and dark modes.

## Build Commands

### Development
```bash
npm run dev
```
Runs Vite in watch mode with hot reloading. Outputs `theme.css` to the repository root so Obsidian can detect it automatically.

### Production Build
```bash
npm run build
```
Builds the production theme with optimized CSS using cssnano. Outputs `theme.css` to the root directory.

### Build Snippets
```bash
npm run build:snippets
```
Builds individual CSS features from `src/features/` as standalone snippets to `dist/snippets/`. Each feature becomes a separate CSS file.

### Version Bump
```bash
npm run version
```
Automatically updates `manifest.json` and `versions.json` with the current package version. This is configured as a pre-version npm hook.

## Architecture

### CSS Module System

The theme uses a hierarchical import structure defined in [src/theme.css](src/theme.css):

1. **Base Layer** - Core variables and theme foundation
   - [src/base/variables.css](src/base/variables.css) - OKLCH color variables, Obsidian base color scale (00-100), text/icon colors
   - [src/base/theme-core.css](src/base/theme-core.css) - Core theme styles

2. **Subthemes System** - Centralized color scheme management
   - [src/subthemes/theme-schema.css](src/subthemes/theme-schema.css) - Dynamic OKLCH color computation with automatic light/dark mode adaptation
   - [src/subthemes/definitions.css](src/subthemes/definitions.css) - Five predefined color schemes (Ocean, Forest, Twilight, Sunset, Monochrome)
   - Each subtheme defines 2 base colors (primary + accent) that generate 4 color variants

3. **UI Components** - Interface styling
   - [src/ui/](src/ui/) - Main UI, secondary UI, settings window
   - [src/panels/sidebars.css](src/panels/sidebars.css) - Sidebar panel styling

4. **Editor** - Note editing experience
   - [src/editor/](src/editor/) - Typography, lists, tables, math, CSS classes, content blocks

5. **Features** - Modular, toggleable components
   - [src/features/properties/](src/features/properties/) - Property/metadata styling with variants (outline, separator)
   - [src/features/tags/](src/features/tags/) - Tag styling with 10 color schemes
   - [src/features/headings-variants.css](src/features/headings-variants.css) - Alternative heading styles

6. **Plugins** - Third-party plugin integration
   - [src/plugins/](src/plugins/) - Plugin-specific styles

7. **Settings** - Style Settings plugin configuration
   - [src/settings/style-settings.css](src/settings/style-settings.css) - All user-configurable options with bilingual labels (English/Spanish)

### Subthemes System Deep Dive

The subthemes system is the theme's core color architecture:

- **Color Variables**: Each subtheme defines `--subtheme-1-*` (primary) and `--subtheme-2-*` (accent) in OKLCH format with L (luminosity), C (chroma), H (hue) components
- **Automatic Adaptation**:
  - Dark mode uses base luminosity values
  - Light mode darkens colors by 0.45 for readability
  - Alt variants adjust luminosity by ±0.1 for visual hierarchy
- **Application**: Features like properties and headings consume these variables, allowing instant color scheme switching without feature-specific color definitions
- **Extensibility**: New subthemes are added by defining L/C/H values in [src/subthemes/definitions.css](src/subthemes/definitions.css)

### Build System

- **Vite**: Module bundler with two modes:
  - Normal/dev mode: Builds `theme.css` to root for Obsidian
  - Snippets mode: Builds each feature as separate CSS file to `dist/snippets/`

- **PostCSS Pipeline**:
  - `postcss-import`: Resolves `@import` statements
  - `postcss-nested`: Enables nested CSS syntax
  - `postcss-custom-media`: Reusable media queries
  - `cssnano`: Minification in production (preserves `@settings` comments for Style Settings)

### Style Settings Integration

The theme extensively uses the Style Settings plugin (@settings format in [src/settings/style-settings.css](src/settings/style-settings.css)):
- All settings have English and Spanish labels/descriptions
- Settings are organized by headings (Theme Colors, Fonts, Headers, Sidebars, Properties)
- Uses `class-select` for color schemes, `class-toggle` for boolean options, `variable-text` for font customization
- The `@settings` comments must be preserved during minification (configured in [postcss.config.js](postcss.config.js))

## Key Conventions

### CSS Variables
- Use OKLCH color space for all color definitions (`oklch(L C H)`)
- Obsidian standard variables: `--color-base-XX` (00-100 scale), `--text-normal/muted/faint`, `--background-primary/secondary`
- Custom semantic layers: `--color-base-XXX-bg` for background layers, `--color-base-content` for text
- Subtheme variables: `--subtheme-N-{l,c,h}` for base values, `--subtheme-color-N-{normal,alt}` for computed colors

### File Organization
- Feature files in `src/features/` should be self-contained and buildable as snippets
- Each major UI area (editor, ui, panels) gets its own directory
- Plugin-specific styles go in `src/plugins/{plugin-name}.css`

### Obsidian Theme Requirements
- `theme.css` must be at repository root for Obsidian to detect the theme
- `manifest.json` defines theme metadata (name, version, minAppVersion, author)
- `versions.json` maps theme versions to minimum compatible Obsidian versions

## Releasing

1. Update version in `package.json`
2. Run `npm run version` (auto-updates manifest.json and versions.json)
3. Commit changes
4. Create git tag matching the version: `git tag X.Y.Z`
5. Push tag: `git push origin X.Y.Z`
6. GitHub Actions will automatically create a release with `theme.css` and `manifest.json`

## Common Workflows

### Adding a New Subtheme
1. Add color definition in [src/subthemes/definitions.css](src/subthemes/definitions.css) with class `.subtheme-{name}`
2. Define `--subtheme-1-{l,c,h}` and `--subtheme-2-{l,c,h}` variables
3. Add option to [src/settings/style-settings.css](src/settings/style-settings.css) under the `subtheme` setting
4. Features using subtheme variables automatically support the new scheme

### Adding a New Feature
1. Create `src/features/{feature-name}.css`
2. Import in [src/theme.css](src/theme.css)
3. If user-configurable, add settings to [src/settings/style-settings.css](src/settings/style-settings.css)
4. Feature will automatically build as snippet when running `npm run build:snippets`

### Modifying Colors
- For theme-wide colors: Edit [src/base/variables.css](src/base/variables.css)
- For subtheme colors: Edit [src/subthemes/definitions.css](src/subthemes/definitions.css)
- For feature-specific colors: Prefer using subtheme variables over hardcoded colors
