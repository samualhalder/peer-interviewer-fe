import { createContext, useMemo } from "react";

const PeerContext = createContext(null);

const PeerProvider=()=>{
    const peer=useMemo(()=>new RTCPeerConnection({
        iceServers:[
            
        ]
    }),[])
    return <PeerContext.Provider value={}></PeerContext.Provider>
}
