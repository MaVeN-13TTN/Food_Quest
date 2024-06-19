# 🍽️ FoodQuest: Your Culinary Companion

FoodQuest is a modern and user-friendly web application that allows users to explore and discover recipes, search for food-related videos, and manage their favorite and bookmarked recipes. Built using React, Django, and the Spoonacular API, FoodQuest provides an immersive and interactive experience for food enthusiasts.

## ✨ Key Features

- 🔍 **Recipe Search and Exploration**: Find recipes effortlessly using keywords, ingredients, cuisine types, or dietary restrictions.
- 📝 **Recipe Details**: Access detailed recipe information, including ingredients list, step-by-step instructions, preparation and cooking times, nutritional information, and high-resolution images.
- 🎲 **Random Recipe Generator**: Generate and explore random recipes for culinary inspiration and variety.
- ⭐ **Favorites and Bookmarks**: Save your favorite recipes or bookmark them for future reference in your personalized collections.
- 😂 **Food Jokes and Trivia**: Enjoy random food-related jokes and trivia facts for a fun and engaging experience.
- 🥗 **Dietary Preferences and Filters**: Set your dietary preferences and apply filters to the recipe search and display based on your needs.
- 📱 **Responsive Design**: Seamlessly access FoodQuest across different devices and screen sizes with our responsive design.
- 🔐 **User Authentication**: Register and login securely to access personalized features and save your preferences.

## 🛠️ Tech Stack

- **Frontend**:
  - React: JavaScript library for building user interfaces
  - TailwindCSS: Utility-first CSS framework for rapid UI development
- **Backend**:
  - Django: Python web framework for building web applications
  - Django REST Framework: Toolkit for building Web APIs with Django
  - PostgreSQL: Powerful open-source relational database system
- **External API**:
  - Spoonacular API: Comprehensive food and recipe API for accessing recipe data, food images, and more
- **Security**:
  - Django REST Framework SimpleJWT: Library for JSON Web Token authentication in Django
- **Data Flow**:
  - Axios: Promise-based HTTP client for making API requests
- **Testing**:
  - Jest: JavaScript testing framework for unit and integration tests
  - Django's built-in testing framework: Testing tools for backend functionality

## 🚀 Quick Start

1. Clone the project:
   ```bash
   git clone https://github.com/yourusername/FoodQuest.git
   cd FoodQuest
   ```
2. Set up the backend:
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Create a virtual environment:
     ```bash
     python -m venv env
     ```
   - Activate the virtual environment:
     - For Windows:
       ```
       .\env\Scripts\activate
       ```
     - For Unix or Linux:
       ```
       source env/bin/activate
       ```
   - Install the backend dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Apply database migrations:
     ```bash
     python manage.py migrate
     ```
   - Start the backend server:
     ```bash
     python manage.py runserver
     ```
3. Set up the frontend:
   - Navigate to the frontend directory:
     ```bash
     cd ../frontend
     ```
   - Install the frontend dependencies:
     ```bash
     npm install
     ```
   - Start the frontend development server:
     ```bash
     npm start
     ```
4. Visit `http://localhost:5137` and start your culinary adventure!

## 🤝 Contribute

We welcome contributions from the community! If you'd like to contribute to FoodQuest, please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

FoodQuest is released under the [MIT License](https://opensource.org/licenses/MIT).

## 🙌 Acknowledgements

- Spoonacular API for providing comprehensive food and recipe data
- TailwindCSS for the utility-first CSS framework
- React and Django communities for their valuable resources and support

👨‍🍳 Happy Cooking! Let FoodQuest guide you on your culinary journey. 🥘
