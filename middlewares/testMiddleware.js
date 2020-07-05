const testMiddleware = (req, res, next) => {
  if (req) {
    next()
  } else {
    // block
    res.send('Warning!')
  }
}

export default testMiddleware
