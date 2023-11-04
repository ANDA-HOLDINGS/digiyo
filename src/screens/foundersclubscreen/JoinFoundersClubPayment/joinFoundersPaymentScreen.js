import React from "react";
import PaymentScreen from "../../../components/stripe/StripePayment";
import { StripeProvider } from "@stripe/stripe-react-native";
// import PaymentsUICustomScreen from '../../stripe/stripepaymentUI'
import { View } from "react-native";
import { HEIGHT } from "../../../constants/sizes";

const JoinFoundersPaymentScreen = () => {
  return (
    <StripeProvider
      publishableKey="pk_test_TYooMQauvdEDq54NiTphI7jx"
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.digiyo" // required for Apple Pay
      // merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >
      <View
        style={{
          flex: 1,
          height: HEIGHT,
          marginTop: HEIGHT * 0.2,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View style={{ 
        //   flex: 1, 
        //   position: "absolute", 
        // top: 0, 
        // bottom: 0 
        }}>
          <PaymentScreen />
        </View>
      </View>
    </StripeProvider>
  );
};

export default JoinFoundersPaymentScreen;
