# PawCare - Complete Pet Care Platform

A comprehensive pet care platform built with Next.js, Firebase, and Tailwind CSS that provides all essential services for pet owners.

## 🚀 Recent Enhancements

### ✅ Completed Features

#### 1. **Firebase Authentication & Backend Integration**
- **Firebase Setup**: Configured Firebase SDK with authentication and Firestore
- **User Authentication**: Implemented sign-in/sign-up with email/password and Google OAuth
- **Real-time Data**: All dynamic data now synced with Firebase Firestore
- **User Context**: Global authentication state management

#### 2. **Pet Health Tracker**
- **Add Pet Functionality**: Users can add and manage their pets
- **Firebase Integration**: Pet data stored and retrieved from Firestore
- **Real-time Updates**: Pet health records sync across sessions
- **User-specific Data**: Each user sees only their pets

#### 3. **Enhanced Pet Shop & Grooming**
- **Currency Update**: All prices converted to Indian Rupees (₹)
- **Real Images**: Replaced placeholder images with high-quality Unsplash photos
- **Improved UI**: Better visual appeal with relevant pet product images
- **Tax Calculation**: Updated tax to 18% GST for Indian market

#### 4. **Training Tips - Read More Functionality**
- **Full Article Content**: Complete training guides with detailed instructions
- **Modal Interface**: Clean reading experience with article modal
- **Rich Content**: Step-by-step tutorials with tips and best practices
- **Responsive Design**: Works seamlessly on all devices

#### 5. **Lost & Found Feature**
- **Post Lost/Found Pets**: Users can report lost or found pets
- **Firebase Storage**: All posts stored in Firestore with real-time updates
- **Image Support**: Upload images via URL
- **Contact Information**: Direct phone/email contact for urgent situations
- **Search & Filter**: Find pets by type, breed, or location

#### 6. **Community Forum**
- **Create Posts**: Users can create discussion posts, ask questions, share stories
- **Real-time Updates**: Posts appear instantly across all users
- **Interaction**: Like posts and track views
- **Categories**: Organized by Discussion, Advice, Success Stories, etc.
- **User Profiles**: Display user names and avatars

#### 7. **UI/UX Improvements**
- **Better Contrast**: Fixed text color issues for improved readability
- **Loading States**: Added loading indicators for all Firebase operations
- **Error Handling**: Proper error management for all database operations
- **Responsive Design**: Improved mobile and tablet experience

## 🛠 Technology Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **UI Components**: Custom components with Radix UI primitives
- **State Management**: React Context for authentication
- **Icons**: Lucide React
- **Images**: Unsplash integration

## 🔧 Setup Instructions

### Prerequisites
- Node.js 18+ 
- Firebase project
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd Pet_Care_Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password and Google)
   - Create Firestore Database
   - Copy your Firebase config

4. **Environment Configuration**
   ```bash
   # Create .env.local file with your Firebase config
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open the application**
   Navigate to `http://localhost:3000`

## 🗃 Database Structure

### Firestore Collections

#### `users`
```javascript
{
  name: string,
  email: string,
  createdAt: string,
  pets: array
}
```

#### `pets`
```javascript
{
  name: string,
  type: string,
  breed: string,
  age: string,
  image: string,
  userId: string,
  createdAt: string
}
```

#### `lostFoundPosts`
```javascript
{
  name?: string,
  type: string,
  breed: string,
  color: string,
  age?: string,
  location: string,
  description: string,
  contact: string,
  phone: string,
  email?: string,
  image: string,
  status: 'lost' | 'found',
  userId: string,
  createdAt: string
}
```

#### `communityPosts`
```javascript
{
  title: string,
  content: string,
  category: string,
  author: string,
  authorId: string,
  avatar?: string,
  likes: number,
  comments: number,
  views: number,
  createdAt: string,
  likedBy: array
}
```

## 🎯 Key Features

### Authentication
- Email/password registration and login
- Google OAuth integration
- Persistent authentication state
- User profile management

### Pet Management
- Add multiple pets per user
- Track health records, vaccinations, medications
- Schedule appointments
- Upload pet photos

### Shopping Experience
- Browse pet products with real images
- Prices in Indian Rupees (₹)
- Shopping cart functionality
- Secure checkout process

### Community Features
- Discussion forums
- Lost & found pet postings
- Training resources
- Expert advice

### Emergency Services
- 24/7 vet contacts
- First aid guides
- Emergency protocols

## 🔒 Security Features

- Firebase Authentication security rules
- User data isolation
- Secure API endpoints
- Input validation and sanitization

## 📱 Responsive Design

- Mobile-first approach
- Tablet optimization
- Desktop experience
- Cross-browser compatibility

## 🚧 Future Enhancements

- [ ] In-app messaging system
- [ ] Video call consultations
- [ ] Advanced pet health analytics
- [ ] Appointment booking system
- [ ] Payment gateway integration
- [ ] Push notifications
- [ ] Offline mode support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues or questions:
- Create an issue on GitHub
- Check the documentation
- Contact the development team

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**PawCare** - Everything your pet needs in one place! 🐾