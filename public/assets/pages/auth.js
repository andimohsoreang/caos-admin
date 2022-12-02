const submitBtn = document.getElementById('submitBtn')
const submitBtnSpinner = document.getElementById('submitBtnSpinner')

submitBtn.addEventListener('click', () => {
    submitBtn.classList.toggle('d-none')
    submitBtnSpinner.classList.toggle('d-none')
    setTimeout(() => {
        submitBtn.classList.toggle('d-none')
        submitBtnSpinner.classList.toggle('d-none')
    }, 3500)
})