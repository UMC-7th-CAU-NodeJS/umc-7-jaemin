import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GithubStrategy } from "passport-github2";
import { prisma } from "./db.config.js";

dotenv.config();

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.PASSPORT_GOOGLE_CALLBACK_URL,
    scope: ["email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);


const googleVerify = async (profile) => {
    const email = profile.emails?.[0]?.value;
    if (!email) {
      throw new Error(`profile.email was not found: ${profile}`);
    }
  
    const user = await prisma.user.findFirst({ where: { email } });
    if (user !== null) {
      return { id: user.id, email: user.email, name: user.name };
    }
  
    const created = await prisma.user.create({
      data: {
        email,
        name: profile.displayName,
        gender: "non",
        birth: new Date(1970, 0, 1),
        address: "non",
        detailAddress: "non",
        phoneNumber: "non",
      },
    });
  
    return { id: created.id, email: created.email, name: created.name };
  };


  //githubVeirify 함수를 만들어서 사용자 정보를 저장하거나 로직을 처리!!!!!!!!!!!!!!!!!
  export const githubStrategy = new GithubStrategy(
    {
      clientID: process.env.PASSPORT_GITHUB_CLIENT_ID,
      clientSecret: process.env.PASSPORT_GITHUB_CLIENT_SECRET,
      callbackURL: process.env.PASSPORT_GITHUB_CALLBACK_URL,
      scope: ["email", "profile"],
      state: true,
    },
    (accessToken, refreshToken, profile, cb) => {
      return githubVeirify(profile)
        .then((user) => cb(null, user))
        .catch((err) => cb(err));
    }
  );

  const githubVeirify = async (profile) => {  
    const email = profile.emails?.[0]?.value;
    if (!email) {
      throw new Error(`Github email is not public or accessible: ${JSON.stringify(profile)}`);
    }
  
    const user = await prisma.user.findFirst({ where: { email } });
    if (user !== null) {
      return { id: user.id, email: user.email, name: user.name };
    }
  
    const created = await prisma.user.create({
      data: {
        email,
        name: profile.displayName,
        gender: "non",
        birth: new Date(1970, 0, 1),
        address: "non",
        detailAddress: "non",
        phoneNumber: "non",
      },
    });
  
    return { id: created.id, email: created.email, name: created.name };
  };