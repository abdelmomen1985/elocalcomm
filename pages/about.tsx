import { GetServerSideProps } from "next";
import { withIronSession } from "next-iron-session";
import Link from "next/link";
const AboutPage = () => (
  // <Layout title="About | Next.js + TypeScript Example">
  <>
    <h1>About</h1>
    <p>This is the about page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </>
  // </Layout>
);
// https://github.com/vvo/next-iron-session#readme
export const getServerSideProps: GetServerSideProps = withIronSession(
  async ({ req }) => {
    const user = req.session.get("user");
    console.log(user);
    return {
      props: { user },
    };
  },
  {
    cookieName: "REALESTATEPLATFORMCOOKIE",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false,
    },
    password: "" + process.env.F0APP_SECRET,
  }
);

export default AboutPage;
