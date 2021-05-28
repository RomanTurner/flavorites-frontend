import React from 'react'

const FollowContainer = ({title, children}) => {
    return (
      <>
        <h1>{title}</h1>
          {children}
      </>
    );
}

export default FollowContainer;
