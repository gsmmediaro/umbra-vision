// ===================================
// DOM ELEMENTS
// ===================================
const conversationInput = document.getElementById('conversation');
const apiKeyInput = document.getElementById('apiKey');
const toggleApiKeyBtn = document.getElementById('toggleApiKey');
const eyeIcon = document.getElementById('eyeIcon');
const temperatureSlider = document.getElementById('temperature');
const tempValueDisplay = document.getElementById('tempValue');
const objectiveInput = document.getElementById('objective');
const generateBtn = document.getElementById('generateBtn');
const outputSection = document.getElementById('outputSection');
const responseText = document.getElementById('responseText');
const copyBtn = document.getElementById('copyBtn');
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const errorMessage = document.getElementById('errorMessage');

// ===================================
// CONSTANTS
// ===================================
const API_KEY_STORAGE = 'gemini_api_key';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

// ===================================
// INITIALIZATION
// ===================================
function init() {
    loadApiKey();
    setupEventListeners();
}

// ===================================
// LOCAL STORAGE
// ===================================
function loadApiKey() {
    const savedKey = localStorage.getItem(API_KEY_STORAGE);
    if (savedKey) {
        apiKeyInput.value = savedKey;
    }
}

function saveApiKey() {
    const apiKey = apiKeyInput.value.trim();
    if (apiKey) {
        localStorage.setItem(API_KEY_STORAGE, apiKey);
    }
}

// ===================================
// EVENT LISTENERS
// ===================================
function setupEventListeners() {
    // API Key toggle visibility
    toggleApiKeyBtn.addEventListener('click', toggleApiKeyVisibility);

    // Save API key on blur
    apiKeyInput.addEventListener('blur', saveApiKey);

    // Temperature slider update
    temperatureSlider.addEventListener('input', updateTemperatureDisplay);

    // Generate button
    generateBtn.addEventListener('click', handleGenerate);

    // Copy button
    copyBtn.addEventListener('click', handleCopy);
}

// ===================================
// API KEY VISIBILITY TOGGLE
// ===================================
function toggleApiKeyVisibility() {
    if (apiKeyInput.type === 'password') {
        apiKeyInput.type = 'text';
        eyeIcon.textContent = '🙈';
    } else {
        apiKeyInput.type = 'password';
        eyeIcon.textContent = '👁️';
    }
}

// ===================================
// TEMPERATURE SLIDER
// ===================================
function updateTemperatureDisplay() {
    const value = parseFloat(temperatureSlider.value);
    tempValueDisplay.textContent = value.toFixed(1);
}

// ===================================
// VALIDATION
// ===================================
function validateInputs() {
    const apiKey = apiKeyInput.value.trim();
    const conversation = conversationInput.value.trim();

    if (!apiKey) {
        showError('Te rog introdu API key-ul tău Google Gemini.');
        return false;
    }

    if (!conversation) {
        showError('Te rog introdu conversația curentă.');
        return false;
    }

    return true;
}

// ===================================
// GENERATE RESPONSE
// ===================================
async function handleGenerate() {
    // Validate inputs
    if (!validateInputs()) {
        return;
    }

    // Save API key
    saveApiKey();

    // Get values
    const conversation = conversationInput.value.trim();
    const temperature = parseFloat(temperatureSlider.value);
    const objective = objectiveInput.value.trim();
    const apiKey = apiKeyInput.value.trim();

    // Build prompt
    const prompt = buildPrompt(conversation, temperature, objective);

    // Show loading state
    showLoading();

    try {
        const response = await callGeminiAPI(apiKey, prompt, temperature);
        showResponse(response);
    } catch (error) {
        showError(error.message);
    }
}

// ===================================
// BUILD PROMPT
// ===================================
function buildPrompt(conversation, temperature, objective) {
    let prompt = `Ești un asistent care ajută utilizatorii să răspundă perfect în conversații importante.

CONVERSAȚIA CURENTĂ:
${conversation}

`;

    // Add objective if provided
    if (objective) {
        prompt += `OBIECTIV:
${objective}

`;
    }

    // Add temperature context
    if (temperature < 0.5) {
        prompt += `TON: Răspunde într-un stil rigid, formal și profesional. Fii direct și fără emoții.\n\n`;
    } else if (temperature >= 0.5 && temperature <= 1.0) {
        prompt += `TON: Răspunde într-un stil balansat, nici prea formal nici prea casual. Fii prietenos dar profesional.\n\n`;
    } else {
        prompt += `TON: Răspunde într-un stil creativ, casual și playful. Fii spontan și expresiv.\n\n`;
    }

    prompt += `INSTRUCȚIUNI:
1. Analizează conversația și contextul
2. Identifică ultimul mesaj primit (cel la care trebuie să răspunzi)
3. ${objective ? 'Ține cont de obiectivul menționat' : 'Găsește cel mai bun răspuns'}
4. Generează UN SINGUR RĂSPUNS scurt și eficient (1-2 fraze maxim)
5. Răspunsul trebuie să fie natural și să se potrivească în conversație

RĂSPUNSUL TĂU (doar textul care trebuie trimis, fără explicații):`;

    return prompt;
}

// ===================================
// CALL GEMINI API
// ===================================
async function callGeminiAPI(apiKey, prompt, temperature) {
    const url = `${GEMINI_API_URL}?key=${apiKey}`;

    const requestBody = {
        contents: [{
            parts: [{
                text: prompt
            }]
        }],
        generationConfig: {
            temperature: temperature,
            maxOutputTokens: 200,
            topP: 0.95,
            topK: 40
        }
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                errorData.error?.message ||
                `API Error: ${response.status} ${response.statusText}`
            );
        }

        const data = await response.json();

        // Extract text from response
        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
            return data.candidates[0].content.parts[0].text.trim();
        } else {
            throw new Error('Răspuns neașteptat de la API. Te rog verifică formatul răspunsului.');
        }
    } catch (error) {
        if (error.message.includes('Failed to fetch')) {
            throw new Error('Eroare de conexiune. Verifică conexiunea la internet.');
        }
        throw error;
    }
}

// ===================================
// UI STATE MANAGEMENT
// ===================================
function showLoading() {
    generateBtn.disabled = true;
    outputSection.style.display = 'none';
    errorState.style.display = 'none';
    loadingState.style.display = 'block';
}

function showResponse(text) {
    responseText.textContent = text;
    loadingState.style.display = 'none';
    errorState.style.display = 'none';
    outputSection.style.display = 'block';
    generateBtn.disabled = false;

    // Scroll to output
    outputSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function showError(message) {
    errorMessage.textContent = message;
    loadingState.style.display = 'none';
    outputSection.style.display = 'none';
    errorState.style.display = 'block';
    generateBtn.disabled = false;

    // Auto-hide error after 5 seconds
    setTimeout(() => {
        errorState.style.display = 'none';
    }, 5000);
}

// ===================================
// COPY TO CLIPBOARD
// ===================================
async function handleCopy() {
    const text = responseText.textContent;

    try {
        await navigator.clipboard.writeText(text);

        // Visual feedback
        const originalText = copyBtn.querySelector('.btn-text').textContent;
        const originalIcon = copyBtn.querySelector('.btn-icon-right').textContent;

        copyBtn.querySelector('.btn-text').textContent = 'Copiat!';
        copyBtn.querySelector('.btn-icon-right').textContent = '✅';

        setTimeout(() => {
            copyBtn.querySelector('.btn-text').textContent = originalText;
            copyBtn.querySelector('.btn-icon-right').textContent = originalIcon;
        }, 2000);
    } catch (error) {
        showError('Nu s-a putut copia textul. Te rog încearcă manual.');
    }
}

// ===================================
// START APP
// ===================================
init();
