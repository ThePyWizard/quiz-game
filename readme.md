
![Header Image](https://github.com/ThePyWizard/quiz-game/assets/91713896/f0b819ee-f7b6-4cff-b892-7644caad1d1c)

# Quiz Buzz

The QuizBuzz is a web-based application developed in React that allows users to participate in quizzes based on selected themes/categories. It fetches questions from an external API and tracks the user's score and time taken to answer each question.

## Features

- **Quiz Setup:** Users can set their name and choose a quiz theme to begin the quiz.
- **Timer:** Each question has a timer, ensuring users answer within a specified time limit.
- **Score Tracking:** Users' scores are recorded and displayed at the end of the quiz.
- **Leaderboard Integration:** The app adds users' scores to a Firestore collection named "leaderboard-stats" after completing the quiz.

## Technologies Used

- **React:** Built using React for the frontend interface and state management.
- **Firebase:** Integrated Firebase Firestore for storing leaderboard statistics.
- **Fetch API:** Utilized the Fetch API to retrieve quiz questions from an external API (Open Trivia Database).

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/ThePyWizard/quiz-game.git`
2. Install dependencies: `npm,vite,react,tailwindcss`
3. Create a Firebase project and set up Firestore.
4. Update the Firebase configuration in `firebase.js`.
5. Start the development server: `npm start`

## Usage

1. Access the app in your browser.
2. Set your name and choose a quiz theme/category to start the quiz.
3. Answer the questions within the time limit for each.
4. After the quiz ends, view your score and optionally restart the quiz.      

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or feature ideas, feel free to open an issue or create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
