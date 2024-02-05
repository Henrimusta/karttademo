import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useState } from "react";

export default function Map(props) {
    const [marker, setMarker] = useState(null)
    const [selectedMarker, setSelectedMarker] = useState(null)

    const showMarker = (e) => {
        const coords = e.nativeEvent.coordinate;
        setMarker(coords)
    }

    const removeMarker = () => {
        setMarker(null)
    }

    useEffect(() => {
        setSelectedMarker({
            latitude: props.location.latitude,
            longitude: props.location.longitude
        })
    }, [props.location])

    return (
        <MapView
            style={styles.map}
            region={props.location}
            mapType={props.mapType}
            onLongPress={showMarker}

        >
            {marker &&
                <Marker
                    title="My marker"
                    coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                    onPress={removeMarker}
                />
            }
            {selectedMarker &&
                <Marker
                    title="User location"
                    coordinate={{ latitude: selectedMarker.latitude, longitude: selectedMarker.longitude }}
                />
            }

        </MapView>

    );
}

const styles = StyleSheet.create({
    map: {
        width: "100%",
        height: "100%",
    },
});