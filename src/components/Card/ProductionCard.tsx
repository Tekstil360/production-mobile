import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import dayjs from 'dayjs';
import CustomText from '../Text/Text';

export default function ProductionCard() {
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <CustomText style={{textAlign: 'center'}}>ProductionCard</CustomText>
      </View>
      <View style={styles.productionOperationContainer}>
        <View
          style={{
            width: 40,
            borderRightWidth: 1,
            borderRightColor: 'gray',
          }}>
          <CustomText numberOfLines={2} style={styles.operationDateText}>
            {dayjs().format('DD MMMM')}
          </CustomText>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.productionOperation}>
          <CustomText style={{color: 'white'}} numberOfLines={1}>
            Tailor
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
  },
  image: {
    width: 75,
    height: 75,
    backgroundColor: 'red',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productionOperationContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'lightblue',
  },
  productionOperation: {
    backgroundColor: '#34495b',
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  operationDateText: {
    fontSize: 9,
    color: 'gray',
    textAlign: 'center',
  },
});
