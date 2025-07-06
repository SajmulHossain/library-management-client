import Lottie from "lottie-react";
import jsonFile from '@/assets/lotties/netError.json'
const NetError = () => {
  return <section className="section">
    <div className="text-center">
        <h3 className="font-bold text-4xl">No Internet!</h3>
        <p>Check your internet and try again</p>
    </div>
    <Lottie animationData={jsonFile} />
  </section>;
};

export default NetError;
