import Navbar from "../components/Navbar";
import invest from '../image/blog/Invest.jpg';
import manage from '../image/blog/manage.jpg';
import saving from '../image/blog/saving.jpg';
import Link from "next/link";
import Image from "next/image";

export default function Blog() {
  return (
    <div className="h-auto">
      <Navbar />
      <div className="p-8 h-auto">
        <div>
          <h1 className="text-4xl font-bold">Blog</h1>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-6">ประเภทการบริหารเงิน</h3>
          <div className="grid grid-cols-3 gap-8 mt-4">
            <Link href="/">
              <div className="h-60 hover:shadow-2xl hover:scale-105 hover:text-[#6DBE45] transition-all duration-300">
                <div className="h-60 flex items-center justify-center text-center">
                  <Image 
                    src={manage} 
                    alt="Random Image"
                    width={400} 
                    height={400} 
                    className="object-cover w-full h-full rounded-md" 
                  />
                </div>
                <div className="text-center mt-4">
                  <h3 className="font-bold">อยู่รอดได้ถึงสิ้นเดือน แค่จัดการเงินเดือนให้ดี</h3>
                  <p className="text-sm">BIG ANP</p>
                </div>
              </div>
            </Link>

          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-semibold mb-6">ประเภทการออมเงิน</h3>
          <div className="grid grid-cols-3 gap-8 mt-4">

            <Link href="/">
              <div className="h-60 hover:shadow-2xl hover:scale-105 hover:text-[#FF9F00] transition-all duration-300">  
                <div className="h-60 flex items-center justify-center text-center">
                  <Image 
                    src={saving} 
                    alt="Random Image"
                    width={400} 
                    height={400} 
                    className="object-cover w-full h-full rounded-md" 
                  />
                </div>
                <div className="text-center mt-4">
                  <h3 className="font-bold">ออมเงินไม่เครียด ใช้ชีวิตได้สบาย</h3>
                  <p className="text-sm">NAM WTN</p>
                </div>
              </div>
            </Link>

          </div>
        </div>

        <div className="mt-20 mb-20">
          <h3 className="text-2xl font-semibold mb-6">ประเภทการลงทุน</h3>
          <div className="grid grid-cols-3 gap-8 mt-4">

            <Link href="/">
              <div className="h-60 hover:shadow-2xl hover:scale-105 hover:text-[#FFB800] transition-all duration-300">  
                <div className="h-60 flex items-center justify-center text-center">
                  <Image 
                    src={invest} 
                    alt="Random Image"
                    width={400} 
                    height={400} 
                    className="object-cover w-full h-full rounded-md" 
                  />
                </div>
                <div className="text-center mt-4">
                  <h3 className="font-bold">ลงทุนให้คุ้มค่า ใช้เงินทำงานให้เรา</h3>
                  <p className="text-sm">PAT NNP</p>
                </div>
              </div>
            </Link>

          </div>
        </div>

      </div>
    </div>
  );
}
