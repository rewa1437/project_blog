'use client';
import Navbar from "./components/Navbar";
import Image from "next/image";
import cover from './image/screen.png';
import invest from './image/blog/Invest.jpg';
import manage from './image/blog/manage.jpg';
import saving from './image/blog/saving.jpg';
import logo from './image/logo/logo.png';
import Link from 'next/link';

export default function Home() {
  return (
    <div >
      <Navbar />
      <div className="">
        <Image 
          src={cover}
          alt="Random Image"
          width={1200}
          height={400}
          className="object-cover w-full max-w-full h-auto"
        />
      </div>
      <div className="flex items-center space-x-8 my-10 p-5 rounded-lg mb-30 ">
        <div className="w-1/10 ">

        </div>
        <div className="w-4/10 item-center ">
            <Image 
                  src={logo} 
                  alt="Random Image"
                  width={400} 
                  height={400} 
                  className="object-cover w-full h-full rounded-md hover:scale-105 transition-all duration-300" 
              />
        </div>
        <div className="w-4/10 flex-space ">
          <h1 className="text-3xl font-bold mb-4">No Money No Honey</h1>
          <p className="text-sm mb-6">
          &emsp;&emsp;&emsp;&emsp;ทีม &quot;No Money No Honey&quot; มีเป้าหมายในการสร้างสื่อการเงินเบื้องต้นที่มีเนื้อหาชัดเจนและเข้าใจง่าย 
          เพื่อช่วยให้ผู้คนสามารถบริหารจัดการการเงินส่วนบุคคลได้อย่างมีประสิทธิภาพ โดยเน้นการให้
          ความรู้พื้นฐานเกี่ยวกับการบริหารเงิน การออมเงิน และการลงทุนเบื้องต้น ซึ่งเป็นองค์ประกอบสำคัญในการสร้างความมั่นคงทางการเงินในระยะยาว 
          เนื้อหาของสื่อจะครอบคลุมถึงวิธีการตั้งงบประมาณการใช้จ่ายที่เหมาะสม การจัดสรรรายได้ตามสัดส่วนที่ช่วยให้สามารถออมเงินได้อย่างมีวินัย 
          รวมถึงการเลือกวิธีการลงทุนที่เหมาะสมกับแต่ละบุคคล เพื่อเพิ่มมูลค่าเงินออมและเตรียมความพร้อมสำหรับอนาคต
          </p>
          <p className="text-sm mb-6">
          &emsp;&emsp;&emsp;&emsp;การนำเสนอเนื้อหาจะเน้นให้เข้าใจง่าย โดยใช้ตัวอย่างที่เป็นจริงและสามารถประยุกต์ใช้ได้ในชีวิตประจำวัน 
          รวมถึงการใช้เครื่องมือที่ช่วยในการจัดการเงิน เช่น แอปพลิเคชันการเงิน เพื่อให้ผู้คนสามารถติดตามและวางแผนการใช้จ่ายได้อย่างมีประสิทธิภาพ 
          ทีมงานมุ่งหวังที่จะสร้างสื่อที่ไม่เพียงแค่ให้ความรู้ แต่ยังช่วยเสริมสร้างทักษะในการวางแผนการเงินที่ดี 
          เพื่อให้ผู้คนมีความมั่นคงทางการเงินและสามารถบรรลุเป้าหมายทางการเงินในชีวิตได้อย่างยั่งยืน.
          </p>
          <Link href='/about'>
            <button className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-400">
              Learn More
            </button>
          </Link>
        </div>
        <div className="w-1/10 ">

        </div>
      </div>
      <div className="p-8 h-150">
        <div>
          <h1 className="text-4xl font-bold">Blog</h1>
        </div>
        <div className="mt-8">
          <h2 className="text-3xl font-semibold">Recommend for You</h2>
        </div>

        <div className="grid grid-cols-3 gap-8 mt-8">

          <Link href="/blog/learning/manage">
            <div className="h-60 hover:shadow-2xl hover:scale-105 hover:text-[#6DBE45] transition-all duration-300">
              <div className=" h-60 flex items-center justify-center text-center">
                <Image 
                  src={manage} 
                  alt="Random Image"
                  width={400} 
                  height={400} 
                  className="object-cover w-full h-full rounded-md" 
                />
              </div>
              <div className="text-center mt-4 ">
                <h3 className="font-bold">อยู่รอดได้ถึงสิ้นเดือน แค่จัดการเงินเดือนให้ดี</h3>
                <p className="text-sm">BIG ANP</p>
              </div>

            </div>
          </Link>

          <Link href="/blog/learning/saving">
            <div className="h-60 hover:shadow-2xl hover:scale-105 hover:text-[#FF9F00] transition-all duration-300">  
              <div className=" h-60 flex items-center justify-center text-center">
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

          <Link href="/blog/learning/invest">
            <div className="h-60 hover:shadow-2xl hover:scale-105 hover:text-[#FFB800] transition-all duration-300">  
              <div className=" h-60 flex items-center justify-center text-center">
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
      <footer className="text-center p-4 mt-8 text-gray-500 text-sm">
        © 2025, Microfinance
      </footer>
    </div>
  );
}
