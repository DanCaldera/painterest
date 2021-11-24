import Head from 'next/head'

interface IMetaDefaultProps {
  title: string
}

const Meta = ({ title }: IMetaDefaultProps) => {
  const description = 'See all your favorite pictures!'

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content="Painterest" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://res.cloudinary.com/dtip8wwch/image/upload/v1637718558/og_er1epr.jpg" />
      <meta property="og:url" content="https://mis.fans/" />
      <meta property="twitter:card" content="Twitter Card og react spa" />
      <meta property="twitter:image:alt" content={description} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://painterest.vercel.app/" />
      <meta property="twitter:title" content="Painterest" />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:site" content="@painterest" />
      <meta
        property="twitter:image"
        content="https://res.cloudinary.com/dtip8wwch/image/upload/v1637718558/og_er1epr.jpg"
      />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
      <link rel="shortcut icon" href="/favicon.ico" />

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>

      <link rel="manifest" href="/manifest.json" />
    </Head>
  )
}

export default Meta
