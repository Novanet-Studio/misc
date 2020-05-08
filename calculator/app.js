(w => {
  const button = document.querySelector('#calculate')

  function calculate() {

    const precio = '1'

    const SHIPING_BOAT = '2'
    const SHIPING_AIRPLANE = '1'
    const MEASURE_TYPE_CM_KG = '1'
    const MEASURE_TYPE_INCH_LIB = '2'

    const shipingType = document.querySelector('input[type="radio"]:checked').value
    const measureType = document.querySelector('#select').value

    const height = document.querySelector('#altura').value
    const width = document.querySelector('#anchura').value
    const large = document.querySelector('#largo').value
    const peso = document.querySelector('#peso').value

    const result = document.querySelector('#resultado')
    const formula = document.querySelector('#formula')

    if (measureType && height && width && large && peso) {
      let cubicCalculation = height * width * large
      let convertCubicInch = (height * 0.393) * (width * 0.393) * (large * 0.393)

      if (shipingType === SHIPING_BOAT) {

        if (measureType === MEASURE_TYPE_INCH_LIB) {
          total = ''

          const cubicFoot = cubicCalculation * 0.000578

          total = cubicFoot * precio

          if (total < "1")
            total = 1

          result.value = total.toFixed(2)
          formula.innerHTML = `<var>f</var><var>t</var><sup>3</sup>`

        } else if (measureType === MEASURE_TYPE_CM_KG) {
          total = ''
          let cubicFoot = convertCubicInch * 0.000578
          
          total = cubicFoot * precio

          if (total < "1")
            total = 1
          
          result.value = total.toFixed(2)
          formula.innerHTML = `<var>f</var><var>t</var><sup>3</sup>`
        }

      } else if (shipingType === SHIPING_AIRPLANE) {

        if (measureType === MEASURE_TYPE_INCH_LIB) {
          total = ''

          let libs = cubicCalculation * 0.007225

          if (peso > libs) {
            if (peso < "1")
             total = 1
            else
             total = peso

            result.value = total
            formula.innerHTML = `<var>L</var><var>i</var><var>b</var><var>s</var>`
          }

          if (peso < libs) {
            if (peso < "1")
              total = 1
            else
              total = libs
            
            result.value = total.toFixed(2)
            formula.innerHTML = '<var>L</var><var>i</var><var>b</var><var>s</var>'
          }
        }

        if (measureType === MEASURE_TYPE_CM_KG) {
          let total = ''
          let libs = cubicCalculation * 0.000441

          if (peso > libs) {
            if (peso < "1")
              total = 1
            else
              total = peso
            result.value = total
            formula.innerHTML = '<var>L</var><var>i</var><var>b</var><var>s</var>'
          }

          if (peso < libs) {
            if (peso < "1")
              total = 1
            else
              total = libs

            result.value = total.toFixed(2)
            formula.innerHTML = '<var>L</var><var>i</var><var>b</var><var>s</var>'
          }
        }

      }
    }
  
  }

  button.addEventListener('click', calculate)
})(window)