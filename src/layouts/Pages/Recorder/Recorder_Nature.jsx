import Nature_Table from "./Table/Nature_Table";

export default function Recorder_Location() {
  return (
    <div className="max-w-full p-4 justify-center items-center transition-all content-long-native content-long-native">
      <div className="text-4xl font-bold p-5">ลักษณะการเลี้ยง</div>
      <Nature_Table/>
    </div>
  )
}
