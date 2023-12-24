import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface LatestIngredientProps {
    name: string;
    quantity: string;
    duration: string;
}

const LatestIngredient: React.FC<LatestIngredientProps> = ({ name, quantity, duration }) => {
    return(
        <TouchableOpacity>
            <View style={{
                width: 319,
                height: 72,
                borderRadius: 24,
                backgroundColor: "#F8F8F6",
                display: "flex",
                justifyContent: "center",
                padding: 20
            }}>
                <Text style={{fontSize: 17, fontWeight: "500"}}>
                    {name}
                </Text>
                <Text style={{fontSize: 15, opacity: 0.5}}>
                    {quantity} - {duration}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default function Home() {

    const ListOfIngredients: LatestIngredientProps[] = 
    [
        {name: "Dany Raihan", quantity: "500kg", duration: "19 years ago"}, 
        {name: "Dany Raihan", quantity: "500kg", duration: "19 years ago"}, 
        {name: "Erick Jovan", quantity: "56kg", duration: "19 years ago"}, 
        {name: "Dany Raihan", quantity: "500kg", duration: "19 years ago"}, 
        {name: "Dany Raihan", quantity: "500kg", duration: "19 years ago"}, 
    ];

    return (
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: 20,
            paddingLeft: 40,
            gap: 30,
            overflow: "visible"
          }}
        >
        <Text style={{fontWeight:"bold", fontSize: 35}}>
            What's
            <Text style={{color: "#1BD15D", textShadowColor: "black", textShadowRadius: 3, textShadowOffset: { width: 1, height: 1 }}}> Cooking?</Text>
        </Text>
        <View
            style={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                justifyContent: "center",
                width: 320,
                height: 180,
                backgroundColor: "#F3F6C8",
                padding: 20,
                gap: 5,
                borderRadius: 28,
                overflow: "visible"
            }}
        >
            <View style={{
                flex: 1,
                gap: 7,
                overflow: "visible",
            }}>
                <Text style={{fontSize: 20, fontWeight: "bold"}}>Get that wok moving with these recipes</Text>
                <Text style={{opacity: 0.4}}>Found 3 dishes ready to be made</Text>
                <TouchableOpacity>
                    <Text style={{color: "#EC7669", fontWeight: "bold", fontSize: 15}}>
                        Show More
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{overflow: "visible"}}>
                <Image source={require("../images/Bowl.png")} style={{width: 181, height: 174, position: 'absolute', right: -50, top: 50}}/>
            </View>
        </View>
        <View style={{
            width: 320, 
            marginTop: 70, 
            display: "flex", 
            flexDirection: "column",
            alignItems: "center", 
            gap: 25
        }}>
            <Text style={{fontSize: 20, fontWeight: "500"}}>
                Things you bought
            </Text>
            {ListOfIngredients.map((item, index) => {
                return (
                    <LatestIngredient 
                        name={item.name} 
                        quantity={item.quantity} 
                        duration={item.duration}
                    />
                )
            })}
        </View>
        </View>
      </ScrollView>
      </SafeAreaView>
    );
  }