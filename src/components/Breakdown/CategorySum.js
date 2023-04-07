import React from 'react'

export default function CategorySum({Category}) {

  return (
    <div className='category-sum'>
        {Category._id}: {Category.totalAmount}
    </div>
  )
}
