import React from "react";
import {Text, View,} from "react-native";
import {useSelector} from "react-redux";

const NotificationTabBarIcon = props => {
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const achievementReducer = useSelector((state) => state.onenergyAppReducer ? state.onenergyAppReducer.achievementReducer : null);
    const guideReducer = useSelector((state) => state.onenergyAppReducer ? state.onenergyAppReducer.practiceReducer.guides : null);
    const postsReducer = useSelector((state) => state.postsReducer ? state.postsReducer : null);
    const vouchers = useSelector((state) => state.settingsReducer.settings ? state.settingsReducer.settings.vouchers : null);
    const {notificationID, top, right, size, fontSize = 8, showNumber = false, data = ''} = props;

    let notificationCount = 0;
    if (user) {
        switch (notificationID) {
            case 'guide_personal':
                if (guideReducer) {
                    guideReducer.map(level => {
                        level.sections?level.sections.map(section=> {
                            notificationCount += section.data ? section.data.filter(item => item.new).length : 0;
                        }):notificationCount=0;
                    })
                }

                break;
            case 'guide_page':
                if (guideReducer) {
                    guideReducer.map(level => {
                        level.sections?level.sections.map(section=> {
                            notificationCount += section.data ? section.data.filter(item => item.new).length : 0;
                        }):notificationCount=0;
                    })
                }
                break;
            case 'blog_read':
                if (postsReducer) {
                    notificationCount = postsReducer.posts?postsReducer.posts.filter((post) => post.categories.includes(105) && post.notify === true).length:0;
                    if (notificationCount === 0) {
                        let categoryIndex = postsReducer.lastView.findIndex(lv => lv.category === 105);
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
            case 'blog_watch':
                if (postsReducer) {
                    notificationCount = postsReducer.posts?postsReducer.posts.filter((post) => post.categories.includes(103) && post.notify === true).length:0;
                    if (notificationCount === 0) {
                        let categoryIndex = postsReducer.lastView.findIndex(lv => lv.category === 103);
                        if (categoryIndex && categoryIndex >= 0) {
                            const dateTime = new Date(postsReducer.lastView[categoryIndex].date);
                            const datePost = new Date(optionData.latest_post_watch);
                            if (datePost > dateTime) {
                                notificationCount = 1;
                            }
                        }
                    }
                }
                break;
            case 'blog':
                if (postsReducer) {
                    notificationCount = postsReducer.posts?postsReducer.posts.filter((post) => post.categories.includes(103) && post.notify === true).length:0;

                    if (!notificationCount) {
                        notificationCount = postsReducer.posts?postsReducer.posts.filter((post) => post.categories.includes(105) && post.notify === true).length:0;
                    }

                    if (notificationCount === 0) {
                        let categoryIndex = postsReducer.lastView?postsReducer.lastView.findIndex(lv => lv.category === 103):0;
                        if (categoryIndex && categoryIndex >= 0) {
                            const dateTime = new Date(postsReducer.lastView[categoryIndex].date);
                            const datePost = new Date(optionData.latest_post_watch);
                            if (datePost > dateTime) {
                                notificationCount = 1;
                            }
                        }
                        if (notificationCount === 0) {
                            categoryIndex = postsReducer.lastView?postsReducer.lastView.findIndex(lv => lv.category === 105):0;
                            if (categoryIndex && categoryIndex >= 0) {
                                const dateTime = new Date(postsReducer.lastView[categoryIndex].date);
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
                if (user && achievementReducer)
                    notificationCount = achievementReducer.daily ? achievementReducer.daily.filter(item => item.complete_date && !item.claim_date).length : 0;
                break;
            case 'quest_weekly':
                if (user && achievementReducer)
                    notificationCount = achievementReducer.weekly ? achievementReducer.weekly.complete_date && !achievementReducer.weekly.claim_date:0;
                break;
            case 'quest_monthly':
                if (user && achievementReducer)
                    notificationCount =achievementReducer.monthly ? achievementReducer.monthly.complete_date && !achievementReducer.monthly.claim_date:0;
                break;
            case 'quest':
                if (user && achievementReducer) {
                    let dailyCount = achievementReducer.daily ? achievementReducer.daily.filter(item => item.complete_date && !item.claim_date).length : 0;
                    let weeklyCount = achievementReducer.weekly ? achievementReducer.weekly.complete_date && !achievementReducer.weekly.claim_date:0;
                    let monthlyCount = achievementReducer.monthly ? achievementReducer.monthly.complete_date && !achievementReducer.monthly.claim_date:0;
                    notificationCount = dailyCount + weeklyCount + monthlyCount;
                }
                break;
            case 'milestone':
                if (user && achievementReducer)
                    notificationCount = achievementReducer.milestones ? achievementReducer.milestones.filter(item => item.complete_date && !item.claim_date).length : 0;
                break;
            case 'milestone_learn':
                if (user && achievementReducer)
                    notificationCount = achievementReducer.milestones ? achievementReducer.milestones.filter(item => item.type === 'learn' && item.complete_date && !item.claim_date).length : 0;
                break;
            case 'milestone_startup':
                if (user && achievementReducer)
                    notificationCount = achievementReducer.milestones ? achievementReducer.milestones.filter(item => item.type === 'startup' && item.complete_date && !item.claim_date).length : 0;
                break;
            case 'milestone_endurance':
                if (user && achievementReducer)
                    notificationCount = achievementReducer.milestones ? achievementReducer.milestones.filter(item => item.type === 'endurance' && item.complete_date && !item.claim_date).length : 0;
                break;
            case 'left_menu':
                if (user && achievementReducer) {
                    let dailyCount = achievementReducer.daily ? achievementReducer.daily.filter(item => item.complete_date && !item.claim_date).length : 0;
                    let weeklyCount = achievementReducer.weekly ? achievementReducer.weekly.complete_date && !achievementReducer.weekly.claim_date:0;
                    let monthlyCount = achievementReducer.monthly ? achievementReducer.monthly.complete_date && !achievementReducer.monthly.claim_date:0;
                    let milestoneCount = achievementReducer.milestones ? achievementReducer.milestones.filter(item => item.complete_date && !item.claim_date).length : 0;
                    notificationCount = dailyCount + weeklyCount + monthlyCount + milestoneCount;
                }
                break;
            case 'practice':
                if (guideReducer) {
                    guideReducer.map(level => {
                        level.sections?level.sections.map(section=> {
                            notificationCount = section.data?section.data.find(item => item.id === data && item.show && item.new):0;
                        }):notificationCount=0;
                    })
                }
                break;
            case 'voucher':
                if (vouchers && vouchers.length) {
                    notificationCount = vouchers && vouchers.length;
                }
                break;
            default:
                notificationCount = 0;
        }
    }
    return (
        notificationCount > 0 ?
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
                {showNumber ?
                    <Text style={{fontSize: fontSize, color: '#FFFFFF',}}>{notificationCount}</Text>
                    : null}
            </View>
            : null
    )
}

export default NotificationTabBarIcon;