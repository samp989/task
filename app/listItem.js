import React, { useState } from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { colors, width } from "./constent";

const ListItem = (props) => {
  const { item, index } = props;

  const [showEpisodes, setShowEpisodes] = useState(false);

  const hanldeToggle = () => {
    setShowEpisodes(!showEpisodes);
  };

  const renderInfo = (key, value) => (
    <Text style={s.text}>
      <Text style={s.title}>{key} : </Text> {value}
    </Text>
  );

  return (
    <View style={{...s.item,marginTop:index == 0 ? 10 : 0}}>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={s.img}
          source={{ uri: item?.image }}
          resizeMode="contain"
        />
        <View style={s.infoContainer}>
          {renderInfo("Name", item?.name)}
          {renderInfo("Species", item?.species)}
          {renderInfo("Gender", item?.gender)}
          {renderInfo("Status", item?.status)}
          {renderInfo("Origin", item?.origin?.name)}
          {renderInfo("Location", item?.location?.name)}
        </View>
      </View>

      <Text onPress={hanldeToggle} style={s.toggleText}>
       Click to view chapters the character is featured
      </Text>

      {showEpisodes && (
        <View style={s.episodeBox}>
          {item?.episode?.map((v, i) => (
            <View key={v} style={s.episodeContainer}>
              <Text style={s.text}>{`Episode : ${v?.split("/").pop()}`}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default ListItem;

const s = StyleSheet.create({
  item: {
    backgroundColor: colors.white,
    elevation: 3,
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  img: {
    height: width * 0.35,
    width: width * 0.35,
    borderRadius: 5,
    backgroundColor: colors.lightGrey,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  toggleText: {
    paddingVertical: 10,
    color: colors.primary,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  text: {
    fontSize: 14,
    color: colors.black,
  },
  title: {
    color: colors.primary,
    fontWeight: "500",
  },
  episodeContainer: {
    padding: 10,
    backgroundColor: colors.lightGrey,
    borderRadius: 5,
    elevation: 1,
    marginBottom: 10,
  },
  episodeBox: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});
