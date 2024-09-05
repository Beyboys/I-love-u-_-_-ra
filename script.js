document
  .getElementById("soulmate-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting and refreshing the page

    const name = document.getElementById("name").value.trim();
    const resultDiv = document.getElementById("result");

    // Custom letters for specific names
    const customLetters = {
      Sura: "A",
      sura: "A",
      suuura: "A",

      AbdulAhad: "S",
      abdulahad: "S",
      Ahad: "S",
      ahad: "S",
      Nazim: "S",
      nazim: "S",

      Nayem: "Z",
      nayem: "Z",

      Ariyan: "C",
      ariyan: "C",

      Rasa: "Who will marry u??",
      rasa: "Who will marry u??",
      Rasamuntasir: "Who will marry u??",
      rasamuntasir: "Who will marry u??",

      progga: "Not 'J' something else",
      Progga: "Not 'J' something else",

      Junaid: "Not 'P'. you can't get a wife",
      junaid: "Not 'P'. you can't get a wife",
      zunaid: "Not 'P'. you can't get a wife",
    };

    const customNamesForBangladesh = [
      "Sura",
      "sura",
      "AbdulAhad",
      "Ahad",
      "Nazim",
      "Nayem",
      "Ariyan",
      "Rasa",
      "progga",
      "Progga",
      "Junaid",
      "junaid",
      "zunaid",
      "Rasamuntasir",
      "rasa",
    ]; // Add custom names for "Bangladesh"

    let soulmateFirstLetter;

    // Check if the name is in the customLetters object
    if (customLetters[name]) {
      soulmateFirstLetter = customLetters[name]; // Use custom letter for the specific name
    } else {
      // Otherwise, generate a random letter
      const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
      const randomIndex = Math.floor(Math.random() * alphabets.length);
      soulmateFirstLetter = alphabets[randomIndex];
    }

    // If the entered name is in the custom names list, display "Bangladesh" as nationality
    if (customNamesForBangladesh.includes(name)) {
      resultDiv.innerHTML = `${name}, your future soulmate's name will start with "<strong>${soulmateFirstLetter}</strong>".<br><br>We think you might be from <strong>Bangladesh</strong>.`;
    } else {
      // Fetch nationality using the Nationalize API
      fetch(`https://api.nationalize.io?name=${name}`)
        .then((response) => response.json())
        .then((data) => {
          let nationalityInfo = "";

          // Country code to full name map
          const countryNames = {
            AF: "Afghanistan",
            AM: "Armenia",
            AZ: "Azerbaijan",
            BH: "Bahrain",
            BD: "Bangladesh",
            BT: "Bhutan",
            BN: "Brunei",
            KH: "Cambodia",
            CN: "China",
            CY: "Cyprus",
            GE: "Georgia",
            IN: "India",
            ID: "Indonesia",
            IR: "Iran",
            IQ: "Iraq",
            IL: "Israel",
            JP: "Japan",
            JO: "Jordan",
            KZ: "Kazakhstan",
            KW: "Kuwait",
            KG: "Kyrgyzstan",
            LA: "Laos",
            LB: "Lebanon",
            MY: "Malaysia",
            MV: "Maldives",
            MN: "Mongolia",
            MM: "Myanmar",
            NP: "Nepal",
            OM: "Oman",
            PK: "Pakistan",
            PH: "Philippines",
            QA: "Qatar",
            SA: "Saudi Arabia",
            SG: "Singapore",
            KR: "South Korea",
            LK: "Sri Lanka",
            SY: "Syria",
            TJ: "Tajikistan",
            TH: "Thailand",
            TR: "Turkey",
            TM: "Turkmenistan",
            AE: "United Arab Emirates",
            UZ: "Uzbekistan",
            VN: "Vietnam",
            YE: "Yemen",

            // Add more country codes and names as needed
          };

          // Check if the API returned any nationality predictions
          if (data.country && data.country.length > 0) {
            const topCountry = data.country[0]; // Use the top predicted country
            const countryName =
              countryNames[topCountry.country_id] || topCountry.country_id; // Use full name or fallback to code
            nationalityInfo = `We think you might be from ${countryName}.`;
          } else {
            nationalityInfo =
              "We couldn't guess your nationality. Try another name!";
          }

          // Display result with soulmate's first letter and nationality guess on separate lines
          resultDiv.innerHTML = `${name}, your future soulmate's name will start with "<strong>${soulmateFirstLetter}</strong>".<br><br>${nationalityInfo}`;
        })
        .catch((error) => {
          console.error("Error fetching nationality data:", error);
          resultDiv.innerHTML = `${name}, your future soulmate's name will start with "<strong>${soulmateFirstLetter}</strong>".<br><br>We couldn't guess your nationality due to a technical issue.`;
        });
    }
  });
