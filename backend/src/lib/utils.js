import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    httpOnly: true,  // prevent XSS attacks
    sameSite: "strict", // prevent CSRF attacks
    secure: ENV.NODE_ENV === "development" ? false : true,
  });

  return token;
};
