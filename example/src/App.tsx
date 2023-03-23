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
