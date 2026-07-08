import HeroSection from "../Components/HeroSection";
import FeaturedCategories from "../Components/FeaturedCategories";
import FeaturedProducts from "../Components/FeaturedProducts";
import WhyChooseUs from "../Components/WhyChooseUs";
function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <WhyChooseUs />
      <FeaturedCategories />
    </div>
  );
}

export default Home;
