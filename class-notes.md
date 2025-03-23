[YouTube Tutorial](https://www.youtube.com/watch?v=f8Z9JyB2EIE)

#### Expo is to react-native what Next.js and Vite is to React

1.  Improved cli over the react-native cli
2.  <b>Over air updates:</b>
    - users can get latest code without needing App store approval
3.  Differences

![alt text](image.png)

4. NativeWind allows you to write Tailwind like CSS styles in react native.
5. <View is like <Div <p <h with added functionality.
   - Uses flexbox layout by default
6. <TouchableOpacity for creating simple buttons
7. onPress instead of onClick
8. <TouchableHighlight
9. <TouchableWithoutFeedback
10. <ActivityIndicator
11. <FlatList

    - For rendering long list of items that need to be scrolled. Like map in React with extra features which already accepts some props. such as "data" props for an array of data to map, and a "renderItem" prop
      ![alt text](image-1.png)

12. <ScrollView
13. <SafeAreaView

    -A safe zone to render app content within, with out it being covered by the device hardware feature. e.g Status bar

14. <Image and <ImageBackground

    - SVG not supported
    - need a 3rd party package react-native-svg

15. <Modal
16. <Alert
17. <Switch for toggles
18. <StatusBar from Expo is preferred

## Native Wind Installation.

[Follow the steps from Native Wind official
Installation Guide for Expo](https://www.nativewind.dev/getting-started/installation)

run

        npx expo customize metro.config.js

and override with file in the Install guide

        const { getDefaultConfig } = require("expo/metro-config");
        const { withNativeWind } = require('nativewind/metro');

        const config = getDefaultConfig(__dirname)

        module.exports = withNativeWind(config, { input: './global.css' })

## snippet

          rnfes

## to restart project an clear cache

          npx expo start --clear

## Customize Expo app to show logo of application when it is loading:

by Fixing "assets not found error" Unable to resolve asset "./assets/images/icon.png" from "icon" in your app.json or app.config.js

### edit app.json:

from: "icon": "./assets/images/icon.png",
to: "icon": "./assets/images/logo.png",
for android:
change
"foregroundImage": "./assets/images/adaptive-icon.png",
"foregroundImage": "./assets/images/logo.png",
for web:
"image": "./assets/images/splash-icon.png",
"image": "./assets/images/logo.png",
expo-splash-screen
"image": "./assets/images/splash-icon.png",
"image": "./assets/images/logo.png",

## React hooks:

A function that

1. starts with the word 'use'
2. typically are called at the top of the function component.
3. expose additional functionalities
   - For Example define a router using the useRouter hook allowing us to move between screens programmatically. Go to another page or screen when something happens.

## TMDB

[A movies database](https://www.themoviedb.org/?language=en-US)
[API](https://developer.themoviedb.org/reference/intro/getting-started)

1. Select NodeJS
2. Get API Key
   - Login or Create account
3. Get and save your api key and token
4. Go to <>API References
5. Click "Try it" to see authentication response
6. Search for "discover movie", the endpoint for discovering movies.
   ![alt text](image-1.png)
7. Click "Try it"
   - response shows over 49,000 pages with much detail of almost 1 million movies.

For our code:

1.  Copy the entire fetch request.
2.  Create a new folder/file called 'services/api.ts'
3.  Paste in the copied fetch request as a template. REM it out.
4.  Use the template to create a TMDB config export in conjunction with a .env file.

## Custom Hook

To handle the fetching of data in a clean reusable and scalable way. Without cluttering the component by abstracting away the logic for fetching the data, managing the error and loading state. Also, manually trigger a refetch when needed.

1. Create a useFetch.ts file in the services folder.
2. Create the useFetch function which accepts the Fetch function as a parameter, e.g,:
   - fetchMovies
   - fetchMovieDetails
   - of type function the returns a promise of generic parameter T
   - const userFetch = <T>(fetchFunction: () => Promise<T> ) => {}
  
### React 19 comes with a host of new hooks
Ex: The use() useActionState() useFormState() useTransition() etc
  

## Develop Search Screens
1. autofetch is set to false
fetch the object that represents the movie where query matches the 'user input for the search'

             const {
               data: movies,
               loading,
               error,
            } = useFetch(() => fetchMovies({ query: searchQuery }), false);


2. ListHeaderComponent is a special Flatlist prop that renders an element (react fragment) that contains what is displayed at the top of the list.

3.  (Non-null Assertion): This operator tells TypeScript that you are certain the value is not null or undefined. It effectively overrides TypeScript's type checking for null or undefined values.

            {!loading &&
              !error &&
              searchQuery.trim() &&
              movies?.length! > 0 && (
                <Text className="text-xl text-white font-bold">
                  Search Results for{' '}
                  <Text className="text-accent">{searchQuery}</Text>
                </Text>
              )}

   
   ## Debouncing
   So not to overload the api with every key stroke. Wrap a search term into a timeout function

         useEffect(() => {
            // const func = async () => {
            const timeoutId = setTimeout(async () => {
               if (searchQuery.trim()) {
               await loadMovies(); //* since we are using await, need to wrap the if statement in a async function
               } else {
               reset();
               }
            }, 500);

            // func();
            //* clear the timeout by returning a callback function with that ID
            return () => clearTimeout(timeoutId);
         }, [searchQuery]);
         //* recall the function every time the searchQuery changes.