import Word from './word.js'

const keywords = ['T', 'P', 'H', 'Q', 'L', 'X','Y', 'J','U','A','V','W', 'N', 'G',
'O', 'B', 'Ñ', 'K', 'Z', 'E', 'S', 'D', 'M', 'I', 'C', 'R', 'F']

/* -------------------- Helper -------------------- */

function template(headContent, bodyContent, space = false) {
  return `
    <div class="table">
      <div class="table__head">
          ${headContent}
      </div>
      <div class="table__body">
          ${bodyContent}
      </div>
    </div>
    ${space ? '<br><br>' : ''}` // Replace with other element or class
}

/* -------------------- Main Class -------------------- */

class Table {
  constructor() {
    this.parent = document.querySelector('.container');
    // Template
    this.body = ''
    this.head = ''
    this.template = ''
  }
  /* -------------------- Private -------------------- */
  _generateTables(rows, word = false) {
    // Reset
    this.template = ''
    this.head = ''
    this.body = ''

    rows.forEach((row, i) => {
      this.head += `
        <div class="table__item table__item--pointer" ${row ? `data-id="${row}"` : ''}>
          ${word ? word[i].toUpperCase() : ''}
        </div>`
      this.body += `<div class="table__item">${row ? row : ' '}</div>`
    })

    this.template = template(this.head, this.body)
    this.parent.innerHTML += this.template
  }

  /* -------------------- Public -------------------- */
  mainRow() {
    keywords.forEach((_, i) => {
      this.head += `<div class="table__item">${i+1}</div>`
      this.body += `<div class="table__item table__item--pointer" data-id=${i + 1}></div>`;
    })

    this.template = template(this.head, this.body, true)
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
      if (!e.target.classList.contains('table__item--pointer')) return
      // Call the input event
      new Word().input(e.target)
    })
  }
}

export default Table