
# **Food Allergy Detection Web Application**

## **Project Overview**

This project is a web-based application designed to help users identify potential allergens in food products. The user can upload an image of a food ingredient list or input the ingredients they want to avoid. The application will then analyze the image or input and alert users if any of the ingredients match their avoidance preferences (e.g., gluten, dairy, soy, etc.).

## **Features**

- **Image Upload & Camera Input:** Users can upload an image of a food ingredient list or take a photo using their device's camera.
- **Ingredient Detection:** The application processes the image to detect ingredients and compares them with the user's preferences for allergens.
- **User Preferences:** Users can select and save ingredients they wish to avoid (e.g., gluten, nuts, dairy).
- **Alert System:** If any ingredients in the uploaded food list match the user’s avoidance preferences, the app will display an alert.
- **History Tracking:** The app saves the history of previous analyses and displays them for easy reference.
- **Responsive Design:** The app is mobile-friendly and works across different screen sizes.

## **Tech Stack**

- **Frontend:**
  - HTML, CSS, JavaScript (for UI)
  - React (Optional, for advanced UI handling)
- **Backend:**
  - Python (Flask or FastAPI for backend processing)
  - OCR (Optical Character Recognition) libraries like Tesseract for text extraction from images
  - LocalStorage for saving user preferences and analysis history
- **Libraries/Frameworks:**
  - FileReader API (for handling image uploads)
  - File input and camera handling for ingredient list analysis

## **Installation and Setup**

### **1. Clone the repository**
```bash
git clone https://github.com/username/food-allergy-detection.git
cd food-allergy-detection
```

### **2. Install dependencies**
Install the necessary dependencies for your project. If you're using React for the frontend:

```bash
npm install
```

For backend dependencies (if applicable):
```bash
pip install -r requirements.txt
```

### **3. Running the application**

- **Frontend:**
  If you're using React, start the frontend development server:
  ```bash
  npm start
  ```
- **Backend (if applicable):**
  Start the Flask server:
  ```bash
  python app.py
  ```



### **How to Use the Application**

1. **Upload an Image**:
   - Click the "Upload File" button to choose a file from your device, or click the camera button to take a photo of a food ingredient list.
   
2. **Set Preferences**:
   - In the "Preferences" section, input the ingredients you want to avoid (e.g., nuts, gluten).
   - You can select ingredients from a dropdown or type them manually.

3. **View Results**:
   - After uploading the image, the app will display the detected ingredients and compare them with your preferences.
   - If any allergens are found, they will be highlighted in red with a warning.

4. **History**:
   - Check the analysis history to view previous analyses and the allergens detected.

### **Save Preferences**:
Preferences are saved locally using `localStorage` and can be retrieved for future use.

---


Licenses

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Acknowledgment

- **Tesseract** for OCR text extraction from images.
- **MDN Web Docs** for providing helpful resources for HTML, CSS, and JavaScript.
- **React** for efficient UI management.

---
