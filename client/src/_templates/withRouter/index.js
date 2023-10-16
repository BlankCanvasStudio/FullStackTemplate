import React from 'react';
import { useNavigate } from 'react-router-dom';

const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    
    return (
      <Component
        navigate={navigate}
        {...props}
        />
    );
  };
  
  return Wrapper;
};

export default withRouter;
