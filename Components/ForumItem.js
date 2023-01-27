import React from "react";
import {StyleSheet, Text, View} from "react-native";
//Load BuddyBoss components and helper functions
import AppTouchableOpacity from "@src/components/AppTouchableOpacity";
import AppAvatar from "@src/components/AppAvatar";
import ActionSheetButton from "@src/components/ActionButtons/ActionSheetButton";
import {getForumAvatarSource, shortContent} from "@src/utils";
import AuthWrapper from "@src/components/AuthWrapper";
import {ms, mvs, s, windowWidth} from "../Utils/Scale";
import * as Analytics from "../Utils/Analytics";

const ForumItem = ({
                       forum,
                       colors,
                       global,
                       actionButtons,
                       t
                   }) => {
    const avatarSource = getForumAvatarSource(forum);
    const verticalSpacing = 18;
    return (
        <View style={[styles.boxShadow, styles.containerStyle, {backgroundColor: colors.bodyBg}]}>
            <AppTouchableOpacity
                style={[global.forumListItem, {flexDirection: "row"}]}
                onPress={()=>{Analytics.segmentClient.screen('Forum',{forum:forum.title});forum.toSingle}}
            >
                <AppAvatar
                    size={s(50)}
                    source={avatarSource}
                    style={{marginVertical: verticalSpacing}}
                />
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        marginLeft: ms(13),
                        ...global.bottomBorder,
                        paddingVertical: verticalSpacing
                    }}
                >
                    <View
                        style={{
                            flex: 1
                        }}
                    >
                        <View>
                            <Text style={[global.itemTitle, {fontSize: s(16), color: colors.textColor, marginBottom: mvs(4), marginTop: mvs(1)}]}>
                                {forum.title}
                            </Text>
                            {forum.shortContent ? (
                                <Text
                                    style={[global.itemDesc, {marginBottom: mvs(8)}]}
                                    numberOfLines={2}
                                    ellipsizeMode={"tail"}
                                >
                                    {shortContent(forum.shortContent)}
                                </Text>
                            ) : null}
                        </View>
                        <View style={[global.itemFooter]}>
                            <Text style={[global.itemMeta, {fontSize: s(12)}]}>{forum.topicCount}</Text>
                        </View>
                    </View>
                    <AuthWrapper actionOnGuestLogin={"hide"}>
                        <ActionSheetButton
                            touchableStyle={{alignSelf: "center", marginLeft: 10}}
                            object={forum}
                            colors={colors}
                            actionButtons={actionButtons}
                            headerProps={{
                                id: forum.id,
                                onClick: forum.toSingle,
                                title: forum.title,
                                description: shortContent(forum.shortContent),
                                avatarSource
                            }}
                            global={global}
                            color={colors.textIconColor}
                            t={t}
                        />
                    </AuthWrapper>
                </View>
            </AppTouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        borderRadius:s(9),
        marginTop: mvs(15),
        marginHorizontal: s(15),
        width: windowWidth - s(30),
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
});
export default ForumItem;