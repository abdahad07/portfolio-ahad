export interface ContactFormValues {
  name: string
  email: string
  message: string
}

export interface ContactFormErrors {
  name?: string
  email?: string
  message?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {}

  const name = values.name.trim()
  if (!name) errors.name = 'Please enter your name.'
  else if (name.length < 2) errors.name = 'Name should be at least 2 characters.'

  const email = values.email.trim()
  if (!email) errors.email = 'Please enter your email.'
  else if (!emailPattern.test(email)) errors.email = 'Enter a valid email address.'

  const message = values.message.trim()
  if (!message) errors.message = 'Please write a short message.'
  else if (message.length < 10) errors.message = 'Message should be at least 10 characters.'

  return errors
}
