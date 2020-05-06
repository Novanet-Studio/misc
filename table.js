class Table {
  constructor() {
    this.phrase = 'Para avanzar a la siguiente etapa, necesitas comentar el post diciendo con cuál dios de la mitología relacionas a Novanet y por qué. Busca información sobre nosotros en nuestro sitio web. Debes comenzar tu comentario con la palabra hey'
    this.total = []
    
    const regexpr = /[a-z|á|é|í|ó|ú]+/gi

    // Reemplazo las letras con tilde
    this.phrase = this.phrase.replace(/[á|é|í|ó|ú]/g, (x) => {
      switch (x) {
        case 'á':
          return 'a'
          break
        case 'é':
          return 'e'
          break
        case 'í':
          return 'i'
        break
        case 'ó':
          return 'o'
        break
        case 'ú':
          return 'u'
        break
      }
    })

    // Asigno todas las letras a un arreglo
    this.phrase.match(regexpr).forEach(word => 
      word === 'Novanet' || 
      word.toLowerCase().split('').forEach(letter => 
        this.total.push(letter)
      )
    )
  }
  /* -------------------- Private -------------------- */
  _generateTables(rows, word = false) {
    const parent = document.querySelector('.container');

    let bodyTds = '';
    let headTds = '';
    let template = '';

    rows.forEach((row, i) => {
      headTds += `<td><p>${word ? word[i].toUpperCase() : ''}</p></td>`;
      bodyTds += `<td>${row ? row : ' '}</td>`;
    });

    template = `
    <table class="table-bordered table-striped">
      <thead>
        <tr>
          ${headTds}
        </tr>
      </thead>
      <tbody>
        <tr>
          ${bodyTds}
        </tr>
      </tbody>
    <table>
  `;

    parent.innerHTML += template;
  }

  _letterInput(el) {
    const form = document.createElement('form')
    const input = document.createElement('input')
    const span = document.createElement('span')

    // No tiene elementos hijos
    if (!el.children.length) {
      el.appendChild(form)
      el.appendChild(span)

      // Asigno el contenido
      span.textContent = el.textContent
      input.value = span.textContent
      input.maxLength = 1 // un caracter

      form.appendChild(input)
      form.style.display = 'inline-block'
      span.style.display = 'none'
      
      input.style.width = '40px'
      input.focus()
      input.setSelectionRange(0, 1)

      // Listeners para guardar
      form.addEventListener('submit', e => {
        e.preventDefault()
        updateDisplay()
        this.checkPhrase()
      })

      input.addEventListener('blur', e => {
        updateDisplay()
        this.checkPhrase()
      })
    } else {
      const form = el.children[0]
      const input = el.children[0].children[0]
      const span = el.children[1]

      input.value = span.textContent 
      form.style.display = 'inline-block'
      span.style.display = 'none'

      input.style.width = '40px'
      input.focus()

      form.addEventListener('submit', e => {
        e.preventDefault()
        updateDisplay()
        this.checkPhrase()
      })


      input.addEventListener('blur', e => {
        updateDisplay()
        this.checkPhrase()
      })
    }

    // Helper
    function updateDisplay() {
      span.style.display = 'inline-block'
      form.style.display = 'none'
      span.textContent = input.value.toUpperCase()
      input.style.width = `${span.clientWidth}px`
    }
  }

  checkPhrase() {
    const span = document.querySelectorAll('p > span')
    const letters = []
    
    Array.from(span).forEach(item => 
      item.textContent && letters.push(item.textContent)
    )

    console.log(letters)

    if (letters.length === this.total.length) {
      letters.join('').toLowerCase() === this.total.join('') && 
      alert('Lo hiciste') // aqui acciona el modal de success
    }
  }

  /* -------------------- Public -------------------- */
  rows(values) {
    values.forEach(row => row.length 
      ? this._generateTables(row) 
      : this._generateTables(row.rows, row.word)
    )
    return this
  }

  event() {
    window.addEventListener('click', e => {
      if (!e.target.children.length) return

      if (e.target.children[0].localName === 'p') {
        this._letterInput(e.target.children[0])
      }
    })
  }
}

export default Table