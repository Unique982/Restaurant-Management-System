import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebokStrategy } from "passport-facebook";
import User from "../../models/users.Model";
import { config } from "dotenv";
config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "http://localhost:4000/api/auth/google/callback",
    },
    async (_accessToken, _refreshToken, profile, cb) => {
      try {
        let user = await User.findOne({ where: { google_id: profile.id } });

        // check user xa ki nai
        if (!user) {
          user = await User.create({
            google_id: profile.id,
            email: profile.emails?.[0].value,
            username: profile.displayName,
          });
        }
        return cb(null, user);
      } catch (err) {
        return cb(err, undefined);
      }
    }
  )
);
// serialize
passport.serializeUser(function (user: any, cb) {
  cb(null, user.id);
});
// deserialize user
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// facebook
// passport.use(() => {});
export default passport;
