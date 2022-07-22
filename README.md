# react-native-toggle-slider
A toggle switch and slider with a label inside, on top of that it animates smoothly.
*Click and drag* or just *click* it toggles and slider either way.


# Motivation
Slider and toggle switches are quite common in almost every application, and we have so many UX variations of it.
Based on different variations.

You can also use this slider-toggle vertically.

Our UX demanded a Toggle and slider with a label, which has both click and slide behavior.
None of the existing libraries offered this complete solution. 
Some had the toggle behavior but the sliding behavior was missing, some had the swipe behavior but did not offer to have a label in it.
This library has been created to fill that gap.

# Working demo  
<img src="https://raw.githubusercontent.com/AtulRana89/rn-toggle-slider/master/assets/demo.webm" width="300" height="610"/>

# Install
```bash
npm install --save rn-toggle-slider
```

# Usages
```bash
import ToggleSlider from 'rn-toggle-slider'

class Demo extends ... {
  ...
  render() {
    return (
      ...
      <ToggleSlider
        text={{ on: "ON", off: "OFF", activeTextColor: "white", inactiveTextColor: "#B7B8BA" }}
        textStyle={{ fontWeight: "bold" }}
        color={{ indicator: "white", active: "#51747C", inactive: "#D5E0E3", activeBorder: "#466972", inactiveBorder: "#95A8AE" }}
        active={true}
        disabled={false}
        vertical={false}
        width={80}
        radius={25}
        borderWidth={4}
        universalPadding={4}
        onValueChange={(val) => {
           /* handler function... */
        }}
     />
      ...
    );
  }
}
```

# Properties

| Attribute | Description |
| --- | --- |
| text.on | Text to be displayed when Switch is in Active state |
| text.off | Text to be displayed when Switch in in inactive state |
| text.activeTextColor | Active text color |
| text.inactiveTextColor | Inactive text color |
| textStyle | Any valid text style supported by RN |
| color.indicator | The color of the Slider / Indicator |
| color.active | Background color of the Switch when it is in active state |
| color.inactive | Background color of the Switch when it is in inactive state |
| color.activeBorder | The border color when Switch is in active state |
| color.inactiveBorder | The border color when Switch is in inactive state |
| active | Initial state of the Switch |
| disabled | true if the control is disabled |
| vertical | true if the control is vertically show |
| width | Width of the control |
| radius | Radius of the Slider / Indicator |
| borderWidth | borderWidth of the control |
| borderWidth | borderWidth of the control |
| onValueChange | The function to be called when Switch changes its states |

