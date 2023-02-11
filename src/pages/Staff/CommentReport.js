import { CommentReportedList, DelMenuCommentReport, DelComment } from "../../script/controller";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

const CommentReportPage = () => {
  const [commentReport, setCommentReport] = useState({
    commentreport: [],
  });
  const [show, setShow] = useState(false);
  const [modalItem, setModalItem] = useState({
    reportdescription: [],
  });
  useEffect(() => {
    const fetchdata = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      const commentReportData = await CommentReportedList(token);
      console.log(commentReportData);
      setCommentReport((prev) =>
        ({ ...prev, commentreport: commentReportData.data.commentreport })
      );
    };
    fetchdata();
  }, []);

  return (
    <>
      <div className="flex flex-col align-items-center">
        <div className="common-home">
          <h1 className="my-4 text-center">Report</h1>
          <div className="flex justify-content-evenly text-center">
            <a href="/staff/report/members" className="flex rp-nav justify-content-center align-items-center">
              <div>Reported Members</div>
            </a>
            <a href="/staff/report/comments" className="flex rp-nav rp-nav-active justify-content-center align-items-center">
              <div>Reported Comments</div>
            </a>
            <a href="/staff/report/menus" className="flex rp-nav justify-content-center align-items-center">
              <div>Reported Menus</div>
            </a>
          </div>
          <h4 className="m-2">Reported Comments</h4>
          <div className="flex flex-col align-items-center">
            {commentReport.commentreport.map((item, index) => {
              return (
                <div className="db-menu" key={index}>
                  <div className="mb-1">
                    Comment: {item.comment ? item.comment : "[Deleted]" }
                  </div>
                  <div className="mb-1">
                    On Menu: {item.menuInfo.length ? item.menuInfo[0].name : "[Deleted]" }
                  </div>
                  <div className="text-sm text-muted mb-3">
                    By: 
                  </div>
                  <div className="text-sm mb-1">
                    REPORTED {item.count} TIME(S).
                  </div>
                  <div className="rp-desc" onClick={() => {
                    setShow(true)
                    setModalItem((prev) => ({ ...prev, reportdescription: item.reportdescription }))
                  }}>
                    Description
                  </div>
                  <div className="flex justify-content-end">
                    <button className="btn-blue" onClick={
                      async () => {
                        const token = JSON.parse(localStorage.getItem("token"));
                        console.log(item.menuID, item.commentID);
                        const res = await DelComment(token, item.menuID, item.commentID);
                        console.log(res);
                        await DelMenuCommentReport(token, item._id);
                        window.location.reload();
                      }
                    }>Delete Comment</button>
                    <button className="btn-lightblue" onClick={
                      async () => {
                        const token = JSON.parse(localStorage.getItem("token"));
                        const delReport = await DelMenuCommentReport(token, item._id);
                        console.log(delReport);
                        window.location.reload();
                      }
                    }>Reject Report</button>
                  </div>
                </div>
              )
            })}
            <Modal
              show={show}
              onHide={() => setShow(false)}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                  Comments
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {modalItem.reportdescription.map((it, id) => {
                  return (
                    <div key={id}>
                      {it.reporterName}: {it.description} 
                    </div>
                  );
                })}
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => setShow(false)} >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </>
  )
}
export default CommentReportPage
