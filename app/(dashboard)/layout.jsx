import Sidebar from "@/components/layout/dashboard/sidebar";
import Footer from "@/components/layout/dashboard/footer";
import Header from "@/components/layout/dashboard/header";

export default function RootLayout({ children }) {
  return (
        <div className="relative w-screen h-screen inline-flex bg-slate-50">
          <Sidebar />
          <div className="w-full h-full flex flex-col overflow-auto">
            <Header className="w-full mb-1" />
            <div className="flex-grow overflow-auto">{children}</div>
            <Footer className="w-full h-fit mt-1" />
          </div>
        </div>
  );
}
