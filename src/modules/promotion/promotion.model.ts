import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema({
    merchant: { type: mongoose.Schema.Types.ObjectId, ref: 'Merchant', required: true },
    code : { type: String, required: true, unique: true },
    discountPercentage : { type: Number, required: true, min: 0, max: 100 },
    validFrom : { type: Date, required: true },
    validTo : { type: Date, required: true },
    usedCount : { type: Number, default: 0 },
    isActive : { type: Boolean, default: true },
    createdAt : { type: Date, default: Date.now }
});

const Promotion = mongoose.model('Promotion', promotionSchema);

export default Promotion;