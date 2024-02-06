import useAuth from "./hooks/useAuth";
import AppRouter from "./routes/AppRouter";

function App() {
  const {loading, SwalLoading} = useAuth()

  if(loading) {
    return (
      SwalLoading
    )
  }

  return (
    <div className="min-h-screen">
      <AppRouter/>
    </div>
  );
}

export default App;
