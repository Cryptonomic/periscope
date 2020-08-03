import React from 'react';
import Sidebar from '../Sidebar';
import Grid from '@material-ui/core/Grid';
import { styles } from './styles';
import { withStyles } from '@material-ui/core/styles';

interface Props {
    classes:any
}
const Layout: React.FC<Props> = props => {
    return (
        <div className={props.classes.overflowHidden}>
            <Grid container spacing={3}>
                <Grid className={props.classes.maxWidth300} item sm={3}>
                    <Sidebar/>
                </Grid>
                <Grid className={props.classes.maxWidth100} item sm={9}>
                    <div className="content">
                        {props.children}
                     </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default withStyles(styles)(Layout);