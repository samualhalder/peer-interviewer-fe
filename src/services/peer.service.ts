class PeerServiceClass {
  public peer?: RTCPeerConnection;
  constructor() {
    if (!this.peer) {
      this.peer = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:stun.l.google.com:5349",
            ],
          },
        ],
      });
    }
  }
  async getOffer() {
    if (this.peer) {
      const offer = await this.peer.createOffer();
      this.peer.setLocalDescription(new RTCSessionDescription(offer));
      return offer;
    }
  }
  async getAnswear(offer: RTCSessionDescription) {
    if (this.peer) {
      await this.peer.setRemoteDescription(offer);
      const answer = await this.peer.createAnswer(offer);
      await this.peer.setLocalDescription(new RTCSessionDescription(answer));
      return answer;
    }
  }
  async setLocalDescription(answer: RTCSessionDescription) {
    if (this.peer) {
      await this.peer.setRemoteDescription(new RTCSessionDescription(answer));
    }
  }
}

const PeerService = new PeerServiceClass();
export default PeerService;
