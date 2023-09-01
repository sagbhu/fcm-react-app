import { PuffLoader } from "react-spinners"
import React from "react";

export default function LoadingSpinner() {
    return (
        <div className="loading-spinner">
            <div className="loader-center">
                {/* <BounceLoader
                    loading={true}
                    color="#4fa94d"
                /> */}
                <PuffLoader
                    color="#a1000f"
                    cssOverride={{}}
                    size={70}
                    loading
                    speedMultiplier={1}
                />
            </div>
        </div>
    );
}