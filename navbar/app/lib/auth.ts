import CredentialsProvider from "next-auth/providers/credentials";

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials : {
   username: {label:"email",type:"text",placeholder:"Email"},
   password: {
 label :"password",type:"text",placeholder:"Password"
   },
      },
      async authorize(credentials) {
        console.log(credentials);

        return {
          id: "user1",
          name: "Rudra",
          email: "r@gmail.com",
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    session: ({ session, token, user } :any) => {
      console.log(session);
      if (session && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};
