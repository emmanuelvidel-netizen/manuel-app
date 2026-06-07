import { RTCPeerConnection, RTCSessionDescription, mediaDevices } from '@react-native-webrtc/react-native-webrtc';

interface WebRTCConfig {
  iceServers: Array<{ urls: string[] }>;
}

class WebRTCService {
  private peerConnection: RTCPeerConnection | null = null;
  private localStream: any = null;
  private config: WebRTCConfig = {
    iceServers: [
      {
        urls: [
          'stun:stun.l.google.com:19302',
          'stun:stun1.l.google.com:19302',
        ],
      },
    ],
  };

  async initializePeerConnection(): Promise<RTCPeerConnection> {
    if (this.peerConnection) {
      return this.peerConnection;
    }

    this.peerConnection = new RTCPeerConnection(this.config);

    this.peerConnection.onaddstream = (event) => {
      console.log('Remote stream added:', event.stream);
    };

    this.peerConnection.onremovestream = () => {
      console.log('Remote stream removed');
    };

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('ICE candidate:', event.candidate);
      }
    };

    return this.peerConnection;
  }

  async getLocalStream(): Promise<any> {
    if (this.localStream) {
      return this.localStream;
    }

    try {
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: {
            min: 480,
            ideal: 720,
            max: 1280,
          },
          height: {
            min: 640,
            ideal: 1280,
            max: 1920,
          },
          frameRate: 30,
        },
      });

      this.localStream = stream;

      if (this.peerConnection) {
        stream.getTracks().forEach((track) => {
          this.peerConnection?.addTrack(track, stream);
        });
      }

      return stream;
    } catch (error) {
      console.error('Error getting local stream:', error);
      throw error;
    }
  }

  async createOffer(): Promise<RTCSessionDescription> {
    if (!this.peerConnection) {
      throw new Error('Peer connection not initialized');
    }

    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    return offer;
  }

  async createAnswer(): Promise<RTCSessionDescription> {
    if (!this.peerConnection) {
      throw new Error('Peer connection not initialized');
    }

    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);
    return answer;
  }

  async setRemoteDescription(description: RTCSessionDescription): Promise<void> {
    if (!this.peerConnection) {
      throw new Error('Peer connection not initialized');
    }

    await this.peerConnection.setRemoteDescription(description);
  }

  async addIceCandidate(candidate: any): Promise<void> {
    if (!this.peerConnection) {
      throw new Error('Peer connection not initialized');
    }

    try {
      await this.peerConnection.addIceCandidate(candidate);
    } catch (error) {
      console.error('Error adding ICE candidate:', error);
    }
  }

  stopLocalStream(): void {
    if (this.localStream) {
      this.localStream.getTracks().forEach((track: any) => {
        track.stop();
      });
      this.localStream = null;
    }
  }

  closePeerConnection(): void {
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }
  }

  getLocalStream_(): any {
    return this.localStream;
  }
}

export default new WebRTCService();
