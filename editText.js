function editText(text, message) {
    const finalMessageREGEX = message.toLowerCase()

    var x = 0
    var finalMessage = ''
    for (let i = 0; i < text.length; i++) {
        var currentLetter = text[i]
        if (currentLetter == finalMessageREGEX[x]){
            finalMessage = finalMessage + currentLetter
            x = x + 1
        } else {
            finalMessage = finalMessage + " "
        }

      }

    

    return finalMessage
  }