;
(() => {
  /* -------------------- Elements -------------------- */

  const button = document.querySelector('#calculate')
  const result = document.querySelector('#resultado')
  const formula = document.querySelector('#formula')
  const form = document.querySelector('#form')

  /* -------------------- Constants -------------------- */
  const precio = 1

  const SHIPPING_AIRPLANE  = 1
  const SHIPPING_BOAT      = 2
  const MEASURE_TYPE_CM_KG    = 1
  const MEASURE_TYPE_INCH_LIB = 2

  const HTML_LIB  = '<var>L</var><var>i</var><var>b</var><var>s</var>'
  const HTML_LIBS = '<var>L</var><var>i</var><var>b</var><var>s</var>'
  const HTML_FT3  = '<var>f</var><var>t</var><sup>3</sup>'

  /* -------------------- Global -------------------- */
  let total

  // Reset
  form.reset()

  /* -------------------- Main function -------------------- */
  function calculate() {

    // Selectors
    const shippingType = Number(document.querySelector('input[type="radio"]:checked').value)
    const measureType = Number(document.querySelector('#select').value)

    // Inputs
    const height = Number(document.querySelector('#altura').value)
    const width = Number(document.querySelector('#anchura').value)
    const large = Number(document.querySelector('#largo').value)
    const weight = Number(document.querySelector('#peso').value)

    

    if (!measureType && !height && !width && !large && !weight) return

    // Calculations
    let cubicCalculation = height * width * large
    let convertCubicInch = (height * 0.393) * (width * 0.393) * (large * 0.393)

    // Comprobations

    if (shippingType === SHIPPING_AIRPLANE) {

      if (measureType === MEASURE_TYPE_INCH_LIB) {
        let libs = cubicCalculation * 0.007225
        if (weight > libs) {
          weight < 1 ? total = 1 : total = weight
          result.value = total
          formula.innerHTML = HTML_LIB

        } else if (weight < libs) {
          weight < 1 ? total = 1 : total = libs
          result.value = total.toFixed(2) 
          formula.innerHTML = HTML_LIB
        }
      }

      if (measureType === MEASURE_TYPE_CM_KG) {
        let libs = cubicCalculation * 0.000441
        total = ''

        if (weight > libs) {
          weight < 1 ? total = 1 : total = weight
          result.value = total
          formula.innerHTML = HTML_LIBS
        } else if (weight < libs) {
          weight < 1 ? total = 1 : total = libs 
          result.value = total.toFixed(2)
          formula.innerHTML = HTML_LIBS
        }
      }
    }

    if (shippingType === SHIPPING_BOAT) {
      if (measureType === MEASURE_TYPE_CM_KG) {
        const cubicFoot = convertCubicInch * 0.000578
        total = cubicFoot * precio

        total < 1 && (total = 1)
        result.value = total.toFixed(2)
        formula.innerHTML = HTML_FT3

      } else if (measureType === MEASURE_TYPE_INCH_LIB) {
        const cubicFoot = cubicCalculation * 0.000578
        total = cubicFoot * precio

        total < 1 && (total = 1)
        result.value = total.toFixed(2)
        formula.innerHTML = HTML_FT3

      }
    }
  }

  // Listener
  button.addEventListener('click', calculate)
})()