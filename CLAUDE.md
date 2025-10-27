# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cosmical is an Obsidian theme that uses a modular CSS architecture with PostCSS for building. The theme features a sophisticated subtheme system for color customization and integrates with the Style Settings plugin for user configuration.

## Build System

### Development Commands

- `npm run dev` - Watch mode with hot reload (development build)
- `npm run build` - Production build (minified with cssnano)
- `npm run build:snippets` - Build individual CSS snippets from features
- `npm run version` - Bump version in manifest.json and versions.json

### Build Configuration

The build system uses Vite with PostCSS:

- **vite.config.js**: Handles three build modes:
  - `development`: Watch mode, outputs to root `theme.css`
  - `production`: Minified build, outputs to root `theme.css`
  - `snippets`: Builds each feature in `src/features/**/*.css` as separate files in `dist/snippets/`

- **postcss.config.js**: Processes CSS with:
  - `postcss-import` - Enables @import statements
  - `postcss-nested` - Supports nested CSS syntax
  - `postcss-custom-media` - Reusable media queries
  - `cssnano` - Minification (production only, preserves @settings comments)

### Output Structure

- Main theme: `theme.css` (in root, required by Obsidian)
- Development artifacts: Vite creates a `dist/` folder that should not be committed
- Snippets: Built to `dist/snippets/` when using snippets mode

## CSS Architecture

### Import Hierarchy (src/theme.css)

The theme follows a strict import order:

1. **Style Settings** - Plugin configuration
2. **Base** - Core variables and theme foundation
3. **Subthemes System** - Color scheme infrastructure
4. **UI Layers** - Main UI, secondary UI, settings
5. **Editor** - Typography, content blocks, tables, math
6. **Panels** - Sidebars and panel styling
7. **Plugins** - Third-party plugin support
8. **Features** - Properties, tags, heading variants

### Key Architectural Concepts

#### Subthemes System (src/subthemes/)

A centralized color system that provides reusable color schemes across multiple features:

- **theme-schema.css**: Defines the subtheme variable structure using OKLCH color space
  - Creates 4 color variants (2 base colors × 2 variants each)
  - Automatically adjusts luminosity and chroma for light/dark modes
  - Variables: `--subtheme-color-1-normal`, `--subtheme-color-1-darker`, `--subtheme-color-2-normal`, `--subtheme-color-2-darker`

- **definitions.css**: Defines 5 concrete subthemes (ocean, forest, twilight, sunset, monochrome)
  - Each subtheme sets base OKLCH values: `--subtheme-1-l`, `--subtheme-1-c`, `--subtheme-1-h` (and same for color 2)
  - The schema automatically generates all variants from these base values

Features like properties and headings can reference subtheme colors to maintain visual consistency.

#### Style Settings Integration

The theme integrates with Obsidian's Style Settings plugin via `src/settings/style-settings.css`:

- Uses `/* @settings ... */` comment syntax
- Supports bilingual labels (English/Spanish)
- Controls: class-select, class-toggle, variable-text, heading, info-text
- Manages: subtheme selection, font families, heading styles, sidebar options, property appearance

### Directory Structure

- `src/base/` - Core variables and theme foundation
- `src/editor/` - Editor-specific styles (typography, lists, tables, math)
- `src/features/` - Modular features (properties variants, tags, heading variants)
- `src/panels/` - Sidebar and panel layouts
- `src/plugins/` - Third-party plugin styling (e.g., notebook-navigator)
- `src/settings/` - Style Settings plugin configuration
- `src/subthemes/` - Centralized color scheme system
- `src/ui/` - General UI components (main, secondary, settings window)

## Theme Development Notes

### Color System

- Primary colors defined as RGB and HSL in `src/base/variables.css`
- Subtheme system uses OKLCH for perceptually uniform color adjustments
- Light/dark mode adaptations are handled automatically via CSS custom properties

### Obsidian Integration

- `manifest.json` defines theme metadata (name, version, minAppVersion, author)
- `versions.json` maps theme versions to minimum Obsidian versions
- Theme must output `theme.css` to repository root for Obsidian to detect it

### Version Management

When updating versions:
1. Update version in `package.json`
2. Run `npm run version` (uses `version-bump.mjs`)
3. This automatically updates `manifest.json` and `versions.json`
4. Commit changes and create GitHub release with `manifest.json` and `theme.css`

## File Conventions

- Use PostCSS nested syntax for better organization
- Preserve `@settings` comments (cssnano configured to keep them)
- Import order in `src/theme.css` must be maintained for proper cascade
- Feature CSS files should be self-contained and importable as snippets
