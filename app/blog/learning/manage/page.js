import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import coverImage from '@/app/image/blog/manage.jpg'; 

export default function BlogPost() {
  return (
    <div className="bg-gray-50">
      <Navbar />
      <div className="bg-gradient-to-b from-blue-500 to-teal-500 h-32">
        <div className="flex justify-between items-center p-8 text-white">
          <h1 className="text-4xl font-bold">อยู่รอดได้ถึงสิ้นเดือน แค่จัดการเงินเดือนให้ดี</h1>
          <span>Author: ANUPAP PASAKORNHIRAN</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-12 flex space-x-12">

        <div className="w-2/3">
          <h2 className="text-2xl font-semibold mb-4">อยู่รอดได้ถึงสิ้นเดือน แค่จัดการเงินเดือนให้ดี</h2>
          <p className="text-lg font-bold text-gray-700 mb-8">
            การตั้งงบประมาณการใช้จ่าย
          </p>
          <p className="text-lg text-gray-700 mb-8">
            การใช้สูตร 50/30/20 เป็นวิธีที่แนะนำในการจัดสรรเงินเดือน เพื่อให้สามารถใช้จ่ายได้อย่างมีประสิทธิภาพและยังคงสามารถออมเงินได้ในระยะยาว โดยการแบ่งเงินออกเป็น 3 ส่วนหลัก:
          </p>

          <ul className="list-disc ml-8 mb-8">
            <li>50% สำหรับค่าใช้จ่ายจำเป็น: เช่น ค่าครองชีพพื้นฐานที่ขาดไม่ได้ เช่น ค่าอาหาร, ค่าที่อยู่อาศัย, ค่าน้ำ-ไฟ, ค่าเดินทาง ฯลฯ</li>
            <li>30% สำหรับความต้องการ: ค่าใช้จ่ายที่ไม่จำเป็น เช่น การท่องเที่ยว, ช้อปปิ้ง, ความบันเทิงต่าง ๆ</li>
            <li>20% สำหรับการออมและการลงทุน: การออมเพื่อเป้าหมายในอนาคต เช่น การเกษียณ หรือการสร้างเงินสำรองฉุกเฉิน</li>
          </ul>

          <p className="text-lg text-gray-700 mb-8">
            การใช้สูตรนี้ช่วยให้คุณสามารถจัดสรรเงินที่ได้รับจากเงินเดือนให้มีระเบียบและลดการใช้จ่ายที่เกินความจำเป็น
          </p>

          <p className="text-lg font-bold text-gray-700 mb-8">
            การทำบัญชีรายรับรายจ่าย
          </p>
          <p className="text-lg text-gray-700 mb-8">
            การทำบัญชีรายรับ-รายจ่ายเป็นเครื่องมือที่สำคัญในการติดตามการเงินส่วนบุคคล:
          </p>

          <ul className="list-disc ml-8 mb-8">
            <li>บันทึกรายรับ: บันทึกทุกๆ รายได้ที่เข้ามา เช่น เงินเดือน, รายได้จากการลงทุน, หรือรายได้เสริม</li>
            <li>บันทึกรายจ่าย: บันทึกค่าใช้จ่ายทั้งหมดที่เกิดขึ้นในแต่ละเดือน เช่น ค่าอาหาร, ค่าบ้าน, ค่าประกัน, ค่าเดินทาง ฯลฯ</li>
            <li>จำแนกหมวดหมู่: แบ่งค่าใช้จ่ายออกเป็นหมวดหมู่เพื่อให้เห็นภาพการใช้จ่ายที่ชัดเจน และทำให้สามารถปรับปรุงการใช้จ่ายที่ไม่จำเป็น</li>
            <li>ใช้แอปพลิเคชัน: ใช้แอปพลิเคชันหรือเครื่องมือออนไลน์ในการบันทึกและติดตามการใช้จ่าย เช่น K-My Money หรือ SCB Easy App</li>
          </ul>

          <p className="text-lg text-gray-700 mb-8">
            การทำบัญชีรายรับรายจ่ายจะช่วยให้คุณสามารถจัดการกับการใช้เงินได้ดีขึ้นและรู้ว่าคุณใช้จ่ายไปกับอะไรบ้างในแต่ละเดือน
          </p>
        </div>

        <div className="w-1/3">
          <Image 
            src={coverImage}
            alt="Cover Image"
            width={500} 
            height={300} 
            className="object-cover w-full h-auto rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
