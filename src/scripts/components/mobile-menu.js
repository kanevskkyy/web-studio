const mobileMenu = document.querySelector('[data-mobile-menu]')

if (mobileMenu) {
    const burgerBtn = document.querySelector('[data-menu-open]')
    const menuCloseBtn = document.querySelector('[data-menu-close]')

    burgerBtn.addEventListener('click', () => {
        mobileMenu.classList.add('mobile-menu--open')
        document.documentElement.classList.add('is-lock')
    })

    menuCloseBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('mobile-menu--open')
        document.documentElement.classList.remove('is-lock')
    })
}