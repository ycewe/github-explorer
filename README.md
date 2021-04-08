# Github Explorer

## Prerequisites

1. Node 14 and above - https://nodejs.org/en/
2. Android phone or Android Studio - https://developer.android.com/studio

This app is built with the Expo CLI. To test in a development mode, please ensure you have the neccessary tools as stated in https://docs.expo.io/get-started/installation/

## Limitations

This app is only optimized for Android.

## Features

Personas: Users and Signed In Users

1. Users are able to sign in and up. Users will be automatically sign in when the sign up. However, users cannot sign in if they not signed up.
2. Signed in users can search public repositories on Github on the search tab on the home page.
3. Signed in users can bookmark searched repositories. Bookmarked repositories will be saved and retained as long as you have the app.
4. Users can view, search and sort their bookmarked repositories on the bookmark tab on the home page.
5. Users can view each repository (bookmarked or searched)
   owner, description, five most recent issues and issue owner information.
6. Users can create a new issue on the repository (bookmarked or searched) by first setting their github token.
7. Signed in users can log out of the app and still view their bookmarked repositories. They can un-bookmark their repositories but will need to login to bookmark more repositories.

## Development

In the directory that you cloned or unzip this repository:

1. Run `yarn install`
2. Run `yarn start`
3. This should result in your browser opening http://localhost:19002/. Follow the instructions on the screen.

To submit issues or create a default account,
please add a `.env` file. You may refer to `.env.sample` for the list of available keys.
