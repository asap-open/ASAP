const BACKGROUND_IMAGES = {
  mobile: "./pic-mobile.webp",
  desktop: "./pic-desktop.webp",
};

// Component: Hero Section Background
const HeroBackground = () => (
  <>
    {/* Mobile Image: Shown only on screens smaller than 768px */}
    <div
      className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat md:hidden"
      style={{
        backgroundImage: `url('${BACKGROUND_IMAGES.mobile}')`,
      }}
    >
      <div className="absolute inset-0 hero-gradient"></div>
    </div>

    {/* Desktop Image: Shown only on screens 768px and larger */}
    <div
      className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat hidden md:block"
      style={{
        backgroundImage: `url('${BACKGROUND_IMAGES.desktop}')`,
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
    </div>
  </>
);
export default HeroBackground;
