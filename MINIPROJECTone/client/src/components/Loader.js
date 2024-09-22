import React, { useState } from "react";
import { css } from "@emotion/react"; // Correct import from @emotion/react
import SyncLoader from "react-spinners/SyncLoader";

function Loader() {
    const [loading, setLoading] = useState(true);
    
    return (
      <div style={{marginTop:'130px'}}>
        <div className="sweet-loading text-center">
            <SyncLoader
                
                color='#000'
                loading={loading}
                css='' // Using the override for styling
                size={10}
            />
        </div>
        </div>
    );
}

export default Loader;
