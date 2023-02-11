const ReportUserBox = ({ username, email, reportTime }) => {
    return (
      <div className="reportBox-box">
        <div className="approvebox-checkbox">
            <input type="checkbox"></input>
        </div>
        <h4 className="reportBox-username report-first">{username}</h4>
        <h4 className="reportBox-email">{email}</h4>
        <h4 className="reportBox-reportTime">REPORTED {reportTime} TIME(S)</h4>
        <button className="reportBox-description-btn"><u>DESCIPTION</u></button>
      </div>
    )
  }
  export default ReportUserBox
  