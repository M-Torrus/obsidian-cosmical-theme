# Desarrollo del Tema Cosmical

Este documento explica cómo trabajar con la nueva estructura modular del tema Cosmical.

## 🏗️ Estructura del Proyecto

```
Cosmical/
├── src/                           # 📂 Código fuente modular (EDITAR AQUÍ)
│   ├── settings/                  # Configuración Style Settings
│   ├── base/                      # Variables base del tema
│   ├── ui/                        # Elementos de interfaz
│   ├── editor/                    # Elementos del editor
│   ├── panels/                    # Paneles laterales
│   ├── features/                  # Features específicas
│   │   ├── properties/           # Sistema de propiedades
│   │   └── tags/                 # Sistema de tags
│   └── theme.css                 # Archivo principal (imports)
│
├── theme.css                      # ✨ TEMA COMPILADO (generado automáticamente)
├── theme.css.backup               # Tema original monolítico (backup)
│
├── dist/                          # 🗑️ Opcional - solo si ejecutas build:snippets
│   └── snippets/                 # (ignorado por git)
│
├── vite.config.js                # Configuración de build
├── postcss.config.js             # Plugins PostCSS
├── package.json                  # Scripts y dependencias
├── manifest.json                 # Metadata del tema (versión, autor)
└── versions.json                 # Compatibilidad con Obsidian
```

## 🚀 Comandos Disponibles

### Desarrollo

```bash
npm run dev
```

**Modo desarrollo con watch**:
- Observa cambios en `src/`
- Regenera `theme.css` automáticamente en la raíz
- Obsidian recarga el tema en tiempo real
- Ideal para desarrollo iterativo

**Importante**: Este comando genera `theme.css` directamente en la raíz del proyecto, donde Obsidian puede detectarlo.

### Build Producción

```bash
npm run build
```

**Build completo del tema**:
- Genera `theme.css` en la raíz con todas las features
- Output listo para distribución y para commitear
- Sin minificar (readable)

### Build Snippets (Opcional)

```bash
npm run build:snippets
```

**Genera features como snippets individuales**:
- Cada feature en `src/features/` se compila por separado
- Output en `dist/snippets/` (ignorado por git)
- Útil para usuarios que solo quieren features específicas
- **Opcional**: Solo ejecuta esto si quieres distribuir snippets en un release

### Actualizar Versión

```bash
npm run version
```

**Sincroniza versiones**: Actualiza `manifest.json` y `versions.json` basándose en `package.json`.

## 📁 Organización de Módulos

### Settings
- **style-settings.css**: Toda la configuración del plugin Style Settings

### Base
- **variables.css**: Colores base (RGB, HSL, color-base-X, pos-X-bg)
- **theme-core.css**: Variables core (backgrounds, borders, text, icons)

### UI
- **main-ui.css**: Titlebar, ribbon, sidepanel, status bar
- **secondary-ui.css**: Menus, forms, modals, code blocks
- **settings-window.css**: Ventana de configuración

### Editor
- **typography.css**: Fonts, headings, inline-title
- **content-blocks.css**: Blockquotes, callouts, embeds, hr
- **lists.css**: Listas y markers
- **tables.css**: Estilos de tablas

### Panels
- **sidebars.css**: Configuración de sidebars
- **file-explorer.css**: File explorer tweaks
- **ribbon-icons.css**: Iconos de ribbon coloreados
- **hide-icons.css**: Utilities para ocultar iconos

### Features
#### Properties
- **base.css**: Estilos base de propiedades
- **variants.css**: Variantes de contenedor (separator, outline)
- **color-schemes.css**: 11 esquemas de color

#### Tags
- **base.css**: Estilos base de tags (hollow tags incluido)
- **color-schemes.css**: 10 esquemas de color

#### Headings
- **headings-variants.css**: Variantes de headings (lines, lines-and-dashes)

## 🔧 Workflow de Desarrollo

### 1. Desarrollo Iterativo

```bash
# Terminal 1: Ejecutar watch mode
npm run dev

# Terminal 2: Editar archivos en src/
# Los cambios se compilan automáticamente
```

### 2. Añadir una Nueva Feature

1. Crea un nuevo archivo en la carpeta apropiada:
   ```bash
   src/features/mi-feature/nueva-feature.css
   ```

2. Añade el import en `src/theme.css`:
   ```css
   @import './features/mi-feature/nueva-feature.css';
   ```

3. El build incluirá automáticamente la nueva feature

### 3. Modificar Variables

- **Colores base**: Edita `src/base/variables.css`
- **Variables del tema**: Edita `src/base/theme-core.css`
- **Variables de feature**: Edita el archivo específico de la feature

### 4. Testing Local

**Durante desarrollo** (con `npm run dev`):
- Los cambios en `src/` se compilan automáticamente a `theme.css`
- Obsidian detecta los cambios y recarga el tema en tiempo real
- No necesitas copiar archivos manualmente

**Para probar un build final**:
```bash
npm run build
```
- Genera `theme.css` en la raíz
- Obsidian lo carga automáticamente

## 🎨 Añadir un Nuevo Color Scheme

### Para Properties:

1. Abre `src/features/properties/color-schemes.css`

2. Añade tu esquema:
   ```css
   .properties-color-scheme-mi-esquema {
     --property-h: 180;
     --property-s: 70%;
     --property-l: 65%;
     --darker-property-color: hsl(180, 60%, 55%);
     --property-input-color: hsl(180, 70%, 75%);
   }
   ```

3. Añade la opción en `src/settings/style-settings.css`:
   ```yaml
   -
     label: Mi Esquema
     value: properties-color-scheme-mi-esquema
   ```

### Para Tags:

1. Abre `src/features/tags/color-schemes.css`

2. Añade tu esquema:
   ```css
   .tags-mi-color {
     --tag-h: 180;
     --tag-s: 70%;
     --tag-l: 65%;
   }
   ```

3. Añade la opción en `src/settings/style-settings.css`

## 📦 Workflow: Desarrollo → GitHub → Release

### Para Desarrollo Local (en tu vault de Obsidian)

Este tema está instalado directamente en tu vault en `.obsidian/themes/Cosmical/`:

1. **Desarrolla con hot reload**:
   ```bash
   npm run dev
   ```

2. **Edita archivos en `src/`**:
   - Los cambios se compilan automáticamente a `theme.css`
   - Obsidian recarga el tema en tiempo real
   - No necesitas hacer nada más

### Para Publicar en GitHub

1. **Genera el build final**:
   ```bash
   npm run build
   ```
   - Esto genera `theme.css` en la raíz del proyecto

2. **Commitea los cambios**:
   ```bash
   git add src/ theme.css manifest.json
   git commit -m "Update theme"
   git push
   ```

**Qué commitear**:
- ✅ `src/` - Código fuente modular
- ✅ `theme.css` - Tema compilado (para usuarios que clonan el repo)
- ✅ `manifest.json` - Metadata del tema
- ✅ `versions.json` - Compatibilidad
- ❌ `node_modules/` - Ignorado por .gitignore
- ❌ `dist/` - Ignorado por .gitignore (se regenera cuando se necesita)

### Para Release Oficial (Obsidian Community Themes)

1. **Actualiza la versión**:
   ```bash
   # Edita package.json y cambia la versión
   npm run version
   ```
   - Sincroniza `manifest.json` y `versions.json`

2. **Genera el build final**:
   ```bash
   npm run build
   npm run build:snippets  # Opcional: para incluir snippets
   ```

3. **Commit y tag**:
   ```bash
   git add .
   git commit -m "Release v1.x.x"
   git tag v1.x.x
   git push && git push --tags
   ```

4. **Crea release en GitHub**:
   - Ve a Releases → New Release
   - Selecciona el tag `v1.x.x`
   - Sube estos archivos:
     - ✅ `theme.css` (desde la raíz)
     - ✅ `manifest.json`
   - Opcionalmente sube `dist/snippets/` como ZIP

5. **Submit al equipo de Obsidian** (primera vez):
   - Sigue [la guía oficial](https://docs.obsidian.md/Themes/App+themes/Submit+your+theme)
   - Envía PR a `obsidianmd/obsidian-releases`

## 🐛 Troubleshooting

### El build no genera theme.css

**Solución**: Verifica que `src/theme.css` exista y tenga todos los @imports correctos.

### Los cambios no se reflejan en Obsidian

**Solución**:
1. Verifica que `npm run dev` esté ejecutándose
2. Fuerza recarga en Obsidian (Settings > Appearance > cambiar tema y volver)

### Error de PostCSS

**Solución**:
1. Verifica la sintaxis CSS en el archivo modificado
2. Asegúrate de que todos los @imports apunten a archivos existentes

### Snippets no se generan correctamente

**Solución**: Los snippets se generan con la estructura de carpetas de `src/features/`. Esto es normal. Los archivos están en `dist/snippets/src/features/`.

## 💡 Tips

1. **Editor**: Usa un editor con soporte CSS (VSCode, Cursor) para autocompletado
2. **Hot Reload**: Mantén `npm run dev` ejecutándose siempre durante desarrollo
3. **Git**: El `dist/` puede versionarse o no según prefieras
4. **Backup**: El archivo `theme.css` original aún existe como referencia

## 🔗 Recursos

- [Obsidian Theme Guidelines](https://docs.obsidian.md/Themes/App+themes/Build+a+theme)
- [Style Settings Plugin](https://github.com/mgmeyers/obsidian-style-settings)
- [PostCSS Documentation](https://postcss.org/)
- [Vite Documentation](https://vitejs.dev/)
