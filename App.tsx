/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { Button, Image, SafeAreaView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import Toast from 'react-native-simple-toast';


const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Please enter valid emial").required("Email is required"),
  password: Yup.string().min(8, 'Password must be atleast 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must include lowercase, uppercase, and numbers'
    ).required('Password is required')
})

export default function App() {
  return (
    <SafeAreaView style={styles.appContainer}>
      <View style={styles.viewContainer}>
        <View style={styles.imageContainer}>
          <Image source={require('./images/logo.png')} style={styles.appLogo} resizeMode='contain' />

        </View>
        <View style={styles.formContainer}>
          <Formik initialValues={{
            email: '',
            password: ''
          }} onSubmit={values => { Toast.show('Success', 3) }}
            validationSchema={loginValidationSchema}>
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit
            }) => (
              <>
                <View style={styles.fieldContainer}>
                  <TextInput
                    value={values.email} style={styles.emailStyle} placeholder='Email' onChangeText={handleChange('email')} />
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>
                      {errors.email}
                    </Text>
                  )}
                </View>
                <View style={styles.fieldContainer}>
                  <TextInput value={values.password} style={styles.emailStyle} placeholder='password' onChangeText={handleChange('password')} />
                  {touched.password && errors.password && (
                    <Text style={styles.errorText} >
                      {errors.password}
                    </Text>
                  )}

                </View>
                <TouchableOpacity disabled={!isValid} onPress={() => handleSubmit()} style={styles.loginButton}>

                  <Text style={styles.loginText}>{'Login'.toUpperCase()}</Text>
                </TouchableOpacity>
              </>
            )}

          </Formik>

        </View>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1
  },
  viewContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 24,
    justifyContent: 'space-between'
  },
  formContainer: {
    flex: 2
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  appLogo: {
    width: 150,
    height: 150,
    alignSelf: 'center'

  },
  fieldContainer: {
    marginBottom: 24
  },
  emailStyle: {
    borderColor: '#16213e',
    borderWidth: 1
  }
  ,
  loginButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#2596be',

  },
  loginText: {
    color: '#ffffff'
  },
  errorText: {
    fontSize: 10,
    color: '#ff5733'
  }


})