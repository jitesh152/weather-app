import React from 'react';
import { Link } from 'react-router-dom';

export default function OtherWorld() {
  return (
    <>
    <section id="" className="atf-weather-world atf-section-padding bg-white">
        <div className="container" >
            <div className="row align-items-center" >
            <div className="col-lg-6 col-12 text-start" >
                <div className="atf-section-title mb-4 wow fadeIn" data-wow-duration="1s" data-wow-delay="0.3s" data-wow-offset={0}
                style={{
                    visibility: "visible",
                    animationDuration: "1s",
                    animationDelay: "0.3s",
                    animationName: "fadeIn"
                }}                
                >
                <h2>Top 06 World Weather &amp; Picture</h2>
                </div>
            </div>
            {/*- END COL */}
            </div>
            {/*- END ROW */}
            <div className="row align-items-center" >
            <div className="col-xl-6 col-12" >
                <div
                className="atf-main-portfolio clearfix d-flex flex-wrap">
                <div className="atf-grid-portfolio" >
                    
                    <div >
                        <div className="image-box" >
                            <img src="assets/img/portfolio/1.jpg" alt="img" />
                        </div>
                    </div>
                    
                </div>
                <div className="atf-grid-portfolio" >
                    
                    <div >
                        <div className="image-box" >
                            <img src="assets/img/portfolio/2.jpg" alt="img" />
                        </div>
                    </div>
                   
                </div>
                </div>
                {/*- END ROW */}
            </div>
            {/*- END COL */}
            <div className="col-xl-6 col-12 mt-xl-40 mt-lg-40" >
                <div className="row align-items-center mt-3" >
                <div className="col-6" >
                    <Link to='/weather/new-delhi' className="atf-themes-btn atf-world-content">
                        <span /><span /><span /><span /> India
                        <i className="fas fa-arrow-right" />
                    </Link>
                </div>
                {/*- END COL */}
                <div className="col-6" >
                    <Link to='/weather/brasilia' className="atf-themes-btn atf-world-content">
                    <span /><span /><span /><span /> Brazil
                    <i className="fas fa-arrow-right" />
                    </Link>
                </div>
                {/*- END COL */}
                <div className="col-6" >
                    <Link to='/weather/ottawa' className="atf-themes-btn atf-world-content">
                    <span /><span /><span /><span /> Canada
                    <i className="fas fa-arrow-right" />
                    </Link>
                </div>
                {/*- END COL */}
                <div className="col-6" >
                    <Link to='/weather/paris' className="atf-themes-btn atf-world-content">
                    <span /><span /><span /><span /> France
                    <i className="fas fa-arrow-right" />
                    </Link>
                </div>
                {/*- END COL */}
                <div className="col-6" >
                    <Link to='/weather/new-york' className="atf-themes-btn atf-world-content">
                    <span /><span /><span /><span /> USA
                    <i className="fas fa-arrow-right" />
                    </Link>
                </div>
                {/*- END COL */}
                <div className="col-6" >
                    <Link to='/weather/tokyo' className="atf-themes-btn atf-world-content">
                    <span /><span /><span /><span /> Japan
                    <i className="fas fa-arrow-right" />
                    </Link>
                </div>
                {/*- END COL */}
                </div>
            </div>
            </div>
            {/*- END ROW */}
        </div>
        </section>
    </>
  )
}