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

const burgerBtn = document.querySelector('[data-menu-open]')
const menuCloseBtn = document.querySelector('[data-menu-close]')
const mobileMenu = document.querySelector('[data-mobile-menu]')

burgerBtn.addEventListener('click', () => {
    mobileMenu.classList.add('mobile-menu--open')
    document.documentElement.classList.add('is-lock')
})

menuCloseBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('mobile-menu--open')
    document.documentElement.classList.remove('is-lock')
})