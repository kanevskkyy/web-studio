const modal = document.querySelector('[data-modal]')

if (modal) {
    const openBtn = document.querySelector('[data-modal-open]')
    const closeBtn = document.querySelector('[data-modal-close]')
    const form = modal.querySelector('[data-modal-form]')
    const successMessage = modal.querySelector('[data-modal-success]')

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

    const validators = {
        name: (value) => {
            if (!value.trim()) return 'Please enter your name.'
            if (value.trim().length < 2) return 'Name is too short.'
            return ''
        },
        phone: (value) => {
            if (!value.trim()) return 'Please enter your phone number.'
            const phonePattern = /^[+]?[\d\s()-]{7,}$/
            if (!phonePattern.test(value.trim())) return 'Please enter a valid phone number.'
            return ''
        },
        email: (value) => {
            if (!value.trim()) return 'Please enter your email.'
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailPattern.test(value.trim())) return 'Please enter a valid email address.'
            return ''
        },
        comment: () => '',
        agreement: (checked) => {
            if (!checked) return 'You must accept the terms to continue.'
            return ''
        },
    }

    const showError = (fieldName, message) => {
        const errorEl = form.querySelector(`[data-error="${fieldName}"]`)
        const inputEl = form.querySelector(`[data-field="${fieldName}"]`)

        if (errorEl) {
            errorEl.textContent = message
        }

        if (inputEl) {
            inputEl.classList.toggle('form-field__input--invalid', Boolean(message) && inputEl.tagName === 'INPUT')
            inputEl.classList.toggle('form-field__textarea--invalid', Boolean(message) && inputEl.tagName === 'TEXTAREA')
        }
    }

    const validateField = (fieldName) => {
        const inputEl = form.querySelector(`[data-field="${fieldName}"]`)
        if (!inputEl) return true

        const value = inputEl.type === 'checkbox' ? inputEl.checked : inputEl.value
        const errorMessage = validators[fieldName](value)
        showError(fieldName, errorMessage)

        return !errorMessage
    }

    Object.keys(validators).forEach((fieldName) => {
        const inputEl = form.querySelector(`[data-field="${fieldName}"]`)
        if (!inputEl) return

        const eventName = inputEl.type === 'checkbox' ? 'change' : 'blur'
        inputEl.addEventListener(eventName, () => validateField(fieldName))

        if (inputEl.type !== 'checkbox') {
            inputEl.addEventListener('input', () => {
                if (inputEl.classList.contains('form-field__input--invalid') ||
                    inputEl.classList.contains('form-field__textarea--invalid')) {
                    validateField(fieldName)
                }
            })
        }
    })

    form.addEventListener('submit', (event) => {
        event.preventDefault()

        const isValid = Object.keys(validators)
            .map((fieldName) => validateField(fieldName))
            .every(Boolean)

        if (!isValid) {
            successMessage.classList.remove('modal__success--visible')
            return
        }

        successMessage.classList.add('modal__success--visible')
        form.reset()

        Object.keys(validators).forEach((fieldName) => showError(fieldName, ''))
    })
}