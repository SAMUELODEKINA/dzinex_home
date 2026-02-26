# Dzinex Hybrid Construction Ltd - Website

A professional, modern, and visually stunning single-page website for Dzinex Hybrid Construction Ltd, a Nigerian construction and real estate development company based in Abuja.

## 🏗️ About the Company

**Dzinex Hybrid Construction Ltd** is a premier construction and real estate development company serving public and private sector clients across Nigeria.

- **Tagline:** "...where design meets reality"
- **RC Number:** 9323428
- **Location:** Mbora, Off Idu Industrial Layout, Abuja FCT

## 🛠️ Tech Stack

- **Frontend:** React.js with AOS animations
- **Backend:** Node.js with Express.js
- **Database:** MongoDB
- **Styling:** Custom CSS with CSS Variables
- **Icons:** React Icons (Font Awesome)
- **Fonts:** Montserrat & Open Sans (Google Fonts)

## 🎨 Brand Colors

- **Primary Navy:** #1a237e
- **Primary Red:** #c62828
- **Accent Gold:** #f9a825
- **White:** #ffffff

## 📁 Project Structure

```
dzinex-website/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── App.js         # Main component
│       ├── App.css        # Styles
│       └── index.js
├── server/                # Express backend
│   ├── models/            # MongoDB models
│   │   ├── Property.js
│   │   ├── Inquiry.js
│   │   └── Contact.js
│   ├── routes/            # API routes
│   │   ├── properties.js
│   │   ├── inquiries.js
│   │   └── contact.js
│   ├── index.js          # Server entry
│   └── .env              # Environment variables
└── package.json          # Root package
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project folder:

   ```bash
   cd dzinex-website
   ```

2. Install all dependencies:

   ```bash
   npm run install-all
   ```

3. Set up environment variables:
   - Navigate to `server/.env`
   - Update MongoDB URI if needed

### Running the Application

**Development Mode (Client + Server):**

```bash
npm run dev
```

**Server Only:**

```bash
npm run server
```

**Client Only:**

```bash
npm run client
```

The client runs on `http://localhost:3000`
The server runs on `http://localhost:5000`

### Building for Production

```bash
npm run build
```

## 📋 Website Sections

1. **Hero Section** - Full-width banner with CTA buttons
2. **About Us** - Company introduction
3. **What We Do** - 9 service cards
4. **Properties For Sale** - Filterable property listings
5. **Real Estate Development** - 6 service offerings
6. **Why Choose Us** - 8 feature cards
7. **Our Team** - Leadership profiles
8. **Projects Gallery** - Photo showcase
9. **Contact Section** - Contact info & form
10. **Footer** - Links & social media

## 📱 Features

- ✅ Fully responsive (mobile-first)
- ✅ Smooth scroll navigation
- ✅ AOS scroll animations
- ✅ Property filter by type (Residential/Commercial)
- ✅ Property inquiry modal
- ✅ Contact form with dropdown
- ✅ Floating WhatsApp button
- ✅ Status badges (Available/Sold/Coming Soon)
- ✅ Sticky navigation
- ✅ Mobile hamburger menu

## 📞 Contact Information

- **Phone:** +234 (0)703 4684 479 / +234 (0)809 6909 043
- **Email:** dzinexhybridconstruction@gmail.com
- **Address:** Mbora, Off Idu Industrial Layout, Abuja FCT

## 📄 API Endpoints

### Properties

- `GET /api/properties` - Get all properties (with optional filters)
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create property
- `PATCH /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property
- `POST /api/properties/seed` - Seed sample properties

### Inquiries

- `GET /api/inquiries` - Get all inquiries
- `POST /api/inquiries` - Create inquiry
- `PATCH /api/inquiries/:id` - Update inquiry status

### Contact

- `GET /api/contact` - Get all messages
- `POST /api/contact` - Submit contact form
- `PATCH /api/contact/:id` - Update message status

## 📝 License

© 2024 Dzinex Hybrid Construction Ltd. All Rights Reserved.

---

**"...where design meets reality"**
