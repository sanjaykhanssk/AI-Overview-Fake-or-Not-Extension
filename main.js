
// Check class name before using f5cPye
const API_KEY = "YOUR PAPI KEY"


async function AIValidity(search, searchresponse) {

    const prompt = `
    just return valid or not valid with what is the reason for vaild or not and return a score from 0 to 1
    query: "${search}"
    response: "${searchresponse}"
    points-to-remeber - dont consider extra information, don't expact perfect answer, check the validity
    `

    const API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';

    // Data to be sent in the request body
    const requestData = {
        contents: [
            {
                parts: [
                    { text: prompt }
                ]
            }
        ]
    };

    // Options for the fetch request
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    };

    // Perform the fetch request
    fetch(`${API_URL}?key=${API_KEY}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let content = data.candidates[0].content.parts[0].text
            document.getElementsByClassName("f5cPye")[0].innerHTML = `
            AI overview Validity - ${content}
            ${document.getElementsByClassName("f5cPye")[0].innerHTML}
            `
            document.getElementsByClassName("f5cPye")[0].style.display = ''

        })
        .catch(error => {
            console.error('Error:', error);
            // Handle errors
        });
}

function waitForPageLoad(maxAttempts) {
    let attempts = 0;

    const checkInterval = setInterval(() => {
        attempts++;

        let aiOverviewElement = "";
        let searchTextArea = "";

        // Check if the required elements are available
        if (document.getElementsByClassName("f5cPye")) {

            aiOverviewElement = document.getElementsByClassName("f5cPye")[0].innerText
            searchTextArea = document.getElementsByTagName('textarea')[0].innerHTML
            document.getElementsByClassName("f5cPye")[0].style.display = 'none'
            
            console.log("AI overview Value ====", aiOverviewElement);
            console.log("Search Value ====", searchTextArea);
            AIValidity(searchTextArea, aiOverviewElement);

            clearInterval(checkInterval); // killing the time loop

        }

        else if (attempts >= maxAttempts) {
            console.log("MAX ATTEMPT REACHED....");
            clearInterval(checkInterval);

        }
    }, 1000);
}

// Usage
waitForPageLoad(30)