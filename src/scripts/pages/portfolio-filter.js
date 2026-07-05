const filterButtons = document.querySelectorAll('[data-filter]')
const portfolioItems = document.querySelectorAll('.portfolio-page__item')

if (filterButtons.length && portfolioItems.length) {
    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const filterValue = button.dataset.filter

            filterButtons.forEach((btn) => {
                btn.classList.remove('portfolio-page__filter-btn--active')
            })
            button.classList.add('portfolio-page__filter-btn--active')

            portfolioItems.forEach((item) => {
                const isMatch = filterValue === 'all' || item.dataset.category === filterValue
                item.style.display = isMatch ? '' : 'none'
            })
        })
    })
}