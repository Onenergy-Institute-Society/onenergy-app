import React from "react";
import {
    View, Text,
} from "react-native";
import {useSelector} from "react-redux";

const NotificationTabBarIcon = props => {
    const {notificationID, top, right, size, fontSize=8, showNumber=false, data=''} = props;
    const notification = useSelector((state) => state.notifyReducer.notification);
    let notificationCount,notificationCountWatch,notificationCountRead;
    switch(notificationID)
    {
        case 'guide_page':
            notificationCount = notification.guide_personal?notification.guide_personal:0 + notification.guide_group?notification.guide_group:0 + notification.guide_member?notification.guide_member:0;
            break;
        case 'posts_read':
            notificationCount = notification['posts_read']?notification['posts_read'].indexOf(data)+1:0;
            break;
        case 'posts_watch':
            notificationCount = notification['posts_watch']?notification['posts_watch'].indexOf(data)+1:0;
            break;
        case 'blog':
            notificationCountRead = notification['posts_read']?notification['posts_read'].length:0;
            notificationCountWatch = notification['posts_watch']?notification['posts_watch'].length:0;
            if(notificationCountRead===0&&notificationCountWatch===0){
                const optionData = useSelector((state) => state.settings.settings.onenergy_option);
                if(notification.time){
                    const dateTime= new Date(notification.time);
                    const datePostRead = new Date(optionData.latest_post_read);
                    const datePostWatch = new Date(optionData.latest_post_watch);
                    if ((datePostRead > dateTime) || (datePostWatch > dateTime)) {
                        notificationCount = 1;
                    }
                }
            }else{
                notificationCount = notificationCountRead + notificationCountWatch;
            }
            break;
        case 'blog_watch':
            notificationCount = notification['posts_watch']?notification['posts_watch'].length:0;
            if(notificationCount===0){
                const optionData = useSelector((state) => state.settings.settings.onenergy_option);
                if(notification.time){
                    const dateTime= new Date(notification.time);
                    const datePostWatch = new Date(optionData.latest_post_watch);
                    if (datePostWatch > dateTime) {
                        notificationCount = 1;
                    }
                }
            }
            break;
        case 'blog_read':
            notificationCount = notification['posts_read']?notification['posts_read'].length:0;
            if(notificationCount===0){
                const optionData = useSelector((state) => state.settings.settings.onenergy_option);
                if(notification.time){
                    const dateTime= new Date(notification.time);
                    const datePostRead = new Date(optionData.latest_post_read);
                    if (datePostRead > dateTime) {
                        notificationCount = 1;
                    }
                }
            }
            break;
        case 'progress':
            notificationCount = notification.progress?notification.progress:0;
            break;
        case 'quest':
            notificationCount = notification.quest?notification.quest:0;
            break;
        case 'achievement':
            notificationCount = notification.achievement?notification.achievement:0;
            break;
        case 'left_menu':
            notificationCount = notification.progress?notification.progress:0 + notification.quest?notification.quest:0 + notification.achievement?notification.achievement:0;
            break;
        case 'practice':
            notificationCount = notification['practice']?notification['practice'].includes(data):0;
            break;
        default:
            notificationCount = notification[notificationID];
    }

    return (
        notificationCount > 0?
            <View
                style={{
                    color: '#FFFFFF',
                    position: 'absolute',
                    top: top,
                    right: right,
                    minWidth: size,
                    height: size,
                    borderRadius: size,
                    borderWidth: 1,
                    borderColor: "white",
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FF0000',
                    textAlign: "center",
                    zIndex: 999
                }}
            >
                {showNumber?
                    <Text style={{fontSize: fontSize, color: '#FFFFFF',}}>{notificationCount}</Text>
                :null}
            </View>
        :null
    )
}

export default NotificationTabBarIcon;