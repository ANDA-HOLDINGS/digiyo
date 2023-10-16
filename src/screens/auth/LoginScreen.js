import { View, Text, Image, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { HEIGHT, WIDTH } from '../../constants/sizes';
import { PRIMARY_COLOR } from '../../constants/colors';

import Logo from '../../../assets/icons/logo-black.svg'
import styles from '../../constants/styles';


export default function LoginScreen() {
    const navigation = useNavigation();

  return (
    <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
    >
        <View style={{ flex: 1, backgroundColor:"white", height:HEIGHT, width:WIDTH,}}>
            <StatusBar style="light" />
            {/* <Image style={{height:HEIGHT, width:WIDTH, position:"absolute"}} source={require('../../../assets/images/background.png')} /> */}
            <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
                {/* lights */}
                <View style={{
                    justifyContent:"space-around",
                    alignItems: "center",
                    top: HEIGHT * 0.2,
                    width: WIDTH, 
                    // height: HEIGHT * 0.1,
                    position:"absolute"
            }}>
                    <Animated.View 
                        entering={FadeInUp.delay(200).duration(1000).springify()} 
                        // source={require('../../../assets/icons/logo-black.png')} 
                        // style={{ width:"50%",}}
                    >
                        <Logo  height={100} width={290} />
                    </Animated.View> 
                </View>

                {/* title and form */}
                <View style={{flex: 1, justifyContent:"space-around", height:HEIGHT, width:WIDTH,}}>
                    
                    {/* title */}
                    <View 
                    style={{flex: 1, alignItems:"center"}}
                    >
                        <Animated.Text 
                            entering={FadeInUp.duration(1000).springify()} 
                            style={{ color:"white", fontWeight:"bold", fontSize:40}}
                            >
                                Login
                        </Animated.Text>
                    </View>

                    {/* form */}
                    <View 
                    style={{flex:1, alignItems:"center"}}
                    >
                        <Animated.View 
                            entering={FadeInDown.duration(1000).springify()} 
                            style={styles.input}
                            >

                            <TextInput
                                placeholder="Email"
                                placeholderTextColor={'gray'}
                            />
                        </Animated.View>
                        <Animated.View 
                            entering={FadeInDown.delay(200).duration(1000).springify()} 
                            style={styles.input}
                            >

                            <TextInput
                                placeholder="Password"
                                placeholderTextColor={'gray'}
                                secureTextEntry
                            />
                        </Animated.View>

                        <Animated.View 
                            style={[styles.input, {backgroundColor:PRIMARY_COLOR,}]} 
                            entering={FadeInDown.delay(400).duration(1000).springify()}>

                            <TouchableOpacity onPress={() => navigation.push("HomeScreen")}
                            style={[ ]}
                            >
                                <Text 
                                style={{fontSize: 20, fontWeight:"bold", color:"white", textAlign:"center"}}
                                >Login</Text>
                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View 
                            entering={FadeInDown.delay(600).duration(1000).springify()} 
                            style={{ marginTop:20, flexDirection:"row", justifyContent:"center"}}
                            >

                            <Text>Forgot password? </Text>
                            <TouchableOpacity onPress={()=> navigation.push('ForgotPasswordScreen')}>
                                <Text 
                                // style="text-sky-600"
                                >Yes</Text>
                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View 
                            entering={FadeInDown.delay(600).duration(1000).springify()} 
                            style={{ marginTop:20, flexDirection:"row", justifyContent:"center"}}
                            >

                            <Text>Don't have an account? </Text>
                            <TouchableOpacity onPress={()=> navigation.push('SignupScreen')}>
                                <Text 
                                // style="text-sky-600"
                                >SignUp</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </View>
            </ScrollView>
        </View>
    </KeyboardAvoidingView>
  )
}
