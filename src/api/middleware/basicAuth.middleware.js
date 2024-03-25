const basicAuth = async (req, res, next) => {
  try {
    if (req.session.authenticated && req.session.user) {
      next()
    } else {
      throw new Error(`Not Authorized to Request`)
    }
  } catch (error) {
    return res.status(401).json({
      message: error.message
    })
  }
}

export { basicAuth }
