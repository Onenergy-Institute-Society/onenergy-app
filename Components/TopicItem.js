import React from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";
import {getAvatar} from "@src/utils";
import AppAvatar from "@src/components/AppAvatar";
import AuthWrapper from "@src/components/AuthWrapper";
import ActionSheetButton from "@src/components/ActionButtons/ActionSheetButton";
import {GUTTER} from "@src/styles/global";
import {ms, mvs, s} from "../Utils/Scale";
import * as Analytics from "../Utils/Analytics";

const TopicItem = (props) => {

    const {topic, styles, actionButtons, formatDateFunc, t} = props;

    const global = styles.global;
    const colors = styles.colors;

    let rootStyle;

    if (topic.actionStates.sticky) rootStyle = [global.itemSticky];

    if (!topic.actionStates.open) rootStyle = [global.itemClosed];

    return <AppTouchableOpacity onPress={()=>{Analytics.segmentClient.screen('Topic',{title:topic.title});topic.toSingle}} style={[rootStyle]}>
        <Animated.View
            style={{
                ...StyleSheet.absoluteFillObject
            }}
        />
        <View
            style={{
                ...global.row,
                flex: 1,
                marginHorizontal: GUTTER
            }}
        >
            <AppAvatar
                size={42}
                name={topic.author.name}
                source={{
                    uri: getAvatar(topic.author.avatar, 96)
                }}
                style={{marginTop: mvs(15), alignSelf: "flex-start"}}
            />
            <View
                style={{
                    ...global.bottomBorder,
                    ...global.row,
                    flex: 1,
                    marginLeft: 10
                }}
            >
                <View
                    style={[
                        {
                            flex: 1,
                            paddingTop: ms(15),
                            paddingBottom: ms(14),
                            paddingLeft: 0,
                            paddingRight: 0
                        }
                    ]}
                >
                    <Text
                        style={{
                            ...global.itemTitle,
                            fontFamily: "MontserratAlternates-SemiBold",
                            fontWeight: "bold",
                            fontSize: s(20),
                            paddingRight: ms(40),
                            marginBottom: mvs(3),
                            color: colors.textColor,
                        }}
                        numberOfLines={2}
                        ellipsizeMode={"tail"}
                    >
                        {topic.title}
                    </Text>
                    <View style={{...global.row, marginBottom: mvs(5)}}>
                        <Text style={global.itemMeta}>{topic.voiceCount}</Text>
                        <View style={global.dotSep}/>
                        <Text style={global.itemMeta}>{topic.replyCount}</Text>
                    </View>
                </View>
                <AuthWrapper actionOnGuestLogin={"hide"}>
                    <ActionSheetButton
                        color={colors.textIconColor}
                        object={topic}
                        colors={colors}
                        actionButtons={actionButtons}
                        headerProps={{
                            onClick: topic.toSingle,
                            title: topic.title,
                            description: t("topics:lastActive", {
                                date: formatDateFunc(topic.lastActive)
                            }),
                            avatarSource: {
                                uri: getAvatar(topic.author.avatar, 96)
                            }
                        }}
                        global={global}
                        t={t}
                    />
                </AuthWrapper>
            </View>
        </View>
    </AppTouchableOpacity>;
}

export default TopicItem;