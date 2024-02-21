import CodeEditor from "./(components)/CodeEditor";
import Credit from "./(components)/Credit";
import Footer from "./(components)/Footer";

export default function Home() {
  return (
    <div className="container flex flex-col items-center justify-center mx-auto max-w-screen-lg py-8 px-4">   {/* Reduced padding for container */}
      <Credit />
      <h1 className="mb-3 text-base font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white"> {/* Reduced font size and line-height */}
        Demo Editor by Kaustubh Pathak
      </h1>
      <CodeEditor />
      <Footer />
    </div>
  );
}
