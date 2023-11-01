export default function localVariables(req, res, next) {
    req.app.locals= {
        OTP : null,
        expirationTime : null,
        resetSession : false,
    }
    next();
}