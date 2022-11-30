const authBtn = document.getElementById('authBtn')
const authBtnSpinner = document.getElementById('authBtnSpinner')

authBtn.addEventListener('click', () => {
    authBtn.classList.toggle('d-none')
    authBtnSpinner.classList.toggle('d-none')
    setTimeout(() => {
        authBtn.classList.toggle('d-none')
        authBtnSpinner.classList.toggle('d-none')
    }, 3500)
})