import { getHomePageData } from "@/serverUtils/homeService";
import { redirectToLoginPage } from "@/utils/redirect";
import Link from "next/link";

const Index = ({data}) => {

  return (
    <>
     <div className="flex flex-col items-center justify-center h-screen">
  <div className="bg-white rounded-lg shadow-lg p-8">
    <h1 className="text-gray-800 font-bold text-5xl mb-8">
      Welcome <span className="text-red-500">{data?.user?.name || "User"}</span> to your Expenses App
    </h1>
    <div className="flex justify-center space-x-4">
      <Link href="/expenses">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
          View Expenses
        </button>
      </Link>
      <Link href="/categories">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
          View Categories
        </button>
      </Link>
    </div>
  </div>
</div>

    </>
  );
};
export async function getServerSideProps(context) {
    // Check if the user is authenticated
    const { token } = context.req.cookies;
  
    if (!token) {
      // If the user is not authenticated, redirect them to the login page
      return redirectToLoginPage();
    }
  
    const data = await getHomePageData(token);
  
    if (!data) return redirectToLoginPage();
  
    return {
      props: {
        data,
      },
    };
  }

export default Index;
