import React from 'react'
import UnRegisterTable from './Table/UnRegister_Table'

export default function Recorder_UnRegister() {
  return (
    <div className="max-w-full p-2 justify-center items-center transition-all content-long-native">
        <div className="text-4xl font-bold p-5">สัตว์ที่ไม่ได้รับการลงทะเบียน</div>
        <UnRegisterTable/>      
    </div>
  )
}
