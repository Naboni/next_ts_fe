import React from 'react';
import Image from 'next/image'
import image5 from '../../public/images/Index_05.png';

function Hero() {
    return (
        <div id="hero" className="heroBlock">
            <div key="1" className="container-fluid">
                <div className="content">
                    <h3>Analytical platform & influencer marketing giving you better reach.</h3>
                    <p>Creating exposure for brands & agencies everywhere and anywhere <u> to make you visible</u>.</p>
                    <div className="btnHolder">
                        <div className="btnContainer"><button className="heroButton1" >GET STARTED</button></div>
                        <div className="btnContainer"><button className="heroButton2" > CHECK INFLUENCER</button></div>
                    </div>
                    <div className="socialMedias">
                        <Image
                            alt="social-medias"
                            src={image5}
                            width={100}
                            height={45}
                            layout="responsive"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;