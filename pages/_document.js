import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="title" content="World Cities" />
        <meta
          name="description"
          content="Name all the cities you know in the world."
        />
        <meta
          name="keywords"
          content="map, world, openstreetmap, city, mapbox, cities, guess"
        />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
      </Head>
      <body className="bg-[#191a1a]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
