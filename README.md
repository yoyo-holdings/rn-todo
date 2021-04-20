# ReactNative TODO App

ReactNative TODO App is [YOYO](https://github.com/yoyo-holdings)'s technical test.  This is a standard Mobile
application that provides a simple organizer for the user to store notes
and TODOs.

* Instructions

  1. Fork this repository on your own personal GitHub account.
  2. Download your fork, build this app, and begin making changes.
  3. When finished, create a Pull Request to merge into YOYO's version,
     then send an email to [@aindong](https://github.com/aindong) to let him know you're ready for
     review.
  4. We will close the pull request.

  You may also submit your commits using =git format-patch=, should you
  prefer it over GitHub PRs.

* Specifications

  1. The app consists of two major activities:
     - a note-taking activity that accepts a `title` and `text` for one
       or more notes
     - a TODO tracking activity that accepts an `entry`, with a
       `checkbox` to show whether this entry has been done or not done
  2. The app should have a user interface that allows for easy access
     between the note-taking and TODO tracking activities as well as to
     see their details at a glance.
  3. The note-taking activity should provide a view for its notes in a
     reverse-chronological order, with options for updating and deleting
     old notes.
  4. The TODO-tracking activity should provide a view for its entries
     with options for updating and deleting old TODOs.
  5. The app should make it easy to switch between the note-taking and
     TODO-tracking activities.
  6. The app should make it easy to switch a note to a TODO entry, and
     vice versa.
  7. The release APK should target Android devices running version 4.4
     (KitKat) and up.

* Questions

  In your PR/patch email, please also answer these following questions:

  - What design patterns did you use inside the application? I'm still in the process of learning and still didnt used this before.
  - How did you manage your states? I manage it by using React Hooks useState, by using it i can easily manipulate the state of a functional component without needing to convert them into class components.
  - What libraries did you use? I used a lot of libraries here. React, React-Native, React Navigation, @react-native-community
    + Why did you use this library? I used these libraries mostly for designing UI
    + Are there other libraries available? Yes, actually a lot of libraries are available.
    + If yes, what made you choose this library over the others? I chose these libraries over the others because these libraries are the ones who are active and updated and a lot of programmers are using it. Also the documentation of these libraries are easy to understand.
  - What major challenges did you encounter when making the app? One of the major challenge i encountered with this is the passing of data, and since i am using Typescript, i needed to indicate all types.
  - If you had more time, what additional features would you like to
    add? I would love to add a few more features to this, like adding the time when the notes/todo were being added. Also attaching photos to our todos and notes so that you can easily remember what you needed to do .Attaching voice record is one as well, it is for those people who doesnt know how to read and write, also to some other pwd's, so that they will just record and play their notes and todo's.

  In addition, you may provide more information in your PR/patch email
  that you would like us to know.

* Notes

  - You may use any open source libraries that you think would be useful
    for completing the test and improving this app.
  - You may implement the user interface in any way that you feel may
    improve the user experience.
  - You may use any development tools you have at your disposal to
    complete this test, so long as the resulting app is a standard
    Android application that can be built using the standard tooling:

    ```sh
      ./gradlew clean assembleDebug
    ```
