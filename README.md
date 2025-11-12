# AI Messages Companion

O aplicație web care ajută utilizatorii să răspundă perfect în conversații importante (business, romantice).

## 🚀 Funcționalități

- **Input conversație**: Lipește întreaga conversație și primește răspunsul perfect
- **Setări personalizabile**:
  - **Temperatură** (0.0-2.0): Controlează stilul răspunsului (rigid/balansat/creativ)
  - **Obiectiv**: Specifică ce vrei să obții din conversație
- **Răspuns instant**: Generează un răspuns scurt și eficient (1-2 fraze)
- **Copy rapid**: Copiază răspunsul cu un singur click
- **Design responsive**: Funcționează perfect pe mobile, tablet și desktop

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript vanilla
- **API**: Google Gemini 2.5 Flash
- **Storage**: localStorage (pentru API key)
- **NO database, NO backend** - totul în frontend

## 📋 Cum să folosești

### 1. Obține API Key de la Google

1. Mergi la [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Creează un API key nou pentru Gemini
3. Copiază API key-ul

### 2. Deschide aplicația

Simplu deschide `index.html` în browser (sau folosește un server local).

### 3. Configurează

1. **Introdu API Key**: Lipește API key-ul în câmpul dedicat (se salvează automat în browser)
2. **Setează temperatura**:
   - **0.0-0.5**: Răspunsuri rigide, formale, profesionale
   - **0.5-1.0**: Răspunsuri balansate
   - **1.0-2.0**: Răspunsuri creative, casual, playful
3. **Adaugă obiectiv** (opțional): Ex: "Vreau să fixez o întâlnire"

### 4. Generează răspuns

1. Lipește conversația în textarea
2. Click pe **"Generează Răspuns"**
3. Primești un răspuns perfect personalizat
4. Click pe **"Copiază"** pentru a copia răspunsul

## 🎨 Design Principles

### Shadow System (Color Layering)
- **NO BORDERS**: Folosește doar contrast de culoare și shadows
- **3 nivele de shadow**: Small (subtle), Medium (standard), Large (prominent)
- **Inset shadows**: Pentru elemente sunken (inputs, textarea)
- **Outset shadows**: Pentru elemente raised (buttons, cards)
- **Gradient backgrounds**: Pentru efect shiny și elevated

### Color Palette
- **4 shades** pentru fiecare culoare de bază
- **Hierarchy**: Darker = background/deep, Lighter = elevated/important
- **Natural lighting**: Light from above (lighter pe top, darker pe bottom)

### Responsive Design
- **Box-based system**: Layout flexibil care se rearanjează natural
- **Breakpoints**:
  - Desktop (>1024px): Layout complet optimizat
  - Tablet (768px-1024px): Spacing ajustat, reflow controls
  - Mobile (<768px): Single column, stacked vertical
- **Touch targets**: Minimum 44x44px pentru mobile

## 📱 Responsive Features

- Font sizes adaptive cu `clamp()`
- Touch targets mărite pe mobile
- Stacked layout vertical pe ecrane mici
- Shadows mai prominente pentru interacțiuni
- Spacing optimizat pentru fiecare breakpoint

## 🔒 Privacy & Security

- **API key salvat LOCAL**: Doar în browser-ul tău (localStorage)
- **NO backend**: Toate apelurile API se fac direct din browser
- **NO database**: Nicio informație nu este stocată pe un server

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 Structura Proiectului

```
umbra-vision/
├── index.html      # Structura HTML
├── styles.css      # Shadow system + responsive design
├── app.js          # Gemini API integration
└── README.md       # Acest fișier
```

## 💡 Tips

1. **Temperatură joasă (0.0-0.5)**: Perfect pentru email-uri business, negocieri formale
2. **Temperatură medie (0.5-1.0)**: Ideal pentru conversații prietenos-profesionale
3. **Temperatură înaltă (1.0-2.0)**: Excelent pentru conversații romantice, casual cu prietenii

4. **Specifică obiectivul**: Cu cât ești mai clar despre ce vrei, cu atât răspunsul e mai bun
   - ✅ "Vreau să fixez o întâlnire mâine seară"
   - ✅ "Vreau să negociez un preț mai mic"
   - ✅ "Vreau să continuu conversația într-un mod flirty"

5. **Context complet**: Include cât mai mult din conversație pentru un răspuns mai bun

## 🚀 Dezvoltare Locală

```bash
# Metoda 1: Deschide direct în browser
open index.html

# Metoda 2: Server HTTP simplu (Python)
python3 -m http.server 8000
# Apoi mergi la http://localhost:8000

# Metoda 3: Server HTTP simplu (Node.js)
npx http-server
```

## 📝 License

MIT License - folosește liber pentru orice scop!

---

**Powered by Google Gemini 2.5 Flash** ✨
