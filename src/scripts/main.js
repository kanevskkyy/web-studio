const modal = document.querySelector('[data-modal]')
const openBtn = document.querySelector('[data-modal-open]')
const closeBtn = document.querySelector('[data-modal-close]')

openBtn.addEventListener('click', () => {
    modal.showModal()
})

closeBtn.addEventListener('click', () => {
    modal.close()
})

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close()
    }
})