import Head from 'next/head';

const Bookmarks = () => {
  return (
    <>
      <Head>
        <title>Movie Explorer - Bookmarks</title>
        <meta name='description' content='Explore Bookmarked Movies' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <h1>No bookmarks at the moment.</h1>
      </main>
    </>
  );
};

export default Bookmarks;
