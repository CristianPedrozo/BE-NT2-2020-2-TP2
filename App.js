import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { vibrate } from './utils'

//Inicio la variable que me va a permitir manejar el timer
let invervalo = null;
let contador = 5;

export default function App() {
  //Inicializo los hooks necesarios
  const [segundos, setSegundos] = useState(contador);
  const [estado, setEstado] = useState(false);
  const [modoTrabajo, setModoTrabajo] = useState(true);
  const [estadoTexto, setEstadoTexto] = useState("trabajo");

  //Seteo un efecto al cambiar el estado del cronometro
  useEffect(() => {
    if (estado) {
      invervalo = setInterval(() => {
        contador = contador - 1
        setSegundos(contador);
      }, 1000);
    } else {
      clearInterval(invervalo);
    }
  }, [estado]);

  //Seteo un efecto al cambiar el modo de trabajo o descanso
  useEffect(() => {
    if (modoTrabajo) {
      contador = 5
      setEstadoTexto("trabajo")
      setSegundos(5)
    } else {
      contador = 3
      setEstadoTexto("descanso")
      setSegundos(3)
    }
  }, [modoTrabajo]);
//Seteo un efecto para
  useEffect(() => {
    if (contador == 0) {
      vibrate();
    }
    if (contador == -1) {
      setModoTrabajo(!modoTrabajo)
    }
  },[segundos])
  
  const reiniciar = () => {
    if (estado) {
      setEstado(false);
      setSegundos(5);
      setModoTrabajo(true)
      setEstadoTexto("trabajo")
    } else {
      setSegundos(contador);
    }
    setModoTrabajo(true);
  }

  const obtenerTextoTiempo = () => {
    var minutos = Math.floor(segundos / 60);
    var seg = segundos - minutos * 60;
    return minutos + ":" + seg
  }

  const habilitarReloj = () => {
    setEstado(true)
  }

  const deshabilitarReloj = () => {
    setEstado(false)
  }




  return (
    <View style={styles.container}>
      <Text>Te quedan {obtenerTextoTiempo()} de {estadoTexto}</Text>
      <Button
        title="Empezar"
        onPress={vibrate, habilitarReloj}
      />
      <Button
        title="Detener"
        onPress={vibrate, deshabilitarReloj}
      />
      <Button
        title="Reiniciar"
        onPress={vibrate, reiniciar}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
