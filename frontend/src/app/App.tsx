import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import '../style/App.css'
import { ToastContainer } from "react-toastify"
const App = () => {
  return (
    <div>
      <ToastContainer/>
      <RouterProvider router={router} />
    </div>
  )
}

export default App