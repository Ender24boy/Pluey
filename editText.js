function editText(text, message) {

    var x = 0
    var finalMessage = ''
    for (let i = 0; i < text.length; i++) {
        var currentLetter = text[i]
        if (currentLetter == message[x]){
            finalMessage = finalMessage + currentLetter
            x = x + 1
        } else {
            finalMessage = finalMessage + " "
        }

      }

    

    return finalMessage
  }