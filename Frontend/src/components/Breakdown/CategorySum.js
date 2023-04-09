import { Box, Typography } from '@mui/material'
import React from 'react'

export default function CategorySum({CategoryData}) {

  return (
    <Box boxShadow={2} >
        <Typography color={'blue'}>{CategoryData.category}: {CategoryData.totalAmount}</Typography>
    </Box>
  )
}
