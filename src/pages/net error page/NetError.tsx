import Lottie from "lottie-react";
import jsonFile from '@/assets/lotties/netError.json'
const NetError = () => {
  return <section className="section">
    <Lottie animationData={jsonFile} />
  </section>;
};

export default NetError;
