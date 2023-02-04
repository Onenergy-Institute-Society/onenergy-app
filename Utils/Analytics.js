import {createClient} from "@segment/analytics-react-native";

export const segmentClient = createClient({
    writeKey: 'h7sW33AP9CXJP1viwKqInj3TYnjypb7D',
    trackAppLifecycleEvents: true,
});