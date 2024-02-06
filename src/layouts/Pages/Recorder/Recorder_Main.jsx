import RecInfoTable from "./RecInfoTable";

export default function Recorder_Main() {
  return (
    <div className="max-w-full p-2 justify-center items-center transition-all">
      <div className="min-h-0 flex h-full justify-between items-center">
        <div className="container h-full p-0 ">
          <RecInfoTable />
        </div>
        <div className="container h-full p-0 flex flex-col gap-8 justify-center items-center">
          <div className="container h-44 w-5/6 bg-gray-500 rounded-box p-2">
            <div className="text-3xl text-center">ปริมาณสุนัขที่ลงทะเบียน</div>
          </div>
          <div className="container h-44 w-5/6 bg-gray-500 rounded-box p-2">
            <div className="text-3xl text-center">ปริมาณแมวที่ลงทะเบียน</div>
          </div>
          <div className="container h-44 w-5/6 bg-gray-500 rounded-box p-2">
            <div className="text-3xl text-center">ปริมาณแมวที่ลงทะเบียน</div>
          </div>
        </div>
      </div>
    </div>
  );
}
