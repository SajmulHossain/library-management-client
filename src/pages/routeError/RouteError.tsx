import json from "@/assets/lotties/404.json";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import { useNavigate } from "react-router";
const RouteError = () => {
    const navigate = useNavigate();
  return (
    <section className="section">
      <Lottie animationData={json} />
      <div className="text-center">
        <h2 className="font-bold text-4xl">Route Not Found</h2>
        <div className="space-x-2 mt-4">
            <Button onClick={() => navigate(-1)} className="bg-green-700">Go Back</Button>
            <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    </section>
  );
};

export default RouteError;
