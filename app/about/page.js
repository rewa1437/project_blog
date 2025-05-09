import Navbar from "../components/Navbar";
import Image from "next/image";
import invest from '../image/blog/Invest.jpg';
import dev1 from '../image/dev/anp.jpg';
import dev2 from '../image/dev/wtn.jpg';
import dev3 from '../image/dev/nnp.jpg';

export default function About() {
  return (
    <div className="h-auto">
      <Navbar />
      
      <div className="bg-gray-100 p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Meet the Development Team</h1>
          <p className="mt-4 text-lg">Our passionate team behind the project</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Image 
              src={dev1} 
              alt="Developer 1"
              width={128} 
              height={128} 
              className="rounded-full mx-auto mb-4" 
            />
            <h3 className="text-xl font-semibold">ANUPAP PASAKORNHIRAN</h3>
            <p className="text-sm text-gray-500">Front-end Developer</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Image 
              src={dev2}  
              alt="Developer 2"
              width={128} 
              height={128} 
              className="rounded-full mx-auto mb-4" 
            />
            <h3 className="text-xl font-semibold">WANTANA RU_ARN</h3>
            <p className="text-sm text-gray-500">Back-end Developer</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Image 
              src={dev3} 
              alt="Developer 3"
              width={128} 
              height={128} 
              className="rounded-full mx-auto mb-4" 
            />
            <h3 className="text-xl font-semibold">NONGNAPAS PANKLAI</h3>
            <p className="text-sm text-gray-500">UI/UX Designer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
