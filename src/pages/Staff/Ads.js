import AdPreviewBottom from "../../components/AdPreviewBottom"
import AdPreviewHeader from "../../components/AdPreviewHeader"
import { Button } from "react-bootstrap"

const Ads = () => {
  const exadsbox = [
    {
      adid: "6314a63eb9440a65d53afda1",
      adtype: "Header",
    },
    {
      adid: "6314af440a6d53afda1",
      adtype: "Bottom",
    },
    {
      adid: "6314a63eb94fewd65d53afda1",
      adtype: "Bottom",
    },
    {
      adid: "6314a63eb944dsfewa53afda1",
      adtype: "Header",
    },
    {
      adid: "6314a63eb9440a65d53afda1",
      adtype: "Bottom",
    },
    {
      adid: "6313553eb9440a65d53afda1",
      adtype: "Header",
    },
  ]
  const Adsbox = ({ adid, adtype }) => {
    return (
      <div className="adsbox-box">
        <h4 className="adsbox-id">{adid}</h4>
        <h4 className="adsbox-adtype">{adtype}</h4>
        <AdPreviewBottom btnclassname="adsbox-btn" />
      </div>
    )
  }
  return (
    <>
      <div className="ads-top">
        test
        <h1 className="ads-top-title">ADS</h1>
        <Button className="ads-top-btn" href="/staff/add-ads">
          ADD ADS
        </Button>
      </div>
      <div className="ads-list">
        {exadsbox.map((ad, index) => {
          return <Adsbox key={index} adid={ad.adid} adtype={ad.adtype} />
        })}
      </div>
    </>
  )
}
export default Ads
