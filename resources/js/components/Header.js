import React from 'react'
import {Navbar} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default () => <>
    <Navbar>
        <div className='container'>
          <Link className='navbar-brand' to='/'>iBuildNew</Link>          
        </div>
    </Navbar>
</>