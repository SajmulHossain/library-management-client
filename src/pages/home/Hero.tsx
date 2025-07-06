import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="bg-[url(@/assets/hero.jpg)] bg-cover bg-center h-screen">
      <div className="section bg-blend-overlay bg-black/20 mt-0 text-white flex items-center h-full">
        <div className="max-w-xl">
          <h2 className="italic text-4xl font-semibold text-green-500">
            LitBase
          </h2>
          <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl">
            The best digital library in your hand
          </h1>
          <Button className="bg-green-600 mt-7">
            <Link to="/books">Explore Books</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
