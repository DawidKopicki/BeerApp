# Interview requirements

This repository contains the base code for recruitment exercise. Complete the tasks listed below and publish the solution on your github. Send us a link to your repository at least 1 day before the interview. 
We will discuss the proposed solution during the interview. You should be ready to present the working application on your local machine.

## Recruitment Task

- Beer page ~ style a cool beer page - Done
- Home page favourites ~ add a list of favourite beers, do not clean after page reload - Done
- Beer list filtering + pagination + sorting - Done
- Progressive Web App, offline - Done

## Solution

On the home page, list of 10 randomly generated beers has been prepared. There was a bug in the API, when parameter with the number of beers was given, it kept returning the same values - I made a workaround for this problem. In addition, functionality to search for beers by name has been added.

After clicking the "Reload list" button, we generate a new list. After checking the checkboxes, the beer goes to the list of favorite beers. We can uncheck a beer to remove it from the list, or click on the 'Remove all' button to clear the entire list.

The beers subpage was styled using MaterialUI components. A map based on the ```React Leaflet``` library using API data has been added.

On the beer list page, pagination has been added, as well as the ability to change the number of items displayed in the list. In addition, we have the ability to search by name, filter by beer type, and sort ascending or descending by name and beer type.

The site also works offline - all pages that were previously viewed and stored in the browser's memory are still available to users, even without Internet access. When you go offline, a message appears informing you that you are using the site without Internet access.

Additional libraries: ```react-leaflet, lodash```
