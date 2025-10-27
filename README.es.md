# Cosmical

Un tema de Obsidian cuidadosamente diseñado que equilibra el atractivo visual con la claridad funcional. Nacido de un tema de VSCode del mismo nombre, Cosmical aporta una estética neutral inspirada en GNOME con colores vibrantes y contrastes equilibrados, diseñado para ser llamativo sin resultar distractor.

## Filosofía

Cosmical se construye sobre tres principios fundamentales:

- **Base Neutral**: Un fondo limpio y neutral libre de tintes azules, proporcionando un lienzo tranquilo para tus pensamientos
- **Acentos Vibrantes**: Colores ricos y cuidadosamente seleccionados que dan vida a tus notas mientras mantienen una excelente legibilidad
- **Diseño Enfocado al Trabajo**: Lo suficientemente hermoso para disfrutar, lo suficientemente sutil para desvanecerse en segundo plano cuando estás concentrado

## Características

### Sistema Dinámico de Subtemas

Elige entre cinco esquemas de color distintos que se adaptan inteligentemente tanto al modo claro como al oscuro:

- **Ocean** (por defecto): Paleta marítima clásica con azul profundo y acentos dorados cálidos
- **Forest**: Verde esmeralda natural combinado con tonos cobre
- **Twilight**: Inspirado en el púrpura característico de Obsidian con cian complementario
- **Sunset**: Combinación de coral cálido y violeta profundo
- **Monochrome**: Utiliza tu color de acento de Obsidian con grises neutros

Todos los subtemas utilizan el espacio de color OKLCH para ajustes de luminosidad perceptualmente uniformes, garantizando una legibilidad perfecta en cualquier modo.

### Personalización Extensiva

Potenciado por el plugin [Style Settings](https://github.com/mgmeyers/obsidian-style-settings), Cosmical ofrece control granular sobre:

#### Colores del Tema
- Selección de subtema
- Opción de encabezados coloreados
- Etiquetas coloreadas con estilo hueco opcional
- Color del cursor personalizado que coincide con tu subtema

#### Editor
- Familia de fuente personalizada para encabezados
- Subrayados opcionales en encabezados
- Personalización del título del archivo (estilo por defecto u oculto)

#### Paneles Laterales
- Controles de visibilidad del botón de alternancia de paneles

#### Propiedades (Metadatos)
- Estilos alternativos de contenedor (separador discontinuo, contorno)
- Alternador de etiquetas de propiedades en negrita
- Visibilidad del encabezado de propiedades
- Control de visibilidad de iconos
- Mejora de UX en listas de selección múltiple

### Arquitectura CSS Moderna

Construido con un flujo de trabajo modular con PostCSS:

- Adaptación automática a modo claro/oscuro
- Espacio de color OKLCH para uniformidad perceptual
- Estructura de código limpia y mantenible
- Soporte para anidamiento CSS
- Características listas para snippets (construye características individuales como snippets CSS independientes)

### Soporte Bilingüe

Todas las opciones de Style Settings incluyen traducciones en inglés y español.

## Instalación

### Desde los Temas de la Comunidad de Obsidian (Próximamente)

1. Abre la Configuración de Obsidian
2. Navega a **Apariencia** → **Temas**
3. Haz clic en **Explorar** y busca "Cosmical"
4. Haz clic en **Instalar y usar**

## Configuración Recomendada

Para la mejor experiencia, instala estos plugins de la comunidad:

- **[Style Settings](https://github.com/mgmeyers/obsidian-style-settings)**: Desbloquea todas las opciones de personalización
- **Notebook Navigator** (opcional): Incluye compatibilidad adicional con el tema

## Capturas de Pantalla

_Capturas de pantalla próximamente_

## Desarrollo

Cosmical utiliza Vite + PostCSS para un flujo de trabajo de desarrollo moderno.

### Configuración

```bash
npm install
```

### Modo de Desarrollo

```bash
npm run dev
```

Observa los cambios y reconstruye automáticamente el tema.

### Compilar para Producción

```bash
npm run build
```

Crea un `theme.css` minificado listo para distribución.

### Compilar Snippets CSS

```bash
npm run build:snippets
```

Genera snippets CSS individuales a partir de las características en `src/features/`.

## Hoja de Ruta

Cosmical está diseñado para crecer orgánicamente. Las mejoras planificadas incluyen:

- Compatibilidad expandida con plugins
- Subtemas adicionales
- Más opciones de personalización
- Refinamientos mejorados de la UI

Los proyectos futuros pueden incluir plugins personalizados de Obsidian que complementen la estética de Cosmical, aunque estos están en etapas conceptuales tempranas.

## Contribuir

¿Encontraste un error o tienes una sugerencia? Siéntete libre de [abrir un issue](https://github.com/YOUR_USERNAME/cosmical-obsidian/issues).

## Créditos

**Autor**: Torrus
**Inspirado en**: El tema Cosmical para VSCode

## Licencia

Este tema se publica bajo la Licencia MIT. Consulta [LICENSE](LICENSE) para más detalles.

---

<p align="center">
  <i>Hecho con ☕ para tomar notas hermosas y enfocadas</i>
</p>
