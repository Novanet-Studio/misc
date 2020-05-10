const phrase = 'dinos con cual dios de la mitologia relacionas a Novanet y por que'
const regExpr = /[a-z]/gi


/* -------------------- Main Class -------------------- */

class Word {
  constructor() {
    this.phrase = phrase
    this.total = this.phrase.match(regExpr)
  }

  input(el) {
    const itemId = el.dataset.id
    const text = el.textContent
    const input = document.createElement('input')

    el.textContent = ''
    el.appendChild(input)
    input.value = text
    input.maxLength = 1
    input.focus()
    input.style.width = '35px' 
    // input.style.border = 'none'
    input.setSelectionRange(0, text.length)

    // Save the letter
    input.addEventListener('keyup', e => {
      e.preventDefault()
      if (e.keyCode !== 13) return

      updateDisplay()
      this.updateKeywords(itemId, input.value)
      this.checkKeywords()
    })

    input.addEventListener('blur', e => {
      updateDisplay()
      this.updateKeywords(itemId, input.value)
      this.checkKeywords()
    })

    // Closure Helper
    function updateDisplay() {
      el.textContent = input.value.toUpperCase()
      input.style.width = `${el.clientWidth}px`
    }
  }

  checkKeywords() {
    const items = document.querySelectorAll(
      '.table__head > .table__item--pointer[data-id]'
    )
    const letters = []
    
    Array.from(items).forEach(item => 
      item.textContent && letters.push(item.textContent)
    )
    // console.log(letters, this.total.length)

    if (letters.length === this.total.length) {
      letters[42] = 'V'
      console.log(letters, this.total)
      letters.join('').toLowerCase() === this.total.join('').toLowerCase() && 
      alert('Lo hiciste') // Here's goes the modal success, replace.
    }
  }

  updateKeywords(id, word) {
    // Only the specifid data-id
    const items = document.querySelectorAll(
      `.table__head > .table__item--pointer[data-id="${id}"]`
    )
    // Update cell content
    Array.from(items).forEach(item => item.textContent = word.toUpperCase())
  
  }
}

export default Word