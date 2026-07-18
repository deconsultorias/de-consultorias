import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Bienvenido al panel de DE Consultorías</h4>
      </Banner>
      <p className={`${baseClass}__intro`}>
        Desde aquí puedes editar todo el contenido del sitio: textos, imágenes, servicios,
        artículos, menús y redes sociales. Abre la guía que necesites — están pensadas para que no
        haga falta saber de tecnología.
      </p>

      <details className={`${baseClass}__section`} open>
        <summary>🏠 Editar la página de Inicio</summary>
        <div className={`${baseClass}__content`}>
          <p>
            Ve a <b>Pages → Home</b>. La página está armada con "bloques" apilados (el encabezado,
            la grilla de problemas, la metodología, etc.). Es posible:
          </p>
          <ul>
            <li>
              <b>Reordenarlos:</b> arrastra cada bloque desde el ícono de puntos a la izquierda.
            </li>
            <li>
              <b>Agregar uno nuevo:</b> con el botón <b>"Add Block"</b> al final de la lista, elige
              el tipo y completa sus campos.
            </li>
            <li>
              <b>Eliminar uno:</b> con el ícono de papelera en la esquina del bloque. Esto no se
              puede deshacer una vez que se guarda.
            </li>
            <li>
              <b>Editar el texto o la imagen de un bloque:</b> haz clic en el bloque para
              desplegarlo y modifica sus campos.
            </li>
          </ul>
        </div>
      </details>

      <details className={`${baseClass}__section`}>
        <summary>🧭 Intervenciones (Servicios)</summary>
        <div className={`${baseClass}__content`}>
          <p>
            Colección <b>Services</b>. Cada intervención tiene un título, un resumen corto, un
            "pilar" (Cultura Preventiva / Liderazgo Adaptativo / Aprendizaje Organizacional), una
            foto de portada y el contenido de la página.
          </p>
          <ul>
            <li>
              La foto de portada se ve recortada en formato horizontal y vertical según dónde
              aparezca — se recomienda subir fotos con buena resolución (mínimo 1200px de ancho)
              para que no se vean pixeladas.
            </li>
            <li>
              El campo <b>slug</b> define la URL (ej: /servicios/mi-intervencion). Si se cambia
              después de publicar, el enlace anterior deja de funcionar.
            </li>
          </ul>
        </div>
      </details>

      <details className={`${baseClass}__section`}>
        <summary>📝 Experiencias y Artículos (Posts)</summary>
        <div className={`${baseClass}__content`}>
          <p>
            Colección <b>Posts</b>. Son las tarjetas que aparecen en "Ideas que compartimos" y en la
            sección Ideas del menú.
          </p>
          <ul>
            <li>
              <b>La foto de portada es obligatoria:</b> el diseño del encabezado del artículo
              depende de ella. No se puede publicar sin subir una.
            </li>
            <li>
              Elige el <b>tipo</b> (Experiencia o Artículo) y al menos una <b>categoría</b>, así
              aparece bien ordenado en el sitio.
            </li>
            <li>
              Marca <b>Published</b> cuando esté listo para que se vea en el sitio público.
            </li>
          </ul>
        </div>
      </details>

      <details className={`${baseClass}__section`}>
        <summary>📄 Quiénes Somos y Contacto</summary>
        <div className={`${baseClass}__content`}>
          <p>
            Son páginas simples dentro de <b>Pages</b>. El texto se edita directamente en el editor
            de texto enriquecido (se puede usar negrita, títulos, listas, etc. con la barra de
            herramientas de arriba).
          </p>
        </div>
      </details>

      <details className={`${baseClass}__section`}>
        <summary>🖼️ Imágenes (Media)</summary>
        <div className={`${baseClass}__content`}>
          <p>
            Todas las fotos del sitio viven en la colección <b>Media</b>.
          </p>
          <ul>
            <li>
              <b>El "texto alternativo" (alt) es obligatorio.</b> Debe describir brevemente qué se
              ve en la foto — sirve para accesibilidad y para que Google entienda el contenido.
              Ejemplo: "Equipo trabajando en una sesión de cultura preventiva".
            </li>
            <li>
              En la ficha de cada imagen, la sección <b>"Dónde se usa"</b> muestra en qué páginas,
              servicios o artículos está esa foto — útil antes de borrarla o reemplazarla.
            </li>
            <li>
              Para reemplazar una foto sin cambiar el diseño, se debe subir la nueva en el campo de
              imagen del bloque o página correspondiente, en vez de editar el archivo original.
            </li>
          </ul>
        </div>
      </details>

      <details className={`${baseClass}__section`}>
        <summary>🧭 Menú de navegación y pie de página</summary>
        <div className={`${baseClass}__content`}>
          <p>
            <b>Header</b> controla el menú de arriba. <b>Footer</b> controla el pie de página:
            descripción, enlaces, correo y teléfono de contacto, y redes sociales.
          </p>
          <ul>
            <li>
              Debe quedar siempre al menos un enlace en cada menú — el sistema no permite guardar si
              queda vacío.
            </li>
            <li>
              Para agregar una red social nueva, usar "Add Row" en Redes Sociales, elegir la
              plataforma y pegar el enlace completo (con https://).
            </li>
          </ul>
        </div>
      </details>

      <details className={`${baseClass}__section`}>
        <summary>✅ Para no romper el diseño</summary>
        <div className={`${baseClass}__content`}>
          <ul>
            <li>
              Si algo tiene un límite de cantidad (por ejemplo, la metodología admite hasta 6
              pasos), el sistema no permite agregar más — es intencional, para que no se desarme la
              grilla.
            </li>
            <li>
              Los títulos muy largos pueden verse apretados en tarjetas pequeñas. Conviene ser
              breve.
            </li>
            <li>
              Antes de publicar un cambio grande, conviene revisar cómo se ve en el sitio (abrir la
              página en otra pestaña) — los cambios se reflejan apenas se guarda.
            </li>
            <li>
              Ante cualquier duda, es mejor consultar antes de borrar algo que no se entiende del
              todo — los bloques y colecciones eliminados no se pueden recuperar.
            </li>
          </ul>
        </div>
      </details>
    </div>
  )
}

export default BeforeDashboard
