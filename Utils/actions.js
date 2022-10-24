import TrackPlayer from 'react-native-track-player'

export const execDispatch = (type, payload) => {
    return {
        type: type,
        payload: payload
    }
}

export default async function(action, ...args) {
    try {
        return await action(...args)
    } catch (e) {
        if (e.message === 'The playback is not initialized') {
            // reinitialize player and retry
            try {
                await TrackPlayer.setupPlayer()
                return await action(...args)
            } catch (e) {
                console.error(e)
                return null
            }
        }
        console.error(e)
        return null
    }
}