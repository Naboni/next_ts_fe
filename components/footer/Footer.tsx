import Link from 'next/link'
import { AiOutlineArrowUp } from 'react-icons/ai'
// styles
import styles from './footer.module.css'
// antd
import { BackTop, Row, Col, Button } from 'antd';


function AppFooter() {
  return (
    <div className="container-fluid">
      <div className="footer">
        <Row justify="start" className="footerLink" gutter={[16, 16]}>
          <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} >
            <div className={styles.footerHeader}>

              <div>
                <h3 className={styles.footerTitle}> NEED MORE INFO? </h3>
              </div>
              <Button style={{ backgroundColor: "#ff6436", borderRadius: "5px", border: "1px solid #ff6436", color: "white", fontWeight: 600, padding: "0 40px" }} size="large">REQUEST LIFE DEMO</Button>
            </div>
          </Col>
          <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4 }}>
            <h3 className={styles.footerTitle}> PLATFORM </h3>
            <ul className={styles.footerList}>
              <li>Influencer Analytics</li>
              <li>Influencer Discovery</li>
              <li>Campaign Management</li>
              <li>Market Analysis</li>
            </ul>
          </Col>
          <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4 }}>
            <h3 className={styles.footerTitle}> COMPANY </h3>
            <ul className={styles.footerList}>
              <li>Technology</li>
              <li>Press</li>
              <li>Customers</li>
              <li>Affiliate</li>
              <li>Become a Partner</li>
            </ul>
          </Col>
          <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4 }}>
            <h3 className={styles.footerTitle}> RESOURCES </h3>
            <ul className={styles.footerList}>
              <li>Blog</li>
              <li>FAQ</li>
              <li>Free Tools</li>
              <li>Customer Stories</li>
              <li>HypeAuditor Academy</li>
            </ul>
          </Col>
          <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4 }}>
            <h3 className={styles.footerTitle}> GET STARTED </h3>
            <ul className={styles.footerList}>
              <li>Create account</li>
              <li>Contact us</li>
              <li>Request demo</li>
              <li>Support</li>
              <li>Migrate to HypeAuditor</li>
            </ul>
          </Col>
          <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4 }}>
            <Link href="/terms">
              <a className={styles.linkBottom}> Terms and Agreement </a>
            </Link>
          </Col>
          <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 4 }}>
            <Link href="/privacy">
              <a className={styles.linkBottom}> Privacy Policy </a>
            </Link>
          </Col>
        </Row>

        <BackTop>
          <div className="goTop"><AiOutlineArrowUp /></div>
        </BackTop>
      </div>
    </div>
  );
}

export default AppFooter;