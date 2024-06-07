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
