import useAuth from "./hooks/useAuth";
import AppRouter from "./routes/AppRouter";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

function App() {
  const {loading, swalLoading} = useAuth()

  if(loading) {
    return (
      swalLoading()
    )
  }

  return (
    <div className="min-h-screen">
      <AppRouter/>
    </div>
  );
}

export default App;
