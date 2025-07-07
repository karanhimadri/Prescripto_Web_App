# 🏥 Prescripto - Healthcare Appointment Booking Platform

[![React](https://img.shields.io/badge/React-19.0.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

> A comprehensive healthcare appointment booking system with separate patient, doctor, and admin interfaces built with modern React architecture.

## 🌟 Project Overview

Prescripto is a full-stack healthcare appointment booking platform that streamlines the process of connecting patients with healthcare providers. The system features role-based access control, real-time appointment management, and integrated payment processing.

### 🔥 Live Demo
- **Patient Portal**: [prescripto.netlify.app](https:prescriptox.netlify.app)
- **Admin Panel**: [prescripto-admin.netlify.app](https://prescripto-admin.vercel.app)

## ✨ Key Features

### 👥 **For Patients**
- 🔍 **Smart Doctor Search** - Filter by speciality, location, and availability
- 📅 **Real-time Booking** - Interactive calendar with available time slots
- 💳 **Secure Payments** - Integrated Razorpay payment gateway
- 📱 **Responsive Design** - Optimized for desktop and mobile devices
- 👤 **Profile Management** - Personal dashboard with appointment history
- 🔔 **Notifications** - Real-time updates via React Toastify

### 👨‍⚕️ **For Doctors**
- 📊 **Dashboard Analytics** - Appointment statistics and earnings overview
- 🗓️ **Schedule Management** - View and manage daily appointments
- 👤 **Profile Control** - Update professional information and availability
- 📈 **Performance Metrics** - Track patient interactions and ratings

### 👨‍💼 **For Administrators**
- 🏥 **Doctor Management** - Add, edit, and manage healthcare providers
- 📋 **Appointment Oversight** - Monitor system-wide booking activities
- 📊 **Analytics Dashboard** - Platform usage statistics and insights
- ⚙️ **System Configuration** - Manage platform settings and permissions

## 🛠️ Tech Stack

### **Frontend Architecture**
```
Frontend Technologies:
├── React 19.0.0           # UI Library with latest features
├── Vite 6.2.0            # Build tool and development server
├── React Router DOM 7.3.0 # Client-side routing
├── Tailwind CSS 3.4.17   # Utility-first CSS framework
├── Axios 1.8.2           # HTTP client with interceptors
├── React Icons 5.5.0     # Icon library
└── React Toastify 11.0.5 # Notification system
```

### **Development Tools**
```
Development Environment:
├── ESLint 9.21.0         # Code linting and formatting
├── PostCSS 8.5.3         # CSS processing
├── Autoprefixer 10.4.20  # CSS vendor prefixing
└── VS Code Configuration # Optimized development setup
```

## 🏗️ Project Architecture

```
prescripto-app/
├── 📱 frontend/                 
│   ├── src/
│   │   ├── components/         # Reusable UI parts (Navbar, Header, etc.)
│   │   ├── pages/              # Main screens (Home, Doctors, Profile, etc.)
│   │   ├── context/            # Global state management
│   │   ├── api/                # API calls and Axios setup
│   │   └── utils/              # Helper functions (e.g., time slots)
│   └── package.json            # Frontend dependencies
│
├── 🏥 adminPanel/               # Admin & Doctor dashboard (Port: 5174)
│   ├── src/
│   │   ├── components/         # Admin UI parts (Navbar, Sidebar)
│   │   ├── pages/              # Admin and Doctor views
│   │   ├── context/            # State for admin/doctor
│   │   ├── api/                # API setup for admin/doctor
│   │   └── utils/              # Utilities (date formatting, age calc, etc.)
│   └── package.json            # Admin panel dependencies
│
├── 📁 .vscode/                 # VS Code workspace settings
├── 📄 README.md               # Project overview and setup guide

```

## 🚀 Advanced Features Implementation

### **Authentication & Authorization**
```javascript
// JWT-based authentication with role-based access
const authInterceptor = (config) => {
  const token = localStorage.getItem('patientToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};
```

### **Time Slot Management**
```javascript
// Dynamic slot generation with IST timezone handling
const generateTimeSlots = (selectedDate) => {
  const slots = [];
  const startTime = 10; // 10 AM
  const endTime = 21;   // 9 PM
  
  for (let hour = startTime; hour < endTime; hour++) {
    slots.push({
      time: `${hour}:00`,
      available: checkAvailability(selectedDate, hour)
    });
  }
  return slots;
};
```

### **Payment Integration**
```javascript
// Razorpay payment gateway integration
const handlePayment = async (appointmentData) => {
  const options = {
    key: process.env.RAZORPAY_KEY_ID,
    amount: appointmentData.fee * 100,
    currency: 'INR',
    name: 'Prescripto',
    description: 'Doctor Appointment Booking',
    handler: (response) => {
      confirmAppointment(response.razorpay_payment_id);
    }
  };
};
```

## 🎯 Performance Optimizations

- **⚡ Lazy Loading** - Route-based code splitting with React.lazy()
- **🗄️ Efficient State Management** - Context API with optimized re-renders
- **📱 Responsive Images** - WebP format with fallbacks
- **🔄 API Optimization** - Request deduplication and caching
- **🎨 CSS Optimization** - Tailwind JIT compilation and purging

## 🛠️ Installation & Setup

### **Prerequisites**
```bash
Node.js >= 18.0.0
npm >= 9.0.0
Git
```

### **Quick Start**
```bash
# Clone the repository
git clone https://github.com/yourusername/prescripto-app.git
cd prescripto-app

# Install dependencies for frontend
cd frontend
npm install

# Install dependencies for admin panel
cd ../adminPanel
npm install

# Start development servers
npm run dev  # Frontend runs on http://localhost:5173
cd ../adminPanel
npm run dev  # Admin panel runs on http://localhost:5174
```

### **Environment Variables**
```bash
# frontend/.env
VITE_API_URL=http://localhost:8080
VITE_RAZORPAY_KEY_ID=your_razorpay_key
VITE_APP_ENV=development

# adminPanel/.env
VITE_API_URL=http://localhost:8080
VITE_APP_ENV=development
```

## 📱 Responsive Design Showcase

The application is built with a mobile-first approach using Tailwind CSS:

- **Desktop** (1024px+): Full sidebar navigation with expanded content
- **Tablet** (768px-1023px): Collapsible sidebar with optimized layouts
- **Mobile** (320px-767px): Bottom navigation with touch-optimized interface

## 🎨 UI/UX Features

- **🎯 Intuitive Navigation** - Role-based navigation with breadcrumbs
- **🎨 Modern Design** - Clean, medical-themed interface
- **⚡ Fast Loading** - Optimized images and lazy loading
- **♿ Accessibility** - WCAG 2.1 compliant with screen reader support
- **🌙 Theme Support** - Light/dark mode capability (future feature)

## 🔐 Security Implementation

- **🔒 JWT Authentication** - Secure token-based authentication
- **🛡️ Route Protection** - Role-based access control
- **🔐 Input Validation** - Client and server-side validation
- **🚫 XSS Protection** - Sanitized user inputs
- **🔑 HTTPS Only** - Secure data transmission

## 📈 Future Enhancements

- [ ] **📱 Mobile App** - React Native implementation
- [ ] **🤖 AI Integration** - Symptom checker and doctor recommendations
- [ ] **💬 Chat System** - Real-time doctor-patient communication
- [ ] **📊 Advanced Analytics** - Detailed reporting dashboard
- [ ] **🌐 Multi-language** - Internationalization support
- [ ] **🔔 Push Notifications** - Appointment reminders
- [ ] **📋 Electronic Health Records** - Patient medical history

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Your Name**
- 📧 Email: karanhimadri1234@gmail.com
- 💼 LinkedIn: [linkedin.com/in/himadrikaran](https://linkedin.com/in/himadrikaran)
- 🐙 GitHub: [github.com/karanhimadri](https://github.com/karanhimadri)
- 🌐 Portfolio: [himadri.me](https://himadri.me)

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS approach
- **Vite** for the lightning-fast build tool
- **Razorpay** for seamless payment integration
- **Healthcare Community** for inspiration and requirements

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ for the healthcare community

</div>
