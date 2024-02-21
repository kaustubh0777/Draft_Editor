import Head from "next/head";
import CodeEditor from "./(components)/CodeEditor";
import Credit from "./(components)/Credit";
import Footer from "./(components)/Footer";

export default function Home() {
  return (
    <div className="container flex flex-col items-center justify-center mx-auto  mb-12 py-26 px-36">
      <Credit/>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Demo Editor by Kaustubh Pathak</h1>
      <CodeEditor />
      <Footer/>
    </div>
  );
}
