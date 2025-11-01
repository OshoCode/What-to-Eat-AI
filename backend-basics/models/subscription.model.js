import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        maxlength: [50, "Name cannot exceed 50 characters"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be greater than 0"],
    },
    currency: {
        type: String,
        required: [true, "Currency is required"],
        enum: ["USD", "EUR", "GBP"],
        default: "USD",
    },
    frequency: {
        type: String,
        required: [true, "Frequency is required"],
        enum: ["monthly", "yearly"],
        default: "monthly",
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        enum: ["basic", "premium", "enterprise"],
        default: "basic",
    },
    paymentMethod: {
        type: String,
        required: [true, "Payment method is required"],
        enum: ["credit_card", "paypal", "bank_transfer"],
        default: "credit_card",
    },
    status: {
        type: String,
        required: [true, "Status is required"],
        enum: ["active", "canceled", "expired"],
        default: "active",
    },
    startDate: {
        type: Date,
        required: [true, "Start date is required"],
        default: Date.now,
        validate: {
            validator: function (value) {
                return value <= Date.now();
            },
            message: "Start date cannot be in the future",
        },
    },
    renewalDate: {
        type: Date,
        required: [true, "Renewal date is required"],
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: "Renewal date must be after the start date",
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
        index: true,
        validate: {
            validator: function (value) {
                return mongoose.Types.ObjectId.isValid(value);
            },
            message: "Invalid user ID",
        },
    }
}, { timestamps: true });

subscriptionSchema.pre("save", function (next) {
    if (!this.renewalDate) {
        const frequencyInDays = this.frequency === "monthly" ? 30 : 365;
        this.renewalDate.setDate(this.startDate.getDate() + frequencyInDays);
    }

    if(this.renewalDate < new Date()) {
        this.status = "expired";
    }

    if(this.status === "canceled") {
        this.renewalDate = null;
    }
    if(this.status === "active") {
        this.renewalDate = new Date(this.startDate.getTime() + (this.frequency === "monthly" ? 30 : 365) * 24 * 60 * 60 * 1000);
    }
    next();
});


const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
