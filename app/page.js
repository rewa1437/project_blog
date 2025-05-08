'use client';
import Navbar from "./components/Navbar";
import Image from "next/image";
import cover from './image/screen.png';


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
      <div className="flex items-center space-x-8 my-10 p-5 rounded-lg ">
        <div className="w-2/7">
          
        </div>
        <div className="w-1/7">
          
        </div>
        <div className="w-3/7 flex-space">
          <h1 className="text-3xl font-bold mb-4">No Money No Honey</h1>
          <p className="text-sm mb-6">
          &emsp;&emsp;&emsp;&emsp;ทีม "No Money No Honey" มีเป้าหมายในการสร้างสื่อการเงินเบื้องต้นที่มีเนื้อหาชัดเจนและเข้าใจง่าย 
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
          <button className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-400">
            Learn More
          </button>
        </div>
      </div>
      <div className="p-8">
        {/* หัวข้อ Blog */}
        <div>
          <h1 className="text-4xl font-bold">Blog</h1>
        </div>
        {/* หัวข้อ Recommend for You */}
        <div className="mt-8">
          <h2 className="text-3xl font-semibold">Recommend for You</h2>
        </div>

        {/* คอนเทนต์ที่แสดงรูปภาพและข้อความในกริด */}
        <div className="grid grid-cols-3 gap-8 mt-8">
          <div className="h-60">
            <div className="bg-gray-300 h-60">
              รูปจ้าาา
            </div>
            <div className="text-center mt-4">
              <h3 className="font-bold">How to Be A Millionaire in a Year</h3>
              <p className="text-sm">Adam Driver</p>
            </div>
          </div>

          <div className="bg-gray-300 h-60">
            รูปจ้าาา
            <div className="text-center mt-4">
              <h3 className="font-bold">How to Be A Millionaire in a Year</h3>
              <p className="text-sm">Mona Lisa</p>
            </div>
          </div>

          <div className="bg-gray-300 h-60">
            รูปจ้าาา
            <div className="text-center mt-4">
              <h3 className="font-bold">How to Be A Millionaire in a Year</h3>
              <p className="text-sm">Pedro Pascal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
