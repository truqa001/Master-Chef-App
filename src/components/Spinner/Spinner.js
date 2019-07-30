import React from 'react';
import './Spinner.css';

const Spinner = () => (
    <div style={{textAlign: "center", paddingTop: "10%"}}>
        <div className="lds-ripple"><div></div><div></div></div>
    </div>
)

export default Spinner;