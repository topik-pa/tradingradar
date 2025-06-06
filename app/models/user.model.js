module.exports = mongoose => {

  const Schema = mongoose.Schema

  var userSchema = Schema(
    {
      name:
      {
        type: String,
        nullable: false,
        unique: false
      },
      surname:
      {
        type: String,
        nullable: false,
        unique: false
      },
      email:
      {
        type: String,
        nullable: false,
        unique: true
      },
      subscriptions:
      {
        type: Schema.Types.Array,
        nullable: false,
        unique: false
      }
    },
    { timestamps: true }
  )

  userSchema.method('toJSON', function () {
    const { _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const User = mongoose.model('User', userSchema)
  return User
}