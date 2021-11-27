module.exports = mongoose => {

  const Schema = mongoose.Schema

  var ftseMibStockSchema = Schema(
    {
      name:
      {
        type: String,
        nullable: true,
        unique: false
      },
      isin:
      {
        type: String,
        required: [true, 'Stock ISIN is required'],
        nullable: false,
        unique: true
      },
      volatility: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      rsi: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      lastDiv: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      mfRisk: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      divYield: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      perf1Y: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      perf6M: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      perf1M: {
        type: Schema.Types.Mixed,
        nullable: true
      }
    },
    { timestamps: true }
  )

  ftseMibStockSchema.method('toJSON', function () {
    const { _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const FTSEMibStock = mongoose.model('FTSEMibStock', ftseMibStockSchema)
  return FTSEMibStock
}