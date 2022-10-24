import React from "react";
import {
    View, Text,
} from "react-native";
import {useSelector} from "react-redux";

const NotificationTabBarIcon = props => {
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const postReducer = useSelector((state) => state.postReducer);
    const achievementReducer = useSelector((state) => state.onenergyReducer.achievementReducer.achievements);
    const guideReducer = useSelector((state) => state.onenergyReducer.practiceReducer.guides);
    const {notificationID, top, right, size, fontSize=8, showNumber=false, data=''} = props;

    let notificationCount=0;
    switch(notificationID)
    {
        case 'guide_personal':
            notificationCount = 0;
            guideReducer.map(section => {
                notificationCount += section.data.filter(item => item.new).length
            })
            break;
        case 'guide_page':
            notificationCount = 0;
            guideReducer.map(section => {
                notificationCount += section.data.filter(item => item.new).length
            })
            break;
        case 'blog_read':
            notificationCount = postReducer.posts.filter((post)=>post.categories.includes(105)&&post.notify===true).length;
            if(notificationCount===0) {
                let categoryIndex = postReducer.lastView.findIndex(lv => lv.category === 105);
                if (categoryIndex&&categoryIndex>=0) {
                    const dateTime = new Date(postReducer.lastView[categoryIndex].date);
                    const datePost = new Date(optionData.latest_post_read);
                    if (datePost > dateTime) {
                        notificationCount = 1;
                    }
                }
            }
            break;
        case 'blog_watch':
            notificationCount = postReducer.posts.filter((post)=>post.categories.includes(103)&&post.notify===true).length;
            if(notificationCount===0) {
                let categoryIndex = postReducer.lastView.findIndex(lv => lv.category === 103);
                if (categoryIndex&&categoryIndex>=0) {
                    const dateTime = new Date(postReducer.lastView[categoryIndex].date);
                    const datePost = new Date(optionData.latest_post_watch);
                    if (datePost > dateTime) {
                        notificationCount = 1;
                    }
                }
            }
            break;
        case 'blog':
            notificationCount = postReducer.posts.filter((post)=>post.categories.includes(103)&&post.notify===true).length;

            if(!notificationCount) {
                notificationCount = postReducer.posts.filter((post) => post.categories.includes(105) && post.notify === true).length;
            }

            if(notificationCount===0) {
                let categoryIndex = postReducer.lastView.findIndex(lv => lv.category === 103);
                if (categoryIndex&&categoryIndex>=0) {
                    const dateTime = new Date(postReducer.lastView[categoryIndex].date);
                    const datePost = new Date(optionData.latest_post_watch);
                    if (datePost > dateTime) {
                        notificationCount = 1;
                    }
                }
                if(notificationCount===0) {
                    categoryIndex = postReducer.lastView.findIndex(lv => lv.category === 105);
                    if (categoryIndex && categoryIndex >= 0) {
                        const dateTime = new Date(postReducer.lastView[categoryIndex].date);
                        const datePost = new Date(optionData.latest_post_read);
                        if (datePost > dateTime) {
                            notificationCount = 1;
                        }
                    }
                }
            }
            break;
        case 'quest':
            if(user)
                notificationCount = achievementReducer.dailyNotify?achievementReducer.dailyNotify:0 + achievementReducer.weeklyNotify?achievementReducer.weeklyNotify:0 + achievementReducer.monthlyNotify?achievementReducer.monthlyNotify:0
            break;
        case 'milestone':
            if(user)
                notificationCount = achievementReducer.learnNotify?achievementReducer.learnNotify:0 + achievementReducer.startupNotify?achievementReducer.startupNotify:0 + achievementReducer.enduranceNotify?achievementReducer.enduranceNotify:0;
            break;
        case 'milestone_learn':
            if(user)
                notificationCount = achievementReducer.learnNotify?achievementReducer.learnNotify:0;
            break;
        case 'milestone_startup':
            if(user)
                notificationCount = achievementReducer.startupNotify?achievementReducer.startupNotify:0;
            break;
        case 'milestone_endurance':
            if(user)
                notificationCount = achievementReducer.enduranceNotify?achievementReducer.enduranceNotify:0;
            break;
        case 'left_menu':
            if(user)
                notificationCount = achievementReducer.dailyNotify?achievementReducer.dailyNotify:0 + achievementReducer.weeklyNotify?achievementReducer.weeklyNotify:0 + achievementReducer.monthlyNotify?achievementReducer.monthlyNotify:0 + achievementReducer.learnNotify?achievementReducer.learnNotify:0 + achievementReducer.startupNotify?achievementReducer.startupNotify:0 + achievementReducer.enduranceNotify?achievementReducer.enduranceNotify:0;
            break;
        case 'practice':
            guideReducer.map((section) => {
                notificationCount = section.data.find(item => item.id === data && item.show && item.new);
            });
            break;
        default:
            notificationCount = 0;
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