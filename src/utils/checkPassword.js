export default function checkPassword(password) {
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password)

  return {
    hasLowercase,
    hasUppercase,
    hasNumber,
    hasSymbol
  }
}