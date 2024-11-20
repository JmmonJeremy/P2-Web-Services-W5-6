// google auth 
const AutoIncrement = require('mongoose-sequence'); // Make sure AutoIncrement is required

module.exports = (mongoose) => {
  const CreationGoalSchema = new mongoose.Schema(
      {
        creationNumber: { 
          type: Number
        },
        creationDate: { 
          type: Date, 
          default: Date.now 
        },  
        goal: {
          type: String,
          required: true
        },
        motivator: {
          type: String,
          required: true
        },
        desire: {
          type: String,
          required: true
        },
        belief: {
          type: String,
          required: true
        },
        knowledge: {
          type: String,
          required: true
        },        
        plan: {
          type: String,
          required: true
        },   
        action: {
          type: String,
          required: true
        },
        victory: {
          type: String,
          required: true
        },
        status: {
          type: String,
          default: 'Private',
          enum: ['Public', 'Private']
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        }             
      },
      { timestamps: true }
    );

  // Pre-save hook to set creationNumber and ensure creationDate is in the correct format
  CreationGoalSchema.pre('save', async function (next) {
    try {
      let potentialNumber;

      // Ensure user is provided
      if (!this.user) {
        return next(new Error('User is required for creationGoal.'));
      }

      // Get all creationNumbers for the user and sort them
      const existingCreationNumbers = await mongoose.model('CreationGoal')
        .find({ user: this.user })
        .sort({ creationNumber: 1 })
        .select('creationNumber');

      // If the user has no creationGoals, the starting number is 1
      if (existingCreationNumbers.length === 0) {
        potentialNumber = 1;
      } else {
        // Find the smallest gap in the creation numbers
        let number = 1;
        for (let i = 0; i < existingCreationNumbers.length; i++) {
          if (existingCreationNumbers[i].creationNumber !== number) {
            break;
          }
          number++;
        }
        potentialNumber = number; // The next available number
      }
  
      // Now check if the calculated potentialNumber exists for this user
      let exists = await mongoose.model('CreationGoal').findOne({ creationNumber: potentialNumber, user: this.user });
      while (exists) {
        potentialNumber++; // Increment until a unique number is found
        exists = await mongoose.model('CreationGoal').findOne({ creationNumber: potentialNumber, user: this.user });
      }

      // Assign the unique number to this.creationNumber
      this.creationNumber = potentialNumber;      
  
      // Handle the creationDate similarly
      if (this.creationDate && typeof this.creationDate === 'string') {
        const parsedDate = new Date(this.creationDate);
  
        if (!isNaN(parsedDate.getTime())) {
          this.creationDate = parsedDate.toISOString();
        } else {
          this.creationDate = new Date().toISOString();
        }
      } else if (!this.creationDate) {
        this.creationDate = new Date().toISOString();
      }
  
      next(); // Proceed with saving the document
    } catch (error) {
      next(error); // Handle error if something goes wrong
    }
  });
  

  // Explicitly specify the collection name
  const CreationGoal = mongoose.model('CreationGoal', CreationGoalSchema, 'CreationGoal');
  module.exports = CreationGoal;
  return CreationGoal;
};
