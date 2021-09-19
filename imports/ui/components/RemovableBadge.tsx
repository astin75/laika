import { Badge } from '@mantine/core'
import React from 'react'

const RemovableBadge = ({ onClick, children, ...props }) => {
  return (
    <Badge {...props} onClick={onClick} style={{ cursor: 'pointer' }}>
      {children}
      <span style={{ margin: '0 4px' }}>
        <i className="fas fa-times" />
      </span>
    </Badge>
  )
}

export default RemovableBadge
