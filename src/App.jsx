import useAuth from "./hooks/useAuth";
import AppRouter from "./routes/AppRouter";

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
