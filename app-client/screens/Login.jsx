import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../components/CustomButton";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../config/queries";
import { useContext, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const { setIsLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFunc, { data }] = useMutation(LOGIN, {
    onCompleted: async (responseData) => {
      const token = responseData?.userLogin?.access_token || "";

      console.log(token, "<<< WOYY INI TOKEN YAAA");

      try {
        await SecureStore.setItemAsync("token", token);
        console.log("Token berhasil disimpan");
      } catch (error) {
        console.error("Gagal menyimpan token", error);
      }

      setIsLoggedIn(true);
      navigation.navigate("Home");
    },

  });

  const onSubmit = async () => {
    try {
      console.log("submit form login");
      // navigation.navigate("Home");
      // console.log({ email, password });
      await loginFunc({
        variables: {
          input: {
            email: email,
            password: password,
          },
        },
      });
    } catch (error) {
      console.log(error, "errorrrr");
    }
  };

  return (
    <View style={[styles.container]}>
      <Text style={[styles.header]}>Sign In</Text>

      {/* --- FORM --- */}
      <View style={[styles.boxForm]}>
        <View style={[styles.boxInput]}>
          <Text>Email</Text>
          <TextInput
            style={[styles.textInput]}
            textContentType={"email"}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={[styles.boxInput]}>
          <Text>Password</Text>
          <TextInput
            style={[styles.textInput]}
            textContentType={"password"}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
      </View>

      {/* --- BUTTON --- */}
      <CustomButton
        text="Login"
        stylesButton={{ width: "40%", borderRadius: 20 }}
        onPress={onSubmit}
      />

      <View style={[styles.boxLinkSignUp]}>
        <Text>Don't have an account ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={[styles.textLinkSignUp]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
  },
  boxForm: {
    width: "100%",
    marginVertical: 25,
  },
  boxInput: {
    width: "100%",
    paddingHorizontal: 20,
    marginVertical: 8,
  },
  textInput: {
    height: 40,
    marginVertical: 5,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  boxLinkSignUp: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 5,
  },
  textLinkSignUp: {
    color: "red",
    fontWeight: "500",
  },
});
