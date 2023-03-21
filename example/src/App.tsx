import * as React from 'react';

import { Button, StyleSheet, Text, View } from 'react-native';
import WheelDatePicker from 'rn-wheel-datepicker';

export default function App() {
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState({
    display: '',
    date: '',
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onSubmitDate = (date: any) => {
    setSelectedDate(date);
    console.log(date);
  };
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      <Button title="Show/Hide Date picker" onPress={toggleModal} />
      {isModalVisible && (
        <WheelDatePicker
          show={isModalVisible}
          onClose={toggleModal}
          onSubmitDate={(val: any) => onSubmitDate(val)}
          onBackdropPress={toggleModal}
          caption={'Date of Birth'}
          minDate={new Date('2016-12-31')}
          maxDate={new Date()}
          selectedDate={selectedDate.date}
        />
      )}
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
