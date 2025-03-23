import MovieCard from '@/components/movieCard';
import SearchBar from '@/components/SearchBar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import useFetch from '@/services/useFetch';
import { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset, //* reset the state
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    // const func = async () => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies(); //* since we are using await, need to wrap the if statement in a async function
      } else {
        reset();
      }
    }, 500);

    // func();
    //* clear the timeout by returning a callback function with that ID
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);
  //* recall the function every time the searchQuery changes.

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        className="px-5"
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <SearchBar
                onPress={() => {}}
                placeholder="Search Movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>
            {loading ? (
              <ActivityIndicator
                size="large"
                color="#0000dd"
                className="my-3"
              />
            ) : null}
            {error ? (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            ) : null}
            {!loading && !error && searchQuery.trim() && movies?.length! > 0 ? (
              <Text className="text-xl text-white font-bold">
                Search Results for{' '}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            ) : (
              <Text className="text-xl text-white font-bold">
                {/* No Results for{' '} */}
                <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim()
                  ? 'No movies found'
                  : 'Start typing to search for movies'}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
