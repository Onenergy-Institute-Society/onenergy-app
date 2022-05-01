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
import Indicator from './Indicator';
import FeatureSliderItem from './FeatureSliderItem';
import { withNavigation } from 'react-navigation';
import {windowWidth} from "../Utils/Dimensions";

class FeatureSlider extends Component {
    slider = createRef();

    static defaultProps = {
        data: [],
        initialScrollIndex: 0,
        imageKey: 'image',
        local: false,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
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
        component: <FeatureSliderItem />,
        removeClippedSubviews: true,
    };

    constructor(props) {
        super(props);
        this.state = {
            index: this.props.initialScrollIndex,
            data: this.props.data,
        };
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    componentDidMount() {
        if( this.props.onRef){
          this.props.onRef(this)
        }
        if (this.props.autoscroll) {
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

    scrollToNext = () => {
        try{
            if(this.state.index === this.state.data.length-1){
                this.props.navigation.navigate("Auth");
            }else {
                let nextIndex = this.state.index + 1;
                this.slider.current.scrollToIndex({animated: true, index: nextIndex});
            }
        }catch (err)
        {
            console.log(`${err}`)
        }
    }

    render() {
        try{

        const itemWidth = this.props.width;
        const separatorWidth = this.props.separatorWidth;
        const totalItemWidth = itemWidth + separatorWidth;

        return (
            <View>
                <FlatList style={{maxHeight:'100%'}}
                    ref={this.slider}
                    windowSize={1}
                    initialNumToRender={1}
                    maxToRenderPerBatch={1}
                    removeClippedSubviews={this.props.removeClippedSubviews}
                    horizontal
                    pagingEnabled={true}
                    disableIntervalMomentum={true}
                    itemVisiblePercentThreshold={50}
                    snapToInterval={totalItemWidth}
                    snapToAlignment={'start'}
                    decelerationRate="fast"
                    autoscroll={true}
                    bounces={false}
                    contentContainerStyle={this.props.contentContainerStyle}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item, index}) =>
                        React.cloneElement(this.props.component, {
                            navigation: this.props.navigation,
                            style: {width: this.props.width},
                            item: item,
                            imageKey: this.props.imageKey,
                            onPress: ()=>this.scrollToNext(this.state),
                            index: this.state.index % this.props.data.length,
                            active: index === this.state.index,
                            local: this.props.local,
                            height: this.props.height,
                        })
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
                    data={this.props.data}
                />
                {this.props.indicator && (
                    <Indicator
                        itemCount={this.props.data.length}
                        currentIndex={this.state.index % this.props.data.length}
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
        }catch (e){
            console.log(e);
        }
    };

    onViewableItemsChanged = ({viewableItems, changed}) => {
        if (viewableItems.length > 0) {
            let currentIndex = viewableItems[0].index;
            if (
                currentIndex % this.props.data.length === this.props.data.length - 1 &&
                this.props.loop
            ) {
                this.setState({
                    index: currentIndex,
                    data: [...this.state.data, ...this.props.data],
                });
            } else {
                this.setState({index: currentIndex%this.props.data.length});
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
      index: newIndex%this.props.data.length,
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
        index: newIndex%this.props.data.length,
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
});

export default withNavigation(FeatureSlider);