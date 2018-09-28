# Welcome to the api docs for Omega Workouts

Following routes is accessible:

1. `GET /logs` gets logs for the last 24 hours
1. ``/api/v1``
    1. ``GET /users``: Get all users
        1. ``POST /createUser``: Create a user
        1. ``POST /login`` Log in
    1. ``GET /workouts`` Get all workouts
        1. ``POST /`` Creates a workout
        1. ``GET /:name``: find all workouts with name
        1. ``PUT /:id`` Find a workout and update it
        1. ``DELETE /:id`` find a workout and delete it


Find the TypeScript models below: 

Note that _id is accessible on all models!

```typescript
    export interface Workout {
      exercises: Exercise[],
      name: string;
      createdBy: User
    }
    
    export interface User {
      email: string;
      password: string;
    }
    
    export interface Exercise {
      description:string;
      repetitions: number;
      name: string;
    }
```