import Header from "../components/Header";
import HumanizerTool from "../components/HumanizerTool";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Adsterra Top Banner */}
        <div className="flex justify-center py-4 bg-gray-50" id="ad-slot-1"></div>

        <HumanizerTool />
        
        {/* Adsterra Middle Banner */}
        <div className="flex justify-center py-8" id="ad-slot-2"></div>

        <HowItWorks />
        <Features />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
