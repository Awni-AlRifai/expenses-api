import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-gradient bg-blur">
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}

export default MyApp;
