import React from 'react';
import Header from '../Header';

interface Props {
    // types goes here
}
const Layout: React.FC<Props> = props => {
    return (
        <div>
          <Header/>
          <div className="content">
            {props.children}
          </div>
        </div>
    );
}

export default Layout;