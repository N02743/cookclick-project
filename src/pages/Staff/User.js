import Userbox from "../../components/Userbox"
import { useState, useEffect } from "react"
import { GetAllMember } from "../../script/controller"

const User = () => {
  const token = JSON.parse(localStorage.getItem("token"))
  const [Exmem, setExmem] = useState([])
  const [Exmod, setExmod] = useState([])
  const [Exadmin, setExadmin] = useState([])
  const [ignore, setignore] = useState(false)
  function setup(ulist) {
    let admin = []
    let mod = []
    let mem = []
    for (let i = 0; i < ulist.length; i++) {
      if (ulist[i].role === 3) {
        admin.push(ulist[i])
      } else if (ulist[i].role === 2) {
        mod.push(ulist[i])
      } else {
        mem.push(ulist[i])
      }
    }
    setExmem(mem)
    setExmod(mod)
    setExadmin(admin)
  }
  useEffect(() => {
    async function fetchdata() {
      const response = await GetAllMember(token)
      setup(response.user)
    }
    if (!ignore) {
      fetchdata()
    }
    return () => {
      setignore(true)
    }
  })

  return (
    <>
      <div className="user-top">
        <h1 className="user-title-txt">USER</h1>
      </div>
      <div className="user-member-info">
        <h4 className="user-mem-txt">Member</h4>
        <div className="user-memlist">
          {Exmem.map((info, index) => {
            return (
              <Userbox
                key={index}
                uid={info._id}
                username={info.displayname}
                email={info.email}
                role={1}
                setignore={setignore}
              />
            )
          })}
        </div>
      </div>
      <div className="user-mod-info">
        <h4 className="user-mod-txt">Moderator</h4>
        <div className="user-modlist">
          {Exmod.map((info, index) => {
            return (
              <Userbox
                key={index}
                uid={info._id}
                username={info.displayname}
                email={info.email}
                role={2}
                setignore={setignore}
              />
            )
          })}
        </div>
      </div>
      <div className="user-admin-info">
        <h4 className="user-admin-txt">Admin</h4>
        <div className="user-adminlist">
          {Exadmin.map((info, index) => {
            return (
              <Userbox
                key={index}
                uid={info._id}
                username={info.displayname}
                email={info.email}
                role={3}
                setignore={setignore}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}
export default User
