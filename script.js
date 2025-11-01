// Application State
const appState = {
    currentStep: 1,
    totalSteps: 5,
    location: {
        lat: null,
        lng: null,
        address: null,
        method: null // 'geolocation', 'manual', 'map'
    },
    budget: 2, // Default: medium
    cuisines: [],
    dietary: [],
    timePreference: 'now' // 'now' or datetime string
};

// Validation function
function validateLocation() {
    if (!appState.location.lat || !appState.location.lng) {
        showLocationStatus('กรุณาระบุตำแหน่งของคุณ', 'error');
        return false;
    }
    return true;
}

// Step configuration
const steps = [
    { id: 'location-section', validate: validateLocation },
    { id: 'budget-section', validate: () => true },
    { id: 'cuisine-section', validate: () => true },
    { id: 'dietary-section', validate: () => true },
    { id: 'time-section', validate: () => true }
];

// DOM Elements
const elements = {
    getLocationBtn: document.getElementById('get-location-btn'),
    locationFallback: document.getElementById('location-fallback'),
    locationInput: document.getElementById('location-input'),
    useManualLocationBtn: document.getElementById('use-manual-location-btn'),
    locationStatus: document.getElementById('location-status'),
    mapWidget: document.getElementById('map-widget'),
    dropPinBtn: document.getElementById('drop-pin-btn'),
    budgetBtns: document.querySelectorAll('.budget-btn'),
    budgetSlider: document.getElementById('budget-slider'),
    cuisineBtns: document.querySelectorAll('.cuisine-btn'),
    dietaryCheckboxes: document.querySelectorAll('.checkbox-input'),
    openNowBtn: document.getElementById('open-now-btn'),
    diningTime: document.getElementById('dining-time'),
    submitBtn: document.getElementById('submit-btn'),
    backBtn: document.getElementById('back-btn'),
    nextBtn: document.getElementById('next-btn'),
    resultsSection: document.getElementById('results-section'),
    resultsContainer: document.getElementById('results-container'),
    progressSteps: document.querySelectorAll('.progress-step')
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    initializeDateTimePicker();
    updateNavigation();
});

// Initialize Event Listeners
function initializeEventListeners() {
    // Location
    elements.getLocationBtn.addEventListener('click', getCurrentLocation);
    elements.useManualLocationBtn.addEventListener('click', useManualLocation);
    elements.dropPinBtn.addEventListener('click', showMapWidget);
    elements.getLocationBtn.addEventListener('click', () => {
        if (elements.locationFallback.style.display === 'none') {
            elements.locationFallback.style.display = 'flex';
        }
    });

    // Budget
    elements.budgetBtns.forEach(btn => {
        btn.addEventListener('click', () => selectBudget(parseInt(btn.dataset.value)));
    });
    elements.budgetSlider.addEventListener('input', (e) => {
        selectBudget(parseInt(e.target.value));
    });

    // Cuisine
    elements.cuisineBtns.forEach(btn => {
        btn.addEventListener('click', () => toggleCuisine(btn));
    });

    // Dietary
    elements.dietaryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => updateDietaryRestrictions());
    });

    // Time
    elements.openNowBtn.addEventListener('click', selectOpenNow);
    elements.diningTime.addEventListener('change', selectFutureTime);

    // Navigation
    elements.nextBtn.addEventListener('click', goToNextStep);
    elements.backBtn.addEventListener('click', goToPreviousStep);
    elements.submitBtn.addEventListener('click', handleSubmit);
}

// Navigation Functions
function goToNextStep() {
    const currentStepConfig = steps[appState.currentStep - 1];
    if (!currentStepConfig.validate()) {
        return;
    }

    if (appState.currentStep < appState.totalSteps) {
        hideCurrentStep();
        appState.currentStep++;
        showCurrentStep();
        updateNavigation();
        updateProgressIndicator();
    }
}

function goToPreviousStep() {
    if (appState.currentStep > 1) {
        hideCurrentStep();
        appState.currentStep--;
        showCurrentStep();
        updateNavigation();
        updateProgressIndicator();
    }
}

function hideCurrentStep() {
    const currentSection = document.getElementById(steps[appState.currentStep - 1].id);
    if (currentSection) {
        currentSection.style.display = 'none';
        currentSection.classList.remove('active');
    }
}

function showCurrentStep() {
    const currentSection = document.getElementById(steps[appState.currentStep - 1].id);
    if (currentSection) {
        currentSection.style.display = 'block';
        currentSection.classList.add('active');
    }
}

function updateNavigation() {
    // Show/hide back button
    if (appState.currentStep > 1) {
        elements.backBtn.style.display = 'inline-flex';
    } else {
        elements.backBtn.style.display = 'none';
    }

    // Show/hide next or submit button
    if (appState.currentStep === appState.totalSteps) {
        elements.nextBtn.style.display = 'none';
        elements.submitBtn.style.display = 'inline-flex';
    } else {
        elements.nextBtn.style.display = 'inline-flex';
        elements.submitBtn.style.display = 'none';
    }
}

function updateProgressIndicator() {
    elements.progressSteps.forEach((step, index) => {
        const stepNumber = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNumber === appState.currentStep) {
            step.classList.add('active');
        } else if (stepNumber < appState.currentStep) {
            step.classList.add('completed');
        }
    });
}

// Initialize DateTime Picker (set min to current time)
function initializeDateTimePicker() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const minDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    elements.diningTime.min = minDateTime;
}

// Geolocation Functions
function getCurrentLocation() {
    if (!navigator.geolocation) {
        showLocationStatus('เบราว์เซอร์ของคุณไม่รองรับการระบุตำแหน่ง', 'error');
        showLocationFallback();
        return;
    }

    elements.getLocationBtn.innerHTML = '<span class="loading"></span> กำลังค้นหาตำแหน่ง...';
    elements.getLocationBtn.disabled = true;

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            
            appState.location = {
                lat,
                lng,
                address: null,
                method: 'geolocation'
            };

            // Reverse geocoding (using a free service)
            reverseGeocode(lat, lng);
            
            elements.getLocationBtn.innerHTML = '<span class="icon">📍</span> ใช้ตำแหน่งปัจจุบัน';
            elements.getLocationBtn.disabled = false;
            showLocationStatus(`ตำแหน่ง: ${lat.toFixed(6)}, ${lng.toFixed(6)}`, 'success');
        },
        (error) => {
            console.error('Geolocation error:', error);
            let errorMessage = 'ไม่สามารถรับตำแหน่งได้';
            
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = 'คุณปฏิเสธการเข้าถึงตำแหน่ง';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = 'ข้อมูลตำแหน่งไม่พร้อมใช้งาน';
                    break;
                case error.TIMEOUT:
                    errorMessage = 'หมดเวลารอรับตำแหน่ง';
                    break;
            }
            
            showLocationStatus(errorMessage, 'error');
            showLocationFallback();
            
            elements.getLocationBtn.innerHTML = '<span class="icon">📍</span> ใช้ตำแหน่งปัจจุบัน';
            elements.getLocationBtn.disabled = false;
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

function reverseGeocode(lat, lng) {
    // Using Nominatim (OpenStreetMap) - free and no API key required
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
        .then(response => response.json())
        .then(data => {
            if (data && data.display_name) {
                appState.location.address = data.display_name;
                showLocationStatus(`ตำแหน่ง: ${data.display_name}`, 'success');
            }
        })
        .catch(error => {
            console.error('Reverse geocoding error:', error);
        });
}

function showLocationFallback() {
    elements.locationFallback.style.display = 'flex';
}

function useManualLocation() {
    const address = elements.locationInput.value.trim();
    if (!address) {
        showLocationStatus('กรุณากรอกที่อยู่', 'error');
        return;
    }

    // Simple geocoding (you can enhance this with a proper API)
    showLocationStatus('กำลังค้นหาตำแหน่ง...', 'success');
    
    // For demo purposes, we'll use a simple geocoding
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                const result = data[0];
                appState.location = {
                    lat: parseFloat(result.lat),
                    lng: parseFloat(result.lon),
                    address: address,
                    method: 'manual'
                };
                showLocationStatus(`ตำแหน่ง: ${address}`, 'success');
            } else {
                showLocationStatus('ไม่พบตำแหน่ง กรุณาลองใหม่อีกครั้ง', 'error');
            }
        })
        .catch(error => {
            console.error('Geocoding error:', error);
            showLocationStatus('เกิดข้อผิดพลาดในการค้นหาตำแหน่ง', 'error');
        });
}

function showMapWidget() {
    elements.mapWidget.style.display = 'block';
    // In a real implementation, you would integrate a map library like Leaflet or Google Maps
    // For now, this is a placeholder
    showLocationStatus('คุณสามารถวาง pin บนแผนที่เพื่อระบุตำแหน่ง', 'success');
}

function showLocationStatus(message, type) {
    elements.locationStatus.textContent = message;
    elements.locationStatus.className = `status-message ${type}`;
}

// Budget Functions
function selectBudget(value) {
    appState.budget = value;
    
    // Update buttons
    elements.budgetBtns.forEach(btn => {
        if (parseInt(btn.dataset.value) === value) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update slider
    elements.budgetSlider.value = value;
}

// Cuisine Functions
function toggleCuisine(button) {
    const cuisine = button.dataset.cuisine;
    const index = appState.cuisines.indexOf(cuisine);
    
    if (index > -1) {
        appState.cuisines.splice(index, 1);
        button.classList.remove('active');
    } else {
        appState.cuisines.push(cuisine);
        button.classList.add('active');
    }
}

// Dietary Functions
function updateDietaryRestrictions() {
    appState.dietary = Array.from(elements.dietaryCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
}

// Time Functions
function selectOpenNow() {
    appState.timePreference = 'now';
    elements.openNowBtn.classList.add('active');
    elements.diningTime.value = '';
}

function selectFutureTime() {
    const selectedTime = elements.diningTime.value;
    if (selectedTime) {
        appState.timePreference = selectedTime;
        elements.openNowBtn.classList.remove('active');
    }
}

// Submit Function
function handleSubmit() {
    // Validate all steps
    if (!validateLocation()) {
        goToStep(1);
        return;
    }

    // Collect all form data
    const formData = {
        location: appState.location,
        budget: appState.budget,
        cuisines: appState.cuisines,
        dietaryRestrictions: appState.dietary,
        timePreference: appState.timePreference
    };

    console.log('Form Data:', formData);

    // Show loading state
    elements.submitBtn.innerHTML = '<span class="loading"></span> กำลังค้นหา...';
    elements.submitBtn.disabled = true;

    // Simulate API call (replace with actual API call)
    setTimeout(() => {
        displayResults(formData);
        elements.submitBtn.innerHTML = '<span class="icon">🔍</span> ค้นหาอาหารที่แนะนำ';
        elements.submitBtn.disabled = false;
    }, 1500);
}

function goToStep(stepNumber) {
    if (stepNumber >= 1 && stepNumber <= appState.totalSteps) {
        hideCurrentStep();
        appState.currentStep = stepNumber;
        showCurrentStep();
        updateNavigation();
        updateProgressIndicator();
    }
}

// Display Results (Demo)
function displayResults(formData) {
    // This is a demo - replace with actual API integration
    elements.resultsSection.style.display = 'block';
    elements.resultsContainer.innerHTML = '';

    // Demo results
    const demoResults = [
        {
            name: 'ร้านอาหารไทยอร่อย',
            cuisine: 'อาหารไทย',
            budget: '฿฿',
            distance: '0.5 กม.',
            rating: 4.5,
            address: '123 ถนนสุขุมวิท'
        },
        {
            name: 'สตรีทฟู้ดเด็ด',
            cuisine: 'สตรีทฟู้ด',
            budget: '฿',
            distance: '0.8 กม.',
            rating: 4.8,
            address: '456 ถนนสีลม'
        },
        {
            name: 'ร้านนั่งชิล',
            cuisine: 'นั่งชิล',
            budget: '฿฿',
            distance: '1.2 กม.',
            rating: 4.3,
            address: '789 ถนนสุขุมวิท'
        }
    ];

    demoResults.forEach(result => {
        const card = document.createElement('div');
        card.className = 'result-card';
        card.innerHTML = `
            <h3 style="font-size: 1.3rem; margin-bottom: 10px; color: var(--text-primary);">${result.name}</h3>
            <p style="color: var(--text-secondary); margin-bottom: 8px;"><strong>ประเภท:</strong> ${result.cuisine}</p>
            <p style="color: var(--text-secondary); margin-bottom: 8px;"><strong>งบประมาณ:</strong> ${result.budget}</p>
            <p style="color: var(--text-secondary); margin-bottom: 8px;"><strong>ระยะทาง:</strong> ${result.distance}</p>
            <p style="color: var(--text-secondary); margin-bottom: 8px;"><strong>คะแนน:</strong> ⭐ ${result.rating}</p>
            <p style="color: var(--text-secondary);"><strong>ที่อยู่:</strong> ${result.address}</p>
        `;
        elements.resultsContainer.appendChild(card);
    });

    // Hide form and show results
    document.querySelector('.main-content').style.display = 'none';
    document.querySelector('.progress-indicator').style.display = 'none';
    elements.resultsSection.style.display = 'block';
}

// Export form data (for API integration)
function getFormData() {
    return {
        location: appState.location,
        budget: appState.budget,
        cuisines: appState.cuisines,
        dietaryRestrictions: appState.dietary,
        timePreference: appState.timePreference
    };
}

// Make getFormData available globally for API integration
window.getFormData = getFormData;
