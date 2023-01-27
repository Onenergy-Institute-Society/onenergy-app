import React, {useEffect, useState} from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ImageBackground,
    ScrollView,
    ActivityIndicator
} from "react-native";
import {connect, useSelector} from "react-redux";
import {getApi} from "@src/services";
import {NavigationActions, withNavigation} from "react-navigation";
import {mvs, s, windowHeight, windowWidth} from "../Utils/Scale";
import HTML from "react-native-render-html";
import {Modalize} from 'react-native-modalize';
import WaitingGroupPractice from "../Components/WaitingGroupPractice";
import AuthWrapper from "@src/components/AuthWrapper"; //This line is a workaround while we figure out the cause of the error
import withDeeplinkClickHandler from "@src/components/hocs/withDeeplinkClickHandler";
import EventList from "../Components/EventList";
import {BlurView} from "@react-native-community/blur";
import FastImage from "react-native-fast-image";
import {SvgIconBack, SvgIconCross} from "../Utils/svg";
import * as Analytics from "../Utils/Analytics";

const PracticeGroup = props => {
    const {navigation, screenProps} = props;
    const {global, colors} = screenProps;
    const user = useSelector((state) => state.user.userObject);
    const optionData = useSelector((state) => state.settings.settings.onenergy_option);
    const [loading, setLoading] = useState(false);
    const groupReducer = useSelector((state) => state.onenergyReducer.practiceReducer.groups);
    const progressReducer = useSelector((state) => state.onenergyReducer.progressReducer);
    const [groupPracticeDetail, setGroupPracticeDetail] = useState(0);
    const [currentMinutes, setCurrentMinutes] = useState(new Date().getMinutes());
    Analytics.segmentClient.screen('Practices Group').then();

    const JoinGroupPractice = async (gp_id, gp_time) => {
        try {
            const api = getApi(props.config);
            await api.customRequest(
                "wp-json/onenergy/v1/JoinGroupPractice",          // Endpoint suffix or full url. Suffix will be appended to the site url that app uses. Example of a suffix is "wp-json/buddyboss/v1/members". Example of full url would be "https://app-demos.buddyboss.com/learndash/wp-json/buddyboss/v1/members".
                "post",       // get, post, patch, delete etc.
                {"gp_id": gp_id, "gp_time": gp_time},               // JSON, FormData or any other type of payload you want to send in a body of request
                null,             // validation function or null
                {},               // request headers object
                false   // true - if full url is given, false if you use the suffix for the url. False is default.
            ).then();
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        props.navigation.setParams({
            title: optionData.titles.find(el => el.id === 'practices_group').title,
        });
        setCurrentMinutes(new Date().getMinutes());
        let secTimer = setInterval(() => {
            setCurrentMinutes(new Date().getMinutes());
        }, 60000)
        return () => clearInterval(secTimer)
    }, []);
    const handlePress = (groupPractice, gp_time, gp_minute) => {
        let min = new Date().getMinutes();
        let sec = new Date().getSeconds();

        if (min <= gp_minute) {
            min = 29 - gp_minute + min;
        } else if (min > gp_minute) {
            min = min - gp_minute - 30;
        }
        let seek = min * 60 + sec;

        JoinGroupPractice(groupPractice.id, gp_time).then();
        navigation.dispatch(
            NavigationActions.navigate({
                routeName: "PracticePlayer",
                params: {
                    group: groupPractice,
                    seek: seek,
                    gp_time: gp_time,
                }
            })
        )
    }
    const onItemDetailPress = (detail) => {
        setGroupPracticeDetail(detail);
        this.DetailModal.open();
    };
    const htmlStyle = {
        body: {height: 200, backgroundColor: colors.bodyFrontBg},
        img: {width: windowWidth - 80},
        a: {
            fontSize: s(14),
            color: colors.linkColor,
            fontFamily: "Montserrat-Regular",
            fontWeight: "normal",
        },
        li: {
            fontSize: s(14),
            fontFamily: "Montserrat-Regular",
            fontWeight: "normal",
        },
        p: {
            fontFamily: "Montserrat-Regular",
            fontWeight: "normal",
            lineHeight: s(14 * 1.47),
            paddingLeft: 8,
            paddingRight: 8,
            fontSize: 20,
            color: colors.textColor,
            textAlign: 'left',
            marginBottom: mvs(25),
        },
    };
    const renderItem = ({item}) => {

        let detail = item.detail;
        const conditionLessons = item.lessons.every(value => progressReducer.completedLessons && progressReducer.completedLessons.some(lesson => lesson.id === value));
        user && progressReducer.completedLessons && progressReducer.completedLessons.map((lesson) => {
            detail = detail.replace('<span id="' + lesson.id + '"></span>', '<span style="color:green">(Passed)</span>')
        })
        const date = new Date().getDate(); //To get the Current Date
        const month = new Date().getMonth() + 1; //To get the Current Month
        const year = new Date().getFullYear(); //To get the Current Year
        let timeToGo;
        let CurrentStartTime = '';
        let startTime;
        let hour = new Date().getHours();
        let startMinutes;
        let loop = parseInt(item.loop);

        if (loop > currentMinutes) {
            startMinutes = loop;
            timeToGo = loop - currentMinutes;
        } else {
            startMinutes = Math.ceil(currentMinutes / loop) * loop;
            if (startMinutes < 60) {
                timeToGo = startMinutes - currentMinutes;
            } else {
                startTime = new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate(),
                    new Date().getHours() + 1,
                    startMinutes - 60,
                    new Date().getSeconds(),
                );
                hour = startTime.getHours(); //To get the Current Hour
                timeToGo = startMinutes - currentMinutes;
                startMinutes -= 60;
            }
        }
        CurrentStartTime = year + '-' + month + '-' + date + ' ' + hour + ":" + startMinutes;
        let practiceCount = 0;
        let groupStatsIndex = progressReducer.groupStats.findIndex(group => group.group_id === item.id);
        if (groupStatsIndex >= 0) {
            practiceCount = progressReducer.groupStats[groupStatsIndex].group_count;
        }
        return (
            <TouchableOpacity
                onPress={() => onItemDetailPress(detail)}
            >
                <View style={[styles.containerStyle, styles.boxShadow]} key={'gp-' + item.id}>
                    <ImageBackground style={styles.imageView}
                                     source={{uri: item.bg_image.full_url}}>
                        <View style={{
                            flexDirection: "row",
                            height: s(60),
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: windowWidth - s(30)
                        }}>
                            <View>
                                <Text style={styles.title}>{item.name}</Text>
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginHorizontal: s(15)
                                }}>
                                    <View style={{flexDirection: "row", justifyContent: "flex-start",}}>
                                        <FastImage tintColor={colors.primaryColor}
                                                   source={require("@src/assets/img/stopwatch.png")}
                                                   style={{width: 16, height: 16}}/>
                                        <Text style={styles.waitTime}>Start in {timeToGo} mins</Text>
                                    </View>
                                    <WaitingGroupPractice gp_id={item.id}
                                                          gp_time={CurrentStartTime}
                                                          waitingIconColor={colors.primaryColor}
                                                          waitingStyle={styles.waitingStyle}
                                                          waitingIconStyle={styles.waitingIconStyle}
                                                          waitingTextStyle={styles.waitingTextStyle}/>
                                </View>
                            </View>
                            {conditionLessons || user.test_mode ?
                                timeToGo <= 30 || user.test_mode ?
                                    <TouchableOpacity style={styles.btnJoin}
                                                      onPress={() => {
                                                          handlePress(item, CurrentStartTime, startMinutes)
                                                      }}
                                    >
                                        <Text style={styles.txtJoin}>JOIN</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={styles.btnOff}
                                                      onPress={() => {
                                                      }}
                                    >
                                        <Text style={styles.txtOff}>WAIT</Text>
                                    </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.btnOff}
                                                  onPress={() => {
                                                  }}
                                >
                                    <Text style={styles.txtOff}>LOCKED</Text>
                                </TouchableOpacity>
                            }
                        </View>
                        {conditionLessons || user.test_mode ?
                            <Text style={styles.subtitle}>duration: {new Date(item.duration * 1000).toISOString().substring(14, 19)}, repeat
                                every {loop} mins</Text>
                            :
                            <Text style={styles.subtitle}>Finish required lessons to unlock.</Text>
                        }
                        <View style={{width:windowWidth-s(60), flexDirection: "row", justifyContent:"space-between"}}>
                            <Text style={styles.description}>{practiceCount?practiceCount + 'times':null}</Text>
                            <Text style={styles.description}>tap to view detail</Text>
                        </View>
                    </ImageBackground>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={global.container}>
            {groupReducer && groupReducer.length ? (
                <ScrollView nestedScrollEnabled={true} styles={styles.scrollView} showsVerticalScrollIndicator={false}>
                    {(optionData.goalCards && optionData.goalCards.length) ?
                        <View>
                            <EventList location={'practice_group'} {...props}/>
                        </View>
                        : null
                    }
                    <FlatList
                        contentContainerStyle={{paddingBottom: s(20)}}
                        style={styles.trackList}
                        data={groupReducer}
                        renderItem={renderItem}
                        extraData={this.props}
                        showsVerticalScrollIndicator={false}
                        nestedscrollenabled={true}
                        keyExtractor={item => item.id}
                    />
                </ScrollView>
            ) : (
                <ActivityIndicator size="large"/>
            )}
            <Modalize
                ref={(DetailModal) => {
                    this.DetailModal = DetailModal;
                }}
                modalStyle={{backgroundColor: colors.bodyFrontBg}}
                modalHeight={windowHeight * 4 / 5}
                childrenStyle={{backgroundColor: colors.bodyBg}}
                handlePosition="outside"
                HeaderComponent={
                    <View style={{
                        padding: s(15),
                        flexDirection: "row",
                        justifyContent: "space-between",
                        borderTopLeftRadius: 9,
                        borderTopRightRadius: 9,
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        backgroundColor: colors.bodyBg,
                        borderBottomColor: colors.borderColor
                    }}>
                        <Text style={{
                            fontSize: s(24),
                            color: colors.headerColor,
                            fontFamily: "MontserratAlternates-SemiBold",
                            fontWeight: "bold"
                        }}>Group Practice Detail</Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.DetailModal.close();
                            }}
                        >
                            <SvgIconCross/>
                        </TouchableOpacity>
                    </View>
                }
            >
                <View style={{flex: 1, marginHorizontal: 10}}>
                    <HTML html={groupPracticeDetail}
                          contentWidth={windowWidth - 80}
                          imagesMaxWidth={windowWidth}
                          tagsStyles={htmlStyle}
                          ignoredStyles={['height', 'width']}
                          style={{flex: 1}}
                          onLinkPress={async (evt, href) => {
                              this.DetailModal.close();
                              setLoading(true);
                              await props.attemptDeepLink(false)(null, href);
                              setLoading(false);
                          }}
                    />
                </View>
            </Modalize>
            {loading &&
                <BlurView style={styles.loading}
                          blurType="light"
                          blurAmount={5}
                          reducedTransparencyFallbackColor="white"
                >
                    <View>
                        <ActivityIndicator size='large'/>
                    </View>
                </BlurView>
            }
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerStyle: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f6f6f8',
        width: windowWidth - s(30),
        height: s(100),
        marginHorizontal: s(15),
        marginTop: mvs(20),
        marginBottom: mvs(5),
        borderRadius:s(9),
    },
    trackList: {
        paddingTop: s(5),
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    scrollView: {
        width: windowWidth - s(30),
        flexGrow: 1,
    },
    imageView: {
        justifyContent: "space-evenly",
        alignItems: "center",
        width: windowWidth - s(30),
        height: s(100),
        borderRadius:s(9),
        overflow: 'hidden',
        opacity: 0.8,
    },
    title: {
        marginLeft: s(15),
        fontSize: s(18),
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
        fontFamily: 'MontserratAlternates-SemiBold',
    },
    description: {
        alignSelf: "center",
        marginBottom: mvs(5),
        fontSize: s(10),
        fontStyle: "italic",
        color: '#000',
        backgroundColor: 'transparent',
        fontFamily: 'MontserratAlternates-RegularItalic',
    },
    subtitle: {
        fontSize: s(12),
        textAlign: "left",
        color: "black",
        fontWeight: "bold",
        fontFamily: 'MontserratAlternates-SemiBold'
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tapForDetail: {
        fontWeight: "normal",
        fontSize: s(10),
        fontStyle: "italic",
    },
    viewTop: {
        padding: 10,
        width: windowWidth - s(30),
        alignItems: "center",
        justifyContent: "space-around",
    },
    viewTopInfo: {
        width: windowWidth - s(30),
        alignItems: "center",
        justifyContent: "center",
    },
    viewDetail: {
        width: windowWidth - s(30),
        justifyContent: "center",
        alignItems: "center",
    },
    viewBottom: {
        height: s(30),
        width: windowWidth - s(30),
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
    waitTimeLabel: {
        fontSize: s(14),
        fontWeight: "700",
    },
    waitTime: {
        fontSize: s(12),
        color: "black",
        fontWeight: "500",
        marginLeft: 5,
        fontFamily: 'MontserratAlternates-Regular',
    },
    waitingStyle: {
        flexDirection: "row", justifyContent: "flex-start", alignItems: "center"
    },
    waitingTextStyle: {
        fontSize: s(12),
        color: "black",
        fontWeight: "500",
        alignSelf: "center",
        textAlign: "center",
        marginLeft: 5,
        fontFamily: 'MontserratAlternates-Regular',
    },
    waitingIconStyle: {

        width: 16,
        height: 16,
    },
    btnJoin: {
        fontSize: s(20),
        borderRadius:s(9),
        backgroundColor: "#4d2fde",
        paddingVertical: s(5),
        paddingHorizontal: s(15),
        marginRight: s(10),
    },
    txtJoin: {
        color: "white",
        fontSize: s(14),
        fontWeight: "700",
        fontFamily: 'MontserratAlternates-SemiBold',
    },
    btnOff: {
        fontSize: s(20),
        borderRadius:s(9),
        backgroundColor: "#e6e6e8",
        paddingVertical: s(5),
        paddingHorizontal: s(15),
        marginRight: s(10),
    },
    txtOff: {
        color: "#ef713c",
        fontSize: s(14),
        fontWeight: "700",
        fontFamily: 'MontserratAlternates-SemiBold',
    }
});
const mapStateToProps = (state) => ({
    config: state.config,
    accessToken: state.auth.token,
});
PracticeGroup.navigationOptions = ({navigation, screenProps}) => {
    const {colors, global} = screenProps;
    return {
        headerTitle: navigation.getParam('title'),
        headerStyle: {
            backgroundColor: colors.headerBg,
        },
        headerTintColor: colors.headerColor,
        headerTitleStyle: global.appHeaderTitle,
        headerLeft:
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack()
                }}
            >
                <SvgIconBack color={colors.headerIconColor}/>
            </TouchableOpacity>,
    }
}
export default connect(mapStateToProps)(withNavigation(withDeeplinkClickHandler(PracticeGroup)));
