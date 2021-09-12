# airquality-submission

Submission for vj-code-tests.

## Task

To build an interactive project where users will select an Indian city and have their local air quality displayed in cigarettes and particulate matter. The project needs to work in areas that do not have good broadband access.

## Install

The files should be ready to drop into a directory and serve.

## Assets Provided

- JSON data in both English and Hindi.
- Cigarette .png image file.

## Project Notes

- Key goals were to keep the project simple, small file size, and implement both languages for the JSON provided.
- Bulma.css was used once the logic was complete to build the interface quickly, alongside my own css (aq.css) to refine the appearance.
- Animate.css was used to add visuals to the hero image, headline, and dropdown interactions.
- Support for both languages in key elements such as the text content, city dropdown and numerical results was important.
- I found this https://www.bbc.co.uk/branding/reith-font so imported a couple of WOFF files to experiment with for branding purposes.
- I tried to keep it simple and support the narrative of the story.
- I wanted the concept to be re-usable, for example with similar data and small changes in parameters, the same code could be used to detail the pollution in any country.

## Frustrations

- IE11 doesn't support arrow functions or fetch and is ending I think next year (June 2022). It would still be great to make the project IE11 compatible, by using a polyfill. 
- I wanted the city list to be alphabetical A-Z, but didn't allocate resources to see if this was possible to filter the JSON in multiple languages.

## Still to add

- IE11 Support
- Display cities alphabetically in dropdown
- Refactor javascript into smaller resuable functions




