import Word from './word.js'

class Table {

  constructor() {
    this.parent = document.querySelector('.container');
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

    this.template = `
    <table class="table-bordered table-striped">
      <thead>
        <tr>
          ${this.headTds}
        </tr>
      </thead>
      <tbody>
        <tr>
          ${this.bodyTds}
        </tr>
      </tbody>
    <table>
  `;

    this.parent.innerHTML += this.template;
  }

  /* -------------------- Public -------------------- */
  mainRow(keywords) {
    keywords.forEach((key, i) => {
      this.headTds += `<td>${i+1}</td>`
      this.bodyTds += `<td data-id=${i+1}><p></p></td>`
    })

  this.template = `
    <table class="table-bordered table-striped">
      <thead>
        <tr>
          ${this.headTds}
        </tr>
      </thead>
      <tbody>
        <tr>
          ${this.bodyTds}
        </tr>
      </tbody>
    <table>
    <br>
    <br>
  `;

    this.parent.innerHTML += this.template

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
    window.addEventListener('click', e => {
      if (!e.target.children.length) return

      if (e.target.localName === 'td' && e.target.children[0])
        new Word().input(e.target.children[0])
    })
  }
}

export default Table