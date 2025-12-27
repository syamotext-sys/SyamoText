import logo from "@/assets/logo.png";

const Header = () => {
  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={handleLogoClick} 
            className="flex items-center gap-3 hover:opacity-90 transition-all focus:outline-none"
          >
            <img src={logo} alt="SyamoText" className="h-[48px] w-auto object-contain" />
            <span className="text-2xl font-bold text-[#4C1D95] font-heading">SyamoText</span>
          </button>
        </div>
        
        <nav className="hidden md:flex gap-8 font-medium font-heading">
          <a href="#how-it-works" className="text-gray-600 hover:text-[#4C1D95]">How it works?</a>
          <a href="#features" className="text-gray-600 hover:text-[#4C1D95]">Features</a>
          <a href="#faq" className="text-gray-600 hover:text-[#4C1D95]">FAQ</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
