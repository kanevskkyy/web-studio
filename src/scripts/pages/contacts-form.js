const form = document.querySelector('[data-contacts-form]')

if (form) {
    const successMessage = form.querySelector('[data-form-success]')

    const validators = {
        name: (value) => {
            if (!value.trim()) return 'Please enter your name.'
            if (value.trim().length < 2) return 'Name is too short.'
            return ''
        },
        email: (value) => {
            if (!value.trim()) return 'Please enter your email.'
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailPattern.test(value.trim())) return 'Please enter a valid email address.'
            return ''
        },
        subject: (value) => {
            if (!value.trim()) return 'Please enter a subject.'
            return ''
        },
        message: (value) => {
            if (!value.trim()) return 'Please enter a message.'
            if (value.trim().length < 10) return 'Message should be at least 10 characters.'
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
            inputEl.classList.toggle('form-field__input--invalid', Boolean(message))
            inputEl.classList.toggle('form-field__textarea--invalid', Boolean(message))
        }
    }

    const validateField = (fieldName) => {
        const inputEl = form.querySelector(`[data-field="${fieldName}"]`)
        if (!inputEl) return true

        const errorMessage = validators[fieldName](inputEl.value)
        showError(fieldName, errorMessage)

        return !errorMessage
    }

    Object.keys(validators).forEach((fieldName) => {
        const inputEl = form.querySelector(`[data-field="${fieldName}"]`)
        if (!inputEl) return

        inputEl.addEventListener('blur', () => validateField(fieldName))
        inputEl.addEventListener('input', () => {
            if (inputEl.classList.contains('form-field__input--invalid') ||
                inputEl.classList.contains('form-field__textarea--invalid')) {
                validateField(fieldName)
            }
        })
    })

    form.addEventListener('submit', (event) => {
        event.preventDefault()

        const isValid = Object.keys(validators)
            .map((fieldName) => validateField(fieldName))
            .every(Boolean)

        if (!isValid) {
            successMessage.classList.remove('contacts-form__success--visible')
            return
        }

        successMessage.classList.add('contacts-form__success--visible')
        form.reset()

        Object.keys(validators).forEach((fieldName) => showError(fieldName, ''))
    })
}