# HireHub Job Portal

HireHub Job Portal is a complete fresher-friendly front-end developer project built with React, Tailwind CSS, Firebase Authentication, and Firestore Database.

## Features

- Modern landing page with hero search, category cards, and featured jobs
- Email/password login and signup with Firebase Authentication
- Protected routes and role-based admin routes
- Firestore job listings with local sample jobs when Firestore is empty
- Search and filters by title, skill, company, location, job type, and experience
- Job details and application form
- Duplicate application prevention per user and job
- User dashboard with application status
- Admin dashboard with total jobs, applications, active jobs, and users count
- Add, edit, delete jobs
- View applicant details and update statuses
- Responsive Tailwind UI, loading states, empty states, toasts, and dark/light mode

## Tech Stack

- HTML
- CSS
- JavaScript
- React
- Tailwind CSS
- Firebase Authentication
- Firestore Database
- React Router

This project includes CDN fallbacks for Tailwind and Firebase modules so the UI can still be reviewed if npm package downloads are interrupted. After `npm install` succeeds, the same app code and commands continue to work normally.

## Commands to Run in VS Code

Open this folder in VS Code, then run:

```bash
npm install
cp .env.example .env
npm run dev
```

On Windows PowerShell, use this instead of `cp`:

```powershell
Copy-Item .env.example .env
```

Add your Firebase config values to `.env`, then open the local URL shown by Vite, usually:

```bash
http://localhost:5173
```

Production build:

```bash
npm run build
npm run preview
```

## Firebase Setup Steps

1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Add a Web App inside Project Settings.
4. Copy the Firebase config values.
5. Create `.env` from `.env.example`.
6. Paste each Firebase value into the matching `VITE_FIREBASE_*` variable.
7. Go to Authentication > Sign-in method.
8. Enable Email/Password authentication.
9. Go to Firestore Database.
10. Create a database in test mode for development.

## Firestore Collections

### users

```js
{
  name: "Admin User",
  email: "admin@hirehub.dev",
  role: "admin", // or "user"
  createdAt: timestamp
}
```

### jobs

```js
{
  title: "Frontend Developer Trainee",
  company: "TechNova Solutions",
  location: "Bengaluru",
  salary: "3.6 - 5 LPA",
  jobType: "Full-time",
  experience: "Fresher",
  skills: ["React", "JavaScript", "Tailwind CSS"],
  description: "Build responsive React interfaces.",
  responsibilities: ["Create reusable components", "Work with APIs"],
  status: "active",
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### applications

```js
{
  userId: "firebaseAuthUid",
  jobId: "jobDocumentId",
  jobTitle: "Frontend Developer Trainee",
  company: "TechNova Solutions",
  fullName: "Candidate Name",
  email: "candidate@email.com",
  phone: "9876543210",
  resumeLink: "https://drive.google.com/resume",
  coverLetter: "I am interested in this role...",
  status: "Pending", // Pending, Reviewed, Selected, Rejected
  createdAt: timestamp
}
```

## Development Firestore Rules

These rules are convenient for development. Tighten them before production.

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function signedIn() {
      return request.auth != null;
    }

    function isAdmin() {
      return signedIn()
        && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
    }

    match /users/{userId} {
      allow read: if signedIn();
      allow create: if signedIn() && request.auth.uid == userId;
      allow update, delete: if isAdmin() || request.auth.uid == userId;
    }

    match /jobs/{jobId} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }

    match /applications/{applicationId} {
      allow create: if signedIn() && request.resource.data.userId == request.auth.uid;
      allow read: if isAdmin() || (signedIn() && resource.data.userId == request.auth.uid);
      allow update: if isAdmin();
      allow delete: if isAdmin();
    }
  }
}
```

## Admin Account Setup Method

1. Run the app.
2. Sign up normally with the email you want to use as admin.
3. Open Firebase Console > Firestore Database > `users`.
4. Find the document whose ID matches the admin user's Firebase Auth UID.
5. Change `role` from `user` to `admin`.
6. Log out and log back in.
7. The Admin Dashboard will be available from the navbar.

## Folder Structure

```txt
src/
  components/
    AdminRoute.jsx
    EmptyState.jsx
    Footer.jsx
    JobCard.jsx
    LoadingSpinner.jsx
    Navbar.jsx
    ProtectedRoute.jsx
  data/
    sampleJobs.js
  firebase/
    firebase.js
  pages/
    AddJob.jsx
    AdminDashboard.jsx
    Applications.jsx
    ApplyJob.jsx
    Home.jsx
    JobDetails.jsx
    Jobs.jsx
    Login.jsx
    ManageJobs.jsx
    Signup.jsx
    UserDashboard.jsx
  App.jsx
  index.css
  main.jsx
```
