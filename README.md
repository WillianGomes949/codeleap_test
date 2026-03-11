# LINK: https://codeleap-test-eosin.vercel.app/

---

# 🚀 CodeLeap Network - Modern CRUD Application

A high-performance, responsive social networking application built for the CodeLeap technical assessment. This project demonstrates a robust implementation of **Next.js 15**, **TanStack Query**, and **Framer Motion**, focusing on clean architecture and exceptional User Experience (UX).

## 🛠️ Tech Stack

* **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **State Management & Data Fetching**: [TanStack Query (React Query) v5](https://tanstack.com/query/latest)
* **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
* **Animations**: [Framer Motion](https://www.framer.com/motion/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Date Formatting**: [date-fns](https://date-fns.org/)
* **Notifications**: [Sonner](https://www.google.com/search?q=https://sonner.stevenberard.com/)

---

## ✨ Key Features & Enhancements

* **Persistent Authentication**: A custom `UserContext` manages local session persistence via `localStorage`, ensuring the user remains logged in across refreshes.
* **Real-time Synchronization**: Implemented **Smart Polling** (10s intervals) to keep the feed updated with new posts from other users automatically.
* **Optimized UX**:
* **Skeleton Loaders**: Custom shimmering placeholders for better perceived performance during initial data fetch.
* **Floating Card Layout**: A modern, centered 95% width container that adapts gracefully from mobile to desktop.
* **Micro-interactions**: Animated progress bars in the creation form and smooth layout transitions when deleting/editing items.


* **Robust CRUD**: Complete integration with the CodeLeap API (GET, POST, PATCH, DELETE) with automatic cache invalidation.
* **Advanced Error Handling**: Custom **404 Page** with spring-based animations and "Back to Home" navigation.

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18.x or higher
* npm or yarn

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/your-username/codeleap-test.git
cd codeleap-test

```


2. **Install dependencies**:
```bash
npm install

```


3. **Run the development server**:
```bash
npm run dev

```


4. **Open the application**:
Navigate to [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) to see the app.

---

## 📁 Project Structure

```text
src/
├── app/              # Next.js App Router (Pages & Layout)
├── components/       # UI Components (Modals, Cards, Loaders)
├── context/          # User Authentication Context
├── hooks/            # Custom Hooks (API logic via TanStack Query)
├── styles/           # Global CSS & Tailwind Theme
└── services/         # Axios API Configuration

```

---

## 📝 Assessment Criteria Met

* **Consistency**: All designs strictly follow the provided mockups with added modern refinements.
* **Usability**: Accessible inputs, focus states, and intuitive modals.
* **Code Quality**: Modular component architecture, typed interfaces, and optimized React effects to avoid cascading renders.

---

## 👨‍💻 Author

**Willian (Gordo Dev)** Web Developer & Image Designer based in Fortaleza, CE.

---

Would you like me to add a specific **Deployment** section for Vercel or help you adjust the **API URL** to point to your local mock server for testing?