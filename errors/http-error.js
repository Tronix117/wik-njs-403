module.exports = class HttpError extends Error {
  constructor (message) {
    super(message)
    this.statusCode = 500
  }

  toJSON() {
    return {
      code: this.code || 'ServerError',
      message: this.message || 'Unknown error occured'
    }
  }
}