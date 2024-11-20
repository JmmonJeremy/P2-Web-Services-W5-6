// google auth 
module.exports = (mongoose) => {
  const User = mongoose.model(
    'User',
    mongoose.Schema(
      {
        googleId: { type: String, unique: true, sparse: true, },
        githubId: { type: String, unique: true, sparse: true, },
        email: { type: String, unique: true, required: true, },
        displayName: { type: String, required: true, },
        firstName: { type: String, required: true, default: "Unknown"},
        lastName: { type: String, required: true, default: "Not Given"},
        image: { type: String, required: true, default: "https://ibb.co/jTH610t"}, 
        bio: { type: String, },
        location: { type: String, },
        company: { type: String, },
        website: { type: String, },
        createdAt: { type: Date, default: Date.now, }
      }),
    'users'
     )
return User;
};