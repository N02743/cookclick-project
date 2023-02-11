import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa"
import Userpic from "../../img/user.jpg"
import {
  MenuReportedList,
  MemberReportedList,
  CommentReportedList,
  MenuRequest,
} from "../../script/controller"


const Dashboard = () => {
  const [commentReportCount, setCommentReportCount] = useState(0)
  const [menuReportCount, setMenuReportCount] = useState(0)
  const [memberReportCount, setMemberReportCount] = useState(0)
  const [menuWaitingCount, setMenuWaitingCount] = useState(0)
  const [menuApprovedCount, setMenuApprovedCount] = useState(0)
  useEffect(() => {
    const fetchdata = async () => {
      const token = JSON.parse(localStorage.getItem("token"))
      const menuReportData = await MenuReportedList(token)
      const commentReportData = await CommentReportedList(token)
      const memberReportData = await MemberReportedList(token)
      const menuWaitingData = await MenuRequest(token, "waitapprove")
      const menuApprovedData = await MenuRequest(token, "approved")
      setMemberReportCount(memberReportData.memreport.length)
      setMenuReportCount(menuReportData.data.menu.length)
      setCommentReportCount(commentReportData.data.commentreport.length)
      setMenuWaitingCount(menuWaitingData.menu.length)
      setMenuApprovedCount(menuApprovedData.menu.length)
    }
    fetchdata()
  }, [])

  return (
    <>
      <div className="flex flex-col align-items-center">
        <div className="common-home">
          <h1 className="my-4 text-center">Dashboard</h1>
          <div className="align-self-start text-md m-2 mt-5">
            Pending Reports...
          </div>
          <div className="flex flex-col">
            <a href="/staff/report/menus" className="db-report shadow-red">
              <div>Menu Report</div>
              <div className="text-sm text-muted">
                {menuReportCount} pending report(s).
              </div>
            </a>
            <a href="/staff/report/members" className="db-report shadow-yellow">
              <div>Member Report</div>
              <div className="text-sm text-muted">
                {memberReportCount} pending report(s).
              </div>
            </a>
            <a href="/staff/report/comments" className="db-report shadow-blue">
              <div>Comment Report</div>
              <div className="text-sm text-muted">
                {commentReportCount} pending report(s).
              </div>
            </a>
          </div>
          <div className="align-self-start text-md m-2 mt-5">
            Menu Status...
          </div>
          <div className="flex justify-content-evenly">
            <a href="/" className="db-menu">
              <div>Total Approved Menu</div>
              <div className="text-sm text-muted">
                {menuApprovedCount} approved menu(s).
              </div>
            </a>
            <a href="/staff/approve" className="db-menu">
              <div>Waiting for Approval</div>
              <div className="text-sm text-muted">
                {menuWaitingCount} menu(s) waiting for approval.
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
export default Dashboard
