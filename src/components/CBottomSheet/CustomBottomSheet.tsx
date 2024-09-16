import React, {
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useEffect,
  Ref,
  useState,
  useLayoutEffect,
  useCallback,
} from 'react';
import {View, Text, StyleSheet, LayoutChangeEvent} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackgroundProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';

interface BottomSheetComponentProps {
  children?: React.ReactNode;
  snapPoints?: string[];
  indicator?: boolean;
  close?: () => void;
}

export interface BottomSheetRef {
  open: () => void;
  close: () => void;
}

const CustomBottomSheet = forwardRef<BottomSheetRef, BottomSheetComponentProps>(
  (props, ref) => {
    const {children, snapPoints, indicator = true, close} = props;
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [isOpen, setIsOpen] = useState(false);

    const cSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    useImperativeHandle(ref, () => ({
      open: () => {
        bottomSheetRef.current?.expand();
        setIsOpen(true);
      },
      close: () => {
        bottomSheetRef.current?.close();
        setIsOpen(false);
      },
    }));

    const handleSheetChanges = (index: number) => {
      setIsOpen(index !== -1);
      if (index === -1) {
        close && close();
      }
    };
    const renderBackdrop = (props: BottomSheetBackgroundProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.7}
      />
    );

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={cSnapPoints}
        enableDynamicSizing={snapPoints ? false : true}
        backgroundStyle={styles.contentContainer}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{display: indicator ? 'flex' : 'none'}}
        onChange={handleSheetChanges}>
        {snapPoints && snapPoints.length > 0 && isOpen ? (
          children
        ) : (
          <BottomSheetView style={{flex: 0, minHeight: 100}}>
            {isOpen && children}
          </BottomSheetView>
        )}
      </BottomSheet>
    );
  },
);

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'white',
  },
});

export default CustomBottomSheet;
