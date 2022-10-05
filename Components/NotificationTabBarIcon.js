import React from "react";
import {
    View, Text,
} from "react-native";
import {useSelector} from "react-redux";

const NotificationTabBarIcon = props => {
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const postSelector = state => ({postsReducer: state.postsReducer})
    const {postsReducer} = useSelector(postSelector);
    const {notificationID, top, right, size, fontSize=8, showNumber=false, data=''} = props;
    const notification = useSelector((state) => state.notifyReducer.notification);
    let notificationCount;
     switch(notificationID)
    {
        case 'guide_page':
            notificationCount = notification.guide_personal?notification.guide_personal:0 + notification.guide_group?notification.guide_group:0 + notification.guide_member?notification.guide_member:0;
            break;
        case 'blog_read':
            notificationCount = postsReducer.posts.filter((post)=>post.categories.includes(105)&&post.notify===true).length;
            if(notificationCount===0) {
                let categoryIndex = postsReducer.lastView.findIndex(lv => lv.category === 105);
                if (categoryIndex&&categoryIndex>=0) {
                    const dateTime = new Date(postsReducer.lastView[categoryIndex].date);
                    const datePost = new Date(optionData.latest_post_read);
                    if (datePost > dateTime) {
                        notificationCount = 1;
                    }
                }
            }
            break;
        case 'blog_watch':
            notificationCount = postsReducer.posts.filter((post)=>post.categories.includes(103)&&post.notify===true).length;
            if(notificationCount===0) {
                let categoryIndex = postsReducer.lastView.findIndex(lv => lv.category === 103);
                if (categoryIndex&&categoryIndex>=0) {
                    const dateTime = new Date(postsReducer.lastView[categoryIndex].date);
                    const datePost = new Date(optionData.latest_post_watch);
                    if (datePost > dateTime) {
                        notificationCount = 1;
                    }
                }
            }
            break;
        case 'blog':
            notificationCount = postsReducer.posts.filter((post)=>post.categories.includes(103)&&post.notify===true).length;
            if(!notificationCount) {
                notificationCount = postsReducer.posts.filter((post) => post.categories.includes(105) && post.notify === true).length;
            }
            if(notificationCount===0) {
                let categoryIndex = postsReducer.lastView.findIndex(lv => lv.category === 103);
                if (categoryIndex&&categoryIndex>=0) {
                    const dateTime = new Date(postsReducer.lastView[categoryIndex].date);
                    const datePost = new Date(optionData.latest_post_watch);
                    if (datePost > dateTime) {
                        notificationCount = 1;
                    }
                }
                if(notificationCount===0) {
                    categoryIndex = postsReducer.lastView.findIndex(lv => lv.category === 105);
                    if (categoryIndex && categoryIndex >= 0) {
                        const dateTime = new Date(postsReducer.lastView[categoryIndex].date);
                        const datePost = new Date(optionData.latest_post_read);
                        if (datePost > dateTime) {
                            notificationCount = 1;
                        }
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