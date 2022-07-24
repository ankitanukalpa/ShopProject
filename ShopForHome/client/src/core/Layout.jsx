import React from 'react';
import Menu from './Menu';
// import '../styles.css';

 

const Layout = ({
  title = 'Title',
  description = 'Description',
  className,
  children,
}) => (
  <div style={{backgroundColor:'#ffbe7bff'}}>
    <Menu />
    <div className='jumbotron mt-5' style={{ backgroundColor: '#5b84c4', height:'3rem' }}>
      <h2>{title}</h2>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
