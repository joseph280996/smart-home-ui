import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootStore } from '../reducers'

export default function Header(): ReactElement {
  const auth = useSelector((state: RootStore) => {
    return state.auth
  })
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Smart Home
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          {auth && auth.isSignedIn && (
            <li className="nav-item dropdown">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Profile
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link to="/auth/signout" className="ml-1">
                  Sign Out
                </Link>
              </div>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}
