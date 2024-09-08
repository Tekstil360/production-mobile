import Modal, {
  ModalContent,
  ModalPortal,
  SlideAnimation,
} from 'react-native-modals';
import {SIZES} from '../../constant/theme';
import {Appearance, Text, View} from 'react-native';
import Button from '../Button/Button';
import styled from 'styled-components';
import Divider from '../Divider/Divider';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheckCircle} from '@fortawesome/free-regular-svg-icons';
import {
  faExclamationCircle,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';
import CustomText from '../Text/Text';
import LottieView from 'lottie-react-native';
import {LoadingAnimation} from '../../assets/animations';

interface ModalProps {
  title?: string;
  message?: string;
  content?: any;
  disableCloseOnTouchOutside?: boolean;
  hideCancelBtn?: boolean;
  onConfirmText?: string;
  onConfirm?: () => void;
  onCancelText?: string;
  onCancel?: () => void;
  isAutoClose?: boolean;
  type?: 'success' | 'error' | 'warning';
}

class AlertDialog {
  ids: any[] = [];

  showLoading() {
    const id = ModalPortal.show(
      <Modal
        visible={true}
        onTouchOutside={() => {
          ModalPortal.dismiss(id);
        }}
        modalStyle={{backgroundColor: 'transparent'}}
        overlayBackgroundColor={'black'}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LottieView
            style={{width: 100, height: 100}}
            autoPlay
            loop
            source={LoadingAnimation}
          />
        </View>
      </Modal>,
    );
    this.ids.push(id);
  }
  hideLoading() {
    ModalPortal.dismiss(this.ids[this.ids.length - 1]);
    this.ids.pop();
  }
  showModal(props: ModalProps): Promise<boolean> {
    let isAutoHide =
      (props?.isAutoClose || props.onConfirm || props.onCancel
        ? false
        : true) ?? true;
    return new Promise(resolve => {
      const id = ModalPortal.show(
        <Modal
          visible={true}
          onTouchOutside={() => {
            if (!props.disableCloseOnTouchOutside) {
              ModalPortal.dismiss(id);
              this.ids.pop();
              resolve(true);
            }
          }}
          overlayBackgroundColor={'black'}
          modalAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }>
          <ModalContent style={{backgroundColor: '#fff'}}>
            <View style={{width: SIZES.width - 80}}>
              {props?.title?.length && (
                <View>
                  <TitleContainer>
                    <Title adjustsFontSizeToFit>{props.title}</Title>
                  </TitleContainer>
                  <Divider marginTop="10" marginBottom="10" />
                </View>
              )}
              {props?.type && (
                <>
                  <IconContainer>
                    <FontAwesomeIcon
                      icon={
                        props.type === 'success'
                          ? faCheckCircle
                          : props.type === 'error'
                          ? faWarning
                          : faExclamationCircle
                      }
                      size={50}
                      color={
                        props.type === 'success'
                          ? 'green'
                          : props.type === 'error'
                          ? 'red'
                          : 'orange'
                      }
                    />
                  </IconContainer>
                </>
              )}
              {props.message ? (
                <Message adjustsFontSizeToFit={true}>{props.message}</Message>
              ) : (
                props.content
              )}
              {
                <ButtonContainer>
                  {props.hideCancelBtn !== undefined &&
                    !props.hideCancelBtn && (
                      <Button
                        outline
                        text={props.onCancelText || 'İptal'}
                        onPress={() => {
                          ModalPortal.dismiss(id);
                          this.ids.pop();
                          resolve(false);
                          props.onCancel && props.onCancel();
                        }}
                      />
                    )}
                  {props.onConfirm && (
                    <Button
                      text={props.onConfirmText || 'Onayla'}
                      onPress={() => {
                        ModalPortal.dismiss(id);
                        this.ids.pop();
                        resolve(false);
                        props.onConfirm && props.onConfirm();
                      }}
                    />
                  )}
                </ButtonContainer>
              }
            </View>
          </ModalContent>
        </Modal>,
      );
      this.ids.push(id);
      if (isAutoHide) {
        setTimeout(() => {
          ModalPortal.dismiss(id);
          this.ids.pop();
          resolve(false);
        }, 2000);
      }
    });
  }
  update() {
    this.ids.forEach(item => {
      ModalPortal.update(item);
    });
  }

  dismissAll() {
    ModalPortal.dismissAll();
    this.ids = [];
  }

  dismiss() {
    if (this.ids.length > 0) {
      ModalPortal.dismiss(this.ids[this.ids.length - 1]);
      this.ids.pop();
    }
  }
}
export default new AlertDialog();

const Title = styled(CustomText)`
  text-align: center;
  padding-horizontal: 20px;
  font-size: 18px;
  color: #686f79;
`;
const Message = styled(CustomText)`
  text-align: center;
  font-size: 16px;
  color: #686f79;
  margin-bottom: 10px;
  margin-top: 10px;
`;
const TitleContainer = styled(View)`
  justify-items: center;
`;
const ButtonContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  gap: 10px;
`;
const IconContainer = styled(View)`
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;
