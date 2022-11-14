import { Col, Row } from "antd";
export default function SwitchTabs() {

  return(
    <div style={{margin: '2rem', backgroundColor: 'white'}}>
      <Row justify='center' align="middle">
        <Col>
          <Row>
            <Col>Swap</Col>
          </Row>
        </Col>
        <Col>
          <Row>
            <Col>Swap</Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}