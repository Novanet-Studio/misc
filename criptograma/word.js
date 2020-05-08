const phrase = 'dinos con cual dios de la mitologia relacionas a Novanet y por que'
const regExpr = /[a-z]/gi


/* -------------------- Main Class -------------------- */

class Word {
  constructor() {
    this.phrase = phrase
    this.total = this.phrase.match(regExpr)
  }

  input(el) {
    const hasChildren = el.children.length
    const form = !hasChildren ? document.createElement('form') : el.children[0]
    const input = !hasChildren ? document.createElement('input') : el.children[0].children[0]
    const span = !hasChildren ? document.createElement('span') : el.children[1]
    const elementID = el.parentElement.dataset.id

    el.appendChild(form)
    el.appendChild(span)

    // Set content
    span.textContent = el.textContent
    input.value = span.textContent
    
    // Just one character
    input.maxLength = 1

    form.appendChild(input)

    // Must be replaced with class
    form.style.display = 'inline-block'
    span.style.display = 'none'
    input.style.width = '40px'

    input.focus()
    input.setSelectionRange(0, input.value.length)

    // Save the letter
    form.addEventListener('submit', e => {
      e.preventDefault()
      updateDisplay()
      this.updateKeywords(elementID, input.value)
      this.checkKeywords()
    })

    input.addEventListener('blur', e => {
      updateDisplay()
      this.updateKeywords(elementID, input.value)
      this.checkKeywords()
    })

    // Closure Helper
    function updateDisplay() {
      span.style.display = 'inline-block'
      form.style.display = 'none'
      span.textContent = input.value.toUpperCase()
      input.style.width = `${span.clientWidth}px`
    }
  }

  checkKeywords() {
    const td = document.querySelectorAll('thead > tr > td[data-id]')
    const letters = []
    
    Array.from(td).forEach(item => 
      item.textContent && letters.push(item.textContent)
    )

    if (letters.length === this.total.length) {
      letters.join('').toLowerCase() === this.total.join('').toLowerCase() && 
      alert('Lo hiciste') // Here's goes the modal success, replace.
    }
  }

  updateKeywords(id, word) {
    // Only the specifid data-id
    const tds = document.querySelectorAll(`thead > tr > td[data-id="${id}"]`)
    // Update cell content
    Array.from(tds).forEach(td => td.textContent = word.toUpperCase())
  }
}

export default Word