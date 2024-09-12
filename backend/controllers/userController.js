const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhander");
const sendToken = require("../utils/jwtToken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')//builtin
const cloudinary=require('cloudinary');



// register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale",
    })
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    })

    sendToken(user, 201, res)
})

// login user         
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    // checking if both pass and email given 
    if (!email || !password) {
        return next(new ErrorHandler("Please enter both email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(new ErrorHandler("Invalid password or email", 401))
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) return next(new ErrorHandler("Invalid password or email", 401));
    sendToken(user, 200, res);
});

// logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
})

// forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;
    const message = `You password reset token is :- \n\n ${resetPasswordUrl}\n\n If you not have requested this email then ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Eccomerce password recovery',
            message
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })
    }
    catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
})

// reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    // creating token back
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })
    if (!user) {
        return next(new ErrorHandler("Reset Password token is invalid or has been expired", 400));
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res);

})

//get user details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
})

// update password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) return next(new ErrorHandler("Old password is incorrect", 400));
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
});

// update user profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,

    }
    if(req.body.avatar!==""){
        const user=await User.findById(req.user.id);
        const imageId=user.avatar.public_id;
        await cloudinary.uploader.destroy(imageId);
        const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"avatars",
            width:150,
            crop:"scale",
        });
        newUserData.avatar={
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        }

    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
    })
});

// get single user(admin to see user(single))
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler("User not found", 404))
    }

    res.status(200).json({
        success: true,
        user
    })
})

// get all users(admin to get all user))
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find({});
    if (!users) {
        return next(new ErrorHandler("User not found", 404))
    }

    res.status(200).json({
        success: true,
        users
    })
})


// update user role--admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    if (!user) {
        return next(new ErrorHandler("User not found", 404))
    }
    res.status(200).json({
        success: true,
    })
});

// delete user --admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

    // we will remove clodinary later
    const user = await User.findById(req.params.id)
    if (!user) {
        return next(new ErrorHandler("User not found", 404))
    }
    await user.deleteOne();
    res.status(200).json({
        success: true,
        message: "user deleted"
    })
});

