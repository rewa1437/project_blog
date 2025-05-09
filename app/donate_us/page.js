import Navbar from "../components/Navbar";
import Image from "next/image"; 
import donateImage from '../image/blog/Invest.jpg';
import Link from "next/link";

export default function DonateUs() {
  return (
    <div className="h-auto">
      <Navbar />

      <div className="p-8">
        <h1 className="text-4xl font-bold text-center">Donate Us</h1>
        <p className="text-center text-lg mt-4">
        เพื่อเป็นการสนับสนุนเราและร่วมพัฒนาเนื้อหาที่มีคุณค่า เรามีหลายระดับการสนับสนุนที่คุณสามารถเลือกได้ตามความสะดวก <br></br>ท่านสามารถเลือกช่องทางการสนับสนุนที่ต้องการได้ที่นี่ เพื่อช่วยให้เราสามารถสร้างสรรค์และพัฒนาสื่อการเรียนรู้ให้ดียิ่งขึ้น!
        </p>

        <div className="grid grid-cols-3 gap-8 mt-8">

            <div className="h-70 bg-gray-100 p-4 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col justify-between">
                <div className="h-40 flex items-center justify-center">
                    <Image 
                    src={donateImage} 
                    alt="Volunteer"
                    width={300} 
                    height={200} 
                    className="object-cover w-full h-full rounded-md"
                    />
                </div>
                
                <div className="text-center mt-auto">
                    <h3 className="font-semibold text-xl">ผู้สนับสนุนระดับจอมยุทธ</h3>
                    <Link href='/donate_us/checkout'>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-md mt-4 hover:bg-blue-500">
                        Donate Now
                        </button>
                    </Link>
                </div>
            </div>

            <div className="h-70 bg-gray-100 p-4 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col justify-between">
                <div className="h-40 flex items-center justify-center">
                    <Image 
                    src={donateImage} 
                    alt="Volunteer"
                    width={300} 
                    height={200} 
                    className="object-cover w-full h-full rounded-md"
                    />
                </div>
                
                <div className="text-center mt-auto">
                    <h3 className="font-semibold text-xl">ผู้สนับสนุนระดับวีรบุรุษ</h3>
                    <button className="bg-green-600 text-white px-6 py-2 rounded-md mt-4 hover:bg-green-500">
                    Donate Now
                    </button>
                </div>
            </div>

            <div className="h-70 bg-gray-100 p-4 rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col justify-between">
                <div className="h-40 flex items-center justify-center">
                    <Image 
                    src={donateImage} 
                    alt="Volunteer"
                    width={300} 
                    height={200} 
                    className="object-cover w-full h-full rounded-md"
                    />
                </div>
                
                <div className="text-center mt-auto">
                    <h3 className="font-semibold text-xl">ผู้สนับสนุนระดับตำนาน</h3>
                    <button className="bg-yellow-600 text-white px-6 py-2 rounded-md mt-4 hover:bg-yellow-500">
                    Donate Now
                    </button>
                </div>
            </div>


        </div>
      </div>
    </div>
  );
}
