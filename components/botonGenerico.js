import React from "react";
import { StyleSheet, View, Button } from 'react-native';

export default function botonGenerico({titulo, funcionCallback, habilitado}) {

    return (
        <View style={styles.btn}>
            <Button 
            title={titulo}
            onPress={funcionCallback}
            disabled = {!habilitado}
            />
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