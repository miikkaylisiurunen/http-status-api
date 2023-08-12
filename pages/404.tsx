import Head from 'next/head';
import styles from '@/styles/404.module.css';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - HTTP Status API</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.page}>
        <div className={styles.container}>
          <h1 className={styles.header}>There is nothing here</h1>
          <a
            className={styles.link}
            href="https://github.com/miikkaylisiurunen/http-status-api#readme"
          >
            Go to documentation
          </a>
        </div>
      </main>
    </>
  );
}
