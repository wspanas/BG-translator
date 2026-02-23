const translateBtn = document.getElementById('translateBtn');
const copyBtn = document.getElementById('copyBtn');
const englishInput = document.getElementById('englishInput');
const outputField = document.getElementById('outputField');

async function translateText() {
    const text = englishInput.value.trim();
    if (!text) return;

    translateBtn.innerText = "Translating...";
    translateBtn.disabled = true;

    try {
        // Fetch Hindi Translation
        const resHindi = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|hi`);
        const dataHindi = await resHindi.json();
        const hindiText = dataHindi.responseData.translatedText;

        // Fetch Urdu Translation
        const resUrdu = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|ur`);
        const dataUrdu = await resUrdu.json();
        const urduText = dataUrdu.responseData.translatedText;

        // Format: Hindi, blank line, Urdu
        outputField.value = `${hindiText}\n\n${urduText}`;
        
    } catch (error) {
        outputField.value = "Error: Could not fetch translation. Please check your connection.";
    } finally {
        translateBtn.innerText = "Translate";
        translateBtn.disabled = false;
    }
}

function copyToClipboard() {
    outputField.select();
    document.execCommand('copy');
    alert("Text copied to clipboard!");
}

translateBtn.addEventListener('click', translateText);
copyBtn.addEventListener('click', copyToClipboard);