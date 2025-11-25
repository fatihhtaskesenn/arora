import HeroSection from "@/components/organisms/HeroSection";
import ProductsSection from "@/components/organisms/ProductsSection";
import ProjectsPreview from "@/components/organisms/ProjectsPreview";

export default function Home() {
  return (
    <>
      <HeroSection />
      <div id="products-section">
        <ProductsSection />
      </div>
      <ProjectsPreview />
    </>
  );
}
