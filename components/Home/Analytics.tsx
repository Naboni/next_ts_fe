import React from 'react';
// import classes from '@/styles/Home.module.css';
import { Row, Col } from 'antd';
import { AiOutlineCheck } from 'react-icons/ai'

import { Button } from 'antd';

function Analytical() {
    return (
        <div id="about" className=" aboutBlock analyticReport">
            <div className="container-fluid">
                <div className="titleHolder">
                    <h3>ANALYTICAL REPORTS</h3>
                    {/* <p>dolor sit amet, consectetur adipisicing elit</p> */}
                </div>
                <div className="contentHolder">
                    <p>
                        Get a first-rate analytical report on any Instagram, YouTube, or TikTok account.
                    </p>
                </div>
                <div className="search-container">
                    <form action="" className="search-form">
                        <input type="text" placeholder="Enter Instagram, Youtube, or Tiktok account... " name="search" />
                        <button type="submit">CHECK</button>
                    </form>
                </div>
                <div className="search-container-link">
                    <Row align="middle" justify="center" gutter={[16, 16]}>
                        <Col md={{ span: 8 }}>
                            <Row>
                                <Col md={{ span: 3 }}>
                                    <AiOutlineCheck style={{ color: "#46a16d" }} />
                                </Col>
                                <Col md={{ span: 21 }}>
                                    Over 50+ influencers in the database
                                </Col>
                            </Row>
                        </Col>
                        <Col md={{ span: 8 }}>
                            <Row>
                                <Col md={{ span: 3 }}>
                                    <AiOutlineCheck style={{ color: "#46a16d" }} />
                                </Col>
                                <Col md={{ span: 21 }}>
                                    Multiple metrics for influencer vetting
                                </Col>
                            </Row>
                        </Col>
                        <Col md={{ span: 8 }}>
                            <Row>
                                <Col md={{ span: 3 }}>
                                    <AiOutlineCheck style={{ color: "#46a16d" }} />
                                </Col>
                                <Col md={{ span: 21 }}>
                                    Best-in-Class AI Fraud Detection
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default Analytical;