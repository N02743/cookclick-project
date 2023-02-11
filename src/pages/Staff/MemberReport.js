import { MemberReportedList, DelMemberReport, MemberBan } from "../../script/controller";
import { useEffect, useState, useRef } from "react";
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import DatePicker from "react-datepicker";
import Form from 'react-bootstrap/Form';

const MemberReportPage = () => {
  const [memberReport, setMemberReport] = useState({
    memreport: [],
  });
  const [show, setShow] = useState(false);
  const [showBan, setShowBan] = useState(false);
  const [modalItem, setModalItem] = useState({
    reportdescription: [],
  });
  const [banID, setBanID] = useState({
    userID: "",
    reportID: "",
  });
  const descriptionRef = useRef("");
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    const fetchdata = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      const memberReportData = await MemberReportedList(token);
      console.log(memberReportData);
      setMemberReport((prev) =>
        ({ ...prev, memreport: memberReportData.memreport })
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
            <a href="/staff/report/members" className="flex rp-nav rp-nav-active justify-content-center align-items-center">
              <div>Reported Members</div>
            </a>
            <a href="/staff/report/comments" className="flex rp-nav justify-content-center align-items-center">
              <div>Reported Comments</div>
            </a>
            <a href="/staff/report/menus" className="flex rp-nav justify-content-center align-items-center">
              <div>Reported Menus</div>
            </a>
          </div>
          <h4 className="m-2">Reported Members</h4>
          <div className="flex flex-col align-items-center">
            {memberReport.memreport.map((item, index) => {
              return (
                <div className="db-menu" key={index}>
                  <div className="mb-1">
                    Username: {item.username}
                  </div>
                  <div className="text-sm text-muted mb-3">
                    Email: {item.email}
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
                    <button className="btn-blue"
                      onClick={() => {
                        setBanID((prev) => ({ ...prev, userID: item.userID, reportID: item._id }))
                        setShowBan(true)
                      }}>
                      Ban Member
                    </button>
                    <button className="btn-lightblue" onClick={
                      async () => {
                        const token = JSON.parse(localStorage.getItem("token"));
                        await DelMemberReport(token, item._id);
                        window.location.reload();
                      }
                    }>
                      Delete
                    </button>
                  </div>
                </div>
              )
            })}

            <Modal
              show={showBan}
              onHide={() => setShowBan(false)}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const token = JSON.parse(localStorage.getItem("token"));
                  const data = {
                    description: descriptionRef.current.value,
                    date: startDate,
                  };
                  await MemberBan(token, data, banID.userID);
                  await DelMemberReport(token, banID.reportID);
                  window.location.reload();
                }}
              >
                <Modal.Header>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Ban Member
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>Ban Member Until</Form.Label>
                    <DatePicker selected={startDate} dateFormat="dd/MM/yyyy" onChange={(date) => setStartDate(date)} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <div><input ref={descriptionRef} type="text" /></div>
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button type="submit">Submit</Button>
                  <Button onClick={() => setShowBan(false)}>Close</Button>
                </Modal.Footer>
              </Form>
            </Modal>
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
                <Button onClick={() => setShow(false)}>Close</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </>
  )
}
export default MemberReportPage
