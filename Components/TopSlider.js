import React, {Component, createRef} from 'react';
import {
    FlatList,
    View,
    StyleSheet,
    LayoutAnimation,
    Platform,
    UIManager,
    Dimensions, Text,
} from 'react-native';
import {connect} from "react-redux";
import Indicator from './Indicator';
import TopSliderItem from './TopSliderItem';
import {scale} from "../Utils/scale";
import moment from 'moment';

class TopSlider extends Component {
    slider = createRef();

    static defaultProps = {
        data: [],
        initialScrollIndex: 0,
        imageKey: 'image',
        local: false,
        width: Math.round(Dimensions.get('window').width-scale(30)),
        height: Math.round((Dimensions.get('window').width-scale(30))/2.5),
        separatorWidth: 0,
        loop: true,
        indicator: true,
        indicatorStyle: {},
        indicatorContainerStyle: {},
        indicatorActiveColor: '#3498db',
        indicatorInActiveColor: '#bdc3c7',
        indicatorActiveWidth: 6,
        animation: true,
        autoscroll: true,
        timer: 3000,
        onPress: {},
        contentContainerStyle: {},
        component: <TopSliderItem />,
        removeClippedSubviews: true,
        refresh: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            index: this.props.initialScrollIndex,
            autoscroll: false,
            data:[],
        };
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentWillMount() {
        const user = this.props.user;
        const progressReducer = this.props.progressReducer;
        const achievementReducer = this.props.achievementReducer;
        const optionData = this.props.optionData;
        let topSlides;
        if(optionData&&optionData.goals)
            topSlides = optionData.goals.filter(item => {
            let show = false;
            let showDate;
            const current_time = new moment.utc();
            switch (item.permission.toString()) {
                case 'all':
                    show = true;
                    break;
                case 'guest':
                    user ? show = false : show = true;
                    break;
                case 'login':
                    user ? show = true : show = false;
                    break;
                case 'user':
                    user && !(user.membership && user.membership.length) ? show = true : show = false;
                    break;
                case 'member':
                    user && (user.membership && user.membership.length) ? show = true : show = false;
                    break;
                default:
                    break;
            }
            if(show && item.location.includes('top')) {
                show = false;
                switch (item.show) {
                    case 'date':
                        let date2 = new moment.utc(item.showDate);
                        if (current_time >= date2) {
                            showDate = item.showDate;
                            show = true
                        }
                        break;
                    case 'course':
                        if (item.showCourseOption === 'enrolled') {
                            let showCourse = progressReducer.enrolledCourses&&progressReducer.enrolledCourses.find(course => course.id === parseInt(item.showCourse));
                            if (showCourse) {
                                showDate = new moment.unix(showCourse['date']).add(item.delay, 'd');
                                if (current_time > showDate) {
                                    show = true;
                                }
                            }
                        } else if (item.showCourseOption === 'completed') {
                            let showCourse = progressReducer.completedCourses&&progressReducer.completedCourses.find(course => course.id === parseInt(item.showCourse));
                            if (showCourse) {
                                showDate = new moment.unix(showCourse['date']).add(item.delay, 'd');
                                if (current_time > showDate) {
                                    show = true;
                                }
                            }
                        }
                        break;
                    case 'lesson':
                        let showLesson = progressReducer.completedLessons&&progressReducer.completedLessons.find(lesson => lesson.id === parseInt(item.showLesson));
                        if (showLesson) {
                            show = true;
                        }
                        break;
                    case 'achievement':
                        let showAchievement = user&&achievementReducer&&achievementReducer.find(achievement => achievement.complete_date && achievement.id === parseInt(item.showAchievement));
                        if (showAchievement) {
                            show = true;
                        }
                        break;
                    default:
                        show = true;
                        break;
                }
                if (show) {
                    switch (item.hide) {
                        case 'date':
                            switch (item.hideDateOption.hideDateType) {
                                case 'fix':
                                    let date2 = new moment.utc(item.hideDateOption.date);
                                    if (current_time >= date2) {
                                        show = false
                                    }
                                    break;
                                case 'days':
                                    let diffDays = current_time.diff(showDate, 'days');
                                    if (diffDays >= parseInt(item.hideDateOption.days)) {
                                        show = false
                                    }
                                    break;
                            }
                            break;
                        case 'course':
                            if (item.hideCourseOption === 'enrolled') {
                                if (progressReducer.enrolledCourses&&progressReducer.enrolledCourses.find(course => course.id === parseInt(item.hideCourse))) {
                                    show = false;
                                }
                            } else if (item.hideCourseOption === 'completed') {
                                if (progressReducer.completedCourses&&progressReducer.completedCourses.find(course => course.id === parseInt(item.hideCourse))) {
                                    show = false;
                                }
                            }
                            break;
                        case 'lesson':
                            if (progressReducer.completedLessons&&progressReducer.completedLessons.find(lesson => lesson.id === parseInt(item.hideLesson))) {
                                show = false;
                            }
                            break;
                        case 'achievement':
                            if (achievementReducer&&achievementReducer.find(achievement => achievement.complete_date && achievement.id === parseInt(item.hideAchievement))) {
                                show = false;
                            }
                            break;
                        default:
                            show = true;
                            break;
                    }
                }
            }else{
                show = false;
            }
                console.log(show, item.image, item)
            return show;
        })
console.log(topSlides)
        if(topSlides&&topSlides.length){
            this.setState({data:topSlides, autoscroll: false} )
            //this.startAutoPlay();
        }
    }

    componentDidMount() {
        if( this.props.onRef){
          this.props.onRef(this)
        }
        if (this.props.autoscroll && this.state.data && this.state.data.length>1) {
            this.startAutoPlay();
        }
    }

    componentWillUnmount() {
        if( this.props.onRef){
          this.props.onRef(undefined)
        }
        if (this.props.autoscroll) {
            this.stopAutoPlay();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isFocused !== this.props.isFocused) {
            this.stopAutoPlay();
        }
    }

    render() {
        const itemWidth = this.props.width;
        const separatorWidth = this.props.separatorWidth;
        const totalItemWidth = itemWidth + separatorWidth;
        return (
            <View style={[styles.slideRow, styles.boxShadow]}>
                <FlatList style={{maxHeight:Math.round((Dimensions.get('window').width-scale(30))/2.5-scale(10))}}
                    ref={this.slider}
                    windowSize={1}
                    initialNumToRender={1}
                    maxToRenderPerBatch={1}
                    horizontal
                    pagingEnabled={true}
                    snapToInterval={totalItemWidth}
                    snapToAlignment={'start'}
                    decelerationRate="fast"
                    autoscroll={this.state.autoscroll}
                    bounces={false}
                    contentContainerStyle={this.props.contentContainerStyle}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) => {
                        if(this.state.data && this.state.data.length>1) {
                            return (
                                React.cloneElement(this.props.component, {
                                    style: {width: this.props.width},
                                    item: item,
                                    imageKey: this.props.imageKey,
                                    onPress: this.props.onPress,
                                    index: this.state.index % this.state.data.length,
                                    active: index === this.state.index,
                                    local: this.props.local,
                                    height: this.props.height,
                                })
                            )
                        }
                    }
                }
                    ItemSeparatorComponent={() => (
                        <View style={{width: this.props.separatorWidth}} />
                    )}
                    keyExtractor={(item, index) => item.toString() + index}
                    onViewableItemsChanged={this.onViewableItemsChanged}
                    viewabilityConfig={this.viewAbilityConfig}
                    getItemLayout={(data, index) => ({
                        length: totalItemWidth,
                        offset: totalItemWidth * index,
                        index,
                    })}
                    data={this.state.data}
                    removeClippedSubviews={false}
                />
                {this.props.indicator && this.state.data && this.state.data.length>1 && (
                    <Indicator
                        itemCount={this.state.data.length}
                        currentIndex={this.state.index % this.state.data.length}
                        indicatorStyle={this.props.indicatorStyle}
                        indicatorContainerStyle={[
                            styles.indicatorContainerStyle,
                            this.props.indicatorContainerStyle,
                        ]}
                        indicatorActiveColor={this.props.indicatorActiveColor}
                        indicatorInActiveColor={this.props.indicatorInActiveColor}
                        indicatorActiveWidth={this.props.indicatorActiveWidth}
                        style={{...styles.indicator, ...this.props.indicatorStyle}}
                    />
                )}
            </View>
        );
    };

    onViewableItemsChanged = ({viewableItems, changed}) => {
        if (viewableItems.length > 0) {
            let currentIndex = viewableItems[0].index;
            if (
                currentIndex % this.state.data.length === this.state.data.length - 1 &&
                this.props.loop
            ) {
/*                this.setState({
                    index: currentIndex,
                    data: [...this.state.data, ...this.state.data],
                });*/
            } else {
                this.setState({index: currentIndex%this.state.data.length});
            }

            if (this.props.currentIndexCallback) {
                this.props.currentIndexCallback(currentIndex);
            }
        }
    };

    viewAbilityConfig = {
        viewAreaCoveragePercentThreshold: 50,
    };

   incrementSliderListIndex = () => {
     let newIndex = this.state.index + 1;
        if (this.props.animation) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }
    this.setState({index: newIndex});
        this.slider.current.scrollToIndex({
      index: newIndex%this.state.data.length,
            animated: true,
        });
    };

  decrementSliderListIndex = () => {
    if( this.state.index>0){
      let newIndex = this.state.index - 1;
      if (this.props.animation) {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      }
      this.setState({index: newIndex});
      this.slider.current.scrollToIndex({
        index: newIndex%this.state.data.length,
        animated: true,
      });
    }
  };

    startAutoPlay = () => {
        this.sliderTimer = setInterval(
        this.incrementSliderListIndex,
            this.props.timer,
        );
    };

    stopAutoPlay = () => {
        if (this.sliderTimer) {
            clearInterval(this.sliderTimer);
            this.sliderTimer = null;
        }
    };
}

const styles = StyleSheet.create({
    indicatorContainerStyle: {
        marginTop: 18,
    },
    slideRow: {
        marginHorizontal: scale(15),
        marginTop: scale(15),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9,
        backgroundColor: "white",
    },
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
});
const mapStateToProps = state => ({
    optionData: state.settings.settings.onenergy_option,
    user: state.user.userObject,
    progressReducer: state.onenergyReducer?state.onenergyReducer.progressReducer:null,
    achievementReducer: state.onenergyReducer?state.onenergyReducer.achievementReducer.achievements:null,

});
export default connect(mapStateToProps)(TopSlider);