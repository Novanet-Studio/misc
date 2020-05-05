class Table {
  constructor() {
    this.phrase = 'Poco'
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
      })

      input.addEventListener('blur', updateDisplay)
    } else {
      console.log('porsupollo')
    }

    // Helper
    function updateDisplay() {
      span.style.display = 'inline-block'
      form.style.display = 'none'
      span.textContent = input.value.toUpperCase()
      input.style.width = `${span.clientWidth}px`
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