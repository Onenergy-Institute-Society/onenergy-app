import TrackPlayer, { Event, State } from 'react-native-track-player';

let wasPausedByDuck = false;

export async function PlaybackService() {
    TrackPlayer.addEventListener(Event.RemotePause, () => {
        TrackPlayer.pause();
    });

    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        TrackPlayer.play();
    });

    TrackPlayer.addEventListener(Event.RemoteNext, () => {
        TrackPlayer.skipToNext();
    });

    TrackPlayer.addEventListener(Event.RemotePrevious, () => {
        TrackPlayer.skipToPrevious();
    });

    TrackPlayer.addEventListener(Event.RemoteJumpForward, async (event) => {
        const position = (await TrackPlayer.getPosition()) + event.interval;
        await TrackPlayer.seekTo(position);
    });

    TrackPlayer.addEventListener(Event.RemoteJumpBackward, async (event) => {
        const position = (await TrackPlayer.getPosition()) - event.interval;
        await TrackPlayer.seekTo(position);
    });

    TrackPlayer.addEventListener(Event.RemoteSeek, (event) => {
        TrackPlayer.seekTo(event.position);
    });

    TrackPlayer.addEventListener(
        Event.RemoteDuck,
        async ({ permanent, paused }) => {
            if (permanent) {
                await TrackPlayer.pause();
                return;
            }
            if (paused) {
                const playerState = await TrackPlayer.getState();
                wasPausedByDuck = playerState !== State.Paused;
                await TrackPlayer.pause();
            } else {
                if (wasPausedByDuck) {
                    await TrackPlayer.play();
                    wasPausedByDuck = false;
                }
            }
        }
    );
}