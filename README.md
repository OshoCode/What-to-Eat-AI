# What to Eat? AI - Context-Aware Food Recommender

A highly responsive web application for intelligent food and restaurant recommendations based on user context.

## Features

### 📍 Location Services
- **Automatic Geolocation**: Uses browser's Geolocation API to get user's current location
- **Manual Input**: Fallback option to type in location or address
- **Map Pin Drop**: Interactive map widget for precise location selection

### 💰 Budget Selection
- **Visual Buttons**: Three budget levels (฿, ฿฿, ฿฿฿) with clear icons
- **Slider Control**: Alternative slider interface for budget selection
- Synchronized between buttons and slider

### 🍽️ Cuisine & Mood Selection
- **Interactive Grid**: Multiple cuisine types and dining moods
- **Multi-Select**: Choose multiple preferences
- Available options:
  - สตรีทฟู้ด (Street Food)
  - อาหารญี่ปุ่น (Japanese Food)
  - อาหารไทย (Thai Food)
  - อาหารคลีน (Healthy Food)
  - นั่งชิล (Relaxed Vibe)
  - อาหารอิตาเลียน (Italian Food)
  - อาหารเกาหลี (Korean Food)
  - อาหารฝรั่ง (Western Food)
  - อาหารทะเล (Seafood)
  - ของหวาน (Dessert)

### 🥬 Dietary Restrictions
- Checkbox-based selection for dietary needs:
  - มังสวิรัติ (Vegetarian)
  - เจ (Vegan)
  - ไม่มีเนื้อหมู (No Pork)
  - ฮาลาล (Halal)
  - ไม่มีกลูเตน (Gluten-Free)
  - ไม่มีแลคโตส (Lactose-Free)

### 🕐 Time & Availability
- **Open Now**: Quick button to find currently open restaurants
- **Future Planning**: DateTime picker for scheduling future dining

## Technical Stack

- **HTML5**: Semantic markup with accessibility in mind
- **CSS3**: Modern responsive design with CSS Grid and Flexbox
- **Vanilla JavaScript**: No framework dependencies for fast loading
- **Geolocation API**: Browser-native location services
- **Nominatim API**: Free reverse geocoding service

## Getting Started

1. **Open the Application**
   - Simply open `index.html` in a modern web browser
   - No build process or dependencies required

2. **Using the Application**
   - Click "ใช้ตำแหน่งปัจจุบัน" to get your current location (requires browser permission)
   - Or manually enter your location
   - Select your budget preference
   - Choose cuisine types and moods
   - Check any dietary restrictions
   - Select time preference (Open Now or future time)
   - Click "ค้นหาอาหารที่แนะนำ" to get recommendations

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

**Note**: Geolocation requires HTTPS in production (works on localhost for development)

## API Integration

The application collects all user context in a structured format. To integrate with your backend API:

```javascript
// Get form data
const formData = window.getFormData();

// Example structure:
{
    location: {
        lat: 13.7563,
        lng: 100.5018,
        address: "Bangkok, Thailand",
        method: "geolocation"
    },
    budget: 2,
    cuisines: ["street-food", "thai"],
    dietaryRestrictions: ["vegetarian"],
    timePreference: "now"
}
```

## Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #FF6B6B;
    --secondary-color: #4ECDC4;
    /* ... */
}
```

### Adding More Cuisines
Add new buttons in the `cuisine-grid` section of `index.html`:
```html
<button class="cuisine-btn" data-cuisine="new-cuisine">
    <span class="cuisine-icon">🍕</span>
    <span class="cuisine-label">ชื่ออาหาร</span>
</button>
```

## Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## Future Enhancements

- [ ] Integrate actual restaurant recommendation API
- [ ] Add interactive map with restaurant markers
- [ ] Implement user preferences saving
- [ ] Add restaurant details and reviews
- [ ] Support for multiple languages
- [ ] Add social sharing features

## License

Free to use for personal and commercial projects.

## Support

For issues or questions, please check the code comments or create an issue in the repository.
