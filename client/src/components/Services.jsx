import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

const ServiceCards = ({ color, title, icon, subtitle }) => (
  <div className="flex  flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer shadow-xl">
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
    >
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-lg">{title}</h3>
      <p className="mt-2 text-white text-sm sm:w-9/12">{subtitle}</p>
    </div>
  </div>
);

const Services = () => {
  return (
    <div className="flex flex-col md:flex-row w-full justify-center items-center gradient-bg-services">
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
        <div className="flex-1 flex flex-col justify-start items-start">
          <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
            Services that we
            <br />
            continue to improve
          </h1>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-start items-center">
        <ServiceCards
          color="bg-[purple]"
          title="Transparency"
          icon={<BiSearchAlt fontSize={21} className="text-white" />}
          subtitle="We focuses on transparency because protecting your trust is our base and moto ."
        />
        <ServiceCards
          color="bg-[#2952e3]"
          title="Security Guaranteed"
          icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
          subtitle="Security is Guranteed, We always maintain privary and maintain our products"
        />
        <ServiceCards
          color="bg-[#8945F8]"
          title="Best Exchange Rates"
          icon={<BiSearchAlt fontSize={21} className="text-white" />}
          subtitle="We care for you, get the best exchange rates compared to all over the world."
        />
        <ServiceCards
          color="bg-[#F84550]"
          title="Experience Fastest Transactions"
          icon={<RiHeart2Fill fontSize={21} className="text-white" />}
          subtitle="Don't worry we know your time is valuable, so experience fastest transactions."
        />

      </div>
    </div>
  );
};

export default Services;
