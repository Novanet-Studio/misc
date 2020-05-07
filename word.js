const phrase = 'Para avanzar a la siguiente etapa, necesitas comentar el post diciendo con cuál dios de la mitología relacionas a Novanet y por qué. Busca información sobre nosotros en nuestro sitio web. Debes comenzar tu comentario con la palabra hey'
const keywords = ['T', 'P', 'H', 'Q', 'L', 'X','Y', 'J','U','A','V','W', 'N', 'G',
'O', 'B', 'Ñ', 'K', 'Z', 'E', 'S', 'D', 'M', 'I', 'C', 'R', 'F']
const total = []
const regExpr = /[a-z|á|é|í|ó|ú]+/gi

/* -------------------- Helper -------------------- */

function replaceLetter(string) {
  const regExprVocals = /[á|é|í|ó|ú]/g

  return string.replace(regExprVocals, x => {
    if (x === 'á')
      return 'a'
    else if (x === 'é')
      return 'e'
    else if (x === 'í')
      return 'i'
    else if (x === 'ó')
      return 'o'
    else if (x === ú)
      return 'u'
  })
}


/* -------------------- Class -------------------- */

class Word {
  constructor() {
    this.phrase = replaceLetter(phrase)
    // Asigno todas las letras a un arreglo
    this.phrase.match(regExpr).forEach(word => 
      total.length !== 194 &&
      word.toLowerCase().split('').forEach(letter => 
        console.log(total.push(letter))
      )
    )
  }

  input(el) {
    const hasChildren = el.children.length
    const form = !hasChildren ? document.createElement('form') : el.children[0]
    const input = !hasChildren ? document.createElement('input') : el.children[0].children[0]
    const span = !hasChildren ? document.createElement('span') : el.children[1]
    const elementID = el.parentElement.dataset.id

    if (!hasChildren) {
      el.appendChild(form)
      el.appendChild(span)

      // Asigno contenido
      span.textContent = el.textContent
      input.value = span.textContent
      
      // Maximo de caracteres
      input.maxLength = 1

      form.appendChild(input)

      // Debe reemplazarse por clases
      form.style.display = 'inline-block'
      span.style.display = 'none'

      input.style.width = '40px'
      input.focus()
      input.setSelectionRange(0, input.value.length)

      // para guardar contenido
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
    } else {
      input.value = span.textContent 
      form.style.display = 'inline-block'
      span.style.display = 'none'

      input.style.width = '40px'
      input.focus()
      input.setSelectionRange(0, input.value.length)
    }

    // Helper
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

    console.log(letters)

    if (letters.length === total.length) {
      letters.join('').toLowerCase() === total.join('') && 
      alert('Lo hiciste') // aqui acciona el modal de success
    }
  }

  updateKeywords(id, word) {
    const tds = document.querySelectorAll(`thead > tr > td[data-id="${id}"]`)

    Array.from(tds).forEach(td => td.textContent = word.toUpperCase())
  }
}

export default Word