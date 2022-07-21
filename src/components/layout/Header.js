import React, { Fragment } from 'react'
import { Route, Link } from 'react-router-dom'

import '../../App.css'

const Header = () => {
 
    return (
        <Fragment>
            <nav className="navbar row">
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to="/">
                        <span>Home</span>
                        </Link>
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}

export default Header
