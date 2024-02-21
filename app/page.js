import Head from "next/head";
import CodeEditor from "./(components)/CodeEditor";


export default function Home() {
  return (
    <div className="container flex flex-col items-center justify-center mx-auto border-white-100 mb-12 py-36 px-20">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Portle Editor</h1>
       <CodeEditor/>
    </div>
  );
}
