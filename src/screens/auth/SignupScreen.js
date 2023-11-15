import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";

import { HEIGHT, WIDTH } from "../../constants/sizes";
import { PRIMARY_COLOR } from "../../constants/colors";

import Logo from "../../../assets/icons/logo-black.svg";
import LogoWhite from "../../../assets/icons/logo.svg";

import TextInputComp from "../../components/TextInputComp";
import TextComp from "../../components/TextComp";

import Google from "../../../assets/icons/google.svg";
import Facebook from "../../../assets/icons/facebook.svg";
import validator from "../../utils/validations";
import { showError } from "../../utils/helperFunctions";
import { userSignup } from "../../redux/actions/auth";
import axios from "axios";
import { API_BASE_URL } from "../../config/urls";
import ThemeContext from "../../theme/ThemeContext";
import { showMessage } from "react-native-flash-message";
import { Back, Apple } from "iconsax-react-native";

export default function SignupScreen() {
  const navigation = useNavigation();

  const theme = useContext(ThemeContext);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const isValidData = () => {
    const error = validator({
      userName,
      // fullName,
      email,
      password,
    });
    if (error) {
      showError(error);
      return false;
    }
    return true;
  };

  const onPressSignup = async () => {
    const checkValid = isValidData();
    // console.log("first")
    setLoading(true);

    if (checkValid) {
      let data = {
        username: userName,
        email: email,
        password: password,
      };

      try {
        let res = await userSignup(data);
        console.log("response -------", data);
        console.log("response result -------", res);
        // setLoading(false)
        console.log(" ---------- -========", res.data);
        console.log(" ---------- -========", res.data.email);
        showMessage(res.status);
        navigation.navigate("OTPScreen", { item: res.data.email });
      } catch (error) {
        showError(error.message);
        console.log("signup error -------", error);
        console.log("signup error data -------", data);
      }
    }
    setLoading(false);
    // navigation.navigate("OTPScreen", {item: "safyulurzu@gufum.com"})
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          <StatusBar style="dark" />
          {/* <Image style={{height:HEIGHT, width:WIDTH, position:"absolute"}} source={require('../../../assets/images/background.png')} /> */}
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            {/* lights */}

            <Animated.View
              entering={FadeInUp.delay(200).duration(1000).springify()}
            >
              <TouchableOpacity
                style={{
                  marginLeft: 12,
                }}
                onPress={() => navigation.goBack()}
              >
                {theme.theme != "dark" ? (
                  <Back size={34} color="#000" />
                ) : (
                  <Back size={34} color="#fff" />
                )}
              </TouchableOpacity>
            </Animated.View>

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
                justifyContent: "space-around",
                top: HEIGHT * 0.3,
                height: HEIGHT,
                width: WIDTH,
              }}
            >
              {/* title */}

              {/* form */}
              <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ alignItems: "center" }}>
                  <Animated.Text
                    entering={FadeInUp.duration(1000).springify()}
                    style={{ color: "white", fontFamily: "Bold", fontSize: 20 }}
                  >
                    <TextComp text=" Sign up to create account" />
                  </Animated.Text>
                </View>
                <Animated.View
                  entering={FadeInDown.duration(1000).springify()}
                  style={styles.input}
                >
                  <TextInputComp
                    value={userName}
                    placeholder="Username"
                    onChangeText={(value) => setUserName(value)}
                  />
                  {/* <TextInput
                                placeholder="username"
                                placeholderTextColor={'gray'}
                            /> */}
                </Animated.View>

                <Animated.View
                  entering={FadeInDown.duration(1000).springify()}
                  style={styles.input}
                >
                  <TextInputComp
                    value={email}
                    placeholder="Email"
                    onChangeText={(value) => setEmail(value)}
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
                  style={[styles.input, { backgroundColor: PRIMARY_COLOR }]}
                  entering={FadeInDown.delay(400).duration(1000).springify()}
                >
                  {isLoading ? (
                    <>
                      <ActivityIndicator color={"white"} />
                    </>
                  ) : (
                    <TouchableOpacity onPress={onPressSignup} style={[]}>
                      <Text
                        style={{
                          fontSize: 20,
                          fontFamily: "Bold",
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        SignUp
                      </Text>
                    </TouchableOpacity>
                  )}
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
                    onPress={() => navigation.push("LoginScreen")}
                  >
                    <Text style={{ color: PRIMARY_COLOR }}>Login</Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    width: WIDTH * 0.9,
    marginVertical: 5,
    backgroundColor: "#00000010",
    borderRadius: 10,
    padding: 20,
  },
});
