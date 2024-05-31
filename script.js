const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");

submitButton.disabled = true;

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);

function verifyTextLength(e) {
    // The e.target property gives us the HTML element that triggered the event, which in this case is the textarea. We save this to a variable called 'textarea'
     const textarea = e.target;
   
     // Verify the TextArea value.
     if (textarea.value.length > 200 && textarea.value.length < 100000) {
       // Enable the button when text area has value.
       submitButton.disabled = false;
     } else {
       // Disable the button when text area is empty.
       submitButton.disabled = true;
     }
   }

   async function submitData() {
    // Add loading animation to the submit button
    submitButton.classList.add("submit-button--loading");

    // Get the text to summarize from the text area
    const text_to_summarize = textArea.value;

    try {
        // Make a POST request to the server's /summarize endpoint
        const response = await axios.post("/summarize", { text: text_to_summarize });

        // Extract the summarized text from the response
        const summarizedText = response.data.summary;

        // Set the summarized text in the summarized text area
        summarizedTextArea.value = summarizedText;
    } catch (error) {
        // If an error occurs during the request, log it to the console
        console.error(error);

        // Display an error message in the summarized text area
        summarizedTextArea.value = "Error summarizing text";
    } finally {
        // Remove the loading animation from the submit button
        submitButton.classList.remove("submit-button--loading");
    }
}
