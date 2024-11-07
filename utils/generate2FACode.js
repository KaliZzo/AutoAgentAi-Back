const generate2FACode = () => {
  return Math.floor(1000 + Math.random() * 9000).toString() // קוד 4 ספרות
}

module.exports = generate2FACode
