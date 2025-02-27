import React from "react";
import PaymentScreen from "../../../components/stripe/StripePayment";
import { StripeProvider } from "@stripe/stripe-react-native";
import { View } from "react-native";
import { HEIGHT } from "../../../constants/sizes";

const JoinFoundersPaymentScreen = (props) => {
  // Check if props.route and props.route.params are defined
  if (!props.route || !props.route.params) {
    console.error("Route or params not defined");
    return null; // or handle this case in a way that makes sense for your application
  }

  console.log("first", props.route.params.item);
  let email =
    props.route.name === "joinFoundersPaymentScreen"
      ? props.route.params.item
      : props.email;

  return (
    <StripeProvider
      publishableKey="pk_test_51JIEiiHnXkLhdfIMoOMgw3SHio8AwgZGBNI3VvxNu4UQeTqLQP9NcP4PBx6dTzsrqqKV25lwwmOrWbrttyn24JAd00YUT4heob"
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
          alignItems: "center",
        }}
      >
        <View style={{}}>
          <PaymentScreen email={email} />
        </View>
      </View>
    </StripeProvider>
  );
};

export default JoinFoundersPaymentScreen;
