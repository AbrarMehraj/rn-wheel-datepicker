# rn-wheel-datepicker

The React Native Wheel Date Picker provides an intuitive and user-friendly way for users to select a date, which can improve the overall user experience of the application.

## Screenshot

![App Screenshot](https://github.com/AbrarMehraj/rn-wheel-datepicker/blob/main/example/assets/screenshot.png?raw=true)

## Installation

```sh
npm install rn-wheel-datepicker
```

## Usage

```js
import WheelDatePicker from 'rn-wheel-datepicker';

// ...

import * as React from 'react';

import { Button, StyleSheet, Text, View } from 'react-native';
import WheelDatePicker from 'rn-wheel-datepicker';

export default function App() {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState({
    display: '',
    date: '',
  });

  const toggleDatePicker = () => {
    setModalVisible(!isModalVisible);
  };

  const onSubmitDate = (date: any) => {
    setSelectedDate(date);
  };

  return (
    <View style={styles.container}>
      <Text>Selected Date :</Text>
      <Text>{selectedDate.date}</Text>
      <Text>{selectedDate.display}</Text>
      <Button title="Show Date picker" onPress={toggleDatePicker} />
      <WheelDatePicker
        show={isModalVisible}
        onClose={toggleDatePicker}
        onSubmitDate={(val: any) => onSubmitDate(val)}
        onBackdropPress={toggleDatePicker}
        caption={'Date of Birth'}
        minDate={new Date('2016-12-31')}
        maxDate={new Date()}
        selectedDate={selectedDate.date}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});

```

## Props

Prop  | type
------------ | -------------
show | boolean 
onBackButtonPress? | func 
onBackdropPress? | func 
useNativeDriver? | boolean 
animationIn? | string 
animationInTiming? | number 
animationOut? | string 
animationOutTiming? | number 
modalContainerStyle? | object
pickercontainerStyle? | object
pickerWrapperStyle? | object
pickerItemStyle? | object
captionStyle? | object
submitStyle? | object
submitTextStyle? | object
caption? | string
submitLabel? | string
pickerProps? | any
onSubmitDate | func
minDate? | Date
maxDate? | Date
selectedDate? | Date 
onClose| func
## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## Documentation
See [github page] (https://github.com/AbrarMehraj/rn-wheel-datepicker)for documentation and more info.



## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
