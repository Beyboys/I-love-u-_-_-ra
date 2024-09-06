document
  .getElementById("soulmate-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting and refreshing the page

    let name = document.getElementById("name").value.trim();
    name = name.replace(/\s+/g, "_"); // Replace spaces with underscores

    const resultDiv = document.getElementById("result");

    // Custom letters for specific names
    const customLetters = {
      Sura: "Ma",
      sura: "Ma",
      suuura: "Ma",

      AbdulAhad: "Ch",
      abdulahad: "Ch",
      Ahad: "Ch",
      ahad: "Ch",
      Nazim: "Ch",
      nazim: "Ch",

      Nayem: "Zar..",
      nayem: "Zar..",

      Ariyan: "Cat",
      ariyan: "Cat",

      Rasa: "you can't get a wife",
      rasa: "you can't get a wife",
      Rasamuntasir: "Who will marry u??",
      rasamuntasir: "Who will marry u??",

      progga: "Ro",
      Progga: "Ro",
      Junaid: "Mai",
      junaid: "Mai",
      zunaid: "Mai",

      Fariha: "Re...",
      fariha: "Re...",
      Anonna: "Re...",
      anonna: "Re...",
      redo: "Fa...",
      Redo: "Fa...",

      charu: "U really want a Soulmate? 🥱",
      Charu: "U really want a Soulmate? 🥱",
      Caru: "U really want a Soulmate? 🥱",
      caru: "U really want a Soulmate? 🥱",

      boishakhy: "Guu 💩",
      Boishakhy: "Guu 💩",
      shakhy: "Guu 💩",
      Shakhy: "Guu 💩",
      Afifa: "Guu 💩",
      Ajmain: "Guu 💩",
      afifa: "Guu 💩",
      ajmain: "Guu 💩",
    };

    // Function to check if any part of the name matches a custom name
    function getCustomLetter(name) {
      for (const key in customLetters) {
        if (name.includes(key)) {
          return customLetters[key];
        }
      }
      return null;
    }

    // NEW: Use a new version or prefix for the name key
    const nameKey = "soulmate_v2_" + name; // This creates a new "path" for storage

    // Check if the name is already stored in localStorage
    let storedSoulmateLetter = localStorage.getItem(nameKey);

    if (storedSoulmateLetter === null) {
      // If no stored letter, either use a custom letter or generate two random ones
      let soulmateFirstLetter = getCustomLetter(name);

      if (soulmateFirstLetter === null) {
        // Generate two random letters (first uppercase, second lowercase)
        const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        const randomIndex1 = Math.floor(Math.random() * alphabets.length);
        const randomUppercase = alphabets[randomIndex1];

        const lowercaseAlphabets = "abcdefghijklmnopqrstuvwxyz".split("");
        const randomIndex2 = Math.floor(
          Math.random() * lowercaseAlphabets.length
        );
        const randomLowercase = lowercaseAlphabets[randomIndex2];

        soulmateFirstLetter = randomUppercase + randomLowercase; // Combine uppercase and lowercase letters
      }

      // Store the generated letters in localStorage for future use
      localStorage.setItem(nameKey, soulmateFirstLetter);
      storedSoulmateLetter = soulmateFirstLetter;
    }

    // If the entered name is in the custom names list, display "Bangladesh" as nationality
    if (getCustomLetter(name)) {
      resultDiv.innerHTML = `${name}, your future soulmate's name will start with "<strong>${storedSoulmateLetter}</strong>".<br><br>We think you might be from <strong>Bangladesh</strong>.`;
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
              "We couldn't guess your nationality. Maybe you're from 'Uganda'!";
          }

          // Display result with soulmate's first letter and nationality guess on separate lines
          resultDiv.innerHTML = `${name}, your future soulmate's name will start with "<strong>${storedSoulmateLetter}</strong>".<br><br>${nationalityInfo}`;
        })
        .catch((error) => {
          console.error("Error fetching nationality data:", error);
          resultDiv.innerHTML = `${name}, your future soulmate's name will start with "<strong>${storedSoulmateLetter}</strong>".<br><br>We couldn't guess your nationality due to a technical issue.`;
        });
    }
  });
