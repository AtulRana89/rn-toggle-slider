import React from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Platform,
    Image
} from 'react-native';

class ToggleSwitch extends React.Component {
    constructor(...props) {
        super(...props);
        this.state = {
            isActive: this.props.active || false
        };
        this.borderWidth = this.props.borderWidth || 2;
        this.universalPadding = this.props.universalPadding || 2;
        this.viewPortRadius = this.props.radius + this.universalPadding;
        this.textMargin = 8;
        this.viewPortWidth = this.props.width + (2 * this.props.radius) + (2 * this.universalPadding) + this.textMargin;
        this.initailContentOffset = this.props.active ? 0 : this.props.width + this.textMargin;
    }

    async componentDidMount() {
        if (!this.props.active && Platform.OS === 'android') {
            this.intervalRef = setInterval(() => {
                if (this.scrollRef) {
                    this.scrollRef.scrollToEnd({ animated: false });
                    clearInterval(this.intervalRef);
                }
            }, 10);
        }
    }

    setScrollViewRef = (ref) => this.scrollRef = ref

    updateState = (active) => {
        this.setState({
            isActive: active
        }, () => {
            this.props.onValueChange(active);
        });
    }

    toggleSwitch = () => {
        const { isActive } = this.state;
        if (isActive) {
            this.scrollRef.scrollToEnd();
            this.updateState(false);
        } else {
            this.scrollRef.scrollTo({ x: 0, y: 0, animated: true })
            this.updateState(true);
        }
    }

    onDragEnd = (e) => {
        const { contentOffset } = e.nativeEvent;
        if (contentOffset.x > (this.props.width) / 2) {
            this.scrollRef.scrollToEnd();
            this.updateState(false);
        } else {
            this.scrollRef.scrollTo({ x: 0, y: 0, animated: true })
            this.updateState(true);
        }
    }

    onDragStart = (e) => { }

    render() {
        const { text: { on = 'ON', off = 'OFF', activeTextColor, inactiveTextColor },
            color: { active, inactive, indicator, activeBorder, inactiveBorder },
            textStyle = {},
            disabled = false
        } = this.props;
        const { isActive } = this.state;

        return (
            <TouchableOpacity activeOpacity={1} disabled={disabled}>
                <View
                    style={[
                        styles.viewPort,
                        {
                            width: this.viewPortWidth,
                            height: this.props.radius * 2 + this.universalPadding * 2,
                            opacity: 1,
                            borderRadius: this.viewPortRadius,
                            borderWidth: this.borderWidth,
                            borderColor: isActive ? activeBorder : inactiveBorder,
                            backgroundColor: isActive ? active : inactive,
                        }
                    ]}
                >
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        ref={this.setScrollViewRef}
                        onScrollEndDrag={this.onDragEnd}
                        onScrollBeginDrag={this.onDragStart}
                        scrollEnabled={!disabled}
                        scrollsToTop={false}
                        contentOffset={{ x: this.initailContentOffset, y: 0 }}
                        style={{ width: this.viewPortWidth }}
                    >
                        <View
                            style={[
                                styles.container,
                                {
                                    opacity: 1,
                                    backgroundColor: isActive ? active : inactive,
                                    height: this.props.radius * 2 + this.universalPadding * 2
                                }
                            ]}
                        >
                            <View
                                style={[
                                    styles.activeView,
                                    {
                                        width: this.props.width,
                                    }
                                ]}
                            >
                                <Text
                                    style={[
                                        {
                                            alignSelf: 'center',
                                            textAlign: 'center',
                                            color: isActive ? activeTextColor : inactiveTextColor
                                        },
                                        textStyle
                                    ]}
                                >
                                    {on}
                                </Text>
                            </View>
                            <TouchableWithoutFeedback onPress={this.toggleSwitch} disabled={disabled}>
                                <View
                                    style={[
                                        styles.indicatorWrapper,
                                        {
                                            justifyContent: isActive ? 'flex-end' : 'flex-start',
                                            padding: this.universalPadding
                                        }
                                    ]}>
                                    <View
                                        style={[
                                            styles.indicator,
                                            {
                                                backgroundColor: indicator,
                                                borderColor: isActive ? active : inactive,
                                                width: this.props.radius * 2,
                                                height: this.props.radius * 2,
                                                borderRadius: this.props.radius
                                            }
                                        ]}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                            <View
                                style={[
                                    styles.inactiveView,
                                    {
                                        width: this.props.width,
                                    }
                                ]}
                            >
                                <Text
                                    style={[
                                        {
                                            alignSelf: 'center',
                                            textAlign: 'center',
                                            color: isActive ? activeTextColor : inactiveTextColor
                                        },
                                        textStyle
                                    ]}>
                                    {off}
                                </Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    viewPort: {
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: 'transparent',
        overflow: 'hidden',
        alignItems: 'center'
    },
    container: {
        position: 'relative',
        padding: 0,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    indicatorWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    indicator: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5
    },
    activeView: {
        marginRight: 3,
        marginLeft: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inactiveView: {
        marginLeft: 3,
        marginRight: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default ToggleSwitch;
