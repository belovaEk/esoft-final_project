import  Header  from "./Header/Header";
import  Footer  from "./Footer/Footer";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="app">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};