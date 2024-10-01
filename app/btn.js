const buttonCl = document.querySelector('#button-clear');
buttonCl.addEventListener('click', () => {
    document.querySelector('#textareaEl').value = "";
    outputString = "";
});

const buttonCo = document.querySelector('#button-copy');
buttonCo.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(outputString);
      } catch (error) {
        console.error(error.message);
      }
});

// Get the button element
const button = document.getElementById('button-funky');

// Add a click event listener to the button
button.addEventListener('click', function() {
  // Create a new link element
  const link = document.createElement('a');
  link.href = 'https://www.youtube.com/watch?v=QX43QTYyV-8';
  link.textContent = 'Take me to funky town';

  // Add the link element to the document body
  document.body.appendChild(link);
});