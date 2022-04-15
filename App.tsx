import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, StyleSheet} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  User,
} from '@react-native-google-signin/google-signin';
import {REACT_APP_IOS_CLIENT_ID} from './envConfig';

type Nullable<T> = null | T;

const App = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<Nullable<User>>(null);

  const handleUserAuthorization = (
    isAuthValue: boolean,
    user: Nullable<User>,
  ) => {
    setUserInfo(user);
    setIsAuth(isAuthValue);
  };

  const onSignInPress = async (): Promise<void> => {
    try {
      await GoogleSignin.hasPlayServices();
      const user: User = await GoogleSignin.signIn();

      handleUserAuthorization(true, user);
    } catch (error) {
      console.log(error);
    }
  };

  const onSignOutPress = async (): Promise<void> => {
    try {
      await GoogleSignin.signOut();

      handleUserAuthorization(false, null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GoogleSignin.configure({iosClientId: REACT_APP_IOS_CLIENT_ID});
  }, []);

  console.log(userInfo);

  return (
    <SafeAreaView style={styles.safeArea}>
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={onSignInPress}
      />

      {isAuth && <Button title="SignOut" onPress={onSignOutPress} />}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
