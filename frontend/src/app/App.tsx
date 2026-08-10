import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import '../style/App.css'
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <div>
      <Toaster/>
      <RouterProvider router={router} />
    </div>
  )
}

export default App