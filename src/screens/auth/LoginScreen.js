import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { HEIGHT, WIDTH } from "../../constants/sizes";
import { PRIMARY_COLOR } from "../../constants/colors";

import Google from "../../../assets/icons/google.svg";
import Facebook from "../../../assets/icons/facebook.svg";
import Logo from "../../../assets/icons/logo-black.svg";
import LogoWhite from "../../../assets/icons/logo.svg";
import styles from "../../constants/styles";
import ThemeContext from "../../theme/ThemeContext";
import { userLogin } from "../../redux/actions/auth";
import TextInputComp from "../../components/TextInputComp";
import { showError } from "../../utils/helperFunctions";
import TextComp from "../../components/TextComp";
import { AuthContext } from "../../context/AuthContext";
import { showMessage } from "react-native-flash-message";
import { ToastAndroid } from "react-native";
import { Apple } from "iconsax-react-native"

export default function LoginScreen() {
  const navigation = useNavigation();
  const theme = useContext(ThemeContext);
  const { login, isError, isSuccessful } = useContext(AuthContext);

  const [email, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const onPressLogin = async () => {
    // setLoading(true)
    let data = {
      email: email,
      password: password,
    };
    // console.log("empty =-=-= emsopidosn ", data)
    if (data.password == "" && data.email == "") {
      // try {
      //     let res = await userLogin(data)
      //     setLoading(false)
      //     // console.log(" ---------- -========", res.data)
      //     showMessage("successful")
      // } catch (error) {
      //     showError(error.message)
      //     // console.log("signup error -------", error )
      //     setLoading(false)
      // }
      showError("fields must not be empty");
    }
    // else {
    //     // setLoading(false)
    //     }
    // }
    // navigation.navigate("OTPScreen", {item: "safyulurzu@gufum.com"})
  };

  const showToast = (word) => {
    ToastAndroid.show(word, ToastAndroid.LONG);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: theme.backgroundColor,
          height: HEIGHT,
          width: WIDTH,
        }}
      >
        <StatusBar style="light" />
        {/* <Image style={{height:HEIGHT, width:WIDTH, position:"absolute"}} source={require('../../../assets/images/background.png')} /> */}
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {/* lights */}
          <View
            style={{
              justifyContent: "space-around",
              alignItems: "center",
              top: HEIGHT * 0.1,
              width: WIDTH,
              //   height: HEIGHT * 0.1,
              position: "absolute",
            }}
          >
            <Animated.View
              entering={FadeInUp.delay(200).duration(1000).springify()}
              // source={require('../../../assets/icons/logo-black.png')}
              // style={{ width:"50%",}}
            >
              {theme.theme != "dark" ? (
                <Logo height={100} width={290} />
              ) : (
                <LogoWhite height={100} width={290} />
              )}
            </Animated.View>
          </View>

          {/* title and form */}
          <View
            style={{
              flex: 1,
              top: HEIGHT * 0.3,
              justifyContent: "space-around",
              height: HEIGHT,
              width: WIDTH,
            }}
          >
            {/* title */}

            {/* form */}
            <View
              style={{
                flex: 1,
                paddingHorizontal: 22,
                paddingVertical: 22,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Animated.Text
                  entering={FadeInUp.duration(1000).springify()}
                  style={{
                    color: theme.color,
                    fontFamily: "Bold",
                    fontSize: 28,
                    marginBottom: 10,
                  }}
                >
                  Welcome back! 👋
                </Animated.Text>
              </View>

              <View style={{ alignItems: "center" }}>
                <Animated.Text
                  entering={FadeInUp.duration(1000).springify()}
                  style={{
                    color: theme.color,
                    fontWeight: "400",
                    fontSize: 18,
                    marginBottom: 18,
                  }}
                >
                  Continue with Email address or Username
                </Animated.Text>
              </View>

              <Animated.View
                entering={FadeInDown.duration(1000).springify()}
                style={styles.input}
              >
                <TextInputComp
                  value={email}
                  placeholder="email or username"
                  onChangeText={(value) => setUserName(value)}
                />
              </Animated.View>
              <Animated.View
                entering={FadeInDown.delay(200).duration(1000).springify()}
                style={styles.input}
              >
                <TextInputComp
                  value={password}
                  placeholder="Password"
                  onChangeText={(value) => setPassword(value)}
                  secureTextEntry={secureText}
                  secureText={secureText ? "show" : "hide"}
                  onPressSecure={() => setSecureText(!secureText)}
                />
              </Animated.View>

              <Animated.View
                entering={FadeInDown.delay(600).duration(1000).springify()}
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  marginBottom: 30,
                  marginTop: 5,
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.push("ForgotPasswordScreen")}
                >
                  <Text style={{ color: PRIMARY_COLOR, fontSize: 18 }}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </Animated.View>

              <Animated.View
                style={[styles.input, { backgroundColor: PRIMARY_COLOR }]}
                entering={FadeInDown.delay(400).duration(1000).springify()}
              >
                <TouchableOpacity
                  onPress={() => {
                    // onPressLogin()
                    if (email === "" || password === "") {
                      showToast("fields cannot be empty");
                    } else {
                      // if (isError) {
                      //     showToast(isError)
                      // }
                      login(email, password);
                    }
                  }}
                  style={[]}
                >
                  {loading ? (
                    <ActivityIndicator />
                  ) : (
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: "Bold",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      Login
                    </Text>
                  )}
                </TouchableOpacity>
              </Animated.View>

              <Animated.View
                entering={FadeInDown.delay(600).duration(1000).springify()}
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 18 }}>or sign in</Text>
              </Animated.View>

              {/* Auth Boxes */}

              <Animated.View
                entering={FadeInDown.delay(600).duration(1000).springify()}
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: WIDTH * 0.7,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: WIDTH * 0.2,
                      paddingVertical: 20,
                      borderWidth: 1,
                      borderRadius: 20,
                      borderColor: "#ccc",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {theme.theme != "dark" ? (
                      <Apple size={26} color="#000" variant="Bold" />
                    ) : (
                      <Apple size={26} color="#fff" variant="Bold" />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: WIDTH * 0.2,
                      paddingVertical: 20,
                      borderWidth: 1,
                      borderRadius: 20,
                      borderColor: "#ccc",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Facebook width={26} height={26} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: WIDTH * 0.2,
                      paddingVertical: 20,
                      borderWidth: 1,
                      borderRadius: 20,
                      borderColor: "#ccc",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Google />
                  </TouchableOpacity>
                </View>
              </Animated.View>

              <Animated.View
                entering={FadeInDown.delay(600).duration(1000).springify()}
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <TextComp text="Don't have an account?" />
                <TouchableOpacity
                  onPress={() => navigation.push("SignupScreen")}
                >
                  <Text style={{ color: PRIMARY_COLOR }}>Sign up</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
