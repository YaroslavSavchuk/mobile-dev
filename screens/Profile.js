import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import InputBox from '../components/InputBox';
import SubmitButton from '../components/SubmitButton';

const Profile = () => {
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 15,
        }}>
        <Text
          style={{
            fontSize: 25,
          }}>
          Реєстрація
        </Text>
      </View>
      <View style={{ marginHorizontal: 30 }}>
        <InputBox style={styles.input} inpTitle={'Email'} />
        <InputBox style={styles.input} inpTitle={'Пароль'} />
        <InputBox style={styles.input} inpTitle={'Пароль (ще раз)'} />
        <InputBox style={styles.input} inpTitle={"Ім'я"} />
        <InputBox style={styles.input} inpTitle={'Прізвище'} />
      </View>
      <SubmitButton btnTitle="Увійти"></SubmitButton>
    </View>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 27,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
  },
  linkText: {
    textAlign: 'center',
    fontSize: 15,
  },
  link: {
    color: '#0c8fff',
  },
});

export default Profile;
