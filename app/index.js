import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import ListItem from './listItem';
import {colors} from './constent';

const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lazyLoading, setLazyLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    if (currentPage > 1) {
      setLazyLoading(true);
    }
    fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        setCurrentPage(cp => cp + 1);
        setData(data.concat(json?.results));
        setLazyLoading(false);
      })
      .catch(error => {
        console.log('Error ->', error);
      });
  };

  return (
    <SafeAreaView style={s.safeArea}>
      <View style={s.root}>
        <FlatList
          data={data}
          renderItem={({item, index}) => <ListItem item={item} index={index} />}
          keyExtractor={item => item?.id}
          onEndReached={() => getData()}
          ListFooterComponent={
            lazyLoading && (
              <ActivityIndicator
                size={'large'}
                color={colors.primary}
                style={{padding: 20}}
              />
            )
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default App;

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
