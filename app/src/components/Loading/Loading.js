import React, {useState} from 'react';
import { css } from "@emotion/react";

import FadeLoader from "react-spinners/FadeLoader";

function Loading() {
    let [loading, setLoading] = useState(true);
    const [color, setColor] = useState(`rgba(25, 54, 81, 0.6)`)
    const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
    return (
        <div className="loading-block">
            <FadeLoader loading={loading} color={color} css={override} height={15} width={4} radius={2} margin={2}/>
        </div>
    );
}

export default Loading
