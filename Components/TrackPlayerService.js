import TrackPlayer, {Event, useTrackPlayerEvents} from 'react-native-track-player';

module.exports = async function () {
    // This service needs to be registered for the module to work,
    // but it will be used later in the "Receiving Events" section
    useTrackPlayerEvents([Event.RemotePlay], () => TrackPlayer.play());
    useTrackPlayerEvents([Event.RemotePause], () => TrackPlayer.pause());
    useTrackPlayerEvents([Event.RemoteStop], () => TrackPlayer.reset());
    useTrackPlayerEvents([Event.RemoteDuck], () => TrackPlayer.pause());
};