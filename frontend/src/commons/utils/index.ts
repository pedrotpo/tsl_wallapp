export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

// Validators
export const required = (value: string) => (value ? undefined : 'Required')
export const mustBeNumber = (value: number) =>
  isNaN(value) ? 'Must be a number' : undefined
export const minChar = (min: number) => (value: string) =>
  value.length > min ? undefined : `Field must have at least ${min} characters`
export const maxChar = (max: number) => (value: string) =>
  value.length <= max
    ? undefined
    : `Field must have less than ${max} characters`
export const isEmail = (value: string) => {
  const re =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
  return re.test(String(value).toLowerCase())
    ? undefined
    : 'Insert a valid email'
}
export const password = (value: string) => {
  const strongRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  )
  return strongRegex.test(String(value))
    ? undefined
    : 'Password must contain at least: 1 lowercase character, 1 uppercase character, 1 number, 1 special character and have at least 8 characters'
}
export const composeValidators =
  (...validators: Array<any>) =>
  (value: any) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    )
