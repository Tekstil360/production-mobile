import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/Container/Container';
import {useGetProduciontsMutation} from '../../services/productionService';
import ProductionResponse from '../../dto/Response/ProductionResponse';
import JeansPantsSvg from '../../assets/productions/JeansPantsSvg';
import Button from '../../components/Button/Button';
import CustomText from '../../components/Text/Text';

export default function Productions() {
  const [getProductions] = useGetProduciontsMutation();
  const [productions, setProductions] = useState<Array<ProductionResponse>>([]);
  useEffect(() => {
    loadProductions();
  }, []);

  const loadProductions = () => {
    getProductions()
      .unwrap()
      .then(res => {
        setProductions(res.list);
      });
  };

  return (
    <Container header title="Üretimlerim" goBackShow>
      <Container type="container" p={10}>
        <Container>
          {productions.map((production, index) => (
            <TouchableOpacity
              activeOpacity={0.7}
              key={index}
              style={{
                backgroundColor: 'white',
                padding: 10,
                margin: 5,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#ddd',
              }}>
              <JeansPantsSvg />
              <CustomText fontWeight="bold">{production.name}</CustomText>
            </TouchableOpacity>
          ))}
        </Container>
        <Button borderRadius={10} text="Üretim Ekle" onPress={() => {}} />
      </Container>
    </Container>
  );
}
