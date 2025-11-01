const axios = require("axios");

async function getJoke() {
    try {
        const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
        const joke = response.data;
        console.log(`😂 ${joke.setup} - ${joke.punchline}`);
    } catch (error) {
        console.error("❌ Error fetching joke:", error.message);
    }
}

getJoke();
