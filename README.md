# FitLog — Workout Library

FitLog is a responsive workout library built with Next.js and TypeScript. It allows users to browse workouts, view detailed exercise information, add workouts to today's plan, save workouts for later, and track their daily workout plan.

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React
- REST API
- LocalStorage

## Features

- Browse 12 workouts from the FitLog API
- Search workouts by name or muscle group
- Sort workouts by duration, calories, or rating
- View detailed workout information and instructions
- Add workouts to today's plan with a maximum of five exercises
- Save workouts for later
- Mark planned workouts as done
- Remove workouts from today's plan or saved list
- View live exercise, time, and calorie totals
- Responsive design for mobile, tablet, and desktop
- LocalStorage persistence for plan and saved workouts
- Loading, empty, error, and 404 states

## API

### All Workouts

`https://api.abcz.workers.dev/api/fitlog`

### Single Workout

`https://api.abcz.workers.dev/api/fitlog/:id`

## Getting Started

Install the dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## Project Structure

```text
src/
├── app/
│   ├── my-plan/
│   ├── workout/
│   │   └── [id]/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── loading.tsx
│   └── not-found.tsx
├── components/
│   ├── Banner/
│   ├── Footer/
│   ├── Navbar/
│   └── WorkoutLibrary/
└── context/
    └── PlanContext.tsx
```

## License

This project was created as a learning and assignment project.
