import Word from './word.js'

const keywords = ['T', 'P', 'H', 'Q', 'L', 'X','Y', 'J','U','A','V','W', 'N', 'G',
'O', 'B', 'Ñ', 'K', 'Z', 'E', 'S', 'D', 'M', 'I', 'C', 'R', 'F']

/* -------------------- Helper -------------------- */

function template(theadContent, tbodyContent, space = false) {
  return `
    <table class="table-bordered table-striped">
      <thead>
        <tr>
          ${theadContent}
        </tr>
      </thead>
      <tbody>
        <tr>
          ${tbodyContent}
        </tr>
      </tbody>
    <table>
    ${space ? '<br><br>': ''}` // Replace with other element or class
}

/* -------------------- Main Class -------------------- */

class Table {
  constructor() {
    this.parent = document.querySelector('.container');
    // Template
    this.bodyTds = ''
    this.headTds = ''
    this.template = ''
  }
  /* -------------------- Private -------------------- */
  _generateTables(rows, word = false) {
    // Reset
    this.template = ''
    this.headTds = ''
    this.bodyTds = ''

    rows.forEach((row, i) => {
      this.headTds += `
        <td ${row ? `data-id="${row}"`:''}>
          ${word ? word[i].toUpperCase() : ''}
        </td>`;
      this.bodyTds += `<td>${row ? row : ' '}</td>`;
    });

    this.template = template(this.headTds, this.bodyTds)
    this.parent.innerHTML += this.template;
  }

  /* -------------------- Public -------------------- */
  mainRow() {
    keywords.forEach((_, i) => {
      this.headTds += `<td>${i+1}</td>`
      this.bodyTds += `<td data-id=${i+1}><p></p></td>`
    })

    this.template = template(this.headTds, this.bodyTds, true)
    this.parent.innerHTML += this.template

    // Chaining Pattern
    return this
  }

  rows(values) {
    values.forEach(row => row.length 
      ? this._generateTables(row) 
      : this._generateTables(row.rows, row.word)
    )
    return this
  }

  event() {
    // Event Propagation - Delegation
    window.addEventListener('click', e => {
      if (!e.target.children.length) return

      if (e.target.localName === 'td' && e.target.children[0])
        new Word().input(e.target.children[0])
    })
  }
}

export default Table