# Contexto del Proyecto: Web Estática con Tailwind CSS

Este documento define las reglas de desarrollo, el flujo de trabajo y los estándares de documentación para el proyecto. Gemini debe actuar como un experto en Tailwind CSS y arquitectura HTML semántica.

## 1. Identidad Tecnológica
* **Estructura:** HTML5 Nativo (Semántico).
* **Estilos:** Tailwind CSS (Framework de utilidades).
* **Configuración:** Respetar `tailwind.config.js` (colores, espaciados y fuentes personalizados).
* **Interactividad:** JavaScript Vanilla (JS nativo).

## 2. Flujo de Trabajo y Documentación

### Fase 1: Mapeo y Análisis
Antes de generar código, Gemini debe:
1. Analizar el HTML existente para identificar patrones de diseño.
2. Identificar la versión de Tailwind y el sistema de diseño actual.

### Fase 2: Desarrollo con Documentación Integrada
Cada actualización debe incluir documentación técnica detallada:
1. **Comentarios de Código:** Explicar bloques complejos directamente en el HTML/JS.
2. **Registro de Cambios (Changelog):** Al final de cada respuesta, generar un resumen de qué se cambió y por qué.
3. **Guía de Clases:** Si se introducen nuevas combinaciones de clases de Tailwind, documentar su propósito (ej: "Se usó `grid-cols-3` para la sección de servicios para mantener simetría").

### Fase 3: Validación y Limpieza
* Priorizar utilidades de Tailwind sobre CSS manual.
* Asegurar accesibilidad (ARIA, contraste) y diseño "mobile-first".

## 3. Reglas de Oro (No Negociables)
* **PROHIBIDO** crear archivos `.css` externos innecesarios.
* **PROHIBIDO** usar valores arbitrarios si existe una clase equivalente en la paleta.
* **OBLIGATORIO** documentar cada nueva función o sección conforme se desarrolla.
* **OBLIGATORIO** mantener la estructura de etiquetas semánticas.

## 4. Instrucciones para Gemini
Al recibir una tarea:
1. Declara que trabajarás bajo el estándar **Tailwind CSS**.
2. Presenta el código con comentarios explicativos internos.
3. **Provee una breve sección de documentación** técnica explicando el impacto del cambio en el proyecto global.