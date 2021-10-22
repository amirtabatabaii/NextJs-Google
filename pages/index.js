import Head from "next/head";
import InfoForm from "../components/info-form/info-form";
import classes from "./index.module.scss";

export default function Home() {
  return (
    <div className={classes.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Find Nearest Place in Google-map ' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <div className={classes["main-image"]}>
          <img src='/images/google-maps-satellite.jpg' alt='Google Map!' />
        </div>

        <InfoForm />
      </main>
    </div>
  );
}
