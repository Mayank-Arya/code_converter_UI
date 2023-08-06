 // Function to update the "Converted Code" textarea with the response or an error message
 function displayResponse(response) {
  const convertedCodeTextarea = document.getElementById('convertedCode');
  convertedCodeTextarea.value = response;
}


async function convertCode() {
  const languageSelect = document.getElementById('languageSelect');
  const selectedLanguage = languageSelect.value;
  const inputCode = document.getElementById('inputCode').value;

  try {
    const response = await fetch('http://localhost:9090/code/converter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payload: inputCode,
        language: selectedLanguage,
      }),
    });

    if (!response.ok) {
      throw new Error(`Code conversion failed. Status: ${response.status}, Message: ${response.statusText}`);
    }

    const data = await response.json();
    const convertedCode = data.textResponse;

    displayResponse(convertedCode);
  } catch (error) {
    console.log(error)
  }
}

const convertBtn = document.getElementById('convertBtn');
convertBtn.addEventListener('click', convertCode);

async function debugCode() {
  const inputCode = document.getElementById('inputCode').value;

  try {
    const response = await fetch('http://localhost:9090/code/debugging', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payload: inputCode,
      }),
    });

    if (!response.ok) {
      throw new Error(`Debugging failed. Status: ${response.status}, Message: ${response.statusText}`);
    }

    const data = await response.json();
    const debugResponse = data.text;

    displayResponse(debugResponse);
  } catch (error) {
    console.log(error)
  }
}

const debugBtn = document.getElementById('debugBtn');
debugBtn.addEventListener('click', debugCode);

async function checkCodeQuality() {
  const inputCode = document.getElementById('inputCode').value;

  try {
    const response = await fetch('http://localhost:9090/code/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payload: inputCode,
      }),
    });

    if (!response.ok) {
      throw new Error(`Quality check failed. Status: ${response.status}, Message: ${response.statusText}`);
    }

    const data = await response.json();
    const qualityCheckResponse = data.text;

    displayResponse(qualityCheckResponse);
  } catch (error) {
    console.log(error)
  }
}

const checkCodeBtn = document.getElementById('checkCodeBtn');
checkCodeBtn.addEventListener('click', checkCodeQuality);