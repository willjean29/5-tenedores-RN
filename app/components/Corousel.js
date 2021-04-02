import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';

const CarouselImages = ({arrayImages,height,width}) => {
  const renderItem = ({item,index}) => {
    return (
      <Image
        style={{width,height}}
        source={{uri: item}}
        resizeMode="cover"
        PlaceholderContent={
          <ActivityIndicator size="large" color="#00a680"/>
        }
      />
    )
  }
  return (  
    <Carousel
      // layout={'default'}
      layout={'stack'} layoutCardOffset={18}
      // layout={'tinder'} layoutCardOffset={'9'}
      data={arrayImages}
      sliderWidth={width}
      itemWidth={width}
      sliderHeight={height}
      itemHeight={height}
      renderItem={renderItem}
    />
  );
}
 
export default CarouselImages;