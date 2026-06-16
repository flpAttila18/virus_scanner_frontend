# Virus Scanner Frontend

## About the Project
> Virus Scanner Frontend is a modern, responsive single-page web application (SPA) built with React and Bootstrap. The interface provides an intuitive and seamless dashboard for users to interact with secure file analysis tools. It features dedicated screens for responsive navigation, custom dynamic QR code generation, real-time file scanning histories, and advanced profile management—including on-the-fly username updates and dynamic multi-format avatar uploads integrated directly with the backend storage ecosystem.

---

## Created by:
- **Fülöp Attila Ákos** (Backend, SQL Database, Frontend)

---

## Project Structure

```markdown
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Card.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── WriteOutCard.jsx
│   ├── context/
│   │   └── Authcontext.jsx
│   ├── cssFolder/
│   │   ├── index.css
│   │   ├── qrCodeGenerator.css
│   │   ├── register.css
│   │   ├── ScanHistory.css
│   │   └── settings.css
│   ├── Images/
│   │   └── default.jpg
│   ├── pages/
│   │   ├── History.jsx
│   │   ├── Index.jsx
│   │   ├── Login.jsx
│   │   ├── Profile.jsx
│   │   ├── QrcodeGenerator.jsx
│   │   ├── Register.jsx
│   │   └── Settings.jsx
│   ├── api.js
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js


# Application Features & Views
## Main Dashboard (Index)
The landing interface welcomes users with a clean, centered hub displaying the main scanning features and quick-access application options.

## Navigation Bar (Navbar)
A highly polished, context-aware layout. When a user is logged in, it dynamically fetches the live database profile state to display the personalized username alongside their custom round cropped avatar dropdown. For unauthenticated guests, it presents unified registration and login entry points.

## QR Code Generator
A functional dedicated workspace utility allowing users to generate, configure, and output custom QR codes on demand.

## Scan History
A structured data table layout fetching backend logs specific to the authenticated token identity, tracking uploaded file structures, scan statuses, and detailed threat breakdowns.

## Authentication (Login & Register)
Secure and validated client-side entry forms linked directly with cross-origin credential-sharing services to process standard registration and stateful cookie management.

## Account Settings & Profile
An interactive panel dedicated to user customization. It provides live client-side input triggers allowing users to modify their active aliases or dynamically upload custom image files via automated multipart form handlers.
