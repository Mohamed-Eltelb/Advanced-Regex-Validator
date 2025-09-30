function checkPattern() {
  const textInput = document.getElementById("text-input").value;
  const patternInput = document.getElementById("pattern-input").value;
  const resultContainer = document.getElementById("result");
  const resultContent = document.getElementById("result-content");

  // Reset previous state
  resultContainer.className = "result-container";
  resultContainer.style.display = "none";

  if (!textInput) {
    showResult("Please enter a test string", "invalid");
    return;
  }

  if (!patternInput) {
    showResult("Please enter a regular expression pattern", "invalid");
    return;
  }

  try {
    const regex = new RegExp(patternInput);
    const isMatch = regex.test(textInput);
    const matches = textInput.match(regex);

    let resultText = `Pattern: ${regex}\n\n`;
    resultText += `Test string: "${textInput}"\n\n`;
    resultText += `Validation: ${isMatch ? "MATCH" : "NO MATCH"}\n\n`;

    if (isMatch && matches) {
      resultText += `Full match: "${matches[0]}"\n`;
      if (matches.length > 1) {
        resultText += `\nCapture groups:\n`;
        matches.slice(1).forEach((group, index) => {
          resultText += `  Group ${index + 1}: "${group}"\n`;
        });
      }
    } else {
      resultText += `The pattern was not found in the test string.`;
    }

    showResult(resultText, isMatch ? "valid" : "invalid");
  } catch (e) {
    showResult(`Invalid regular expression: ${e.message}`, "invalid");
  }
}

function showResult(message, status) {
  const resultContainer = document.getElementById("result");
  const resultContent = document.getElementById("result-content");

  resultContent.textContent = message;
  resultContainer.classList.add(status);
  resultContainer.style.display = "block";
}

function resetForm() {
  document.getElementById("text-input").value = "";
  document.getElementById("pattern-input").value = "";
  document.getElementById("result").style.display = "none";
}
