import { useAuth } from "../script/useAuth"
import { GetMenuInfo } from "../script/controller"

const Test = () => {
  const { logout } = useAuth()
  const id = '631581f4f0d0e8cb261e56ef'

  const test = async () => {
    const data = await GetMenuInfo(id)
    console.log(data)
  }

  return (
    <div className="flex justify-content-center">
      <div className="formbox p-3">
        <h1>Test</h1>
        <button onClick={logout}>Test Logout</button>
        <button onClick={(e) => test(e)}>Test Menu</button>
      </div>
    </div>
  )
}

export default Test;