import React from 'react';
import { Link } from 'react-router-dom';
import './E404Page.scss';
export default function E404Page() {
  return (
    <div className='e404Box'>
      <h1 className='e404Box__title'> Error 404</h1>
      <h2 className='e404Box__text'> Page not found</h2>
      <Link
      className='e404Box__link'
      to={"/"}
      > Go to home page
      </Link>
    
    </div>
  )
}
