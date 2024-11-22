const db = require('../models');
const users = db.User;
const bcryptUtils = require('../middleware/password.js');

exports.findAll = (req, res) => {
    /* #swagger.summary = "GETS all the users" */   
    /* #swagger.description = 'All users are displayed.' */    
    // #swagger.responses[200] = { description: 'SUCCESS, GET retrieved all users' }   
    // #swagger.responses[404] = { description: 'The attempted GET of all users was Not Found'}
    // #swagger.responses[500] = { description: 'There was an INTERNAL SERVER ERROR while trying to GET all users'}
  console.log(users)
    users.find({})
      .sort({ lastName: 1 }) // Sort by lastName in ascending order
      .then((data) => { 
        if (!data)
          res
            .status(404)
            .send({ message: 'No users found! There are either no users yet, or their was an error retrieving them.'});         
        else res.send(data); // Send the newly ordered data  
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving users.',
        });
      }); 
    }

// Find a single user with an id
exports.findOne = async (req, res) => {
    /* #swagger.summary = "GETS a user by their _id" */ 
    /* #swagger.description = 'The selected user is displayed.' */ 
    // #swagger.responses[200] = { description: 'SUCCESS, GET Retrieved the selected user' }
    // #swagger.responses[404] = { description: 'The attempted GET of the selected user was Not Found'}
    // #swagger.responses[412] = { description: 'The PRECONDITION FAILED in the validation of the _id PARAMETER'}
    // #swagger.responses[500] = { description: 'There was an INTERNAL SERVER ERROR while trying to GET the selected user'}    
  const id = req.params.id;
  console.log(id);

  try {
    // Find user by ID
    const user = await users.findById(id).lean();

    // If user not found, send a 404 response and return
    if (!user) {
      return res.status(404).send({ message: `User with id ${id} not found!` });
    }

    // If user found, send user data   
    return res.status(200).send(user); // Send user data as response

  } catch (err) {
    // Handle errors
    console.error(err);
    return res.status(500).send({
        message: `Error retrieving user with id: ${id}`,
    });
  }
};

// create a new user
exports.create = async (req, res) => { 
    /* #swagger.summary = "POSTS input to create a new user" */ 
    /* #swagger.description = 'The entered user information is added to the database.' */ 
    // #swagger.responses[201] = { description: 'SUCCESS, POST created a new user' }
    // #swagger.responses[400] = { description: 'BAD REQUEST your POST was attempted with forbidden entries'}
    // #swagger.responses[412] = { description: 'The PRECONDITION FAILED in the validation of the user data'}
    // #swagger.responses[500] = { description: 'There was an INTERNAL SERVER ERROR while trying to POST the selected user'}   
  console.log('Request Body:', req.body); // Log the entire request body
  // Validate request
  if (!req.body.email) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }
  try {
    // Hash the password
    const hashedPassword = await bcryptUtils.hashPassword(req.body.password);
    console.log('Hashed Password:', hashedPassword);

    // Create a user
    const user = new users({
      googleId: req.body.googleId,
      githubId: req.body.githubId,
      email: req.body.email,
      password: hashedPassword, // Use the hashed password here
      displayName: req.body.displayName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      image: req.body.image,
      bio: req.body.bio,
      location: req.body.location,
      company: req.body.company,
      website: req.body.website,
    });

    // Save user in the database
    const data = await user.save();
    if (data) {
      res.status(201).redirect('/dashboard?registered=true')
    } else {
      res.status(400).json({
        error: 'The server did not process the request. Some error occurred while creating the user object.',
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the user object.',
    });
  }
};

// Update a user by the id in the request (For some reason auto-gen misses the added responses in update function only)
exports.update = (req, res) => {
  /* #swagger.summary = "UPDATES a user that has been selected by _id with any new data entered" */   
    /* #swagger.description = 'The changed data for the user updates the database' */      
    // #swagger.responses[204] = { description: 'SUCCESS (with no content returned), PUT updated the selected user in the database' }
    // #swagger.responses[400] = { description: 'BAD REQUEST your PUT was attempted with forbidden entries'}
    // #swagger.responses[404] = { description: 'The attempted PUT of the specified user for updating was Not Found'}
    // #swagger.responses[412] = { description: 'The PRECONDITION FAILED in the validation of the user data'}
    // #swagger.responses[500] = { description: 'There was an INTERNAL SERVER ERROR while trying to PUT the data change'}  
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }
  /* #swagger.parameters['id'] = {
         in: 'path',
         description: 'Unique identifier for the user',
         required: true,
         type: 'string'
     } */
  /* #swagger.parameters['body'] = {
        in: 'body',
        description: 'Fields to update',
        required: true,
         '@schema': {
          "type": "object",
          "properties": {       
            "email": {
              "type": "string",
              "example": "Updated email"
            },
            "displayName": {
              "type": "string",
              "example": "Updated displayName"
            },
            "firstName": {
              "type": "string",
              "example": "Updated firstName"
            },
            "lastName": {
              "type": "string",
              "example": "Updated lastName"
            },
            "image": {
              "type": "string",
              "example": "Updated image"
            },
            "bio": {
              "type": "string",
              "example": "Updated bio"
            },
            "location": {
              "type": "string",
              "example": "Updated location"
            },
            "company": {
              "type": "string",
              "example": "Updated company"
            },
            "website": {
              "type": "string",
              "example": "Updated website"
            }
          },
          "required": "email"
        }
      }
    }
  */
  const id = req.params.id;  

  users.findOneAndUpdate({ _id: id }, req.body, { new: true, useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with id=${id}. This id was not found!`,
        });
      } else res.status(204).send({ message: 'User was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating user with id=' + id,
      });
    });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  /* #swagger.summary = "DELETES a user by its _id" */ 
    /* #swagger.description = 'With deletion it's permanently removed from the database.' */
    // #swagger.responses[200] = { description: 'SUCCESS, the user was DELETED' }   
    // #swagger.responses[404] = { description: 'The selected user for DELETION was NOT FOUND'}
    // #swagger.responses[412] = { description: 'The PRECONDITION FAILED in the validation of the _id PARAMETER'}
    // #swagger.responses[500] = { description: 'There was an INTERNAL SERVER ERROR while trying to DELETE the user'} 
  const id = req.params.id; 

  users.findOneAndDelete({ _id: id }) 
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete user with id=${id}. This id was not found!!`,
        });
      } else {
        res.send({
          message: 'User was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Deletion error. Could not delete user with id=' + id,
      });
    });
};