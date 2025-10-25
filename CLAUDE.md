# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cosmical is an Obsidian theme with extensive customization options. The entire theme is contained in a single CSS file ([theme.css](theme.css)) with approximately 1200 lines of styles.

## Development Commands

- **Version bump**: `npm run version` - Automatically updates version numbers in [manifest.json](manifest.json) and [versions.json](versions.json) based on `package.json` version
- **Testing**: Install the theme in an Obsidian vault by symlinking or copying this directory to `.obsidian/themes/Cosmical`, then enable it in Appearance settings

## Theme Architecture

### Structure

The [theme.css](theme.css) file is organized into distinct sections (in order):

1. **@settings metadata** (lines 1-340): Style Settings plugin configuration defining all customizable options
2. **Theme variables** (lines 340-468): CSS custom properties for both `.theme-dark` and `.theme-light`
3. **Main UI elements** (lines 469-494): Core interface styling
4. **Other UI elements** (lines 512-585): Secondary interface components
5. **Editor elements** (lines 603-744): Content editing styles (blockquotes, callouts, lists, tables, headings)
6. **Menus and panels** (lines 763-858): Settings, sidebars, file explorer, ribbon icons
7. **Properties settings** (lines 876-1091): Metadata properties with multiple color schemes
8. **Tag settings** (lines 1108-1205): Tag styling and color variants

### Customization System

The theme uses Obsidian's Style Settings plugin for user customization:

- **@settings metadata**: YAML-like configuration at the top of theme.css defines all customizable options
- **class-toggle options**: Applied to body when enabled (e.g., `.hollow-tags`, `.better-tree-indent`)
- **class-select options**: Mutually exclusive choices (e.g., properties color schemes, tag colors)
- **variable-text options**: Direct CSS variable overrides for fonts and other properties
- **Localization**: Many settings include Spanish translations (`title.es`, `description.es`)

### Color Schemes

The theme includes multiple predefined color schemes for:

- **Properties**: 11 color schemes (Ocean, Space Adventure, Riverrun, Chromium, Emerald, Mecha, etc.)
- **Tags**: 10 color options (Industrial Orange, Racing Yellow, Emerald, Pine, Ocean, etc.)

Each color scheme is implemented as a CSS class that modifies property or tag variables.

## Important Patterns

### CSS Class Structure

- Theme variants use `.theme-dark` and `.theme-light` selectors
- User preferences apply CSS classes to the body element
- Negative selectors (`:not(.classname)`) handle opt-out behavior
- Color schemes use descendant selectors (`.theme-dark.properties-color-scheme-ocean`)

### Variable Naming

- Core theme variables use `--` prefix (e.g., `--background-primary`)
- Custom fonts reference `var(--text-font)` as default
- Color scheme variables follow patterns like `--property-[name]-color`

## Release Process

1. Update version in [package.json](package.json)
2. Run `npm run version` to sync version numbers
3. Commit changes to [manifest.json](manifest.json) and [versions.json](versions.json)
4. Create GitHub release with tag matching version number
5. Upload `manifest.json` and `theme.css` to the release
6. The `minAppVersion` in manifest.json determines Obsidian compatibility

## Key Files

- **[theme.css](theme.css)**: The entire theme - all styling and @settings configuration
- **[manifest.json](manifest.json)**: Theme metadata (name, version, author, minAppVersion)
- **[versions.json](versions.json)**: Maps theme versions to minimum compatible Obsidian versions
- **[version-bump.mjs](version-bump.mjs)**: Automation script for version updates
- **[package.json](package.json)**: npm scripts and project metadata

## Editing Guidelines

- When modifying theme.css, maintain the existing section structure
- Keep @settings metadata in sync with actual CSS classes and variables
- Test changes in both light and dark modes
- Ensure color scheme modifications update all relevant variables in the scheme
- When adding new customization options, include Spanish translations
