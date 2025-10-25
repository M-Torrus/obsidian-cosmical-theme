export default {
  plugins: {
    'postcss-import': {},           // Para @import
    'postcss-nested': {},           // Para nesting CSS
    'postcss-custom-media': {},     // Para media queries reutilizables
    ...(process.env.NODE_ENV === 'production' ? {
      'cssnano': {
        preset: ['default', {
          discardComments: {
            remove: (comment) => {
              // Preservar comentarios de @settings para Style Settings plugin
              return !comment.includes('@settings');
            }
          }
        }]
      }
    } : {})
  }
}
