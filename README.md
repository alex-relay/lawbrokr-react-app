# Lawbrokr Contact Manager

A robust, responsive contact management application built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. This application features a hybrid state management architecture that synchronizes server data with local session storage, ensuring data persistence across page reloads while maintaining high performance.

## 🚀 Tech Stack

- **Framework:** [Next.js 14 (App Router)](https://nextjs.org/)
- **Language:** TypeScript
- **Styling:** Tailwind CSS & Flowbite React
- **Forms:** React Hook Form
- **State Management:** React Context + Session Storage (Hybrid Pattern)

## ✨ Key Features

- **Hybrid State Synchronization:**
  - Implements a custom "Lazy Initialization" pattern.
  - Hydrates state from `sessionStorage` on page load to persist user edits.
  - Falls back to API data when local storage is empty.
- **Robust Form Validation:**
  - Real-time validation using React Hook Form.
  - Custom validators for URLs, numeric values, and zip codes.
  - User-friendly error messaging and status states.
- **Responsive Data Table:**
  - Clean, accessible table layout for viewing contact records.
- **Hydration Mismatch Handling:**
  - Specialized components to handle server-vs-client timestamp rendering (`useClient` directives).

## 🛠️ Installation & Setup

1. **Clone the repository:**
   \`\`\`
   git clone https://github.com/alex-relay/lawbrokr-react-app.git
   cd lawbrokr-react-app
   \`\`\`

2. **Install dependencies:**
   \`\`\`
   npm install

   # or

   yarn install
   \`\`\`

3. **Run the development server:**
   \`\`\`
   npm run dev
   \`\`\`

4. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

\`\`\`text
/app
/contacts # Resource-based routing for contacts
page.tsx # Main contacts table view
layout.tsx # Global layout
page.tsx # Home/Dashboard
/components
/ui # Reusable UI components (Buttons, Inputs)
ContactsForm.tsx # Main data entry form
ContactsTable.tsx # Data display component
/context
ContactsContext.tsx # Global state & storage synchronization
/hooks
useGetContactList.ts # Mock API hook
\`\`\`

## 🧠 Architecture Decisions

### The Hybrid Context Pattern

Instead of relying solely on server state or local state, this app uses a **Context Provider** that acts as a synchronization bridge.

1. **On Load:** The app checks \`sessionStorage\` for existing data.
2. **If Found:** It ignores the API and loads the user's local version (preserving unsaved edits).
3. **If Empty:** It fetches from the API and seeds \`sessionStorage\`.
4. **On Update:** Any change to the form updates both the Context state and \`sessionStorage\` instantly.

### Form Handling

We utilize **React Hook Form** with \`Controller\` components to manage complex inputs like Toggle Switches and Datepickers, ensuring optimal render performance by isolating re-renders to individual fields.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See \`LICENSE\` for more information.
EOF
