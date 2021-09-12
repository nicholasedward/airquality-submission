// HELPERS TO BUILD DOM FAST
function createNode(element) {
  return document.createElement(element)
}

function append(parent, el) {
  return parent.appendChild(el)
}

// HELPER TO FILTER ARRAYS
const filterItems = (arr, query) => {
  return arr.filter(el => el.toLowerCase().indexOf(query.toLowerCase()) !== -1)
}

// LANGUAGE JSONS
const englishData = 'src/data/english.json'
const hindiData = 'src/data/hindi.json'

// GET DOM BODY
let heroDiv = document.querySelector('#hero-main')

// GET MAIN APP DIV
let app = document.querySelector('#app')

// FETCH JSON
let startApp = function(jsonData){
  
  fetch(jsonData, {
    method: "GET",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
    },
})
  .then(response => response.json())
  .then(function(data) {

    // PUSH INTO EMPTY DATA ARRAY
    dataArray.push(data)

    // CALL FILTER CITIES
    filterCities()

    // CALL FUNCTION TO BUILD APP DIV ELEMENTS INC DROPDOWN TO SELECT CITY
    buildAppEls()
  })
}

// START APP FUNCTION PASSING IN DEFAULT LANGUAGE 
startApp(englishData)

// EMPTY ARRAYS FOR DATA MANIPULATION
let dataArray = []
let citiesArray = []
let finalCities = []

// FILTER DATA ARRAY TO MAKE CITIES ARRAY
let filterCities = function() {

  let rawArray = []

  for (let name in dataArray[0]) {
    if (dataArray[0].hasOwnProperty(name)) {
      rawArray.push(name);
    } else {
      console.log('Sorry, nothing to push!')
    }
  }

  let cityListArray = []

  for (let i = 1; i < rawArray.length; i++) {
    let cityValue = filterItems(rawArray, `compare-tabs_1_city_${i}_name`)
    cityListArray.push(cityValue)
  }

  let cityListStringsArray = []

  for (let i = 1; i < cityListArray.length; i++) {
    let cityListString = `"compare-tabs_1_city_${i}_name"`
    let cityListParsed = JSON.parse(cityListString)
    cityListStringsArray.push(dataArray[0][`${cityListParsed}`])
  }

  for (let i = 0; i < cityListStringsArray.length; i++) {
    if (cityListStringsArray = cityListStringsArray.filter( Boolean )) {
      let newEntry = cityListStringsArray[i]
      finalCities.push(newEntry)
    }
  }

  // PUSH FINAL FILTERED CITIES LIST INTO FINAL CITIES ARRAY
  citiesArray.push(finalCities)
  
  // LOG ARRAY OF CITIES ONLY
  // console.log(finalCities)

}

// BUILD ALL ELEMENTS FOR APP DIV
const buildAppEls = function() {

    // HERO SECTION
    const heroSection = createNode('section')
    heroSection.classList.add('hero', 'is-fullheight','animate__animated', 'animate__fadeIn' )
    heroSection.id = 'hero'
    heroSection.setAttribute("style", "background-image: url('https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-hello/SMOG_vdyw4.jpg');background-repeat: no-repeat; background-position: center; background-size: cover");

    // HERO BODY
    const heroBody = createNode('div')
    heroBody.classList.add('hero-body')

    // HERO CONTENT DIV
    const heroContent = createNode('div')
  
    // HERO TITLE
    const heroTitle = createNode('h1')
    heroTitle.classList.add('title', 'has-text-white', 'animate__animated', 'animate__fadeIn',  'animate__slower','animate__delay-1s')
    heroTitle.innerHTML = dataArray[0]["hero_1_title"]

    // HERO SUBTITLE
    const heroSubtitle = createNode('p')
    heroSubtitle.classList.add('is-size-6', 'has-text-white', 'city-data-pad', 'animate__animated', 'animate__fadeIn',  'animate__slower','animate__delay-1s')
    heroSubtitle.innerHTML = dataArray[0]["article-info_1_byline"]

    // HERO ARTICLE DATE
    const heroDate = createNode('p')
    heroDate.classList.add('is-size-6', 'has-text-white', 'city-data-pad', 'animate__animated', 'animate__fadeIn', 'animate__delay-2s')
    heroDate.innerHTML = dataArray[0]["article-info_1_date"]

    // CAT URL
    const catURL = createNode('a')
    catURL.href = dataArray[0]["article-info_1_category_url"]
    catURL.classList.add('has-text-white', 'is-size-6', 'animate__animated', 'animate__flipInX',  'animate__slower','animate__delay-2s')
    catURL.innerHTML = 'Asia | ' + dataArray[0]["article-info_1_category"]

    // APPEND BODY DIV AND TITLE TO SECTION
    append(heroDiv, heroSection)
    append(heroSection, heroBody)
    append(heroBody, heroContent)
    append(heroContent, catURL)
    append(heroContent, heroTitle)
    append(heroContent, heroSubtitle)
    append(heroContent, heroDate)

    // PARAGRAPH ELS
    const para1 = createNode('p')
    para1.innerHTML = dataArray[0]["p_1_value"].bold()
    
    const para2 = createNode('p')
    para2.innerHTML = dataArray[0]["p_2_value"]

    const para3 = createNode('p')
    para3.innerHTML = dataArray[0]["p_3_value"]

    const para4 = createNode('p')
    para4.innerHTML = dataArray[0]["p_4_value"]

    const para5 = createNode('p')
    para5.innerHTML = dataArray[0]["p_5_value"].bold()

    const para6 = createNode('p')
    para6.innerHTML = dataArray[0]["p_6_value"].bold()
    para6.style.textDecoration = "underline";

    const para7 = createNode('p')
    para7.innerHTML = dataArray[0]["p_7_value"]

    const para8 = createNode('p')
    para8.innerHTML = dataArray[0]["p_8_value"]

    const para9 = createNode('p')
    para9.innerHTML = dataArray[0]["p_9_value"]

    const para10 = createNode('p')
    para10.innerHTML = dataArray[0]["p_10_value"]

    // CREATE DROP DOWN SELECT ELEMENT AND POPULATE OPTIONS FROM FINAL CITIES ARRAY

    // CREATE OUTER DIV FOR SELECT ELEMENT
    const selectOuter = createNode('div')
    selectOuter.classList.add('drop-pad')

    // CREATE SELECT DIV
    const selectDiv = createNode('div')
    selectDiv.classList.add('select')

    // CREATE SELECT DROPDOWN
    const selectCity = createNode('select')
    selectCity.id = "city-select"
    selectCity.classList.add('select', 'is-normal', 'has-text-centered')

    // CREATE DEFAULT OPTION FOR SELECT ELEMENT
    const defaultOption = createNode('option')
    defaultOption.text = 'Choose a city'
    defaultOption.value = 0

    // APPEND DEFAULT OPTION TO SELECT ELEMENT
    append(selectCity, defaultOption)

    // CREATE OPTIONS AND APPEND TO SELECT ELEMENT
    for (let i = 0; i < finalCities.length; i++) {
        let option = document.createElement("option");
        option.value = i + 1
        option.text = finalCities[i];
        selectCity.appendChild(option);
    }

    // APPEND SELECT ELEMENT TO SELECT DIV ELEMENT
    append(selectDiv, selectCity)

    // CREATE DIV TO DYNAMICALLY OUTPUT CITY DATA
    let cityData = createNode('div')
    cityData.id = 'city-data'
    cityData.classList.add('city-data-pad')

    // RESULT HEADER TEXT
    let resHead = createNode('p')
    resHead.classList.add('is-size-4', 'check-city')
    // resHead.style.textDecoration = "underline";
    resHead.innerHTML = 'Check your city data:'.bold()

    // OUTPUT CALC CIG METHOD - HOW IT WORKS
    const calcCig = createNode('p')
    calcCig.classList.add('is-size-6')
    calcCig.innerHTML = '*' + dataArray[0]["compare-tabs_1_method"].italics();

    // CREATE ELEMENTS FOR EACH PART OF CITY DATA.
    const cityName = createNode('li')
    cityName.id = 'city-name'
    cityName.classList.add('is-size-5', 'animate__animated', 'animate__flipInX')

    // CREATE DEFAULT CITY NAME AND DATA FOR ELEMENT
    cityName.innerHTML = 'City: ' + dataArray[0]["compare-tabs_1_city_3_name"].bold()

    const cityAqi = createNode('li')
    cityAqi.id = 'city-aqi'
    cityAqi.classList.add('is-size-5', 'animate__animated', 'animate__flipInX')
    cityAqi.innerHTML = 'Air Quality Index: ' + dataArray[0]["compare-tabs_1_city_3_aqi"].bold()

    const cityCigg = createNode('li')
    cityCigg.id = 'city-cigg'
    cityCigg.classList.add('is-size-5', 'animate__animated', 'animate__flipInX')
    cityCigg.innerHTML =  'Equal to: ' + dataArray[0]["compare-tabs_1_city_3_cigg"].bold() + ' Cigarettes a day'.bold()

    // CREATE DEFAULT CONTAINER FOR CIGG IMGS
    const cityCiggDefCon = createNode('div')
    cityCiggDefCon.classList.add( 'cig-div', 'animate__animated', 'animate__delay-1s', 'animate__fadeInLeft')
    cityCiggDefCon.id = 'city-cig'

    // SET DEFAULT CITY CIG QTY
    let cigQty = 10

    // CREATE DEFAULT OPTION CIGG IMGS
    for (let counter = 1; counter <= cigQty; counter++) {
      let cigImg = createNode('img')
      cigImg.src = "src/img/ciggrette_icon.png"
      cigImg.width = '30'
      // APPEND TO DEFAULT CIGG CONT
      append(cityCiggDefCon, cigImg)
    }

    // CREATE LANGUAGE TEXT
    const langTxt = createNode('p')
    langTxt.innerHTML = 'Choose Language:'.bold()
    langTxt.style.textDecoration = "underline";
    langTxt.classList.add('lang-pad')

    // CREATE LANGUAGE BUTTONS
    const langDiv = createNode('div')
    langDiv.classList.add('lang-div', 'buttons', 'has-addons')

    const langEn = createNode('div')
    langEn.classList.add('button','btn-pad')
    langEn.innerHTML = 'English'

    const langHi = createNode('div')
    langHi.classList.add('button', 'btn-pad')
    langHi.innerHTML = 'Hindi'

    // LISTEN FOR CLICK THEN REBUILD APP
    langEn.addEventListener('click', function(){
      // console.log('change to english')
        dataArray = []
        citiesArray = []
        finalCities = []
        heroDiv.innerHTML = ''
        app.innerHTML = ''
        startApp(englishData)
    })

    // LISTEN FOR CLICK THEN REBUILD APP
    langHi.addEventListener('click', function(){
      // console.log('change to hindi')
      dataArray = []
      citiesArray = []
      finalCities = []
      heroDiv.innerHTML = ''
      app.innerHTML = ''
      startApp(hindiData)
    })

    // APPEND LANG ELEMENTS TO APP
    append(app, langTxt)
    append(app, langDiv)
    append(langDiv, langEn)
    append(langDiv, langHi)

    // APPEND ELEMENTS TO APP DIV IN ORDER
    append(app, para1)
    append(app, para2)
    append(app, para3)
    append(app, para4)
    append(app, para5)

    // APPEND SELECT DIV TO OUTER
    append(selectOuter, selectDiv)

    // APPEND CITY DATA INFO AND DROP DOWN ELEMENTS
    append(cityData, resHead)
    append(cityData, calcCig)
    append(cityData, selectOuter)
    append(cityData, cityName)
    append(cityData, cityAqi)
    append(cityData, cityCigg)
    append(cityData, cityCiggDefCon)

    // APPEND CITY DATA DIV TO APP
    append(app, cityData)

    // APPEND PARAGRAPH ELEMENTS TO APP
    append(app, para6)
    append(app, para7)
    append(app, para8)
    append(app, para9)
    append(app, para10)

    // LISTEN FOR SELECT ELEMENT TO CHANGE THEN GRAB VALUE OF OPTION
    let cityChange = document.querySelector('#city-select')
    cityChange.addEventListener('change', (event) => {

        // GRAB ID OF CITY
        let cityId = event.target.value
        // console.log(cityId)

        // CLEAR CITY DATA DIV OF OLD CONTENT
        cityData.innerHTML = ''

        // CLEAR DIV / DO NOTHING IF DEFAULT OPTION IS SELECTED
        if (cityId === '0' ) {

            // RE-APPEND HTML FOR CITY DATA INFO ELEMENTS
            cityName.innerHTML = 'City: ' + 'No Data'.bold()
            cityAqi.innerHTML = 'Air Quality Index: ' + 'No Data'.bold()
            cityCigg.innerHTML = 'Equal to: ' + 'No Data'.bold()
            cityCiggDefCon.classList.add('faded-img')
            cityCiggDefCon.innerHTML = `<img src="/src/img/ciggrette_icon.png" width="30">`

            // RE-APPEND CITY DATA INFO ELEMENTS
            append(cityData, resHead)
            append(cityData, calcCig)
            append(cityData, selectOuter)
            append(cityData, cityName)
            append(cityData, cityAqi)
            append(cityData, cityCigg)
            append(cityData, cityCiggDefCon)

        } else {

        // USE CITY ID TO GRAB NEW DATA
        let cityNameString = `"compare-tabs_1_city_${cityId}_name"`
        let cityNameParsed = JSON.parse(cityNameString)

        // OUTPUT UPDATED CITY NAME TO ELEMENT
        cityName.innerHTML = 'City: ' + dataArray[0][`${cityNameParsed}`].bold()

        let cityAqiString = `"compare-tabs_1_city_${cityId}_aqi"`
        let cityAqiParsed = JSON.parse(cityAqiString)

        // OUTPUT UPDATED CITY AQI TO ELEMENT
        cityAqi.innerHTML = 'Air Quality Index: ' + dataArray[0][`${cityAqiParsed}`].bold()

        let cityCiggString = `"compare-tabs_1_city_${cityId}_cigg"`
        let cityCiggParsed = JSON.parse(cityCiggString)

        // STORE NUMBER OF CIGS FOR CITY
        let ciggNum = dataArray[0][`${cityCiggParsed}`]
      
        // RE-APPEND CITY DATA INFO ELEMENTS
        append(cityData, resHead)
        append(cityData, calcCig)
        append(cityData, selectOuter)
        append(cityData, cityName)
        append(cityData, cityAqi)
        append(cityData, cityCigg)

        // OUTPUT CIGS TEXT STRING - CHECK NUM FOR BETTER GRAMMAR
        if (ciggNum === '1') {
          cityCigg.innerHTML =  'Equal to: ' + dataArray[0][`${cityCiggParsed}`].bold() + ' Cigarette a day'.bold()
        } else {
          cityCigg.innerHTML =  'Equal to: ' + dataArray[0][`${cityCiggParsed}`].bold() + ' Cigarettes a day'.bold()
        }

        // INSERT PLACEHOLDER IF CIGGNUM IS EQUAL TO 0
        if (ciggNum === '0') {
          const emtpyCig = createNode('div')
          emtpyCig.id = 'empty-cigg'
          emtpyCig.style.height = "160px";
          emtpyCig.classList.add('cig-div')
          append(cityData, emtpyCig)
        }
      
        // CREATE / DRAW CIGG PNGS FROM CIGG NUM VALUE
        for (let counter = 1; counter <= ciggNum; counter++) {
        
          let cigCont = createNode('div')
          cigCont.classList.add( 'cig-div', 'animate__animated', 'animate__delay-1s', 'animate__fadeInLeft')
        
          let cigImg = createNode('img')
          cigImg.src = "src/img/ciggrette_icon.png"
          cigImg.width = '30'
          
          append(cigCont, cigImg)
          append(cityData, cigCont)
        }
      }
    })
  }