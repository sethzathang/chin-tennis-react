# Chin Community Tennis Tournament Mobile App 
A cross-platform mobile application built with React Native and Expo, designed to provide an intuitive and seamless experience for both iOS and Android users. 
The app helps the Chin community organize, participate in, and follow regional tennis tournaments across multiple U.S. states.

## 📝 App Summary
The Chin Tennis Tournaments Mobile App centralizes tournament information for the Chin community, making it easier for players and fans to stay up to date on upcoming matches, player rankings, and live streams. With features tailored for both participants and organizers, the app supports tournament creation, player tracking, live match viewing, and user profiles.

## 📱App Overview
* **🏠 Home Screen**
   * Displays upcoming tennis tournaments using horizontal CardView components.
   * Shows photos from past tournaments in a vertical scrollable CardView.
     * Tapping a tournament photo opens a modal with additional images from that event.

* **🏅 Rankings Screen**
   * Lists all registered players along with their current rankings.
   * Rankings are automatically updated when player scores change.

* **🏆 Tournaments Screen**
   * Allows verified tournament organizers to create new tournaments.
   * Shows a list of tournaments created by the logged-in user.
   * A Join button is visible only to users who:
     * Have not already joined the tournament.
     * Can see the tournament has been marked as "started" by the organizer.
   * Allow a user to view the tournament details
 
* **📄 Tournaments Details Screen**
  * Displays complete tournament information:
    * Location 
    * Date 
    * List of players

* **🎥 Live Screen**
   * Lets users watch live matches.
   * Users can share the live match link via Facebook.

* **👤 Profile Screen**
   * Allows users to update their display name.
   * Shows the user’s current ranking.
   * Displays a list of tournaments the user has joined.

## ⚙️ Technical Stack
- React Native 0.79.2
- Expo 53.0.9
- TypeScript 5.8.3
- React Navigation 7
- Additional Expo modules for camera, file system access, and more

## 📚Learn More
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)