// For route to register a new user


// register an email and password
exports.register = (req, res, next) => {
  try {  
    res.status(200).render('/register', {
      layout: 'login',   
  }) 
} catch (error) {
  console.error(error);
  res.status(500).render('error/500')
}
}