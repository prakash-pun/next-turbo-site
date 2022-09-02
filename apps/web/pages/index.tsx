import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="home">
      <Head>
        <title>Prakash Pun</title>
        <meta name="description" content="Prakash Pun" />
        <link rel="icon" href="favicon.ico" />
        <meta
          name="keywords"
          content="Prakash Pun, PrakashPun, prakashpun, prakash pun"
        />
        <meta property="og:type" content="website" />
        <meta
          name="og:title"
          property="og:title"
          content="Prakash Pun"
          key="ogtitle"
        />
        <meta
          name="og:description"
          property="og:description"
          content="Prakash Pun"
          key="ogdesc"
        />
        <meta property="og:site_name" content="Prakash Pun" />
        <meta property="og:url" content="https://prakashpun.com.np" />
        <meta name="twitter:card" content="summary" key="twitercard" />
        <meta name="twitter:title" content="Prakash Pun" key="twtitle" />
        <meta name="twitter:description" content="Prakash Pun" />
        <meta name="twitter:site" content="" />
        <meta name="twitter:creator" content="" />
        <meta
          name="p:domain_verify"
          content="108aa0871feb5651d1aece6b29584bac"
        />
        <meta httpEquiv="Content-Type" content="text/html" charSet="utf-8" />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
      </Head>
      <div className="content-wrap" id="about-me">
        <Image
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/default/avatar.png`}
          width={80}
          height={100}
          alt="Icon"
        />
        <h1 className="name">Prakash Pun</h1>
        <h2 className="title">Software Developer</h2>
      </div>
      <div>
        <svg
          version="1.1"
          id="Icons"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 32 32"
        >
          <polyline className="st0" points="8,15 11,18 8,21 " />
          <line className="st0" x1="3" y1="11" x2="29" y2="11" />
          <g>
            <path d="M7,9C6.7,9,6.5,8.9,6.3,8.7C6.1,8.5,6,8.3,6,8c0-0.3,0.1-0.5,0.3-0.7c0,0,0.1-0.1,0.1-0.1c0.1,0,0.1-0.1,0.2-0.1C6.7,7,6.7,7,6.8,7c0.1,0,0.3,0,0.4,0c0.1,0,0.1,0,0.2,0.1c0.1,0,0.1,0.1,0.2,0.1c0,0,0.1,0.1,0.1,0.1c0.1,0.1,0.2,0.2,0.2,0.3C8,7.7,8,7.9,8,8c0,0.1,0,0.3-0.1,0.4C7.9,8.5,7.8,8.6,7.7,8.7C7.5,8.9,7.3,9,7,9z" />
          </g>
          <g>
            <path d="M10,9C9.7,9,9.5,8.9,9.3,8.7C9.1,8.5,9,8.3,9,8c0-0.1,0-0.3,0.1-0.4c0.1-0.1,0.1-0.2,0.2-0.3c0.1-0.1,0.2-0.2,0.3-0.2C10,6.9,10.4,7,10.7,7.3c0.1,0.1,0.2,0.2,0.2,0.3C11,7.7,11,7.9,11,8c0,0.3-0.1,0.5-0.3,0.7C10.5,8.9,10.3,9,10,9z" />
          </g>
          <g>
            <path d="M13,9c-0.1,0-0.3,0-0.4-0.1c-0.1-0.1-0.2-0.1-0.3-0.2c-0.1-0.1-0.2-0.2-0.2-0.3C12,8.3,12,8.1,12,8c0-0.1,0-0.3,0.1-0.4c0.1-0.1,0.1-0.2,0.2-0.3c0.4-0.4,1-0.4,1.4,0c0.1,0.1,0.2,0.2,0.2,0.3C14,7.7,14,7.9,14,8c0,0.1,0,0.3-0.1,0.4c-0.1,0.1-0.1,0.2-0.2,0.3C13.5,8.9,13.3,9,13,9z" />
          </g>
          <path
            className="st0"
            id="blink"
            d="M27,5H5C3.9,5,3,5.9,3,7v18c0,1.1,0.9,2,2,2h22c1.1,0,2-0.9,2-2V7C29,5.9,28.1,5,27,5z"
          />
          <line className="blink" x1="14" y1="21" x2="18" y2="21" />
        </svg>
      </div>
      <div className="title-text">😀😁😎</div>
      {/* {quotes && (
        <blockquote className="quote">
          &ldquo;{quotes.content}&rdquo; &mdash;
          <footer>{quotes.author}</footer>
        </blockquote>
      )} */}

      <div className="social-icon">
        <div className="github-icon">
          <a href="https://github.com/prakash-pun" target="blank">
            <i className="fab fa-github-square"></i> Github
          </a>
        </div>
        <div className="linkedln-icon">
          <a href="https://www.linkedin.com/in/prakash--pun/" target="blank">
            <i className="fab fa-linkedin"></i> Linkedln
          </a>
        </div>
        <div className="resume-btn">
          <Link href="/resume">My Resume</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
