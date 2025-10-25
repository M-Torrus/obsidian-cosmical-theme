# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cosmical is an Obsidian theme with extensive customization options. The theme uses a **modular architecture** with source files in [src/](src/) that are compiled into [theme.css](theme.css) using Vite + PostCSS.

## Development Commands

- **Development mode**: `npm run dev` - Watch mode with hot reload for development (unminified CSS)
- **Build theme**: `npm run build` - Compile modular source into minified [theme.css](theme.css) for production
- **Build snippets**: `npm run build:snippets` - Generate individual feature snippets in [dist/snippets/](dist/snippets/)
- **Version bump**: `npm run version` - Automatically updates version numbers in [manifest.json](manifest.json) and [versions.json](versions.json) based on `package.json` version
- **Testing**: Install the theme in an Obsidian vault by symlinking or copying this directory to `.obsidian/themes/Cosmical`, then enable it in Appearance settings

**Important**: Always use `npm run dev` during development for hot reload. The source of truth is now [src/](src/), not [theme.css](theme.css).

**Build Process**: The production build uses `cssnano` for CSS minification while preserving @settings comments required by the Style Settings plugin.

## Theme Architecture

### Modular Structure

The theme source is organized into modules in [src/](src/):

```
src/
├── settings/
│   └── style-settings.css      # Style Settings plugin configuration
├── base/
│   ├── variables.css            # Base variables (fonts, colors: RGB, HSL, color-base-X)
│   └── theme-core.css          # Core theme variables (backgrounds, borders, text)
├── ui/
│   ├── main-ui.css             # Titlebar, ribbon, sidepanel, status bar
│   ├── secondary-ui.css        # Menus, forms, modals, code blocks
│   └── settings-window.css     # Settings window styling
├── editor/
│   ├── typography.css          # Fonts, headings, inline-title, view header
│   ├── css-classes.css         # CSS class utilities (full-width, etc.)
│   ├── content-blocks.css      # Blockquotes, callouts, embeds, hr
│   ├── lists.css               # List styles
│   ├── tables.css              # Table styles
│   └── math.css                # Math/MathJax styling
├── panels/
│   └── sidebars.css            # Sidebar configuration
├── features/
│   ├── properties/
│   │   ├── base.css            # Properties core styling
│   │   ├── variants.css        # Container variants (separator, outline)
│   │   └── color-schemes.css   # 11 color schemes
│   ├── tags/
│   │   ├── base.css            # Tags core styling
│   │   └── color-schemes.css   # 10 color schemes
│   └── headings-variants.css   # Heading variants (lines, dashes)
└── theme.css                    # Main entry point with @imports
```

The compiled [theme.css](theme.css) in the root is generated from these modules via `npm run build`.

### Customization System

The theme uses Obsidian's Style Settings plugin for user customization:

- **@settings metadata**: YAML-like configuration at the top of theme.css defines all customizable options
- **class-toggle options**: Applied to body when enabled (e.g., `.hollow-tags`, `.justify-icons-center`)
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
3. Run `npm run build` to generate final [theme.css](theme.css)
4. Commit changes: `git add src/ theme.css manifest.json versions.json`
5. Create git tag: `git tag v1.x.x && git push --tags`
6. Create GitHub release with tag matching version number
7. Upload [theme.css](theme.css) and [manifest.json](manifest.json) to the release
8. The `minAppVersion` in manifest.json determines Obsidian compatibility

See [DEVELOPMENT.md](DEVELOPMENT.md) for detailed workflow: development → GitHub → official release.

## Key Files

- **[src/](src/)**: Modular source files organized by feature/component (SOURCE - edit here!)
- **[src/theme.css](src/theme.css)**: Main entry point with @imports (SOURCE)
- **[theme.css](theme.css)**: Compiled & minified theme in project root (OUTPUT - auto-generated, do not edit!)
- **[theme.css.backup](theme.css.backup)**: Original monolithic theme (backup reference)
- **dist/**: Optional snippets folder (OUTPUT from `npm run build:snippets`, ignored by git)
- **[manifest.json](manifest.json)**: Theme metadata (name, version, author, minAppVersion)
- **[versions.json](versions.json)**: Maps theme versions to minimum compatible Obsidian versions
- **[version-bump.mjs](version-bump.mjs)**: Automation script for version updates
- **[package.json](package.json)**: npm scripts, project metadata, and dependencies (includes cssnano, cross-env)
- **[vite.config.js](vite.config.js)**: Vite build configuration (output directories, watch mode)
- **[postcss.config.js](postcss.config.js)**: PostCSS plugins configuration (cssnano minification, nested CSS, imports)
- **[DEVELOPMENT.md](DEVELOPMENT.md)**: Detailed development workflow documentation

## Editing Guidelines

- **NEVER edit [theme.css](theme.css) directly** - it's auto-generated and minified. Edit files in [src/](src/) instead
- Run `npm run dev` during development for hot reload (unminified output)
- Run `npm run build` for production to generate minified CSS
- When modifying modules, maintain the existing structure and organization
- Keep @settings metadata in [src/settings/style-settings.css](src/settings/style-settings.css) in sync with actual CSS classes
- Test changes in both light and dark modes
- Ensure color scheme modifications update all relevant variables in the scheme
- When adding new customization options, include Spanish translations
- After making changes, run `npm run build` to generate the final minified theme
- See [DEVELOPMENT.md](DEVELOPMENT.md) for detailed development workflow

### Adding New Features

When adding new styles or features:
- Create dedicated CSS files for significant features (e.g., [src/editor/math.css](src/editor/math.css) for math styling)
- Add utility classes to [src/editor/css-classes.css](src/editor/css-classes.css)
- Update [src/theme.css](src/theme.css) to import new files
- Add corresponding Style Settings options if needed
