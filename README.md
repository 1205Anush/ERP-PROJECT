# College ERP System - Frontend

A production-ready College ERP system built with React + TypeScript featuring separate dashboards for Students and Teachers.

## 🚀 Features

### Authentication
- **Login/Signup** with role-based access (Student/Teacher)
- **Forgot Password** functionality
- **Protected Routes** based on user roles
- **Context-based State Management**

### Student Module
- **Dashboard** with widgets for courses, attendance, notices, and timetable
- **Course Registration** with enrollment management
- **Fees Payment** system with payment tracking
- **Student Information** management with editable forms
- **Examination** module with three sections:
  - Exam Registration
  - Results Summary (CGPA/Grade view)
  - Detailed Marks (subject-wise breakdown)

### Teacher Module
- **Placeholder Dashboard** (ready for future implementation)
- Designed for easy extension

## 🛠️ Tech Stack

- **React 18** with **TypeScript**
- **React Router** for navigation
- **React Context** for state management
- **Responsive Design** (desktop-first)
- **Mock Data** (no backend required)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── ForgotPassword.tsx
│   ├── Student.tsx
│   ├── StudentDashboard.tsx
│   ├── CourseRegistration.tsx
│   ├── FeesPayment.tsx
│   ├── StudentInformation.tsx
│   ├── Examination.tsx
│   └── TeacherDashboard.tsx
├── layouts/            # Layout components
│   └── Layout.tsx
├── context/            # React Context providers
│   └── AuthContext.tsx
├── types/              # TypeScript type definitions
│   └── index.ts
├── data/               # Mock data
│   └── mockData.ts
├── App.tsx             # Main app component
└── index.tsx           # Entry point
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone/Download** the project files
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## 🔐 Demo Credentials

You can login with any email/password combination. The system uses mock authentication.

**Example:**
- Email: `student@college.edu` or `teacher@college.edu`
- Password: `password123`
- Role: Select either Student or Teacher

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop** (primary focus)
- **Tablet** 
- **Mobile** devices

## 🎨 UI Features

- **Clean, Modern Interface**
- **Intuitive Navigation** with sidebar
- **Interactive Widgets** and cards
- **Form Validation**
- **Loading States** and feedback
- **Hover Effects** and animations
- **Color-coded Status** indicators

## 🔧 Customization

### Adding New Features
1. Create new components in `src/components/`
2. Add new pages in `src/pages/`
3. Update routing in `App.tsx`
4. Add mock data in `src/data/mockData.ts`

### Styling
- Inline styles are used for rapid development
- Easy to migrate to CSS modules or styled-components
- Consistent color scheme and spacing

### State Management
- Uses React Context for authentication
- Local state for component-specific data
- Easy to integrate with Redux or Zustand if needed

## 🚀 Production Deployment

The app is ready for deployment to:
- **Netlify**
- **Vercel** 
- **AWS S3 + CloudFront**
- **GitHub Pages**

Simply run `npm run build` and deploy the `build/` folder.

## 🔮 Future Enhancements

### Teacher Module
- Course management
- Student attendance tracking
- Grade management
- Assignment creation
- Analytics dashboard

### Student Module
- Real-time notifications
- Assignment submission
- Library integration
- Hostel management
- Transport tracking

### Technical Improvements
- Backend API integration
- Real authentication system
- Database connectivity
- File upload functionality
- Push notifications

## 📄 License

This project is created for educational purposes and can be freely used and modified.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

---

**Built with ❤️ using React + TypeScript**