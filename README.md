# Frontend Mentor - Note-taking web app solution

This is a solution to the [Note-taking web app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/note-taking-web-app-773r7bUfOG). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Create, read, update, and delete notes
- Archive notes
- View all their notes
- View all archived notes
- View notes with specific tags
- Search notes by title, tag, and content
- Select their color theme
- Select their font theme
- Receive validation messages if required form fields aren't completed
- Navigate the whole app and perform all actions using only their keyboard
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- **Bonus**: Save details to a database (build the project as a full-stack app)
- **Bonus**: Create an account, log in, change password (add user authentication to the full-stack app)
- **Bonus**: Reset their password (add password reset to the full-stack app)

### Screenshot

![](./screenshot/Screenshot%2002-20-2025%2013.46.07.png)
![](./screenshot/Screenshot%2002-20-2025%2013.46.29.png)
![](./screenshot/Screenshot%2002-20-2025%2013.46.58.png)
![](./screenshot/Screenshot%2002-20-2025%2013.47.16.png)
![](./screenshot/Screenshot%2002-20-2025%2013.47.43.png)
![](./screenshot/Screenshot%2002-20-2025%2013.47.55.png)
![](./screenshot/Screenshot%2002-20-2025%2013.48.19.png)
![](./screenshot/Screenshot%2002-20-2025%2013.48.47.png)

### Links

- Solution URL: [Notes-solution-link](https://github.com/DmytroVoitovych/DevNotes)
- Live Site URL: [Notes-live-link](https://note-taking-app-72ec5.firebaseapp.com/)

## My process

### Built with

- Semantic HTML5 markup
- SCSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [Pinia](https://pinia.vuejs.org/) - State manager for Vue.js
- [Vue.js](https://nextjs.org/) - JavaScript framework
- [Vue-router](https://router.vuejs.org/) - For routing in Vue app
- [Element-plus](https://element-plus.org/en-US/) - UI library
- [Firebase](https://console.firebase.google.com/) - For auth and store

### What I learned

In this project, the most challenging task was organizing the routes, as they needed to look different on mobile and desktop layouts. Additionally, I had to write an authentication guard while ensuring that the reset password page, which opens from a user’s email, was properly handled. This forced me to revise my authentication logic multiple times.

I also decided to use Firebase Hosting instead of Vercel, even though Vercel offers a much simpler deployment process compared to Firebase. However, it was really interesting to bind the GitHub repository with Firebase Hosting.

Auth guard function, see below:

```js
export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalizedLoadedGeneric,
  next: NavigationGuardNext,
) => {
  const userStore = useUserStore();
  const isLoggedIn = userStore.isLogin;

  const hasResetCode = to.query.oobCode || to.query.mode === "resetPassword";

  if (hasResetCode) {
    const resetParams = {
      oobCode: to.query.oobCode,
      mode: to.query.mode,
    };

    next({ path: "/reset-password", query: resetParams });
    return;
  }

  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: "login" });
    return;
  }

  if (!to.meta.requiresAuth && isLoggedIn) {
    next({ name: "home" });
    return;
  }

  next();
};
```

### Continued development

For my next project, I plan to use vanilla JavaScript because I believe that understanding native technology is always a good idea. Frameworks are just JavaScript, and having strong fundamental knowledge is crucial. Therefore, I want to keep my skills sharp and my mind engaged by working directly with the core language.

### Useful resources

- [Dispatch Event](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent) - This helped me to overcome Element plus tags trigger logics. There was note to set trigger on comma an I neded to emulate behavior.
- [SVG loader](https://github.com/jpkleemans/vite-svg-loader) - It makes work with svg simpler and handy.

## Author

- Website - [Dmytro Voitovych](https://portfolio-dmytrovoitovych.vercel.app/)
- Frontend Mentor - [@dmytrovoitovych](https://www.frontendmentor.io/profile/DmytroVoitovych)
