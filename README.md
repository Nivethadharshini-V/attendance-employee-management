# Employee Management System

A comprehensive, production-ready React.js frontend application for Employee Attendance, Service Management & Real-Time Location Tracking System.

## 🚀 Features

### 🔐 Authentication & Security
- JWT-based authentication system
- Role-based access control (Admin / HR / Employee)
- Protected routes per role
- Auto session expiry handling
- Secure API access with Authorization headers

### 👥 User & Profile Management
- Complete employee CRUD operations
- Profile management with avatar upload
- Change password functionality
- User role assignment and status tracking

### ⏰ Attendance System
- Attendance check-in / check-out
- Daily attendance tracking
- Monthly attendance reports with charts
- Location-based attendance verification
- Attendance analytics and trends

### 📍 Live Location & Map Features
- Real-time employee location tracking
- Interactive Google Maps view
- Employee markers with status colors
- Location history tracking
- Route tracking with polylines
- Geo-fencing visualization & alerts

### 🔧 Service Management
- Service request creation and assignment
- Service status tracking (Pending / In Progress / Completed)
- Service completion history
- Priority-based service management
- Real-time service updates

### 📊 Dashboards
- **Admin Dashboard**: Total employees, present today, active services, live locations
- **HR Dashboard**: Attendance analytics, employee performance overview
- **Employee Dashboard**: Check-in/out, assigned services, live status

### 📈 Reports & Analytics
- Comprehensive attendance reports
- Service performance analytics
- Employee performance metrics
- Interactive charts and statistics
- Export functionality (PDF / Excel)

### 🔔 Notifications System
- Real-time alerts panel
- Push notification indicators
- Email notification preferences
- Notification history and management

### ⚙️ System Quality
- Role-based API authorization
- Input validation and error handling
- Responsive UI (Desktop + Mobile)
- REST-API-friendly architecture
- Reusable components
- Clean folder structure

## 🛠️ Tech Stack

- **Frontend**: React.js 18 with Vite
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **UI Framework**: Material UI (MUI) v5
- **Charts**: Recharts
- **Authentication**: JWT with jwt-decode
- **Date Handling**: date-fns
- **Forms**: React Hook Form
- **Notifications**: react-hot-toast
- **Maps**: Google Maps JavaScript API

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd employee-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file with your configuration:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
   VITE_JWT_SECRET=your_jwt_secret_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/           # Reusable components
│   ├── ProtectedRoute.jsx
│   ├── AdminRoute.jsx
│   └── HRRoute.jsx
├── contexts/            # React contexts
│   └── AuthContext.jsx
├── layouts/             # Layout components
│   ├── MainLayout.jsx
│   └── AuthLayout.jsx
├── pages/               # Page components
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard pages
│   ├── employees/      # Employee management
│   ├── attendance/     # Attendance system
│   ├── location/       # Location tracking
│   ├── services/       # Service management
│   ├── reports/        # Reports & analytics
│   ├── notifications/  # Notifications
│   ├── profile/        # Profile management
│   └── settings/       # Settings
├── services/            # API services
│   ├── api.js
│   └── mockData.js
├── utils/               # Utility functions
├── hooks/               # Custom hooks
├── App.jsx              # Main app component
└── main.jsx             # Entry point
```

## 🔑 Demo Credentials

The application comes with mock data for testing:

- **Admin**: `admin@company.com` / `admin123`
- **HR**: `hr@company.com` / `hr123`
- **Employee**: `mike@company.com` / `employee123`

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers (1920x1080 and above)
- Tablets (768px and above)
- Mobile devices (320px and above)

## 🗺️ Google Maps Integration

To enable location tracking features:

1. Get a Google Maps JavaScript API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
3. Add your API key to the `.env` file:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```
4. Add the Google Maps script to `index.html`:
   ```html
   <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
   ```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📊 Features Overview

### Admin Features
- Complete employee management (CRUD)
- Service assignment and tracking
- Comprehensive reports and analytics
- System configuration and settings
- User role management

### HR Features
- Attendance monitoring and reports
- Employee performance analytics
- Service management
- Department-wise analytics
- Leave management integration

### Employee Features
- Personal attendance tracking
- Service assignment viewing
- Location tracking
- Profile management
- Notification center

## 🔄 API Integration

The application is designed to work with a RESTful API. The API service layer includes:

- Automatic JWT token handling
- Request/response interceptors
- Error handling and retry logic
- Mock data for development

## 🎨 UI/UX Features

- Modern Material Design interface
- Dark/Light theme support
- Intuitive navigation
- Loading states and error handling
- Accessibility features
- Smooth animations and transitions

## 🔒 Security Features

- JWT-based authentication
- Role-based access control
- Input validation and sanitization
- XSS protection
- Secure password handling
- Session management

## 📈 Performance Optimizations

- Code splitting and lazy loading
- Component memoization
- Optimized re-renders
- Image optimization
- Bundle size optimization

## 🧪 Testing

The application is structured to support testing:
- Component testing with React Testing Library
- Integration testing
- End-to-end testing setup ready

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables for Production
Make sure to set the following environment variables in production:
- `VITE_API_URL` - Your production API URL
- `VITE_GOOGLE_MAPS_API_KEY` - Your Google Maps API key
- `VITE_JWT_SECRET` - Your JWT secret

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the demo credentials

## 🔄 Future Enhancements

- Real-time WebSocket integration
- Advanced reporting features
- Mobile app version
- Biometric attendance integration
- Advanced analytics dashboard
- Multi-language support
- Advanced notification system

---

**Built with ❤️ using React.js and Material UI**
#   e m p l o y e e m a n a g e m e n t  
 