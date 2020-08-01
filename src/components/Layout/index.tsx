import React from 'react';
import Header from '../Header';
import Grid from '@material-ui/core/Grid';

interface Props {
    // types goes here
}
const Layout: React.FC<Props> = props => {
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item sm={3}>
                    <Header/>
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