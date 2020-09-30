import React from "react";
import { StyleSheet, View, Text } from 'react-native';

export default function reloj({ seg }) {

    //Funcion para obtener los minutos y segundos en formato texto a partir de los segundos
    const obtenerTextoTiempo = (segundos) => {
        var minutos = Math.floor(segundos / 60);
        var seg = segundos - minutos * 60;
        return minutos + ":" + seg
    }
    return (
        <View>
        <Text>{obtenerTextoTiempo(seg)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    btn: {
        //   width: 100,
        //   borderWidth: 2,
        //   borderRadius: 6,
        //   marginLeft: 5,
        //   backgroundColor: '#000000',
    },
});