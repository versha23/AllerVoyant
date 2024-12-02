document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('file-input');
    const cameraInput = document.getElementById('camera-input');
    const imagePreview = document.getElementById('image-preview');
    const resultsDiv = document.getElementById('results');
    let preferences = []; // Array to hold user preferences

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
        reader.onload = function (e) {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            analyzeImage(e.target.result); // Analyze the image
        };

        reader.readAsDataURL(file);
    }

    // Toggle dropdown visibility
    function toggleDropdown() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    // Add selected ingredient to preferences
    function addPreference(ingredient) {
        if (!preferences.includes(ingredient)) {
            preferences.push(ingredient);
            alert(`${ingredient} added to preferences`);
        } else {
            alert(`${ingredient} is already in preferences`);
        }
    }

    // Close the dropdown if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches('.dropbtn')) {
            const dropdowns = document.getElementsByClassName("dropdown-content");
            for (let i = 0; i < dropdowns.length; i++) {
                const openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    };

    // Function to save user preferences
    function savePreferences() {
        const avoidInput = document.getElementById('avoid').value;
        const avoidArray = avoidInput.split(',').map(item => item.trim().toLowerCase());

        // Combine input preferences and dropdown selections
        avoidArray.forEach(pref => {
            if (pref && !preferences.includes(pref)) {
                preferences.push(pref);
            }
        });

        localStorage.setItem('allergyPreferences', JSON.stringify(preferences));
        alert(`Preferences saved: ${preferences.join(', ')}`);
    }

    // Analyze the image for allergens
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
        historyDiv.innerHTML = ''; // Clear previous content
    
        if (history.length === 0) {
            historyDiv.innerHTML = '<p>No history available.</p>';
            return;
        }
    
        history.forEach(item => {
            const allergens = item.allergens.length > 0 ? item.allergens.join(', ') : 'None';
            historyDiv.innerHTML += `
                <div class="history-item">
                    <img src="${item.imageSrc}" alt="Analyzed Image" style="max-width: 100px;">
                    <p>Analyzed on: ${item.timestamp}</p>
                    <p>Detected Allergens: ${allergens}</p>
                </div>`;
        });
    }
    

    // Clear analysis history
    function clearHistory() {
        localStorage.removeItem('analysisHistory'); // Remove history from localStorage
        const historyDiv = document.getElementById('history');
        historyDiv.innerHTML = '<p>History cleared.</p>'; // Update UI
        alert('History has been cleared.'); // Optional feedback
    }
    

    // Attach event listeners
    fileInput.addEventListener('change', processImage);
    cameraInput.addEventListener('change', processImage);
    window.openCamera = openCamera;
    window.savePreferences = savePreferences;
    window.addPreference = addPreference;
    window.displayHistory = displayHistory;
    window.clearHistory = clearHistory;
    window.toggleDropdown = toggleDropdown;
});
