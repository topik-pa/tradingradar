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
      code:
      {
        type: String,
        nullable: true,
        unique: false
      },
      absMax: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      absMin: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      address: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      comment: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      currentYearMax: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      currentYearMin: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      mm100days: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      mm20days: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      mm40days: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      lastPrice: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      perf1M: {
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
      profile: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      volatility: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      webSite: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      borsaIt_evaluation: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      borsaIt_rating: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      borsaIt_resistance: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      borsaIt_rsi: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      borsaIt_support: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      milFin_mfRanking: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      sol24_mediumTendency: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      sol24_shortTendency: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      teleb_resistance: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      teleb_support: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      teleb_trend: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      divYield: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      lastDiv: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      lastDivDate: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      milFin_mfRisk: {
        type: Schema.Types.Mixed,
        nullable: true
      },
      milFin_rsi: {
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