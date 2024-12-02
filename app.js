document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('file-input');
    const cameraInput = document.getElementById('camera-input');
    const imagePreview = document.getElementById('image-preview');
    const resultsDiv = document.getElementById('results');

    // Function to open the camera input
    function openCamera() {
        cameraInput.click();
    }

    // Function to process the image (common for both file input and camera)
    function processImage() {
        const file = fileInput.files[0] || cameraInput.files[0];
        if (!file) {
            alert('No file selected');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';

            // Here you can add your logic to process the image for allergy detection
            // For example, sending it to a server for processing, etc.
            analyzeImage(e.target.result);
        };

        reader.readAsDataURL(file);
    }

    // Function to save user preferences
    function savePreferences() {
        const avoid = document.getElementById('avoid').value.split(',').map(item => item.trim().toLowerCase());
        localStorage.setItem('allergyPreferences', JSON.stringify(avoid));
        alert('Preferences saved!');
    }

    // Example function to analyze the image (to be replaced with actual logic)
 
    function analyzeImage(imageData) {
        const resultsDiv = document.getElementById('results');
        setTimeout(() => {
            resultsDiv.innerHTML = '<p>Analyzing image...</p>';
            setTimeout(() => {
                // Simulated text extraction
                const extractedText = "Ingredients: wheat flour, gluten, milk, eggs";
    
                const preferences = JSON.parse(localStorage.getItem('allergyPreferences')) || [];
                const foundPreferences = preferences.filter(ingredient =>
                    extractedText.toLowerCase().includes(ingredient.toLowerCase())
                );
    
                const resultHTML = foundPreferences.length > 0
                    ? `<p class="alert">Detected: ${foundPreferences.join(', ')}</p>`
                    : '<p>No harmful ingredients detected.</p>';
                
                resultsDiv.innerHTML = resultHTML;
                resultsDiv.style.color = foundPreferences.length > 0 ? 'red' : 'green';
    
                // Save to history
                saveToHistory(imageData, foundPreferences);
            }, 2000);
        }, 500);
    }
    

// Save analysis results to history
function saveToHistory(imageSrc, allergens) {
    const history = JSON.parse(localStorage.getItem('analysisHistory')) || [];
    history.push({ imageSrc, allergens, timestamp: new Date().toLocaleString() });
    localStorage.setItem('analysisHistory', JSON.stringify(history));
}

// Display analysis history
function displayHistory() {
    const history = JSON.parse(localStorage.getItem('analysisHistory')) || [];
    const historyDiv = document.getElementById('history');
    historyDiv.innerHTML = ''; // Clear previous history

    history.forEach(item => {
        historyDiv.innerHTML += `
            <div class="history-item">
                <img src="${item.imageSrc}" alt="Analyzed Image" style="max-width: 100px;">
                <p>Analyzed on: ${item.timestamp}</p>
                <p>Detected Allergens: ${item.allergens.join(', ') || 'None'}</p>
            </div>`;
    });
}

function clearHistory() {
    localStorage.removeItem('analysisHistory');
    document.getElementById('history').innerHTML = '<p>History cleared.</p>';
}


    // Attach event listeners
    fileInput.addEventListener('change', processImage);
    cameraInput.addEventListener('change', processImage);
    window.openCamera = openCamera;
    window.savePreferences = savePreferences;
});
