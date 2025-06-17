# Organizer App

This is a sample web application to organize group activities. It has been realized with SvelteKit v2 + Svelte v5.

The data is stored in a NoSQL Firestore DB.


# Running the sample
First things first, you'll have to create a Firebase Account and provision a new firebase project with a web app (see guide at [firebase.google.com](https://firebase.google.com/docs/projects/learn-more))

Once you have done that, you should provision an admin account by following this guide: [Set up a Firebase project and service account](https://firebase.google.com/docs/admin/setup#set-up-project-and-service-account)

Place the `.json` in the root of the project.

As a last step you must create a `.env` file and copy the contents of the firebase admin SDK json inside it like so

```ini
PRIVATE_FIREBASE_SERVICE_ACCOUNT='<place your firebase admin SDK json contents here>'

# Attention! the contents of the file must be quoted with single quotes.
```

You can use the provided `.example.env` to start with.

Now you are ready to launch the server just run `npm run dev` to get a preview.

To test out the PWA functionality build in the app, you must generate a production build. Follow theese steps to do so:
- Run `npm run build` to build the project
- Run `npm run preview` to launch the produciton build in the browser.


# Additional information
For any additional information please contact me at [t.marzocchella@studenti.unipi.it](mailto:t.marzocchella@studenti.unipi.it)