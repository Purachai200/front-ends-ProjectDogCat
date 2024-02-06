import { createContext, useState } from "react";

const MockUpContext = createContext();

function MockUpContextProvider(props) {

  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isRecorder, setIsRecorder] = useState(false);  

  const hdlAdminLogin = () => {
    try {
      setIsAdmin(true)
      setIsRecorder(false)
    } catch (err) {
      console.log(err.message)
    }
  }
  const hdlRecLogin = () => {
    try {
      setIsAdmin(false)
      setIsRecorder(true)
    } catch (err) {
      console.log(err.message)
    }
  }

  const hdlLogOut = () => {
    try {
      setIsAdmin(false)
      setIsRecorder(false)
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <MockUpContext.Provider value={{hdlAdminLogin,hdlRecLogin, hdlLogOut, isAdmin, setIsAdmin, isRecorder, setIsRecorder}}>
      {props.children}
    </MockUpContext.Provider>
  )
}

export { MockUpContextProvider }
export default MockUpContext;