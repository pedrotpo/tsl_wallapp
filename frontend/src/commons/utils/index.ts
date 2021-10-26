export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

// Validators
export const required = (value: string) => (value ? undefined : 'Required')
export const mustBeNumber = (value: number) =>
  isNaN(value) ? 'Must be a number' : undefined
export const minValue = (min: number) => (value: number) =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`
export const composeValidators =
  (...validators: Array<Function>) =>
  (value: any) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    )
