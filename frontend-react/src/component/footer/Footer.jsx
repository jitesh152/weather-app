import React from 'react'

export default function Footer() {
  return (
    <>
    <footer id="footer" className="atf-footer-area">
        <div className="container" >
            <div className="atf-section-padding" >
            <div className="row atf-mailchamp-border clearfix" >
                <div className="col-xl-6 col-md-6 col-12" >
                <div className="atf-mailchamp-headding" >
                    <h2>Update to Weather Information</h2>
                </div>
                </div>
                {/*- END COL */}
                <div className="col-xl-6 col-md-6 col-12 atf-mailchamp-subscribe">
                <form className="form-group" id="mc-form">
                    <input type="email" name="EMAIL" className="form-control" id="email" placeholder="Your Email" required="required" />
                    <button type="submit" id="subscribe-button" className="atf-themes-btn">
                    <span /><span /><span /><span />Subcribe
                    </button>
                    {/* SUBSCRIPTION SUCCESSFUL OR ERROR MESSAGES */}
                    <label className="atf-subscription-label" htmlFor="email" />
                </form>
                </div>
                {/*- END COL */}
            </div>
            {/*- END COL */}
            </div>
        </div>
        {/*- END CONTAINER */}
        <div className="atf-footer-boottom text-center" >
            <div className="row" >
            <div className="col-md-12" >
                <div className="atf-link" >
                <p>
                    Copyright &copy; - All Right Reserved.
                </p>
                </div>
                {/*- END COL */}
            </div>
            {/*- END COL */}
            </div>
            {/*- END ROW */}
        </div>
    </footer>
    </>
  )
}
