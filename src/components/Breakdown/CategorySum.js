import { Box, Typography } from '@mui/material'
import React from 'react'

export default function CategorySum({Category}) {

  return (
    <Box boxShadow={2} >
        <Typography color={'blue'}>{Category._id}: {Category.totalAmount}</Typography>
    </Box>
  )
}
