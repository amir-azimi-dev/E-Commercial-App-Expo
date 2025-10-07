import { useState, useRef, useEffect } from "react";
import { View, Image, useWindowDimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";

interface BannersProps {
    banners: string[];
}

const Banners: React.FC<BannersProps> = ({ banners }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState<1 | -1>(1);
    const carouselRef = useRef<any>(null);

    const { width: WINDOW_WIDTH } = useWindowDimensions();

    useEffect(() => {
        const interval = setInterval(() => {
            let nextIndex = currentIndex + direction;

            if (nextIndex >= banners.length) {
                nextIndex = banners.length - 1;
                setDirection(-1);

            } else if (nextIndex < 0) {
                nextIndex = 0;
                setDirection(1);
            }

            carouselRef.current?.scrollTo({ index: nextIndex, animated: true });
            setCurrentIndex(nextIndex);
        }, 2000);

        return () => clearInterval(interval);

    }, [currentIndex, direction, banners.length]);

    return (
        <View className="w-full mt-6 rounded-xl overflow-hidden aspect-video">
            <Carousel
                ref={carouselRef}
                width={WINDOW_WIDTH - 20}
                height={(WINDOW_WIDTH - 20) * 9 / 16}
                data={banners}
                renderItem={({ item }) => (
                    <View className="w-full flex-1">
                        <Image
                            source={{ uri: `${process.env.EXPO_PUBLIC_STATIC_BASE_URL}/${item}` }}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </View>
                )}
                onSnapToItem={(index) => setCurrentIndex(index)}
                loop={false}
                pagingEnabled
            />
            <View className="absolute right-0 bottom-2 left-0 flex-row justify-center">
                {banners.map((_, i) => (
                    <View
                        key={i}
                        className={`size-2.5 rounded-full mx-1 ${i === currentIndex ? "bg-blue-500" : "bg-gray-300"}`}
                    />
                ))}
            </View>
        </View>
    );
};

export default Banners;