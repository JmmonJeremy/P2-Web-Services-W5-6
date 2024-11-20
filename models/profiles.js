module.exports = (mongoose) => {
  const Profile = mongoose.model(
    'Profile',
    mongoose.Schema(
      {
        username: { type: String, unique: true },
        motto: { type: String },
        firstName: { type: String },
        middleName: { type: String },
        lastName: { type: String },
        idol: String,
        photo: { type: String, default: "https://ibb.co/jTH610t"}, // possibility is Base64 image as a string        
      },
      { timestamps: true }
    ),
    'Profile'  // Explicitly specify the collection name
  );

  return Profile;
};
