import { Box, Button, Container, Grid, Typography } from '@material-ui/core'
import React from 'react'
import MyHeader from './MyHeader'
import MyFooter from './MyFooter';

function NoMatchPage() {
  return (
    <div style={{ position: 'relative' }}>
      <MyHeader />
      <Grid container justifyContent='center' style={{ backgroundColor: 'red', padding: 10, paddingBottom: 60 }}>
        <Grid item xs={8}>
          <div style={{ paddingTop: 110, color: 'red', textAlign: 'center' }}>
            404 not found
          </div>

        </Grid>
      </Grid>
      <div style={{ position: 'absolute', bottom: 0, height: 60 }}>
        <MyFooter />
      </div>
    </div>
  )
}

export default NoMatchPage