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

function submitData(e) {

    // This is used to add animation to the submit button
    submitButton.classList.add("submit-button--loading");

    const text_to_summarize = textArea.value;
}