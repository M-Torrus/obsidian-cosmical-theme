# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cosmical is an Obsidian theme with a sophisticated subtheme color system. It uses a modern CSS build pipeline with PostCSS transformations to generate a single `theme.css` file from modular source files.

## Development Commands

### Building
- `npm run dev` - Watch mode for development (auto-rebuilds on changes)
- `npm run build` - Production build with minification
- `npm run build:snippets` - Build individual feature files as CSS snippets (output to `dist/snippets/`)

### Versioning
- `npm run version` - Bump version in `manifest.json` and update `versions.json`

## Build System Architecture

### Entry Points
- **Main theme**: [src/theme.css](src/theme.css) is the entry point that imports all modules
- **Output**: The build outputs `theme.css` to the repository root (where Obsidian expects it)

### Build Modes
The Vite config ([vite.config.js](vite.config.js)) supports three modes:

1. **Development** (`npm run dev`): Watch mode, no minification
2. **Production** (`npm run build`): Minified output via cssnano, preserves `@settings` comments for the Style Settings plugin
3. **Snippets** (`npm run build:snippets`): Builds each file in `src/features/` as a standalone CSS snippet

### PostCSS Pipeline
The [postcss.config.js](postcss.config.js) applies these transformations:
- `postcss-import`: Resolves `@import` statements
- `postcss-nested`: Enables CSS nesting syntax
- `postcss-custom-media`: Enables reusable media queries
- `cssnano`: Minifies CSS in production (preserves `@settings` comments)

## CSS Architecture

### Module Organization
```
src/
├── base/           # Core variables and theme foundation
├── subthemes/      # Centralized color system (see below)
├── ui/             # Main UI, secondary UI, settings window
├── editor/         # Editor styles (headings, lists, tables, etc.)
├── panels/         # Sidebars and panel layouts
├── plugins/        # Plugin-specific styles
├── features/       # Modular features (properties, tags, editor)
└── settings/       # Style Settings plugin configuration
```

### Subtheme System
The subtheme system is the architectural centerpiece of this theme. It provides centralized color schemes that work across multiple features.

**Key files:**
- [src/subthemes/theme-schema.css](src/subthemes/theme-schema.css) - Defines how colors adapt between light/dark modes using OKLCH color space
- [src/subthemes/definitions.css](src/subthemes/definitions.css) - Defines 5 subthemes: Ocean (default), Forest, Twilight, Sunset, Monochrome

**How it works:**
1. Each subtheme defines 2 base colors in OKLCH format (Lightness, Chroma, Hue)
2. The schema automatically generates 3 variants per color (normal, alt, high) by adjusting luminosity
3. Light mode darkens colors for readability; dark mode uses base values with subtle variants
4. Features (properties, headings, tags) reference `--subtheme-color-1-normal`, `--subtheme-color-2-alt`, etc.

**Color variables available:**
- `--subtheme-color-1-normal`, `--subtheme-color-1-alt`, `--subtheme-color-1-high`
- `--subtheme-color-2-normal`, `--subtheme-color-2-alt`, `--subtheme-color-2-high`

### Style Settings Integration
The [src/settings/style-settings.css](src/settings/style-settings.css) file contains `@settings` metadata for the Style Settings plugin. This allows users to customize the theme via Obsidian's UI with options for:
- Subtheme selection
- Colored headings/tags toggle
- Custom fonts
- Editor preferences

These settings use class-toggle and class-select types that add/remove CSS classes on the body element.

## Working with Subthemes

When adding new features that should support subtheme colors:
1. Use the existing color variables (`--subtheme-color-1-normal`, etc.)
2. Add a class-toggle in [src/settings/style-settings.css](src/settings/style-settings.css) to make it optional
3. The colors will automatically adapt to light/dark mode and user's selected subtheme

Example pattern from [src/features/properties.css](src/features/properties.css):
```css
.metadata-property[data-property-key="status"] .metadata-property-value {
  background-color: var(--subtheme-color-1-normal);
}
```

## Obsidian Theme Requirements

- The compiled `theme.css` must be at the repository root
- [manifest.json](manifest.json) defines theme metadata (name, version, minAppVersion)
- `versions.json` maps theme versions to minimum Obsidian versions (for GitHub Releases)
- The theme uses the Style Settings plugin for user customization
