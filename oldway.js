function generateTables(rows, word = false) {
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

function tables(rows = []) {
  // Check if row is an array
  rows.forEach((row) =>
    row.length ? generateTables(row) : generateTables(row.rows, row.word)
  );
}

tables([
  [2, 10, 26, 10],
  [10, 11, 10, 13, 19, 10, 26],
  [10],
  [5, 10],
  [21, 24, 14, 9, 24, 20, 13, 1, 20],
]);

// Row 2
tables([
  [20, 1, 10, 2, 10],
  [13, 20, 25, 20, 21, 24, 1, 10, 21],
  [25, 15, 23, 20, 13, 1, 10, 26],
  [20, 5],
]);

// Row 3
tables([
  [2, 15, 21, 1],
  [22, 24, 25, 24, 20, 13, 22, 15],
  [25, 15, 13],
  [25, 9, 10, 5],
  [22, 24, 15, 21],
]);

// Row 4
tables([
  [22, 20],
  [5, 10],
  [23, 24, 1, 15, 5, 15, 14, 24, 10],
  [26, 20, 5, 10, 25, 24, 15, 13, 10, 21],
]);

// Row 5
tables([
  [10],
  { rows: [13, 15, 11, 10, 13, 20, 1], word: 'Novanet' },
  [7],
  [2, 15, 26],
  [4, 9, 20],
  [16, 9, 21, 25, 10],
]);

// Row 6
tables([
  [24, 13, 27, 15, 26, 23, 10, 25, 24, 15, 13],
  [21, 15, 16, 20],
  [13, 15, 21, 15, 1, 26, 15, 21],
]);

// Row 7
tables([
  [20, 13],
  [13, 9, 20, 21, 1, 26, 15, null, 21, 24, 1, 24, 15, null, 12, 20, 16],
  [22, 20, 16, 20, 21],
]);

// Row 8
tables([
  [25, 15, 23, 20, 13, 19, 20, 26],
  [1, 9],
  [25, 15, 23, 20, 13, 1, 10, 26, 24, 15],
  [25, 15, 13],
]);

// Row 9
tables([
  [5, 10],
  [2, 10, 5, 10, 16, 26, 10],
  [3, 20, 7],
]);

/* -------------------- Rest -------------------- */

function letterInput(el) {
  const parent = el;

  function createElements() {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const span = document.createElement('span');

    parent.appendChild(form);
    parent.appendChild(span);

    span.textContent = parent.textContent;
    input.value = span.textContent;

    form.appendChild(input);
    form.style.display = 'inline-block';
    span.style.display = 'none';

    input.style.width = '40px';
    input.focus();
    input.setSelectionRange(0, 0);

    form.addEventListener('submit', (e) => {
      updateDisplay({ span, form, input });
      e.preventDefault();
    });
    input.addEventListener('blur', (e) => updateDisplay({ span, form, input }));
  }

  // updating display
  function updateDisplay({ span, form, input }) {
    span.style.display = 'inline-block';
    form.style.display = 'none';
    span.textContent = input.value;
    input.style.width = span.clientWidth + 'px';
  }

  function updateElements() {
    const form = parent.children[0];
    const input = parent.children[0].children[0];
    const span = parent.children[1];

    span.textContent = parent.textContent;
    input.value = span.textContent;

    form.appendChild(input);

    form.style.display = 'inline-block';
    span.style.display = 'none';

    input.style.width = '40px';
    input.focus();
    input.setSelectionRange(0, 0);

    form.addEventListener('submit', (e) => {
      updateDisplay({ span, form, input });
      e.preventDefault();
    });
    input.addEventListener('blur', (e) => updateDisplay({ span, form, input }));
  }

  if (!parent.children.length) createElements();
  else updateElements();
}

// Event Delegation
document.addEventListener('click', (e) => {
  if (e.target.localName === 'td' && e.target.children[0].localName === 'p') {
    letterInput(e.target.children[0]);
  }
});
