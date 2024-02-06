import Register_Table from "./Table/Register_Table";

export default function Recorder_Register() {
  return (
    <div className="max-w-full p-2 justify-center items-center transition-all">
      <div className="text-6xl font-bold p-5">ลงทะเบียน เพิ่ม - ลด</div>
        <Register_Table/>
    </div>
  )
}
