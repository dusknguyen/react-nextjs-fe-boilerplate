import { View } from "react-native";


export default function ModalScreen() {
return (
    <View>
    <div>
      <h1>Home Screen</h1>
      <p>API URL: {process.env["EXPO_PUBLIC_API_URL"]}</p>
      </div>
      </View>
  );
}
