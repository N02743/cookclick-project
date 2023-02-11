import { MenuReportedList, DelMenuReport, DelMenu } from "../../script/controller";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

const MenuReportPage = () => {
  const [menuReport, setMenuReport] = useState({
    menu: [],
  });
  const [show, setShow] = useState(false);
  const [modalItem, setModalItem] = useState({
    reportdescription: [],
  });

  useEffect(() => {
    const fetchdata = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      const menuReportData = await MenuReportedList(token);
      console.log(menuReportData);
      setMenuReport((prev) =>
        ({ ...prev, menu: menuReportData.data.menu })
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
            <a href="/staff/report/comments" className="flex rp-nav justify-content-center align-items-center">
              <div>Reported Comments</div>
            </a>
            <a href="/staff/report/menus" className="flex rp-nav rp-nav-active justify-content-center align-items-center">
              <div>Reported Menus</div>
            </a>
          </div>
          <h4 className="m-2">Reported Menus</h4>
          <div className="flex flex-col align-items-center">
            {menuReport.menu.map((item, index) => {
              return (
                <div className="db-menu" key={index}>
                  <div className="mb-1">
                    Menu: {item.menuInfo[0].name}
                  </div>
                  <div className="text-sm text-muted mb-3">
                    By: {item.userDisplayName}
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
                        const res = await DelMenu(token, item.menuID);
                        console.log(res);
                        await DelMenuReport(token, item._id);
                        window.location.reload();
                      }
                    }>Delete Menu</button>
                    <button className="btn-lightblue" onClick={
                      async () => {
                        const token = JSON.parse(localStorage.getItem("token"));
                        const delReport = await DelMenuReport(token, item._id);
                        console.log(delReport);
                        window.location.reload();
                      }
                    }>Delete</button>
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
                {modalItem.reportdescription.map((it, index) => {
                  return (
                    <div key={index}>
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
export default MenuReportPage
