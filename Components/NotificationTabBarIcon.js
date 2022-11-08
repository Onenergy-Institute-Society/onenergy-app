import React from "react";
import {
    View, Text,
} from "react-native";
import {useSelector} from "react-redux";

const NotificationTabBarIcon = props => {
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const achievementReducer = useSelector((state) => state.onenergyReducer?state.onenergyReducer.achievementReducer:null);
    const guideReducer = useSelector((state) => state.onenergyReducer?state.onenergyReducer.practiceReducer.guides:null);
    const postReducer = useSelector((state) => state.postReducer?state.postReducer:null);
    const {notificationID, top, right, size, fontSize=8, showNumber=false, data=''} = props;

    let notificationCount=0;
    if(user) {
        switch (notificationID) {
            case 'guide_personal':
                if(guideReducer) {
                    guideReducer.map(section => {
                        notificationCount += section.data.filter(item => item.new).length
                    })
                }
                break;
            case 'guide_page':
                if(guideReducer) {
                    guideReducer.map(section => {
                        notificationCount += section.data.filter(item => item.new).length
                    })
                }
                break;
            case 'blog_read':
                if(postReducer) {
                    notificationCount = postReducer.posts.filter((post) => post.categories.includes(105) && post.notify === true).length;
                    if (notificationCount === 0) {
                        let categoryIndex = postReducer.lastView.findIndex(lv => lv.category === 105);
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
            case 'blog_watch':
                if(postReducer) {
                    notificationCount = postReducer.posts.filter((post) => post.categories.includes(103) && post.notify === true).length;
                    if (notificationCount === 0) {
                        let categoryIndex = postReducer.lastView.findIndex(lv => lv.category === 103);
                        if (categoryIndex && categoryIndex >= 0) {
                            const dateTime = new Date(postReducer.lastView[categoryIndex].date);
                            const datePost = new Date(optionData.latest_post_watch);
                            if (datePost > dateTime) {
                                notificationCount = 1;
                            }
                        }
                    }
                }
                break;
            case 'blog':
                if(postReducer) {
                    notificationCount = postReducer.posts.filter((post) => post.categories.includes(103) && post.notify === true).length;

                    if (!notificationCount) {
                        notificationCount = postReducer.posts.filter((post) => post.categories.includes(105) && post.notify === true).length;
                    }

                    if (notificationCount === 0) {
                        let categoryIndex = postReducer.lastView.findIndex(lv => lv.category === 103);
                        if (categoryIndex && categoryIndex >= 0) {
                            const dateTime = new Date(postReducer.lastView[categoryIndex].date);
                            const datePost = new Date(optionData.latest_post_watch);
                            if (datePost > dateTime) {
                                notificationCount = 1;
                            }
                        }
                        if (notificationCount === 0) {
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
                }
                break;
            case 'quest_daily':
                if (user&&achievementReducer)
                    notificationCount = achievementReducer.achievements.filter(item => item.type==='daily'&&item.complete_date!==''&&item.claim_date==='').length;
                break;
            case 'quest_weekly':
                if (user&&achievementReducer)
                    notificationCount = achievementReducer.weekly.complete_date!==''&&achievementReducer.weekly.claim_date==='';
                break;
            case 'quest_monthly':
                if (user&&achievementReducer)
                    notificationCount = achievementReducer.monthly.complete_date!==''&&achievementReducer.monthly.claim_date==='';
                break;
            case 'quest':
                if (user&&achievementReducer){
                    let dailyCount = achievementReducer.achievements.filter(item => item.type==='daily' && item.complete_date!=='' && item.claim_date==='').length;
                    let weeklyCount = achievementReducer.weekly.complete_date!=='' && achievementReducer.weekly.claim_date==='';
                    let monthlyCount = achievementReducer.monthly.complete_date!=='' && achievementReducer.monthly.claim_date==='';
                    notificationCount = dailyCount+weeklyCount+monthlyCount;
                }
                break;
            case 'milestone':
                if (user&&achievementReducer)
                    notificationCount = achievementReducer.achievements.filter(item => item.type!=='daily'&&item.complete_date!==''&&item.claim_date==='').length;
                break;
            case 'milestone_learn':
                if (user&&achievementReducer)
                    notificationCount = achievementReducer.achievements.filter(item => item.type==='learn'&&item.complete_date!==''&&item.claim_date==='').length;
                break;
            case 'milestone_startup':
                if (user&&achievementReducer)
                    notificationCount = achievementReducer.achievements.filter(item => item.type==='startup'&&item.complete_date!==''&&item.claim_date==='').length;
                break;
            case 'milestone_endurance':
                if (user&&achievementReducer)
                    notificationCount = achievementReducer.achievements.filter(item => item.type==='endurance'&&item.complete_date!==''&&item.claim_date==='').length;
                break;
            case 'left_menu':
                if (user&&achievementReducer){
                    let dailyCount = achievementReducer.achievements.filter(item => item.type==='daily' && item.complete_date!=='' && item.claim_date==='').length;
                    let weeklyCount = achievementReducer.weekly.complete_date!=='' && achievementReducer.weekly.claim_date==='';
                    let monthlyCount = achievementReducer.monthly.complete_date!=='' && achievementReducer.monthly.claim_date==='';
                    let milestoneCount = achievementReducer.achievements.filter(item => item.type!=='daily'&&item.complete_date!==''&&item.claim_date==='').length;
                    notificationCount = dailyCount+weeklyCount+monthlyCount+milestoneCount;
                }
                break;
            case 'practice':
                if(guideReducer) {
                    guideReducer.map((section) => {
                        notificationCount = section.data.find(item => item.id === data && item.show && item.new);
                    });
                }
                break;
            default:
                notificationCount = 0;
        }
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