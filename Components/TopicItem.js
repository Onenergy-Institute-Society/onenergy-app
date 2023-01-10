import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";
import {getAvatar} from "@src/utils";
import AppAvatar from "@src/components/AppAvatar";
import AuthWrapper from "@src/components/AuthWrapper";
import ActionSheetButton from "@src/components/ActionButtons/ActionSheetButton";
import {GUTTER} from "@src/styles/global";

const TopicItem = (props) => {

    const {topic, styles, actionButtons, formatDateFunc, t} = props;

    const global = styles.global;
    const colors = styles.colors;

    let rootStyle;

    if (topic.actionStates.sticky) rootStyle = [global.itemSticky];

    if (!topic.actionStates.open) rootStyle = [global.itemClosed];


    const Item = <AppTouchableOpacity onPress={topic.toSingle} style={[rootStyle]}>
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
                style={{ marginTop: 15, alignSelf: "flex-start" }}
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
                            paddingTop: 15,
                            paddingBottom: 14,
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
                            fontSize: 20,
                            paddingRight: 40,
                            marginBottom: 3
                        }}
                        numberOfLines={2}
                        ellipsizeMode={"tail"}
                    >
                        {topic.title}
                    </Text>
                    <View style={{ ...global.row, marginBottom: 5 }}>
                        <Text style={global.itemMeta}>{topic.voiceCount}</Text>
                        <View style={global.dotSep} />
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
    </AppTouchableOpacity>

    return Item;
}

export default TopicItem;