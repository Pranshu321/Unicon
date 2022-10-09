import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import convert from 'convert-units';
import { Picker } from '@react-native-community/picker';
import {SimpleLineIcons} from '@expo/vector-icons';

const measures = convert().measures();
export default function App() {
  const [index, setindex] = useState(0);
  const [routes] = useState(
    measures.map((m) => (
      {
        key: m,
        title: unCamelcase(m)
      }
    ))
  );

  const MeasureView = ({ measure }) => {

    const units = convert().possibilities(measure);
    const [fromUnit, setFromUnit] = useState(units[0]);
    const [ToUnit, setToUnit] = useState(units[1]);
    const [value, setvalue] = useState('0');
    const [ConvertedValue, setConvertedValue] = useState(0);

    useEffect(() => {
      setConvertedValue(convert(+value)
        .from(fromUnit)
        .to(ToUnit)
        .toFixed(2))
    }, [value, fromUnit, ToUnit]);

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Picker style={styles.column} selectedValue={fromUnit} onValueChange={setFromUnit}>
            {
              units.map((unit, idx) => (
                <Picker.Item
                  label={unit}
                  value={unit}
                  key={idx}
                />
              ))
            }
          </Picker>
          <View style={styles.column}>
            <TextInput value={value} onChangeText={text => setvalue(text)} keyboardType="numeric"
              style={styles.Input}
            />
          </View>
        </View>
        <SimpleLineIcons 
          name='arrow-down-circle'
          size={50}
          color={"green"}
          style={{alignSelf: "center" , fontWeight: "900"}}
        />
        <View style={styles.row}>
          <Picker style={styles.column} selectedValue={ToUnit} onValueChange={setToUnit}>
            {
              units.map((unit, idx) => (
                <Picker.Item
                  label={unit}
                  value={unit}
                  key={idx}
                />
              ))
            }
          </Picker>
          <View style={styles.column}>
            <Text value={value} onChangeText={text => setvalue(text)} keyboardType="numeric"
              style={[styles.Input, { fontSize: 40, height: 50, fontWeight: "bold" }]}
            >
              {ConvertedValue}
            </Text>

          </View>
        </View>
      </View>
    );
  };

  function unCamelcase(value) {
    return value.replace(/[A-Z]/g, ' $1');
  }

  // Scene
  const RenderScreen = ({ route }) => {
    return <MeasureView measure={route.key} />
  }

  return (
    <View style={[styles.container, { marginTop: 45 }]}>
      <Text style={styles.title}>Unicon</Text>
      <TabView navigationState={{ index, routes }}
        renderScene={RenderScreen}
        onIndexChange={setindex}
        initialLayout={{ width: Dimensions.get("window").width }}
        animationEnabled={true}
        renderTabBar={(props) =>
          <TabBar {...props}
            scrollEnabled
            tabStyle={{ width: 'auto', }}
            indicatorStyle={{ backgroundColor: "green" }}
            style={{ backgroundColor: "black" }}
          />}
      >
      </TabView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    padding: 15,
    fontWeight: "900",
    letterSpacing: 3,
    color: "black",
    fontSize: 24,
    textAlign: "center",
    textTransform: "uppercase"
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  column: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20
  },
  Input: {
    height: 40,
    borderColor: "black",
    borderBottomWidth: 2,
    fontSize: 30,
    textAlign: "center"
  }
});
