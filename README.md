Certainly! Here's the README in markdown format for you to copy and paste:

```markdown
# PathVest Web App

PathVest is an interactive web application that empowers users to ask personalized investment-related questions and receive AI-powered insights. The platform offers features for managing user profiles, handling income/expense tracking, investment planning, and more. It also integrates a smart AI chatbot to help users navigate through investment strategies and financial planning.

## Features

### 1. **AI Chatbot:**
   - **Ask PathVest AI Anything**: Users can interact with an AI chatbot to ask investment-related questions, such as:
     - "What's the best way to start investing?"
     - "How do I diversify my investment portfolio?"
     - "Can you explain the difference between stocks and bonds?"
     - "What are the tax implications of selling investments?"
   - **Personalized Responses**: The chatbot provides personalized investment insights and guidance based on the user’s query.

### 2. **Profile Management:**
   - Users can manage their profile, including personal information like name, role, company, email, and profile picture.
   - Login and logout functionality allows users to secure their accounts.

### 3. **Dynamic Dashboard:**
   - **Dashboard Navigation**: The app has an intuitive sidebar for easy navigation, including sections for:
     - Dashboard Overview
     - Income
     - Expense
     - Investment
     - Planning Board (Kanban)
     - Account Settings (Profile and Login)
   - **Interactive and Clean UI**: Users can easily explore and manage their financial activities, investment plans, and personal information.

### 4. **Investment Planning:**
   - The app allows users to explore various investment-related sections for effective portfolio management and financial planning.

### 5. **Sample Questions for the AI Chatbot:**
   - What's the best way to start investing?
   - How do I diversify my investment portfolio?
   - Can you explain the difference between stocks and bonds?
   - What are the tax implications of selling investments?
   - How can I plan for retirement using PathVest?

### 6. **Real-time Data Handling:**
   - The app integrates real-time data for employees, products, and investment tracking, providing users with a comprehensive view of their financial status.

## Technologies Used

- **Frontend:**
  - Next.js with TypeScript for creating dynamic user interfaces
  - Tailwind CSS for modern, responsive styling
  - Prisma for seamless interaction with the database
  - MongoDB for storing user data and application state

- **Backend:**
  - API-driven architecture for handling requests and serving data
  - Groq AI API integration for the AI chatbot functionality

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-repo/pathvest-webapp.git
cd pathvest-webapp
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add the following environment variable:

```
DATABASE_URL=your_mongodb_connection_string
```

### 4. Run the development server

```bash
npm run dev
```

Your app will be available at `http://localhost:3000`.

## Project Structure

```
/src
  /components
    /ui                -> UI components like placeholders and input fields
  /types
    -> TypeScript types for user, employee, and product data
  /pages
    -> Pages for dashboard, profile, and AI chatbot interactions
  /lib
    -> Functions for handling API requests and database queries
  /assets
    -> Static assets such as images and icons
```

## Contribution

We welcome contributions to improve this project. Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a pull request for review.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
```

