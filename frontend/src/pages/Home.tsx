import { Outlet } from "react-router-dom"
import AppLayout from "../layout/AppLayout"

const Home = () => {
  return (
    <div>
        <AppLayout>
            <Outlet/>
        </AppLayout>
    </div>
  )
}

export default Home