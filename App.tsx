import React from 'react';
import {SafeAreaView} from 'react-native';

import ProductionCard from './src/components/Card/ProductionCard';

export default function App() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f2f2f2'}}>
      <ProductionCard />
    </SafeAreaView>
  );
}
