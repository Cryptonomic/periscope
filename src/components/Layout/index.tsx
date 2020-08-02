import React from 'react';
import Sidebar from '../Sidebar';
import Grid from '@material-ui/core/Grid';

interface Props {
    // types goes here
}
const Layout: React.FC<Props> = props => {
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item sm={3}>
                    <Sidebar/>
                </Grid>
                <Grid item sm={9}>
                    <div className="content">
                        {props.children}
                     </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default Layout;