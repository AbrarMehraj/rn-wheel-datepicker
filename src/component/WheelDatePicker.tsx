import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Modal from 'react-native-modal';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth();

type Props = {
  // Modal Properties start
  show: boolean;
  onBackButtonPress?: () => void;
  onBackdropPress?: () => void;
  useNativeDriver?: boolean;
  animationIn?:
    | 'bounce'
    | 'flash'
    | 'jello'
    | 'pulse'
    | 'rotate'
    | 'rubberBand'
    | 'shake'
    | 'swing'
    | 'tada'
    | 'wobble'
    | 'bounceIn'
    | 'bounceInDown'
    | 'bounceInUp'
    | 'bounceInLeft'
    | 'bounceInRight'
    | 'bounceOut'
    | 'bounceOutDown'
    | 'bounceOutUp'
    | 'bounceOutLeft'
    | 'bounceOutRight'
    | 'fadeIn'
    | 'fadeInDown'
    | 'fadeInDownBig'
    | 'fadeInUp'
    | 'fadeInUpBig'
    | 'fadeInLeft'
    | 'fadeInLeftBig'
    | 'fadeInRight'
    | 'fadeInRightBig'
    | 'fadeOut'
    | 'fadeOutDown'
    | 'fadeOutDownBig'
    | 'fadeOutUp'
    | 'fadeOutUpBig'
    | 'fadeOutLeft'
    | 'fadeOutLeftBig'
    | 'fadeOutRight'
    | 'fadeOutRightBig'
    | 'flipInX'
    | 'flipInY'
    | 'flipOutX'
    | 'flipOutY'
    | 'lightSpeedIn'
    | 'lightSpeedOut'
    | 'slideInDown'
    | 'slideInUp'
    | 'slideInLeft'
    | 'slideInRight'
    | 'slideOutDown'
    | 'slideOutUp'
    | 'slideOutLeft'
    | 'slideOutRight'
    | 'zoomIn'
    | 'zoomInDown'
    | 'zoomInUp'
    | 'zoomInLeft'
    | 'zoomInRight'
    | 'zoomOut'
    | 'zoomOutDown'
    | 'zoomOutUp'
    | 'zoomOutLeft'
    | 'zoomOutRight';
  animationInTiming?: number;
  animationOut?:
    | 'bounce'
    | 'flash'
    | 'jello'
    | 'pulse'
    | 'rotate'
    | 'rubberBand'
    | 'shake'
    | 'swing'
    | 'tada'
    | 'wobble'
    | 'bounceIn'
    | 'bounceInDown'
    | 'bounceInUp'
    | 'bounceInLeft'
    | 'bounceInRight'
    | 'bounceOut'
    | 'bounceOutDown'
    | 'bounceOutUp'
    | 'bounceOutLeft'
    | 'bounceOutRight'
    | 'fadeIn'
    | 'fadeInDown'
    | 'fadeInDownBig'
    | 'fadeInUp'
    | 'fadeInUpBig'
    | 'fadeInLeft'
    | 'fadeInLeftBig'
    | 'fadeInRight'
    | 'fadeInRightBig'
    | 'fadeOut'
    | 'fadeOutDown'
    | 'fadeOutDownBig'
    | 'fadeOutUp'
    | 'fadeOutUpBig'
    | 'fadeOutLeft'
    | 'fadeOutLeftBig'
    | 'fadeOutRight'
    | 'fadeOutRightBig'
    | 'flipInX'
    | 'flipInY'
    | 'flipOutX'
    | 'flipOutY'
    | 'lightSpeedIn'
    | 'lightSpeedOut'
    | 'slideInDown'
    | 'slideInUp'
    | 'slideInLeft'
    | 'slideInRight'
    | 'slideOutDown'
    | 'slideOutUp'
    | 'slideOutLeft'
    | 'slideOutRight'
    | 'zoomIn'
    | 'zoomInDown'
    | 'zoomInUp'
    | 'zoomInLeft'
    | 'zoomInRight'
    | 'zoomOut'
    | 'zoomOutDown'
    | 'zoomOutUp'
    | 'zoomOutLeft'
    | 'zoomOutRight';
  animationOutTiming?: number;

  //   style properties start
  modalContainerStyle?: Object;
  pickercontainerStyle?: Object;
  modalContentStyle?: Object;
  pickerWrapperStyle?: Object;
  pickerItemStyle?: Object;
  captionStyle?: Object;
  submitStyle?: Object;
  submitTextStyle?: Object;

  //   style properties start
  caption?: string;
  submitLabel?: string;
  pickerProps?: any;
  onSubmitDate: any;

  minDate?: Date;
  maxDate?: Date;
  selectedDate?: Date | string | any;
  onClose: () => void;
};

const initialState: any = {
  selectedDay: currentDate.getDate(),
  selectedMonth: currentMonth + 1,
  selectedYear: currentYear,
  months,
  years: [],
  days: [],
  minDate: new Date('2000-12-31'),
  maxDate: currentDate,
};

function WheelDatePicker(props: Props) {
  const [state, setState] = useState(initialState);
  const onLoad = useRef<any>();

  //   onLoad
  useEffect(() => {
    onLoad.current();
  }, []);

  onLoad.current = () => {
    let minDate = props.minDate || state.minDate;
    let maxDate = props.maxDate || state.maxDate;
    let selectedDate = props.selectedDate
      ? new Date(props.selectedDate)
      : currentDate;

    const days: number[] = getDays(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1
    );

    const years: number[] = getYears(minDate, maxDate);
    setState({
      ...state,
      days: days,
      years: years,
    });

    if (selectedDate) {
      setState({
        ...state,
        days,
        years,
        selectedDay: selectedDate.getDate(),
        selectedMonth: selectedDate.getMonth() + 1,
        selectedYear: selectedDate.getFullYear(),
      });
    }
  };

  const onMonthChange = (item: any, index: any) => {
    const days = getDays(state.selectedYear, index + 1);
    if (state.selectedDay > days[days.length - 1]) {
      setState({
        ...state,
        selectedDay: days[days.length - 1],
        selectedMonth: item,
        days,
      });
    } else {
      setState({ ...state, selectedMonth: item, days });
    }
  };

  const onYearChange = (item: any) => {
    const days = getDays(item, state.selectedMonth);
    if (state.selectedDay > days[days.length - 1]) {
      setState({
        ...state,
        selectedDay: days[days.length - 1],
        selectedYear: item,
        days,
      });
    } else {
      setState({ ...state, days, selectedYear: item });
    }
  };

  const getDays = (year: any, month: any) => {
    // Get the number of days in the current month
    const numDays = new Date(year, month, 0).getDate();
    // Create a list of days for the current month
    const days: any = Array.from({ length: numDays }, (_, i) => i + 1);
    return days;
  };

  const getYears = (minDate: Date, maxDate: Date) => {
    // const currentYear = new Date().getFullYear(); // gets the current year
    const years: number[] = Array.from(
      { length: maxDate.getFullYear() - minDate.getFullYear() + 1 },
      (_, i) => minDate.getFullYear() + i
    );
    return years;
  };

  const onSubmit = () => {
    let day =
      state.selectedDay.toString().length === 1
        ? 0 + state.selectedDay.toString()
        : state.selectedDay.toString();

    let month =
      state.selectedMonth.toString().length === 1
        ? 0 + state.selectedMonth.toString()
        : state.selectedMonth.toString();

    let year = state.selectedYear;

    const format = {
      date: `${year}-${month}-${day}`,
      display: `${day} ${months[month - 1]} ${year}`,
    };

    props.onSubmitDate(format);
    props.onClose();
  };

  const renderContent = () => (
    <View style={[styles.modalContent, props.modalContentStyle]}>
      {props.caption ? (
        <View>
          <Text style={[styles.captionStyle, props.captionStyle]}>
            {props.caption}
          </Text>
        </View>
      ) : null}
      <View style={[styles.row, props.pickercontainerStyle]}>
        <View style={[styles.col, props.pickerWrapperStyle]}>
          <Picker
            selectedValue={state.selectedDay}
            itemStyle={[styles.itemStyle, props.pickerItemStyle]}
            onValueChange={(itemValue: number) =>
              setState({ ...state, selectedDay: itemValue })
            }
            {...props.pickerProps}
          >
            {state.days.map(
              (item: { toString: () => string }, i: React.Key | undefined) => {
                return (
                  <Picker.Item key={i} value={item} label={item.toString()} />
                );
              }
            )}
          </Picker>
        </View>
        <View style={[styles.col, props.pickerWrapperStyle]}>
          <Picker
            selectedValue={state.selectedMonth}
            itemStyle={[styles.itemStyle, props.pickerItemStyle]}
            onValueChange={(itemValue: any, itemIndex: any) => {
              onMonthChange(itemValue, itemIndex);
            }}
            {...props.pickerProps}
          >
            {state.months.map((item: string | number, i: number) => {
              return (
                <Picker.Item key={i} value={i + 1} label={item.toString()} />
              );
            })}
          </Picker>
        </View>
        <View style={[styles.col, props.pickerWrapperStyle]}>
          <Picker
            selectedValue={state.selectedYear}
            itemStyle={[styles.itemStyle, props.pickerItemStyle]}
            onValueChange={(itemValue: any) => onYearChange(itemValue)}
            {...props.pickerProps}
          >
            {state.years.map((item: string | number, i: number) => {
              return (
                <Picker.Item key={i} value={item} label={item.toString()} />
              );
            })}
          </Picker>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.submit, props.submitStyle]}
        onPress={onSubmit}
      >
        <Text style={[styles.submitText, props.submitTextStyle]}>
          {props.submitLabel ? props.submitLabel : 'Submit'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal
      isVisible={props.show}
      onBackButtonPress={props.onBackButtonPress}
      onBackdropPress={props.onBackdropPress}
      useNativeDriver={props.useNativeDriver}
      animationIn={props.animationIn}
      animationOut={props.animationOut}
      animationInTiming={props.animationInTiming}
      animationOutTiming={props.animationOutTiming}
      style={[styles.modalContainer, props.modalContainerStyle]}
    >
      {renderContent()}
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    paddingBottom: 40,
  },

  captionStyle: {
    textAlign: 'center',
    padding: 10,
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 0,
    margin: 0,
  },
  col: {
    flex: 1,
  },
  itemStyle: {
    fontSize: 17,
  },
  submit: {
    padding: 15,
    borderRadius: 90,
    backgroundColor: 'red',
  },
  submitText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 15,
  },
});

export default WheelDatePicker;
