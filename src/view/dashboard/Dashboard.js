import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Product from "./Product";
// import Chart from "./Chart";
import Copyright from '../../component/CopyRight';
import Transaction from './Transaction';
import Revenues from './Revenue';
import Periods from './Period';
import { ChartBaru } from './ChartBaru';


export default function Dashboard() {
  return (
        <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
            <Grid container spacing={3}>
              {/* Recent Product */}
              <Grid item xs={12} md={4} lg={3} >
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 140,
                    // textAlign:"center",
                  }}
                >
                  <Product />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 140,
                  }}
                >
                  <Transaction />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 140,
                  }}
                >
                  <Revenues />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 140,
                  }}
                >
                  <Periods />
                </Paper>
              </Grid>
                {/* Chart */}
                <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 380,
                  }}
                >
                  <ChartBaru />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
  )
}