(function () {
      const root = document.getElementById('poketech');
      if (root.dataset.ready) return;
      root.dataset.ready = 'yes';

      const trabajos = [
        {
          titulo: 'Chatbot asistente',
          descripcion: 'Asistente virtual para una ortopedia.',
          tipo: 'INTELIGENCIA ARTIFICIAL',
          enlace: 'https://landbot.online/v3/H-3344748-DVT4Z84U0FJ3KIJV/index.html',
        },
        {
          titulo: 'Historia de las computadoras',
          descripcion: 'Línea de tiempo sobre los orígenes y las generaciones de las computadoras.',
          tipo: 'HISTORIA',
          enlace: 'https://drive.google.com/file/d/1b_81xCWeuW3CJtSz6iwmQ_H-JslLv9hy/view?usp=drive_link' // ← pegá entre las comillas tu enlace de Drive (si todavía no lo tenés, dejalo vacío)
        },
        {
          titulo: 'Computadoras y sus tipos',
          descripcion: 'Definición, componentes y clasificación de las computadoras.',
          tipo: 'HARDWARE',
          enlace: 'https://drive.google.com/file/d/1U3Av_Tykb968uWLrce284CJPctB6tJRf/view?usp=sharing'
        },
        {
          titulo: 'Armando una PC',
          descripcion: 'Componentes, funcionamiento, conexiones y recorrido de los datos.',
          tipo: 'HARDWARE',
          enlace: 'https://drive.google.com/file/d/1uWCoUie4znUB6eC_JTkFrTsyfDZnnng1/view?usp=sharing'
        },
        {
          titulo: 'Disciplinas y pioneros',
          descripcion: 'Redes, Internet y sistemas operativos.',
          tipo: 'REDES Y SOFTWARE',
          enlace: 'https://canva.link/4ft5462izp4dh07' // ← pegá entre las comillas tu enlace de Canva
        },
        {
          titulo: 'Sistemas numéricos',
          descripcion: 'Conversión entre binario y decimal, y operaciones de suma binaria.',
          tipo: 'MATEMÁTICA DIGITAL',
          enlace: 'https://drive.google.com/file/d/1a_qBVQzyWt0Xy2vnK8NnyzV7k-Sv0yvv/view?usp=sharing'
        },
        {
          titulo: 'Unidades de almacenamiento',
          descripcion: 'Equivalencias y conversiones entre bit, byte, KB, MB, GB y TB.',
          tipo: 'ALMACENAMIENTO',
          enlace: 'https://drive.google.com/file/d/1oKp_VfcAZWMj8qRWPgPaGQdQldSNhaZP/view?usp=sharing'
        },
        {
          titulo: 'Proyecto Arduino',
          descripcion: 'Automatización, código y esquemas de conexión electrónica.',
          tipo: 'ELECTRÓNICA',
          proyectos: [
            {
              titulo: 'Garaje semi-automático',
              descripcion: 'Automatización de un portón de garaje con Arduino.',
              codigoId: 'code-garaje',
              descarga: 'https://drive.google.com/uc?export=download&id=1QG040l33oQ94YWXzl5OItwMpHopb5oGU',
              proceso: 'https://canva.link/vkeclrmk0b4tsvy',
              esquema: 'https://www.tinkercad.com/things/duO7v0J696R-porton-semi-automatico?sharecode=rN6tEAW7pb59MyCHb7OGTWhUnA91ZDPs5GZtVCjbHzs'
            },
            {
              titulo: 'Cerradura electrónica',
              descripcion: 'Cerradura con teclado de 4x4, servomotor y LEDs. La clave se puede cambiar.',
              codigoId: 'code-cerradura',
              descarga: 'https://drive.google.com/uc?export=download&id=1Dm9nRS8qKDIdwBkV9iU7vUgL-gx7EMe3', // ← pegá entre las comillas el enlace de descarga
              proceso: 'https://canva.link/4k7w2vqcia12xbp',   // ← pegá entre las comillas el enlace del Word o PowerPoint
              esquema: 'https://www.tinkercad.com/things/k7pXUkACC0z-cerradura-electronica?sharecode=JNgPsKaW-YOOpAMwaCz1i2iEo5VYoseT_wC6jfrPdLE'    // ← pegá entre las comillas el enlace del esquema
            }
          ]
        }
      ];

      const content = root.querySelector('#pt-content');
      let page = 'inicio';
      let selected = 0;
      let selectedSub = 0;
      const historyPages = [];

      function escaparHtml(texto) {
        return texto
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      }

      function resaltar(codigo) {
        const patron = /(\/\/.*|\/\*[\s\S]*?\*\/)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')|(^[ \t]*#.*$)|(\b(?:0[xX][0-9A-Fa-f]+|\d+(?:\.\d+)?)\b)|(\b(?:void|setup|loop|int|long|byte|char|bool|boolean|float|double|unsigned|String|const|if|else|for|while|switch|case|break|return|true|false|HIGH|LOW|INPUT|OUTPUT|INPUT_PULLUP|Serial|Servo|Keypad|pinMode|digitalWrite|digitalRead|analogRead|analogWrite|delay|millis|attach|write|begin|print|println|getKey|makeKeymap|length|IrReceiver|ENABLE_LED_FEEDBACK|decode|resume)\b)/gm;
        let salida = '';
        let ultimo = 0;
        for (const m of codigo.matchAll(patron)) {
          salida += escaparHtml(codigo.slice(ultimo, m.index));
          let clase = 'tk-az';
          if (m[1]) clase = 'tk-gr';
          else if (m[2] || m[3] || m[4]) clase = 'tk-na';
          salida += '<span class="' + clase + '">' + escaparHtml(m[0]) + '</span>';
          ultimo = m.index + m[0].length;
        }
        return salida + escaparHtml(codigo.slice(ultimo));
      }

      function button(label, target, extra) {
        return '<button class="action" data-page="' + target + '"' +
          (extra === undefined ? '' : ' data-index="' + extra + '"') +
          '>' + label + '</button>';
      }

      function render() {
        let html = '';

        if (page === 'menu') {
          html = '<h2>¿QUÉ VAS A HACER?</h2>' +
            button('▶ POKÉDEX DE TRABAJOS', 'pokedex') +
            button('▶ NUESTRO EQUIPO', 'equipo') +
            button('▶ ACERCA DEL PROYECTO', 'acerca') +
            '<p class="status">SELECCIONA UNA OPCIÓN</p>';
        }

        if (page === 'pokedex') {
          html = '<h2>POKÉDEX INFORMÁTICA</h2>' +
            '<p>REGISTROS: 008</p><div class="entry-grid">' +
            trabajos.map((t, i) =>
              '<button class="entry" data-page="detalle" data-index="' + i + '">' +
              '<small>N.º ' + String(i + 1).padStart(3, '0') + '</small>' +
              '<strong>' + t.titulo + '</strong></button>'
            ).join('') +
            '</div><p class="status">SELECCIONA UN REGISTRO</p>';
        }

        if (page === 'detalle') {
          const t = trabajos[selected];
          const botonesProyectos = t.proyectos
            ? t.proyectos.map((p, i) => button('▶ ' + p.titulo.toUpperCase(), 'proyecto', i)).join('')
            : '';
          html = '<h2>REGISTRO N.º ' +
            String(Number(selected) + 1).padStart(3, '0') + '</h2>' +
            '<div class="detail"><small>' + t.tipo + '</small>' +
            '<h3>' + t.titulo + '</h3><p>' + t.descripcion + '</p>' +
            (t.enlace || t.proyectos ? '' : '<p><strong>ARCHIVO:</strong> enlace pendiente de incorporar.</p>') +
            '</div>' +
            (t.enlace
              ? '<a class="action view-work" href="' + t.enlace + '" target="_blank" rel="noopener noreferrer">VER TRABAJO ↗</a>'
              : (t.proyectos ? '' : '<p>Cuando agreguemos el archivo real, aquí estará disponible el botón VER TRABAJO.</p>')) +
            botonesProyectos +
            button('↩ VOLVER A LA POKÉDEX', 'pokedex');
        }

        if (page === 'proyecto') {
          const t = trabajos[selected];
          const p = t.proyectos[selectedSub];
          const bloque = p.codigoId ? root.querySelector('#' + p.codigoId) : null;
          const codigo = bloque ? bloque.textContent.trim() : '';
          html = '<h2>' + p.titulo.toUpperCase() + '</h2>' +
            '<div class="detail"><p>' + p.descripcion + '</p></div>' +
            (codigo
              ? '<p><strong>CÓDIGO ARDUINO</strong></p><pre class="code-view"><code>' + resaltar(codigo) + '</code></pre>'
              : '<p>Código pendiente de incorporar.</p>') +
            (p.descarga
              ? '<a class="action btn-link" href="' + p.descarga + '" target="_blank" rel="noopener noreferrer">⬇ DESCARGAR CÓDIGO</a>'
              : '') +
            (p.esquema
              ? '<a class="action btn-link" href="' + p.esquema + '" target="_blank" rel="noopener noreferrer">VER ESQUEMA ↗</a>'
              : '') +
            (p.proceso
              ? '<a class="action view-work" href="' + p.proceso + '" target="_blank" rel="noopener noreferrer">VER PROCESO ↗</a>'
              : '') +
            button('↩ VOLVER AL REGISTRO', 'detalle');
        }

        if (page === 'equipo') {
          html = '<h2>NUESTRO EQUIPO</h2>' +
            '<div class="detail"><p>ENTRENADORES INFORMÁTICOS</p>' +
            '<p>Integrantes: Base Matias, Speranza Zaida, Sanchez Alcides y Meza Nestor.</p>' +
            '<p>Curso: 1er Año Tecnicatura Superior en Desarrollo de Software.</p></div>' +
            button('↩ VOLVER AL MENÚ', 'menu');
        }

        if (page === 'acerca') {
          html = '<h2>ACERCA DEL PROYECTO</h2>' +
            '<div class="detail"><p>Este portafolio reúne los trabajos realizados durante el año en la materia Informática.</p>' +
            '<p>Exploramos hardware, software, redes, sistemas numéricos y electrónica.</p></div>' +
            button('↩ VOLVER AL MENÚ', 'menu');
        }

        content.innerHTML = html;

        if (page === 'pokedex') {
          const backButton = document.createElement('button');
          backButton.textContent = 'VOLVER';
          backButton.dataset.action = 'back';
          backButton.className = 'pt-back-button';
          content.prepend(backButton);
        }

        root.querySelector('#pt-screen').scrollTop = 0;
      }

      function navigate(target, index) {
        if (target === 'detalle' && page === 'pokedex') {
          historyPages.push('pokedex');
        } else if (target === 'pokedex' && page === 'detalle') {
          // Al volver desde un trabajo, no agregamos otra entrada.
        } else if (target !== page) {
          historyPages.push(page);
        }

        if (index !== undefined) {
          if (target === 'proyecto') {
            selectedSub = Number(index);
          } else {
            selected = Number(index);
          }
        }

        page = target;
        render();
      }

      function goBack() {
        if (page === 'proyecto') {
          page = 'detalle';
        } else if (page === 'detalle') {
          page = 'pokedex';
        } else if (page === 'pokedex') {
          page = 'menu';
          historyPages.length = 0;
        } else if (historyPages.length > 0) {
          page = historyPages.pop();
        } else {
          page = 'menu';
        }
        render();
      }

      root.addEventListener('click', function (event) {
        const backBtn = event.target.closest('button[data-action="back"]');
        if (backBtn && root.contains(backBtn)) {
          goBack();
          return;
        }

        const btn = event.target.closest('button[data-page]');
        if (!btn || !root.contains(btn)) return;

        navigate(btn.dataset.page, btn.dataset.index);
      });

      root.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' || event.key === 'Backspace') {
          if (page !== 'inicio') {
            event.preventDefault();
            goBack();
          }
        }
      });
    })();